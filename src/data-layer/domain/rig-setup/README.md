# RigSetup Domain Module

Data layer for RigSetup entity with cache-aside pattern and two-tier validation.

## Overview

This module provides:

- **Repository**: Pure Dexie data access abstraction
- **Service**: Cache-aside pattern with API fallback
- **Schemas**: Two-tier validation (Database + Business)
- **Types**: TypeScript type definitions

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                 DATA LAYER                           │
├─────────────────────────────────────────────────────┤
│  IndexedDB (Dexie)                                  │
│  ├─ Single source of truth                         │
│  ├─ Survives page refresh                          │
│  ├─ Offline-first storage                          │
│  └─ Watched by LiveQuery                           │
│                                                      │
│  Repository (rig-setup.repo.ts)                     │
│  ├─ Abstracts Dexie queries                        │
│  ├─ No business logic                              │
│  └─ Pure data access                               │
│                                                      │
│  Service (rig-setup.service.ts)                     │
│  ├─ Cache-aside pattern                            │
│  ├─ Checks Dexie first                             │
│  ├─ Fetches from API if needed                     │
│  └─ Updates cache                                  │
└─────────────────────────────────────────────────────┘
```

## Quick Start

### Fetch Data (Cache-Aside)

```typescript
import { rigSetupService } from "@/data/domain/rig-setup";

// Automatically checks cache, fetches from API if needed
const rigSetup = await rigSetupService.fetchById(id);
```

### Query Data (Direct)

```typescript
import { rigSetupRepo } from "@/data/domain/rig-setup";

// Direct Dexie access
const rigSetup = await rigSetupRepo.getById(id);
const all = await rigSetupRepo.getAll();
```

### Validate Data

```typescript
import {
	canSubmitForReview,
	safeValidateRigSetupBusiness,
	validateRigSetupDb
} from "@/data/domain/rig-setup";

// Database validation (BLOCKING)
const validated = validateRigSetupDb(data);

// Business validation (NON-BLOCKING)
const result = safeValidateRigSetupBusiness(data);

// Workflow checks
const { canSubmit, errors } = canSubmitForReview(data);
```

## Validation

### Level 1: Database Validation (BLOCKING)

**Purpose**: Ensure data can be safely stored in IndexedDB

**Validates**:
- ✅ Required fields are present
- ✅ Field types are correct
- ✅ UUIDs are valid
- ✅ Dates are ISO 8601 format
- ✅ Numbers are within ranges
- ✅ Foreign keys are non-empty

**Use for**: Every save, create, or update operation

```typescript
import { validateRigSetupDb } from "@/data/domain/rig-setup";

// Throws on error
const validated = validateRigSetupDb(data);

// Returns { success, data } or { success, error }
const result = safeValidateRigSetupDb(data);
```

### Level 2: Business Validation (NON-BLOCKING)

**Purpose**: Enforce business rules and best practices

**Validates**:
- ✅ All database validations (extends DB schema)
- ✅ Cross-field relationships (signature requires person)
- ✅ Reasonable value ranges (azimuth 0-360)
- ✅ Business logic rules

**Use for**: Approval workflows, review submissions, quality checks

```typescript
import { safeValidateRigSetupBusiness } from "@/data/domain/rig-setup";

// Check if plan can be submitted
const { canSubmit, errors } = canSubmitForReview(data);
if (!canSubmit) {
	console.error("Cannot submit:", errors);
}
```

## API Reference

### Repository Methods

```typescript
// Get single record
async getById(id: string): Promise<RigSetup | undefined>
async getByDrillPlanId(drillPlanId: string): Promise<RigSetup | undefined>

// Get multiple records
async getAll(): Promise<RigSetup[]>
async getPaginated(options): Promise<{ data: RigSetup[]; total: number }>
async search(query: string): Promise<RigSetup[]>

// Mutations
async save(data: RigSetup): Promise<string>
async delete(id: string): Promise<void>
async bulkCreate(items: RigSetup[]): Promise<void>

// Analytics
async getCountByStatus(): Promise<Record<number, number>>
```

### Service Methods

```typescript
// Cache-aside pattern
async fetchById(id: string): Promise<RigSetup | null>
async fetchSSRM(params): Promise<{ rows: RigSetup[]; lastRow: number }>
async fetchAllLocal(): Promise<RigSetup[]>

// Mutations
async save(data: RigSetup): Promise<void>
async delete(id: string): Promise<void>
```

### Validation Functions

```typescript
// Database validation
validateRigSetupDb(data: unknown): RigSetupDb
safeValidateRigSetupDb(data: unknown): SafeParseResult
isValidRigSetupDb(data: unknown): boolean

// Business validation
validateRigSetupBusiness(data: unknown): RigSetupBusiness
safeValidateRigSetupBusiness(data: unknown): SafeParseResult

// Workflow checks
canSubmitForReview(data: unknown): { canSubmit: boolean; errors: string[] }
canApproveRigSetup(data: unknown): { canApprove: boolean; errors: string[] }
getRigSetupValidationReport(data: unknown): ValidationReport
```

## Data Flow Example

### Save Operation

```typescript
// 1. User submits form
const formData = { /* ... */ };

// 2. Validate (Tier 1 - BLOCKING)
const dbResult = safeValidateRigSetupDb(formData);
if (!dbResult.success) {
	// Show error - block save
	return;
}

// 3. Validate (Tier 2 - NON-BLOCKING)
const businessResult = safeValidateRigSetupBusiness(formData);
if (!businessResult.success) {
	// Show warning - allow save
	formData.ValidationStatus = 2;
}

// 4. Save to Dexie (optimistic update)
await rigSetupService.save(formData);

// 5. dexie-syncable handles API sync automatically
// No manual sync code needed!

// 6. useLiveQuery detects change
// Form updates automatically
```

## Testing

### Unit Tests

```typescript
import { describe, expect, it } from "vitest";
import { canSubmitForReview, validateRigSetupDb } from "./rig-setup.db.schema";

describe("RigSetup Validation", () => {
	it("should validate complete rig setup", () => {
		const valid = {
			RigSetupId: crypto.randomUUID(),
			Organization: "ORG001",
			FinalMagAzimuth: 180,
			CreatedOnDt: new Date().toISOString(),
		};

		expect(() => validateRigSetupDb(valid)).not.toThrow();
	});

	it("should reject invalid azimuth", () => {
		const invalid = { FinalMagAzimuth: 400 };
		expect(() => validateRigSetupDb(invalid)).toThrow();
	});
});
```

## Related Files

- **Feature Layer**: `src/ux/features/rig-setup/`
- **Database Schema**: `src/data/db/schema.ts` (DrillHole_RigSetup table)
- **API Client**: `src/data/services/apiClient.ts`
- **Dexie Connection**: `src/data/db/connection.ts`

## Migration Status

✅ **Implemented**: 2026-02-09
✅ **Compliance**: 100% aligned with Feature Blueprint v2
✅ **Testing**: Ready for integration testing

---

**Module Version**: 1.0
**Last Updated**: 2026-02-09
**Maintainer**: Architecture Team
