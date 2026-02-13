# Collar Schema Validation

Comprehensive Zod validation schemas for the Collar entity with two-tier validation: database and business rules.

## Overview

This module provides type-safe validation for collar (drill hole) data with:

- **Database Schema**: Type safety and format validation for storage
- **Business Schema**: Geological industry standards and business rules
- **Helper Utilities**: Reusable validation components and utilities

## Architecture

```
collar.schema.helpers.ts    → Shared primitives and utilities
       ↓
collar.db.schema.ts         → Database validation (always enforced)
       ↓
collar.business.schema.ts   → Business rules (context-dependent)
```

## Installation

The schemas use Zod for validation:

```bash
npm install zod
# or
pnpm add zod
```

## Quick Start

### Basic Validation

```typescript
import { validateCollarDb } from "./collar.db.schema";

try {
	const validatedCollar = validateCollarDb(userInput);
	await collarRepo.save(validatedCollar);
}
catch (error) {
	if (error instanceof z.ZodError) {
		console.error("Validation errors:", error.issues);
	}
}
```

### Safe Validation (No Throw)

```typescript
import { safeValidateCollarDb } from "./collar.db.schema";

const result = safeValidateCollarDb(userInput);

if (result.success) {
	await collarRepo.save(result.data);
}
else {
	displayErrors(result.error.issues);
}
```

## Validation Levels

### 1. Database Validation (Always Use)

**Purpose**: Ensure data can be safely stored in IndexedDB

```typescript
import {
	safeValidateCollarDb,
	validateCollarDb
} from "./collar.db.schema";

// Use for:
// - Every save/create/update operation
// - CSV/Excel imports
// - API response validation
// - Pre-sync checks
```

**Validates**:

- ✅ Required fields present (HoleId, CollarId, all FKs)
- ✅ Correct field types (string, number, boolean)
- ✅ Valid formats (UUIDs, ISO dates)
- ✅ Basic ranges (depths 0-3500m, priority 1-10)
- ✅ String length limits

**Does NOT validate**:

- ❌ Cross-field relationships
- ❌ Business logic
- ❌ Completeness for approval

### 2. Business Validation (Context-Dependent)

**Purpose**: Enforce geological standards and business rules

```typescript
import {
	canApproveCollar,
	validateCollarBusiness,
	validateCollarForApproval
} from "./collar.business.schema";

// Use for:
// - Approval workflows
// - Review submissions
// - Quality assurance
// - Report generation
```

**Validates**: All database rules PLUS:

- ✅ Depth relationships (StartDepth < TotalDepth)
- ✅ Date ordering (StartedOnDt < FinishedOnDt)
- ✅ Date reasonableness (after 1980, within 7 days future)
- ✅ Coordinate count (exactly 1 required)
- ✅ Status transitions (valid workflow)
- ✅ Approval completeness

## Common Use Cases

### 1. Create New Collar

```typescript
import { validateCollarDbCreate } from "./collar.db.schema";

async function createCollar(formData: unknown) {
	try {
		// Auto-generates CollarId, timestamps, defaults
		const collar = validateCollarDbCreate(formData);
		const id = await collarRepo.save(collar);
		return { success: true, id };
	}
	catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				errors: error.issues.map(e => `${e.path}: ${e.message}`)
			};
		}
		throw error;
	}
}
```

### 2. Update Existing Collar

```typescript
import { validateCollarDbUpdate } from "./collar.db.schema";

async function updateCollar(collarId: string, changes: unknown) {
	const result = safeValidateCollarDbUpdate({
		CollarId: collarId,
		...changes
	});

	if (!result.success) {
		throw new Error(`Invalid update: ${result.error.issues[0].message}`);
	}

	await collarRepo.update(collarId, result.data);
}
```

### 3. Approve Collar

```typescript
import { canApproveCollar } from "./collar.business.schema";

async function approveCollar(collarId: string) {
	const collar = await collarRepo.getById(collarId);

	const check = canApproveCollar(collar);
	if (!check.canApprove) {
		return {
			success: false,
			errors: check.errors
		};
	}

	await collarRepo.update(collarId, {
		ApprovedInd: true,
		RowStatus: 2 // Approved
	});

	return { success: true };
}
```

### 4. Submit for Review

```typescript
import { canSubmitForReview } from "./collar.business.schema";

async function submitForReview(collarId: string) {
	const collar = await collarRepo.getById(collarId);

	const check = canSubmitForReview(collar);
	if (!check.canSubmit) {
		throw new Error(`Cannot submit: ${check.errors.join(", ")}`);
	}

	await collarRepo.update(collarId, { RowStatus: 1 }); // In Review
}
```

### 5. Batch Import with Validation

```typescript
import { safeValidateCollarDb } from "./collar.db.schema";

async function importCollars(csvData: unknown[]) {
	const results = {
		success: [] as string[],
		failed: [] as { row: unknown, errors: string[] }[]
	};

	for (const row of csvData) {
		const result = safeValidateCollarDb(row);

		if (result.success) {
			try {
				const id = await collarRepo.save(result.data);
				results.success.push(id);
			}
			catch (error) {
				results.failed.push({
					row,
					errors: [`Save failed: ${error.message}`]
				});
			}
		}
		else {
			results.failed.push({
				row,
				errors: result.error.issues.map(e => `${e.path}: ${e.message}`)
			});
		}
	}

	return results;
}
```

### 6. Real-Time Form Validation

```typescript
import { validateDepthRelationships } from "./collar.business.schema";
import { safeValidateCollarDb } from "./collar.db.schema";

function useCollarForm() {
	const onFieldChange = (field: string, value: unknown) => {
		// Validate individual field
		const fieldResult = CollarDbSchema.shape[field]?.safeParse(value);
		if (!fieldResult.success) {
			setFieldError(field, fieldResult.error.issues[0].message);
		}

		// Validate depth relationships
		if (["StartDepth", "TotalDepth", "CasingDepth"].includes(field)) {
			const depthErrors = validateDepthRelationships(formData);
			setDepthErrors(depthErrors);
		}
	};

	const onSubmit = async () => {
		const result = safeValidateCollarDb(formData);
		if (!result.success) {
			displayErrors(result.error.issues);
			return;
		}
		await save(result.data);
	};

	return { onFieldChange, onSubmit };
}
```

## Geological Standards Enforced

### Hole Naming Convention

```typescript
// Valid formats:
"FEB24-001"     ✅
"MAL-RC-123"    ✅
"OTJ-DD-045"    ✅

// Invalid formats:
"feb24-001"     ❌ Must be uppercase
"FEB 24 001"    ❌ Spaces not allowed
"X"             ❌ Too short (min 2 chars)
```

### Depth Constraints (Meters)

| Field | Min | Max | Typical | Notes |
|-------|-----|-----|---------|-------|
| TotalDepth | 1 | 3500 | 50-2000 | Must be positive |
| StartDepth | 0 | TotalDepth | 0 | Usually 0 for surface |
| CasingDepth | 0 | TotalDepth | 20-30 | If used |
| WaterTableDepth | 0 | TotalDepth | Variable | If measured |
| PreCollarDepth | 0 | TotalDepth | 0-50 | If exists |

### Depth Relationships

```typescript
// All these must be true:
StartDepth < TotalDepth
CasingDepth ≤ TotalDepth
WaterTableDepth ≤ TotalDepth
PreCollarDepth < TotalDepth
```

### Date Constraints

```typescript
// Valid date ranges:
StartedOnDt >= "1980-01-01"           // Mining era
FinishedOnDt <= (today + 7 days)      // Reasonable future
StartedOnDt < FinishedOnDt            // Logical order
CreatedOnDt ≤ ModifiedOnDt            // Audit trail
```

### Status Workflow

```
Draft (0)
  ↓
In Review (1)
  ↓
Approved (2)
  ↓
Superseded (4)

Rejected (3) → back to Draft (0) for rework
```

```typescript
import { getValidNextStatuses, isValidStatusTransition } from "./collar.schema.helpers";

// Check if transition is valid
isValidStatusTransition(0, 1); // Draft → In Review: true
isValidStatusTransition(2, 0); // Approved → Draft: false

// Get valid next statuses
getValidNextStatuses(0); // [1, 3] (In Review or Rejected)
getValidNextStatuses(2); // [4] (Superseded only)
```

### Coordinate Requirements

```typescript
// Business schema enforces exactly 1 coordinate
collarCoordinates: [{
	Easting: 525000,
	Northing: 8850000,
	Elevation: 1200,
	Grid: "WGS84 UTM Zone 32N"
}];
```

## Helper Functions

### Status Validation

```typescript
import {
	getValidNextStatuses,
	isEditable,
	isTerminalStatus,
	isValidStatusTransition
} from "./collar.schema.helpers";

// Check valid transitions
isValidStatusTransition(0, 1); // true
isValidStatusTransition(2, 0); // false

// Get valid next statuses
getValidNextStatuses(0); // [1, 3]

// Check if can edit
isTerminalStatus(2); // true (Approved)
isEditable(0); // true (Draft)
```

### Error Formatting

```typescript
import {
	formatValidationErrors,
	groupValidationErrors
} from "./collar.schema.helpers";

const result = safeValidateCollarDb(data);
if (!result.success) {
	// Get flat list
	const errors = formatValidationErrors(result.error);
	// ["HoleId: Hole ID is required", "TotalDepth: Must be positive"]

	// Get grouped by field
	const grouped = groupValidationErrors(result.error);
	// { HoleId: ["Hole ID is required"], TotalDepth: ["Must be positive"] }
}
```

### Validation Reports

```typescript
import { getCollarValidationReport } from "./collar.business.schema";

const report = getCollarValidationReport(collar);

console.log("Database valid:", report.databaseValid);
console.log("Business valid:", report.businessValid);
console.log("Approval ready:", report.approvalReady);
console.log("Review ready:", report.reviewReady);

if (!report.approvalReady) {
	console.log("Approval blockers:", report.approvalErrors);
}
```

### Focused Validations

```typescript
import {
	validateDateRelationships,
	validateDepthRelationships
} from "./collar.business.schema";

// Check just depths
const depthErrors = validateDepthRelationships({
	StartDepth: 0,
	TotalDepth: 250,
	CasingDepth: 30
});

// Check just dates
const dateErrors = validateDateRelationships({
	StartedOnDt: "2024-01-15T08:00:00Z",
	FinishedOnDt: "2024-01-20T16:00:00Z"
});
```

## Type Safety

All validation functions return fully typed data:

```typescript
import type {
	CollarApprovalInput,
	CollarBusinessInput,
	CollarReviewInput
} from "./collar.business.schema";

import type {
	CollarDbCreate,
	CollarDbInput,
	CollarDbUpdate
} from "./collar.db.schema";

// TypeScript knows the shape of validated data
const collar: CollarDbInput = validateCollarDb(data);
const forApproval: CollarApprovalInput = validateCollarForApproval(data);
```

## Error Handling

### User-Friendly Messages

```typescript
// Before: "Expected string, received undefined"
// After:  "Hole ID is required"

// Before: "Number must be greater than 0"
// After:  "Total depth must be at least 1 meter"
```

### Structured Errors

```typescript
try {
	validateCollarDb(data);
}
catch (error) {
	if (error instanceof z.ZodError) {
		error.issues.forEach((err) => {
			console.log({
				field: err.path.join("."),
				message: err.message,
				code: err.code
			});
		});
	}
}
```

## Performance

- **Single validation**: < 1ms
- **Batch 100 records**: < 100ms
- **Import 1000 records**: < 1 second

Validation is fast and suitable for real-time form validation.

## Testing

```typescript
import { describe, expect, it } from "vitest";
import { safeValidateCollarDb, validateCollarDb } from "./collar.db.schema";

describe("Collar Database Validation", () => {
	it("should validate valid collar", () => {
		const validCollar = {
			HoleId: "FEB24-001",
			CollarId: "123e4567-e89b-12d3-a456-426614174000",
			ApprovedInd: false,
			// ... all required fields
		};

		expect(() => validateCollarDb(validCollar)).not.toThrow();
	});

	it("should reject invalid Hole ID", () => {
		const invalid = { HoleId: "invalid", /* ... */ };
		const result = safeValidateCollarDb(invalid);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].path[0]).toBe("HoleId");
		}
	});
});
```

## Best Practices

### 1. Always Validate Before Save

```typescript
// ✅ Good
const validated = validateCollarDb(data);
await collarRepo.save(validated);

// ❌ Bad
await collarRepo.save(data); // No validation!
```

### 2. Use Safe Validation for User Input

```typescript
// ✅ Good - Don't throw to user
const result = safeValidateCollarDb(userInput);
if (!result.success) {
	showErrors(result.error.issues);
	return;
}

// ❌ Bad - Throwing to user
try {
	validateCollarDb(userInput); // Will throw!
}
catch (error) {
	showErrors(error); // Uncaught exception!
}
```

### 3. Use Business Validation for Workflows

```typescript
// ✅ Good - Check can approve
const check = canApproveCollar(collar);
if (!check.canApprove) {
	return { errors: check.errors };
}

// ❌ Bad - Just approve without checking
await approve(collar); // May fail business rules!
```

### 4. Validate Status Transitions

```typescript
// ✅ Good
const transition = validateStatusTransition(collar, newStatus);
if (!transition.valid) {
	throw new Error(transition.error);
}

// ❌ Bad
collar.RowStatus = newStatus; // Invalid transition!
```

## Troubleshooting

### Common Issues

**Issue**: "Hole ID must be uppercase alphanumeric"

```typescript
// ❌ Wrong
HoleId: "feb24-001";

// ✅ Correct
HoleId: "FEB24-001";
```

**Issue**: "Start depth must be less than total depth"

```typescript
// ❌ Wrong
{ StartDepth: 300, TotalDepth: 250 }

// ✅ Correct
{ StartDepth: 0, TotalDepth: 250 }
```

**Issue**: "Exactly one coordinate is required"

```typescript
// ❌ Wrong
collarCoordinates: []

// ✅ Correct
collarCoordinates: [{ Easting: 525000, Northing: 8850000, ... }]
```

## Migration Guide

### Existing Code

```typescript
// Before (no validation)
await db.collars.put(collar);

// After (with validation)
const validated = validateCollarDb(collar);
await db.collars.put(validated);
```

### Gradual Adoption

1. Start with database validation on saves
2. Add business validation to approval workflows
3. Enforce on all new features
4. Retrofit existing code progressively

## Related Files

- [`collar.schema.helpers.ts`](./collar.schema.helpers.ts) - Shared validation primitives
- [`collar.db.schema.ts`](./collar.db.schema.ts) - Database validation
- [`collar.business.schema.ts`](./collar.business.schema.ts) - Business validation
- [`collar.repo.ts`](./collar.repo.ts) - Repository with validation integration

## Further Reading

- [Zod Documentation](https://zod.dev)
- [Geological Standards](../../../plans/collar-zod-schema-architecture.md)
- [Architecture Diagrams](../../../plans/collar-zod-schema-diagram.md)
- [Implementation Specs](../../../plans/collar-zod-schema-specifications.md)

---

**Need Help?** Check the planning documents in [`plans/`](../../../plans/) for detailed architecture and specifications.
