/**
 * Collar Business Validation Tests
 *
 * Tests for the two-tier validation system for Collar table.
 * Verifies that all business rules from the original manual schema are preserved.
 */

import type { CollarDbOutput } from "./collar.business";
import { describe, expect, it } from "vitest";
import {
	canApproveCollar,
	getCollarValidationReport,
	safeValidateCollarBusiness,
	safeValidateCollarDb,
	validateCollarBusiness,
	validateCollarDb,
	validateCollarForReview,

} from "./collar.business";

// ========================================
// TEST DATA HELPERS
// ========================================

function createValidCollar(overrides?: Partial<CollarDbOutput>): any {
	return {
		loggingEventId: "550e8400-e29b-41d4-a716-446655440000",
		organization: "B2Gold",
		dataSource: "Field Entry",
		approvedInd: false,
		modelUseInd: false,
		reportIncludeInd: false,
		activeInd: true,
		rowStatus: 0, // Draft
		validationStatus: 0, // Valid
		rv: new Date(),
		...overrides,
	};
}

// ========================================
// TIER 1: DATABASE SCHEMA TESTS
// ========================================

describe("collarDbSchema - Tier 1 Database Validation", () => {
	describe("required Fields", () => {
		it("should validate when all required fields are present", () => {
			const collar = createValidCollar();
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(true);
		});

		it("should reject when loggingEventId is missing", () => {
			const collar = createValidCollar({ loggingEventId: undefined as any });
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(false);
		});

		it("should reject when organization is missing", () => {
			const collar = createValidCollar({ organization: undefined as any });
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(false);
		});

		it("should reject when dataSource is missing", () => {
			const collar = createValidCollar({ dataSource: undefined as any });
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(false);
		});
	});

	describe("gUID Validation", () => {
		it("should validate valid UUID for collarId", () => {
			const collar = createValidCollar({
				collarId: "550e8400-e29b-41d4-a716-446655440001",
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(true);
		});

		it("should reject invalid UUID format", () => {
			const collar = createValidCollar({
				collarId: "not-a-valid-uuid",
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("UUID");
			}
		});
	});

	describe("boolean Fields", () => {
		it("should accept boolean values", () => {
			const collar = createValidCollar({
				approvedInd: true,
				modelUseInd: true,
				activeInd: false,
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.approvedInd).toBe(true);
				expect(result.data.modelUseInd).toBe(true);
				expect(result.data.activeInd).toBe(false);
			}
		});

		it("should coerce numeric booleans", () => {
			const collar = createValidCollar({
				approvedInd: 1 as any,
				modelUseInd: 0 as any,
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.approvedInd).toBe(true);
				expect(result.data.modelUseInd).toBe(false);
			}
		});
	});

	describe("date Validation", () => {
		it("should accept valid ISO date strings", () => {
			const collar = createValidCollar({
				startedOnDt: new Date("2024-01-15T10:30:00Z"),
				finishedOnDt: new Date("2024-01-20T15:45:00Z"),
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(true);
		});

		it("should accept Date objects", () => {
			const collar = createValidCollar({
				startedOnDt: new Date(),
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(true);
		});
	});

	describe("depth Validation", () => {
		it("should accept valid depth values", () => {
			const collar = createValidCollar({
				startDepth: 0,
				totalDepth: 250.5,
				casingDepth: 50,
				waterTableDepth: 75.3,
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(true);
		});

		it("should reject negative depth", () => {
			const collar = createValidCollar({
				totalDepth: -10,
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("negative");
			}
		});

		it("should reject depth exceeding maximum", () => {
			const collar = createValidCollar({
				totalDepth: 4000, // > 3500m max
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("3500");
			}
		});
	});

	describe("priority Validation", () => {
		it("should accept valid priority values", () => {
			const collar = createValidCollar({
				priority: 5,
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(true);
		});

		it("should reject priority outside range", () => {
			const collar = createValidCollar({
				priority: 11, // > 10 max
			});
			const result = safeValidateCollarDb(collar);

			expect(result.success).toBe(false);
		});
	});
});

// ========================================
// TIER 2: BUSINESS SCHEMA TESTS
// ========================================

describe("collarBusinessSchema - Tier 2 Business Validation", () => {
	describe("total Depth Positive Rule", () => {
		it("should accept positive total depth", () => {
			const collar = createValidCollar({
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(true);
		});

		it("should reject zero total depth", () => {
			const collar = createValidCollar({
				totalDepth: 0,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("greater than 0");
			}
		});
	});

	describe("start Depth < Total Depth Rule", () => {
		it("should accept start depth less than total depth", () => {
			const collar = createValidCollar({
				startDepth: 10,
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(true);
		});

		it("should reject start depth greater than total depth", () => {
			const collar = createValidCollar({
				startDepth: 300,
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("Start depth must be less than total depth");
			}
		});
	});

	describe("casing Depth ≤ Total Depth Rule", () => {
		it("should accept casing depth equal to total depth", () => {
			const collar = createValidCollar({
				casingDepth: 250,
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(true);
		});

		it("should reject casing depth exceeding total depth", () => {
			const collar = createValidCollar({
				casingDepth: 300,
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("Casing depth cannot exceed total depth");
			}
		});
	});

	describe("water Table Depth ≤ Total Depth Rule", () => {
		it("should accept water table depth less than total depth", () => {
			const collar = createValidCollar({
				waterTableDepth: 75,
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(true);
		});

		it("should reject water table depth exceeding total depth", () => {
			const collar = createValidCollar({
				waterTableDepth: 300,
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("Water table depth cannot exceed total depth");
			}
		});
	});

	describe("pre-collar Depth < Total Depth Rule", () => {
		it("should accept pre-collar depth less than total depth", () => {
			const collar = createValidCollar({
				preCollarDepth: 20,
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(true);
		});

		it("should reject pre-collar depth greater than or equal to total depth", () => {
			const collar = createValidCollar({
				preCollarDepth: 250,
				totalDepth: 250,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("Pre-collar depth must be less than total depth");
			}
		});
	});

	describe("date Ordering Rule", () => {
		it("should accept start date before finish date", () => {
			const collar = createValidCollar({
				startedOnDt: new Date("2024-01-15"),
				finishedOnDt: new Date("2024-01-20"),
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(true);
		});

		it("should reject start date after finish date", () => {
			const collar = createValidCollar({
				startedOnDt: new Date("2024-01-20"),
				finishedOnDt: new Date("2024-01-15"),
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("Start date must be before finish date");
			}
		});
	});

	describe("date Reasonableness - Mining Era (after 1980)", () => {
		it("should accept dates after 1980", () => {
			const collar = createValidCollar({
				startedOnDt: new Date("2024-01-15"),
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(true);
		});

		it("should reject dates before 1980", () => {
			const collar = createValidCollar({
				startedOnDt: new Date("1975-01-15"),
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("1980");
			}
		});
	});

	describe("date Reasonableness - Not Too Future", () => {
		it("should accept dates within 7 days future", () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 5);

			const collar = createValidCollar({
				startedOnDt: futureDate,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(true);
		});

		it("should reject dates more than 7 days in future", () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 30);

			const collar = createValidCollar({
				startedOnDt: futureDate,
			});
			const result = safeValidateCollarBusiness(collar);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain("7 days");
			}
		});
	});
});

// ========================================
// APPROVAL WORKFLOW TESTS
// ========================================

describe("collar Approval Helpers", () => {
	describe("canApproveCollar", () => {
		it("should approve collar with all required fields in review status", () => {
			const collar = createValidCollar({
				rowStatus: 1, // In Review
				totalDepth: 250,
				startedOnDt: new Date("2024-01-15"),
				finishedOnDt: new Date("2024-01-20"),
			});

			const { canApprove, errors } = canApproveCollar(collar);

			expect(canApprove).toBe(true);
			expect(errors).toHaveLength(0);
		});

		it("should reject approval when not in review status", () => {
			const collar = createValidCollar({
				rowStatus: 0, // Draft
				totalDepth: 250,
			});

			const { canApprove, errors } = canApproveCollar(collar);

			expect(canApprove).toBe(false);
			expect(errors.some(e => e.includes("review status"))).toBe(true);
		});

		it("should reject approval when total depth is missing", () => {
			const collar = createValidCollar({
				rowStatus: 1, // In Review
				totalDepth: undefined,
			});

			const { canApprove, errors } = canApproveCollar(collar);

			expect(canApprove).toBe(false);
			expect(errors.some(e => e.includes("Total depth"))).toBe(true);
		});

		it("should reject approval when total depth is zero", () => {
			const collar = createValidCollar({
				rowStatus: 1, // In Review
				totalDepth: 0,
			});

			const { canApprove, errors } = canApproveCollar(collar);

			expect(canApprove).toBe(false);
		});
	});

	describe("validateCollarForReview", () => {
		it("should pass review validation with minimum required fields", () => {
			const collar = createValidCollar({
				organization: "B2Gold",
				dataSource: "Field Entry",
			});

			const result = validateCollarForReview(collar);

			expect(result.success).toBe(true);
		});

		it("should provide warnings when optional fields missing", () => {
			const collar = createValidCollar({
				organization: "B2Gold",
				dataSource: "Field Entry",
				totalDepth: undefined,
				holeType: undefined,
			});

			const result = validateCollarForReview(collar);

			expect(result.success).toBe(true);
			expect(result.warnings).toBeDefined();
			expect(result.warnings!.length).toBeGreaterThan(0);
		});

		it("should fail review when required fields missing", () => {
			const collar = createValidCollar({
				organization: undefined as any,
				dataSource: "Field Entry",
			});

			const result = validateCollarForReview(collar);

			expect(result.success).toBe(false);
			expect(result.errors).toBeDefined();
		});
	});

	describe("getCollarValidationReport", () => {
		it("should provide comprehensive validation report", () => {
			const collar = createValidCollar({
				rowStatus: 1,
				totalDepth: 250,
				startedOnDt: new Date("2024-01-15"),
				finishedOnDt: new Date("2024-01-20"),
			});

			const report = getCollarValidationReport(collar);

			expect(report.databaseValid).toBe(true);
			expect(report.businessValid).toBe(true);
			expect(report.reviewReady).toBe(true);
			expect(report.approvalReady).toBe(true);
		});

		it("should identify all validation failures", () => {
			const collar = createValidCollar({
				totalDepth: 0, // Business rule violation
				startDepth: 300, // Greater than total depth
			});

			const report = getCollarValidationReport(collar);

			expect(report.databaseValid).toBe(true); // DB schema passes
			expect(report.businessValid).toBe(false); // Business rules fail
			expect(report.businessErrors.length).toBeGreaterThan(0);
		});
	});
});

// ========================================
// VALIDATOR FUNCTION TESTS
// ========================================

describe("validator Functions", () => {
	describe("validateCollarDb", () => {
		it("should return validated data on success", () => {
			const collar = createValidCollar();

			expect(() => validateCollarDb(collar)).not.toThrow();
			const validated = validateCollarDb(collar);
			expect(validated).toBeDefined();
		});

		it("should throw on validation failure", () => {
			const collar = createValidCollar({
				organization: undefined as any,
			});

			expect(() => validateCollarDb(collar)).toThrow();
		});
	});

	describe("validateCollarBusiness", () => {
		it("should return validated data on success", () => {
			const collar = createValidCollar({
				totalDepth: 250,
			});

			expect(() => validateCollarBusiness(collar)).not.toThrow();
			const validated = validateCollarBusiness(collar);
			expect(validated).toBeDefined();
		});

		it("should throw on business rule violation", () => {
			const collar = createValidCollar({
				startDepth: 300,
				totalDepth: 250,
			});

			expect(() => validateCollarBusiness(collar)).toThrow();
		});
	});
});
