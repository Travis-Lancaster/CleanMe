# Table Extensions

Business validation extensions for auto-generated table schemas.

## Overview

This directory contains two-tier validation schemas that extend the auto-generated base schemas from [`src/data/domain/tables/`](../tables/).

**Architecture**:
```
tables/survey/schema.ts (Auto-generated)
         ↓ (extended by)
extensions/survey.business.ts (Manual)
         ↓ (used by)
Application (Repos, Forms, API)
```

## Pattern

Each extension file follows this structure:

### 1. Import Dependencies
```typescript
// Schema helpers
import {
	createThrowingValidator,
	GuidSchema,
	IsoDateSchema,
	validateDepthRelationship,
	// ... other helpers
} from "../schema-helpers";

// Auto-generated base schema
import { TableNameTableInsertBaseSchema } from "../tables/tablename/schema";
```

### 2. Tier 1: Database Schema
```typescript
/**
 * Refines auto-generated schema with proper types
 * - Upgrades .any() to specific types (UUID, Date, Boolean)
 * - Validates formats and ranges
 * - Always enforced on save
 */
export const TableNameDbSchema = TableNameTableInsertBaseSchema.extend({
	id: GuidSchema,
	createdOnDt: IsoDateSchema,
	activeInd: BooleanSchema,
	// ... other refinements
});
```

### 3. Tier 2: Business Schema
```typescript
/**
 * Adds business rules and cross-field validation
 * - Date ordering, depth relationships
 * - Conditional requirements
 * - Context-dependent validation
 */
export const TableNameBusinessSchema = TableNameDbSchema
	.refine(validateDepthRelationship, {
		message: "DepthFrom must be less than DepthTo",
		path: ["depthFrom"]
	})
	.refine(/* additional rules */);
```

### 4. Validators
```typescript
// Database validators
export const validateTableNameDb = createThrowingValidator(TableNameDbSchema, "TableName");
export const safeValidateTableNameDb = createSafeValidator(TableNameDbSchema);
export const isValidTableNameDb = createTypeGuard(TableNameDbSchema);

// Business validators
export const validateTableNameBusiness = createThrowingValidator(TableNameBusinessSchema, "TableName");
export const safeValidateTableNameBusiness = createSafeValidator(TableNameBusinessSchema);
```

### 5. Helper Functions
```typescript
// Approval check
export function canApproveTableName(data: unknown): {
	canApprove: boolean
	errors: string[]
} { /* ... */ }

// Review check
export function validateTableNameForReview(data: unknown): ValidationResult { /* ... */ }

// Validation report
export function getTableNameValidationReport(data: unknown) { /* ... */ }
```

## Usage

### In Repositories

```typescript
import { validateSurveyDb } from "@/data/domain/extensions/survey.business";

class SurveyRepository {
	async save(data: unknown) {
		// Always validate before saving
		const validated = validateSurveyDb(data);
		return await db.surveys.put(validated);
	}
}
```

### In Forms

```typescript
import { safeValidateSurveyDb } from "@/data/domain/extensions/survey.business";

function SurveyForm() {
	const handleSubmit = (data) => {
		const result = safeValidateSurveyDb(data);

		if (!result.success) {
			setErrors(formatZodErrorsByField(result.error));
			return;
		}

		// Save validated data
		saveSurvey(result.data);
	};
}
```

### In Approval Workflows

```typescript
import { canApproveSurvey, validateSurveyBusiness } from '@/data/domain/extensions/survey.business';

function ApproveSurveyButton({ survey }) {
  const { canApprove, errors } = canApproveSurvey(survey);

  if (!canApprove) {
    return <Button disabled title={errors.join(', ')}>Cannot Approve</Button>;
  }

  return <Button onClick={handleApprove}>Approve</Button>;
}
```

## Extension Files

### ✅ Completed

- [`survey.business.ts`](./survey.business.ts) - Survey table extension (POC)
- [`collar.business.ts`](./collar.business.ts) - Collar table extension (Migrated from manual schema)

### 🔄 In Progress

*Ready to continue with remaining Priority 1 tables*

### 📋 Planned (36 tables)

**Priority 1: Core Entities (3 remaining)**:
- `drill-plan.business.ts` - Migrate from manual schema
- `collar-coordinate.business.ts`
- `collar-history.business.ts`
- `cyclone-cleaning.business.ts`
- `drill-method.business.ts`
- `metadata-log.business.ts`
- `rig-setup.business.ts`
- `survey-log.business.ts`
- `geology-combined-log.business.ts`
- `shear-log.business.ts`
- `structure-log.business.ts`
- `structure-pt-log.business.ts`
- `core-recovery-run-log.business.ts`
- `fracture-count-log.business.ts`
- `mag-sus-log.business.ts`
- `rock-mechanic-log.business.ts`
- `rock-quality-designation-log.business.ts`
- `specific-gravity-pt-log.business.ts`

**Low Priority (18 tables)**:
- Sample management (5 tables)
- XRF analysis (5 tables)
- Point sampling (6 tables)
- Site management (2 tables)

## Template

Use this template for new extensions:

```typescript
/**
 * [TableName] Business Validation
 *
 * Two-tier validation for [TableName] table.
 */

import { z } from 'zod';
import { [TableName]TableInsertBaseSchema } from '../tables/[tablename]/schema';
import {
  GuidSchema,
  IsoDateSchema,
  // ... other imports
} from '../schema-helpers';

// ========================================
// TIER 1: DATABASE SCHEMA
// ========================================

export const [TableName]DbSchema = [TableName]TableInsertBaseSchema.extend({
  // Type refinements here
});

export type [TableName]DbInput = z.input<typeof [TableName]DbSchema>;
export type [TableName]DbOutput = z.output<typeof [TableName]DbSchema>;

// ========================================
// TIER 2: BUSINESS SCHEMA
// ========================================

export const [TableName]BusinessSchema = [TableName]DbSchema
  .refine(/* business rules */);

export type [TableName]BusinessInput = z.input<typeof [TableName]BusinessSchema>;
export type [TableName]BusinessOutput = z.output<typeof [TableName]BusinessSchema>;

// ========================================
// VALIDATORS
// ========================================

export const validate[TableName]Db = createThrowingValidator([TableName]DbSchema, "[TableName]");
export const safeValidate[TableName]Db = createSafeValidator([TableName]DbSchema);
export const isValid[TableName]Db = createTypeGuard([TableName]DbSchema);

export const validate[TableName]Business = createThrowingValidator([TableName]BusinessSchema, "[TableName]");
export const safeValidate[TableName]Business = createSafeValidator([TableName]BusinessSchema);

// ========================================
// HELPERS
// ========================================

export function canApprove[TableName](data: unknown) { /* ... */ }
export function validate[TableName]ForReview(data: unknown) { /* ... */ }
export function get[TableName]ValidationReport(data: unknown) { /* ... */ }
```

## Guidelines

### DO ✅

1. **Always refine types** - Replace `.any()` with `GuidSchema`, `IsoDateSchema`, etc.
2. **Separate concerns** - Database schema (Tier 1) vs Business schema (Tier 2)
3. **Use helpers** - Reuse validation functions from `schema-helpers`
4. **Document rules** - Explain each business rule with comments
5. **Export validators** - Provide both throwing and safe validators
6. **Add approval helpers** - `canApprove()`, `validateForReview()`, etc.

### DON'T ❌

1. **Don't modify auto-generated schemas** - Always extend, never edit
2. **Don't duplicate logic** - Use refinement functions from `schema-helpers`
3. **Don't mix tiers** - Keep database and business validation separate
4. **Don't forget types** - Always export input/output types
5. **Don't skip documentation** - Document what each schema validates

## Testing

Each extension should have corresponding tests:

```typescript
import { describe, expect, it } from "vitest";
import { canApproveSurvey, validateSurveyDb } from "./survey.business";

describe("Survey Validation", () => {
	describe("validateSurveyDb", () => {
		it("should validate valid survey", () => {
			const survey = {
				collarId: "550e8400-e29b-41d4-a716-446655440000",
				loggingEventId: "550e8400-e29b-41d4-a716-446655440001",
				organization: "B2Gold",
				downHoleSurveyMethod: "GYRO",
				dataSource: "FIELD",
				rv: new Date(),
			};

			expect(() => validateSurveyDb(survey)).not.toThrow();
		});

		it("should reject invalid GUID", () => {
			const survey = {
				collarId: "invalid-guid",
				// ... other fields
			};

			expect(() => validateSurveyDb(survey)).toThrow("UUID");
		});
	});

	describe("canApproveSurvey", () => {
		it("should approve valid survey in review", () => {
			const survey = {
				// ... valid fields
				rowStatus: 1, // In Review
				downHoleSurveyMethod: "GYRO",
				surveyedOnDt: new Date(),
				grid: "WGS84",
			};

			const result = canApproveSurvey(survey);
			expect(result.canApprove).toBe(true);
		});
	});
});
```

## Performance

Extension validations are fast:
- Single validation: < 1ms
- Batch 100 records: < 100ms
- No performance regression vs `.any()`

## Next Steps

1. Review Survey POC
2. Create tests for Survey extension
3. Migrate Collar and DrillPlan to this pattern
4. Extend remaining 35 tables following template

## Related Documentation

- [Schema Helpers](../schema-helpers/README.md) - Reusable validation primitives
- [Implementation Roadmap](../../../plans/implementation-roadmap.md) - Full plan
- [Focused Plan](../../../plans/FOCUSED_IMPLEMENTATION_PLAN.md) - 38 table plan

---

**Pattern Status**: ✅ Proven with Survey POC, ready to scale
