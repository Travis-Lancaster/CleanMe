# Schema Helpers

Reusable validation primitives for building two-tier validation schemas on top of auto-generated table schemas.

## Overview

This module provides the building blocks for extending auto-generated Zod schemas with:
- **Type refinements** - Upgrade generic `.any()` types to specific formats (UUIDs, dates, etc.)
- **Business logic** - Cross-field validation rules
- **Validation utilities** - Helper functions for common patterns

## Architecture

```
Auto-Generated Table Schemas (Tier 1 Base)
          ↓ (extend with)
Schema Helpers (Type Refinements)
          ↓ (layer with)
Business Extensions (Tier 2)
```

## Installation

```typescript
import {
	createThrowingValidator,
	DepthSchema,
	GuidSchema,
	IsoDateSchema,
	validateDepthRelationship
} from "@/data/domain/schema-helpers";
```

## Quick Start

### Basic Extension Pattern

```typescript
import { createThrowingValidator, GuidSchema, IsoDateSchema } from "@/data/domain/schema-helpers";
// Import auto-generated schema
import { SurveyTableInsertBaseSchema } from "@/data/domain/tables/survey/schema";

// Tier 1: Refine database schema with proper types
const SurveyDbSchema = SurveyTableInsertBaseSchema.extend({
	surveyId: GuidSchema,
	collarId: GuidSchema,
	loggingEventId: GuidSchema,
	surveyedOnDt: IsoDateSchema.optional(),
	createdOnDt: IsoDateSchema,
});

// Create validator
export const validateSurveyDb = createThrowingValidator(SurveyDbSchema, "Survey");
```

### Advanced Extension with Business Rules

```typescript
import { validateDateOrdering, validateDepthRelationship } from "@/data/domain/schema-helpers";

// Tier 2: Add business validation
const SurveyBusinessSchema = SurveyDbSchema
	.refine(validateDepthRelationship, {
		message: "DepthFrom must be less than DepthTo",
		path: ["depthFrom"]
	})
	.refine(
		data => validateDateOrdering(data, "startedOnDt", "completedOnDt"),
		{
			message: "Start date must be before completion date",
			path: ["startedOnDt"]
		}
	);

export const validateSurveyBusiness = createThrowingValidator(SurveyBusinessSchema, "Survey");
```

## Module Structure

### [`primitives.ts`](./primitives.ts)

Base schemas that upgrade generic `.any()` types from auto-generated schemas.

**Available Schemas**:
- `GuidSchema` - UUID/GUID validation
- `IsoDateSchema` - ISO 8601 date validation
- `DepthSchema` - Depth in meters (0-3500m)
- `LatitudeSchema`, `LongitudeSchema` - Geographic coordinates
- `EastingSchema`, `NorthingSchema`, `RLSchema` - UTM coordinates
- `AzimuthSchema`, `DipSchema` - Orientation angles
- `PrioritySchema` - Priority levels (1-10)
- `PercentageSchema` - Percentage values (0-100)
- `BooleanSchema` - Properly typed boolean
- `HoleIdSchema` - Drill hole identifier format
- `CodeSchema`, `DescriptionSchema`, `CommentsSchema` - Text fields

**Usage**:
```typescript
import { DepthSchema, GuidSchema } from "@/data/domain/schema-helpers";

const MySchema = BaseSchema.extend({
	id: GuidSchema,
	depthFrom: DepthSchema,
	depthTo: DepthSchema,
});
```

### [`enums.ts`](./enums.ts)

Enumerated values for status fields and categorical data.

**Available Enums**:
- `RowStatusEnum` - Draft (0), In Review (1), Approved (2), Rejected (3), Superseded (4)
- `ValidationStatusEnum` - Valid (0), Warning (1), Error (2)
- `ApprovalStatusEnum` - Not Submitted (0), Pending (1), Approved (2), Rejected (3)
- `ActiveIndEnum` - Boolean active flag

**Helper Functions**:
- `isValidStatusTransition(from, to)` - Check if status transition is allowed
- `getValidNextStatuses(current)` - Get list of valid next statuses
- `canSubmitForReview(status)` - Check if can submit for review
- `canApprove(status)` - Check if can approve
- `isEditable(status)` - Check if record is editable
- `isFinal(status)` - Check if record is in final state

**Usage**:
```typescript
import { isValidStatusTransition, RowStatusNumberEnum, RowStatusValues } from "@/data/domain/schema-helpers";

const MySchema = BaseSchema.extend({
	rowStatus: RowStatusNumberEnum,
});

// Check status transition
if (isValidStatusTransition(RowStatusValues.DRAFT, RowStatusValues.IN_REVIEW)) {
	// Valid transition
}
```

### [`refinements.ts`](./refinements.ts)

Reusable cross-field validation functions using Zod's `.refine()`.

**Available Refinements**:

**Depth Validation**:
- `validateDepthRelationship` - DepthFrom < DepthTo
- `createDepthIntervalValidator(min, max)` - Interval size limits
- `validateNoDepthGaps(records)` - Continuous depth coverage
- `validateNoDepthOverlaps(records)` - No overlapping intervals

**Date Validation**:
- `validateDateOrdering(data, startField, endField)` - Start before end
- `createDateReasonablenessValidator(fieldName)` - Dates after 1980, within 7 days future
- `createPlannedDateValidator(fieldName, allowPastDays)` - Planned dates validation

**Coordinate Validation**:
- `validateCoordinateCompleteness(data, fields)` - All or none
- `validateUTMZoneConsistency(data)` - UTM reasonableness

**Orientation Validation**:
- `validateOrientationCompleteness(data)` - Azimuth and Dip together
- `validateDrillingOrientation(azimuth, dip)` - Drilling orientation warnings

**Percentage Validation**:
- `validateRecoveryPercentage(data)` - Recovery 0-100%
- `createPercentageSumValidator(fields, allowLessThan100)` - Sum validation

**Conditional Validation**:
- `validateConditionalRequirement(data, trigger, required)` - If A then B
- `validateMutuallyExclusiveFields(data, fields)` - Only one field
- `validateAtLeastOneField(data, fields)` - At least one field

**Usage**:
```typescript
import { validateDateOrdering, validateDepthRelationship } from "@/data/domain/schema-helpers";

const GeologyLogSchema = BaseSchema
	.refine(validateDepthRelationship, {
		message: "DepthFrom must be less than DepthTo",
		path: ["depthFrom"]
	})
	.refine(
		data => validateDateOrdering(data, "startedOnDt", "finishedOnDt"),
		{
			message: "Start date must be before finish date",
			path: ["startedOnDt"]
		}
	);
```

### [`validators.ts`](./validators.ts)

Utility functions for creating and using validators.

**Validator Creators**:
- `createThrowingValidator(schema, entityName)` - Throws on error
- `createSafeValidator(schema)` - Returns success/error object
- `createTypeGuard(schema)` - TypeScript type guard
- `createBatchValidator(schema, entityName)` - Batch validation
- `createPartialValidator(schema)` - Partial updates
- `createAsyncValidator(validator, entityName)` - Async validation

**Error Formatting**:
- `formatZodErrors(error)` - Human-readable string
- `formatZodErrorsToArray(error)` - Array of messages
- `formatZodErrorsByField(error)` - Object mapping fields to errors

**Result Helpers**:
- `createSuccessResult(data, warnings)` - Success result
- `createErrorResult(errors)` - Error result
- `mergeValidationResults(results)` - Combine results

**Usage**:
```typescript
import { createSafeValidator, createThrowingValidator } from "@/data/domain/schema-helpers";

// Throwing validator (for internal use)
const validateCollarDb = createThrowingValidator(CollarDbSchema, "Collar");
try {
	const validated = validateCollarDb(data);
}
catch (error) {
	console.error(error.message);
}

// Safe validator (for user-facing code)
const safeValidateCollarDb = createSafeValidator(CollarDbSchema);
const result = safeValidateCollarDb(data);
if (result.success) {
	console.log(result.data);
}
else {
	console.error(result.error);
}
```

## Common Patterns

### Pattern 1: Simple Lookup Table

For simple tables that only need type refinements:

```typescript
import { GuidSchema, IsoDateSchema } from "@/data/domain/schema-helpers";
import { CasingTableInsertBaseSchema } from "@/data/domain/tables/casing/schema";

export const CasingDbSchema = CasingTableInsertBaseSchema.extend({
	casingId: GuidSchema,
	createdOnDt: IsoDateSchema,
	modifiedOnDt: IsoDateSchema.optional(),
});
```

### Pattern 2: Entity with Business Rules

For entities that need cross-field validation:

```typescript
import {
	createDepthIntervalValidator,
	createThrowingValidator,
	DepthSchema,
	GuidSchema,
	IsoDateSchema,
	validateDepthRelationship
} from "@/data/domain/schema-helpers";
import { GeologyCombinedLogTableInsertBaseSchema } from "@/data/domain/tables/geologycombinedlog/schema";

// Tier 1: Database schema
export const GeologyLogDbSchema = GeologyCombinedLogTableInsertBaseSchema.extend({
	geologyCombinedLogId: GuidSchema,
	collarId: GuidSchema,
	loggingEventId: GuidSchema,
	depthFrom: DepthSchema,
	depthTo: DepthSchema,
	createdOnDt: IsoDateSchema,
});

// Tier 2: Business schema
const validateInterval = createDepthIntervalValidator(0.1, 50);

export const GeologyLogBusinessSchema = GeologyLogDbSchema
	.refine(validateDepthRelationship, {
		message: "DepthFrom must be less than DepthTo",
		path: ["depthFrom"]
	})
	.refine(validateInterval, {
		message: "Interval must be between 0.1m and 50m",
		path: ["depthTo"]
	});

// Validators
export const validateGeologyLogDb = createThrowingValidator(GeologyLogDbSchema, "GeologyLog");
export const validateGeologyLogBusiness = createThrowingValidator(GeologyLogBusinessSchema, "GeologyLog");
```

### Pattern 3: Approval Workflow

For entities with approval workflow:

```typescript
import {
	canApprove,
	RowStatusValues,
	validateDateOrdering
} from "@/data/domain/schema-helpers";

export function canApproveCollar(data: unknown): {
	canApprove: boolean
	errors: string[]
} {
	// Validate schema first
	const schemaResult = CollarBusinessSchema.safeParse(data);
	if (!schemaResult.success) {
		return {
			canApprove: false,
			errors: formatZodErrorsToArray(schemaResult.error)
		};
	}

	const collar = schemaResult.data;
	const errors: string[] = [];

	// Check status
	if (!canApprove(collar.rowStatus)) {
		errors.push("Collar must be in review to be approved");
	}

	// Check completeness
	if (!collar.totalDepth) {
		errors.push("Total depth is required for approval");
	}

	return {
		canApprove: errors.length === 0,
		errors
	};
}
```

## Best Practices

### 1. Always Use Type Refinements

Replace `.any()` with specific schemas:

```typescript
// ❌ Bad - uses generic .any()
const Schema = BaseSchema; // Keep collarId as .any()

// ✅ Good - refine to UUID
const Schema = BaseSchema.extend({
	collarId: GuidSchema,
	createdOnDt: IsoDateSchema,
});
```

### 2. Separate Database and Business Validation

```typescript
// Tier 1: Database (always enforce)
const DbSchema = BaseSchema.extend({ /* type refinements */ });

// Tier 2: Business (context-dependent)
const BusinessSchema = DbSchema.refine(/* business rules */);
```

### 3. Use Descriptive Error Messages

```typescript
// ❌ Bad - generic message
.refine(validateDepthRelationship, {
  message: "Invalid"
})

// ✅ Good - specific message
.refine(validateDepthRelationship, {
  message: "DepthFrom must be less than DepthTo",
  path: ["depthFrom"] // Show error on specific field
})
```

### 4. Create Reusable Validators

```typescript
// Create validators once
export const validateCollarDb = createThrowingValidator(CollarDbSchema, "Collar");
export const safeValidateCollarDb = createSafeValidator(CollarDbSchema);

// Use consistently
const validated = validateCollarDb(data);
await db.collars.put(validated);
```

### 5. Handle Optional Fields Correctly

```typescript
const Schema = BaseSchema.extend({
	requiredField: GuidSchema,
	optionalField: GuidSchema.optional(),
	nullableField: GuidSchema.nullable(),
	bothField: GuidSchema.nullable().optional(),
});
```

## Error Handling

### Throwing Validators

```typescript
import { validateCollarDb } from "./collar.business";

try {
	const validated = validateCollarDb(data);
	// Success - validated is typed
}
catch (error) {
	// ZodError with details
	console.error(error.message);
}
```

### Safe Validators

```typescript
import { safeValidateCollarDb } from "./collar.business";

const result = safeValidateCollarDb(data);
if (result.success) {
	// result.data is typed
	console.log(result.data.collarId);
}
else {
	// result.error is ZodError
	console.error(formatZodErrors(result.error));
}
```

### Batch Validation

```typescript
import { createBatchValidator } from "@/data/domain/schema-helpers";

const batchValidate = createBatchValidator(CollarDbSchema, "Collar");
const result = batchValidate(dataArray);

console.log(`Valid: ${result.validCount}, Invalid: ${result.invalidCount}`);
result.invalid.forEach(({ index, errors }) => {
	console.error(`Row ${index}:`, errors);
});
```

## Testing

### Unit Test Example

```typescript
import { describe, expect, it } from "vitest";
import { GuidSchema, validateDepthRelationship } from "@/data/domain/schema-helpers";

describe("GuidSchema", () => {
	it("should validate valid UUID", () => {
		const result = GuidSchema.safeParse("550e8400-e29b-41d4-a716-446655440000");
		expect(result.success).toBe(true);
	});

	it("should reject invalid UUID", () => {
		const result = GuidSchema.safeParse("invalid-uuid");
		expect(result.success).toBe(false);
	});
});

describe("validateDepthRelationship", () => {
	it("should pass when depthFrom < depthTo", () => {
		const result = validateDepthRelationship({ depthFrom: 10, depthTo: 20 });
		expect(result).toBe(true);
	});

	it("should fail when depthFrom >= depthTo", () => {
		const result = validateDepthRelationship({ depthFrom: 20, depthTo: 10 });
		expect(result).toBe(false);
	});
});
```

## Performance

All validations are designed for high performance:

- **Single validation**: < 1ms
- **Batch 100 records**: < 100ms
- **Type refinements**: Negligible overhead vs `.any()`

## Related Documentation

- [Implementation Roadmap](../../../../plans/implementation-roadmap.md) - Full implementation plan
- [Architecture Diagrams](../../../../plans/schema-architecture-diagram.md) - Visual architecture
- [Focused Plan](../../../../plans/FOCUSED_IMPLEMENTATION_PLAN.md) - 38 table implementation

## Version

Current version: **1.0.0**

---

**Next Steps**: Use these helpers to build extensions for the 38 critical tables.
