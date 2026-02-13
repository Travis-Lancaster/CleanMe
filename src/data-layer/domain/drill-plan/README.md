# DrillPlan Domain Module

Comprehensive Zod validation schemas for DrillPlan entities with geological industry standards.

## Overview

This module provides **two-tier validation** for drill plan data:

1. **Database Schema** (`drill-plan.db.schema.ts`) - Type safety and format validation
2. **Business Schema** (`drill-plan.business.schema.ts`) - Geological standards and cross-field logic

## Quick Start

```typescript
import {
	getDrillPlanValidationReport,
	validateForApproval,
	validateForReview,
	validateForSave
} from "@/data/domain/drill-plan";

// For database saves (basic validation)
const saveResult = validateForSave(drillPlanData);
if (saveResult.success) {
	await db.drillPlans.put(saveResult.data);
}

// For approval workflow (strict validation)
const approvalResult = validateForApproval(drillPlanData);
if (!approvalResult.success) {
	console.error(approvalResult.error.issues);
}

// Get comprehensive validation report
const report = getDrillPlanValidationReport(drillPlanData);
console.log({
	canSave: report.databaseValid,
	canApprove: report.approvalReady,
	warnings: report.warnings, // Geological warnings
});
```

## Validation Levels

### Level 1: Database Validation

**Purpose:** Ensure data can be safely stored in IndexedDB

**Validates:**

- ✅ Required fields are present
- ✅ Field types are correct (strings, numbers, dates)
- ✅ UUIDs are valid
- ✅ Dates are ISO 8601 format
- ✅ Numbers are within reasonable ranges
- ✅ Foreign keys are non-empty strings

**Does NOT validate:**

- ❌ Cross-field relationships
- ❌ Business logic
- ❌ Geological standards
- ❌ Foreign key existence

**Use for:** Every save, create, or update operation

```typescript
import { safeValidateDrillPlanDb, validateDrillPlanDb } from "@/data/domain/drill-plan";

// Throws on error
const validated = validateDrillPlanDb(data);

// Returns { success, data } or { success, error }
const result = safeValidateDrillPlanDb(data);
```

### Level 2: Business Validation

**Purpose:** Enforce geological industry standards and business rules

**Validates:**

- ✅ All database validations (extends DB schema)
- ✅ Coordinate completeness (all 3 or none: Easting, Northing, RL)
- ✅ Orientation completeness (both Azimuth and Dip together)
- ✅ Depth relationships (WaterTableDepth ≤ PlannedTotalDepth)
- ✅ Date relationships (PlannedStartDt < PlannedCompleteDt)
- ✅ Geological orientation standards (dip range, azimuth range)
- ✅ Mining era dates (after 1980)
- ✅ Reasonable future dates (within 2 years for planning)

**Use for:** Approval workflows, review submissions, quality checks

```typescript
import { canApproveDrillPlan, validateDrillPlanBusiness } from "@/data/domain/drill-plan";

// Check if plan can be approved
const { canApprove, errors } = canApproveDrillPlan(drillPlan);
if (!canApprove) {
	console.error("Cannot approve:", errors);
}
```

## Schema Files

### 1. `drill-plan.schema.helpers.ts`

Shared validation primitives and utilities:

- **Geological Schemas:** `AzimuthSchema`, `DipSchema`, `EastingSchema`, `NorthingSchema`, `RLSchema`
- **Common Schemas:** `GuidSchema`, `IsoDateSchema`, `DepthSchema`, `PrioritySchema`
- **Enums:** `ValidationStatusEnum`, `RowStatusEnum`
- **Utilities:** Status transitions, orientation validation, coordinate checks

### 2. `drill-plan.db.schema.ts`

Database validation schemas:

- `DrillPlanDbSchema` - Full validation
- `DrillPlanDbCreateSchema` - For new records (auto-generates IDs)
- `DrillPlanDbUpdateSchema` - For updates (partial)

### 3. `drill-plan.business.schema.ts`

Business validation schemas:

- `DrillPlanBusinessSchema` - General business rules
- `DrillPlanApprovalSchema` - Strict approval requirements
- `DrillPlanReviewSchema` - Review submission requirements

### 4. `drill-plan.fk.validation.ts`

Foreign key integrity validation:

- Async validation against IndexedDB lookup tables
- Batch validation for performance
- Configurable per-table enablement

## Validation Functions

### Database Validation

```typescript
// Throwing validators
validateDrillPlanDb(data); // Full validation
validateDrillPlanDbCreate(data); // For creation
validateDrillPlanDbUpdate(data); // For updates

// Safe validators (non-throwing)
safeValidateDrillPlanDb(data); // Returns { success, data/error }
safeValidateDrillPlanDbCreate(data);
safeValidateDrillPlanDbUpdate(data);

// Type guards
isValidDrillPlanDb(data); // Boolean check

// Partial validation
validatePartialDrillPlan(data); // Returns { valid, invalid }
```

### Business Validation

```typescript
// Throwing validators
validateDrillPlanBusiness(data);
validateDrillPlanForApproval(data);
validateDrillPlanForReview(data);

// Safe validators
safeValidateDrillPlanBusiness(data);
safeValidateDrillPlanForApproval(data);
safeValidateDrillPlanForReview(data);

// Check functions (non-throwing with detailed errors)
canApproveDrillPlan(data); // { canApprove, errors }
canSubmitForReview(data); // { canSubmit, errors }

// Validation reports
getDrillPlanValidationReport(data); // Comprehensive multi-level report
```

### Specialized Validation

```typescript
// Depth validation
validateDepthRelationships({
	PlannedTotalDepth: 500,
	WaterTableDepth: 450
});

// Date validation
validateDateRelationships({
	PlannedStartDt: "2026-03-01",
	PlannedCompleteDt: "2026-04-15"
});

// Coordinate validation
validateCoordinateCompleteness({
	PlannedEasting: 500000,
	PlannedNorthing: 6500000,
	PlannedRL: 350
});

// Orientation validation
validateOrientationCompleteness({
	PlannedAzimuth: 180,
	PlannedDip: -60
});

// Geological warnings (non-blocking)
getGeologicalWarnings({
	PlannedAzimuth: 180,
	PlannedDip: -45
});
```

## Geological Standards

### Coordinate Systems

- **Easting:** -1,000,000 to 10,000,000m (covers all UTM zones)
- **Northing:** -10,000,000 to 10,000,000m (all latitudes)
- **RL (Elevation):** -500m to 6000m (Dead Sea to highest mines)

### Drilling Orientation

- **Azimuth:** 0° to 360° (measured clockwise from North)
  - 0° = North, 90° = East, 180° = South, 270° = West
- **Dip:** -90° to 90°
  - Positive = updip (upward), Negative = downdip (downward)
  - Typical exploration: -45° to -90° (drilling down)

**Warnings issued for:**

- Positive dip (upward drilling) - unusual
- Shallow dip (< 30°) - poor target intersection
- Due North (0°/360°) - verify alignment with targets

### Depth Constraints

- **PlannedTotalDepth:** 0 to 3500m
  - Typical exploration: 50-2000m
  - Deep exploration: up to 3500m
- **WaterTableDepth:** Must not exceed PlannedTotalDepth

### Date Constraints

- **Mining Era:** All dates must be after 1980
- **Future Planning:** Dates cannot be more than 2 years in future
- **Logical Order:** PlannedStartDt < PlannedCompleteDt

### Priority Ranges

- **DrillPriority:** 1 (highest) to 10 (lowest) - Geological priority
- **ODSPriority:** 1 (highest) to 100 (lowest) - Operational scheduling priority

## Status Workflow

### Row Status Transitions

```
New Record
  ↓
Draft (0) ←──────┐
  ↓              │
In Review (1) ───┤
  ↓              │
Approved (2)     │
  ↓              │
Superseded (4)   │
                 │
Rejected (3) ────┘
```

**Valid Transitions:**

- Draft (0) → In Review (1), Rejected (3)
- In Review (1) → Draft (0), Approved (2), Rejected (3)
- Approved (2) → Superseded (4) only
- Rejected (3) → Draft (0) for rework
- Superseded (4) → No transitions (terminal)

```typescript
import { getValidNextStatuses, validateStatusTransition } from "@/data/domain/drill-plan";

// Check if transition is valid
const { valid, error } = validateStatusTransition(drillPlan, newStatus);

// Get valid next statuses
const nextStatuses = getValidNextStatuses(currentStatus);
```

## Foreign Key Validation

Validate that foreign keys reference existing records:

```typescript
import { validateCriticalForeignKeys, validateDrillPlanForeignKeys } from "@/data/domain/drill-plan";

// Validate all FKs (slower, comprehensive)
const result = await validateDrillPlanForeignKeys(drillPlan);
if (!result.isValid) {
	console.error("Invalid FKs:", result.errors);
}

// Validate only critical FKs (faster)
const criticalResult = await validateCriticalForeignKeys(drillPlan);
```

**Critical FKs:**

- DrillType
- Target
- PlannedBy
- Organization
- Project

## Error Messages

All error messages are centralized in `ErrorMessages` constant:

```typescript
import { ErrorMessages } from "@/data/domain/drill-plan";

console.log(ErrorMessages.APPROVAL_MISSING_DEPTH);
// "Cannot approve drill plan without planned total depth"
```

## TypeScript Types

All schemas have inferred TypeScript types:

```typescript
import type {
	DrillPlanApprovalInput,
	DrillPlanBusinessInput,
	DrillPlanDbCreate,
	DrillPlanDbInput,
	DrillPlanDbUpdate,
	DrillPlanReviewInput,
	RowStatus,
	ValidationStatus,
} from "@/data/domain/drill-plan";
```

## Integration Examples

### Save to Database

```typescript
import { safeValidateDrillPlanDb } from "@/data/domain/drill-plan";

const result = safeValidateDrillPlanDb(formData);
if (result.success) {
	await db.drillPlans.put(result.data);
	toast.success("Drill plan saved");
}
else {
	const errors = result.error.issues.map(e => e.message);
	toast.error(`Validation failed: ${errors.join(", ")}`);
}
```

### Approval Workflow

```typescript
import { canApproveDrillPlan, validateStatusTransition } from "@/data/domain/drill-plan";

// Check if can approve
const { canApprove, errors } = canApproveDrillPlan(drillPlan);
if (!canApprove) {
	return { success: false, errors };
}

// Validate status transition
const transition = validateStatusTransition(drillPlan, 2); // 2 = Approved
if (!transition.valid) {
	return { success: false, error: transition.error };
}

// Update status
await db.drillPlans.update(drillPlan.DrillPlanId, { RowStatus: 2 });
```

### Validation Report for UI

```typescript
import { getDrillPlanValidationReport } from "@/data/domain/drill-plan";

const report = getDrillPlanValidationReport(drillPlan);

return {
	canSave: report.databaseValid,
	canSubmitForReview: report.reviewReady,
	canApprove: report.approvalReady,
	errors: {
		database: report.databaseErrors,
		business: report.businessErrors,
	},
	warnings: report.warnings, // Geological warnings (non-blocking)
};
```

## Best Practices

1. **Always use database validation** for saves/updates
2. **Use business validation** for approval workflows
3. **Check foreign keys** before critical operations (optional, async)
4. **Review geological warnings** - they don't block but indicate unusual values
5. **Validate status transitions** before changing RowStatus
6. **Use safe validators** in user-facing code (non-throwing)
7. **Use throwing validators** in internal code where errors should propagate

## Testing

```typescript
import { describe, expect, it } from "vitest";
import { canApproveDrillPlan, validateDrillPlanDb } from "@/data/domain/drill-plan";

describe("DrillPlan Validation", () => {
	it("should validate valid drill plan", () => {
		const validPlan = {
			DrillPlanId: crypto.randomUUID(),
			DataSource: "Manual",
			DrillPriority: 1,
			ODSPriority: 10,
			// ... other required fields
		};

		expect(() => validateDrillPlanDb(validPlan)).not.toThrow();
	});

	it("should reject incomplete coordinates", () => {
		const { canApprove, errors } = canApproveDrillPlan({
			PlannedEasting: 500000,
			// Missing Northing and RL
		});

		expect(canApprove).toBe(false);
		expect(errors).toContain(expect.stringContaining("coordinates"));
	});
});
```

## Migration from Collar Schema

This module follows the same pattern as [`collar`](../collar/README.md):

- Two-tier validation (database + business)
- Foreign key validation
- Status transition management
- Comprehensive error messages
- TypeScript type inference

Geological-specific additions:

- Azimuth/Dip validation
- Coordinate system validation (Easting, Northing, RL)
- Drilling orientation warnings
- Extended priority ranges (ODS Priority)

## Contributing

When adding new validations:

1. Add primitive schemas to `drill-plan.schema.helpers.ts`
2. Add database constraints to `drill-plan.db.schema.ts`
3. Add business logic to `drill-plan.business.schema.ts`
4. Update error messages in `ErrorMessages` constant
5. Export new functions in `index.ts`
6. Update this README

## Related Documentation

- [Collar Schema](../collar/README.md) - Similar pattern for Collar entity
- [Data Contracts](../../api/database/data-contracts.ts) - TypeScript types from API
- [Zod Documentation](https://zod.dev) - Schema validation library
