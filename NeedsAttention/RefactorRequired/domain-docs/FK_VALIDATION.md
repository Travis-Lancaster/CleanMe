# Foreign Key Validation Guide

## Overview

The foreign key validation module validates that collar foreign keys reference existing records in lookup tables. This is an **optional** layer of validation that complements the basic schema validation.

## Key Concepts

### Two-Level FK Validation

1. **Format Validation** (Always Active)
   - Validates FK fields are strings
   - Checks they're non-empty
   - Part of [`collar.db.schema.ts`](./collar.db.schema.ts)

2. **Existence Validation** (Optional, Async)
   - Validates FK references exist in lookup tables
   - Requires lookup tables in IndexedDB
   - Part of [`collar.fk.validation.ts`](./collar.fk.validation.ts)

## When to Use FK Validation

✅ **Use FK validation when**:

- Lookup tables are synced to IndexedDB
- You need to enforce referential integrity
- Users can select from dropdowns (valid options only)
- Data quality is critical

❌ **Don't use FK validation when**:

- Lookup tables haven't been synced yet
- Working with partial/draft data
- Performance is critical (batch operations)
- Offline mode with limited data

## Setup

### Step 1: Ensure Lookup Tables in IndexedDB

First, add lookup tables to your Dexie schema:

```typescript
// In src/data/db/schema.ts
export class B2GoldOfflineDBv2 extends Dexie {
 collars!: Table<Collar, string>;

 // Add lookup tables
 collarTypes!: Table<CollarType, string>;
 companies!: Table<Company, string>;
 holePurposes!: Table<HolePurpose, string>;
 holeStatuses!: Table<HoleStatus, string>;
 holeTypes!: Table<HoleType, string>;
 organizations!: Table<Organization, string>;
 phases!: Table<Phase, string>;
 pits!: Table<Pit, string>;
 projects!: Table<Project, string>;
 prospects!: Table<Prospect, string>;
 persons!: Table<Person, string>;
 sections!: Table<Section, string>;
 subTargets!: Table<SubTarget, string>;
 targets!: Table<Target, string>;
 tenements!: Table<Tenement, string>;
 // ... other tables

 constructor() {
  super("B2GoldOfflineDBv2");

  this.version(2).stores({
   // Existing tables
   collars: "$$CollarId, ...",

   // Add lookup tables
   collarTypes: "$$CollarTypeId, Code",
   companies: "$$CompanyId, Code",
   holePurposes: "$$HolePurposeId, Code",
   // ... etc
  });
 }
}
```

### Step 2: Configure FK Mappings

Update the FK mappings in [`collar.fk.validation.ts`](./collar.fk.validation.ts):

```typescript
// In collar.fk.validation.ts, line ~60
const foreignKeyMappings: Array<{
 field: keyof Collar
 table: string
 displayName: string
}> = [
 { field: "CollarType", table: "collarTypes", displayName: "Collar Type" },
 { field: "ExplorationCompany", table: "companies", displayName: "Exploration Company" },
 { field: "HolePurpose", table: "holePurposes", displayName: "Hole Purpose" },
 { field: "HoleStatus", table: "holeStatuses", displayName: "Hole Status" },
 { field: "HoleType", table: "holeTypes", displayName: "Hole Type" },
 { field: "Organization", table: "organizations", displayName: "Organization" },
 { field: "Phase", table: "phases", displayName: "Phase" },
 { field: "Pit", table: "pits", displayName: "Pit" },
 { field: "Project", table: "projects", displayName: "Project" },
 { field: "Prospect", table: "prospects", displayName: "Prospect" },
 { field: "ResponsiblePerson", table: "persons", displayName: "Responsible Person" },
 { field: "ResponsiblePerson2", table: "persons", displayName: "Responsible Person 2" },
 { field: "Section", table: "sections", displayName: "Section" },
 { field: "SubTarget", table: "subTargets", displayName: "Sub Target" },
 { field: "Target", table: "targets", displayName: "Target" },
 { field: "Tenement", table: "tenements", displayName: "Tenement" },
];
```

### Step 3: Enable FK Validation

Enable FK validation after lookup tables are synced:

```typescript
import { enableFKValidation, enableTableValidation } from "@/data/domain/collar";

// After syncing lookup tables
await syncLookupTables();

// Enable FK validation globally
enableFKValidation();

// Or enable per table as they're ready
enableTableValidation("projects");
enableTableValidation("phases");
enableTableValidation("collarTypes");
```

## Usage

### Basic Validation

```typescript
import { validateCollarForeignKeys } from "@/data/domain/collar";

const collar = {
 HoleId: "FEB24-001",
 CollarId: "...",
 Project: "project-guid-123",
 Phase: "phase-guid-456",
 // ... other fields
};

// Validate all FKs
const result = await validateCollarForeignKeys(collar);

if (!result.isValid) {
 console.error("Invalid foreign keys:", result.errors);
 // [
 //   { field: 'Project', value: 'project-guid-123', message: 'Project references non-existent record' }
 // ]
}
```

### Validate Specific FKs

```typescript
import { validateSpecificForeignKeys } from "@/data/domain/collar";

// Only validate specific fields
const result = await validateSpecificForeignKeys(collar, ["Project", "Phase", "Prospect"]);

if (!result.isValid) {
 console.log("Invalid fields:", getInvalidForeignKeys(result));
 // ['Project', 'Phase']
}
```

### Single FK Check

```typescript
import { isForeignKeyValid } from "@/data/domain/collar";

// Quick check for one FK
const isValid = await isForeignKeyValid("projects", projectId);

if (!isValid) {
 alert("Selected project does not exist");
}
```

### Batch Validation

```typescript
import { batchValidateForeignKeys } from "@/data/domain/collar";

// Validate multiple FKs efficiently
const projectIds = [id1, id2, id3, id4];
const results = await batchValidateForeignKeys("projects", projectIds);

projectIds.forEach((id) => {
 if (!results.get(id)) {
  console.error(`Invalid project: ${id}`);
 }
});
```

## Integration Patterns

### Pattern 1: Pre-Save Validation

```typescript
import {
 FKValidationConfig,
 validateCollarDb,
 validateCollarForeignKeys
} from "@/data/domain/collar";

async function saveCollar(collar: Collar) {
 // Always validate schema
 const validated = validateCollarDb(collar);

 // Validate FKs if enabled
 if (FKValidationConfig.enabled) {
  const fkResult = await validateCollarForeignKeys(validated);
  if (!fkResult.isValid) {
   throw new Error(`Invalid foreign keys:\n${formatForeignKeyErrors(fkResult).join("\n")}`);
  }
 }

 await collarRepo.save(validated);
}
```

### Pattern 2: Form Validation

```typescript
import { useCollarForm } from '@/data/domain/collar';
import { validateSpecificForeignKeys } from '@/data/domain/collar';

function CollarForm() {
  const { formData, errors, handleChange } = useCollarForm();
  const [fkErrors, setFkErrors] = useState<Record<string, string>>({});

  const handleProjectChange = async (projectId: string) => {
    handleChange('Project', projectId);

    // Validate FK exists
    const result = await validateSpecificForeignKeys(
      { ...formData, Project: projectId },
      ['Project']
    );

    if (!result.isValid) {
      setFkErrors({ Project: result.errors[0].message });
    } else {
      setFkErrors({});
    }
  };

  return (
    <select onChange={(e) => handleProjectChange(e.target.value)}>
      {/* options */}
    </select>
  );
}
```

### Pattern 3: Repository Integration

```typescript
// In collar.repo.ts
import { FKValidationConfig, validateCollarForeignKeys } from "./collar.fk.validation";

export class CollarRepository extends BaseRepository<Collar, string> {
 async saveWithValidation(collar: Collar): Promise<string> {
  // Schema validation
  const validated = validateCollarDb(collar);

  // FK validation (if enabled)
  if (FKValidationConfig.enabled) {
   const fkResult = await validateCollarForeignKeys(validated);
   if (!fkResult.isValid) {
    throw new Error(
     `Foreign key validation failed:\n${formatForeignKeyErrors(fkResult).join("\n")}`
    );
   }
  }

  return await this.save(validated);
 }
}
```

### Pattern 4: Dropdown Population

```typescript
import { batchValidateForeignKeys } from "@/data/domain/collar";

async function loadProjectDropdown() {
 // Get all projects from IndexedDB
 const projects = await db.projects.toArray();

 // Verify they're all valid (optional, for data quality)
 const projectIds = projects.map(p => p.ProjectId);
 const validationResults = await batchValidateForeignKeys("projects", projectIds);

 // Filter out any invalid ones (shouldn't happen, but safe)
 const validProjects = projects.filter(p => validationResults.get(p.ProjectId));

 return validProjects;
}
```

## Configuration

### Global Enable/Disable

```typescript
import {
 disableFKValidation,
 enableFKValidation,
 FKValidationConfig
} from "@/data/domain/collar";

// Enable globally
enableFKValidation();

// Disable globally
disableFKValidation();

// Check if enabled
if (FKValidationConfig.enabled) {
 // FK validation is active
}
```

### Per-Table Enable

```typescript
import { enableTableValidation } from "@/data/domain/collar";

// Enable specific tables as they're synced
enableTableValidation("projects");
enableTableValidation("phases");
enableTableValidation("prospects");

// Check table status
if (FKValidationConfig.tables.projects) {
 // Project FK validation is active
}
```

### Progressive Enablement

```typescript
// Enable FK validation progressively as tables sync
async function initializeApp() {
 // Sync lookup tables
 await syncTable("projects");
 enableTableValidation("projects");

 await syncTable("phases");
 enableTableValidation("phases");

 await syncTable("prospects");
 enableTableValidation("prospects");

 // Enable global FK validation once core tables are ready
 enableFKValidation();
}
```

## Performance Considerations

### When FK Validation is Fast ✅

- Single record validation: < 5ms per FK
- Dropdown selections (1 FK check)
- Small batch operations (< 10 records)

### When FK Validation is Slow ⚠️

- Large batch imports (100+ records)
- Multiple FK checks per record (18 FKs × 100 records = 1800 checks)
- Complex validation logic

### Optimization Strategies

#### 1. Use Batch Validation

```typescript
// ❌ Slow: Individual checks
for (const collar of collars) {
 await validateCollarForeignKeys(collar); // 18 queries per collar
}

// ✅ Fast: Batch validation
const allProjectIds = collars.map(c => c.Project);
const projectResults = await batchValidateForeignKeys("projects", allProjectIds);

collars.forEach((collar) => {
 if (!projectResults.get(collar.Project)) {
  console.error(`Invalid project: ${collar.Project}`);
 }
});
```

#### 2. Validate Only Changed Fields

```typescript
// On update, only validate changed FKs
const changedFields = Object.keys(changes);
const fkFields = changedFields.filter(f => isForeignKey(f));

if (fkFields.length > 0) {
 const result = await validateSpecificForeignKeys(collar, fkFields);
 // ...
}
```

#### 3. Skip FK Validation for Batch Operations

```typescript
async function importCollars(collars: Collar[]) {
 // Temporarily disable FK validation for bulk import
 const wasEnabled = FKValidationConfig.enabled;
 disableFKValidation();

 try {
  // Validate schema only
  const validated = collars.map(c => validateCollarDb(c));
  await collarRepo.bulkSave(validated);

  // Validate FKs after import (optional)
  if (wasEnabled) {
   const fkResults = await Promise.all(
    validated.map(c => validateCollarForeignKeys(c))
   );
   const invalid = fkResults.filter(r => !r.isValid);
   if (invalid.length > 0) {
    console.warn(`${invalid.length} records have invalid FKs`);
   }
  }
 }
 finally {
  if (wasEnabled) {
   enableFKValidation();
  }
 }
}
```

## Error Handling

### Display FK Errors

```typescript
import { formatForeignKeyErrors, getInvalidForeignKeys } from "@/data/domain/collar";

const result = await validateCollarForeignKeys(collar);

if (!result.isValid) {
 // Get formatted messages
 const messages = formatForeignKeyErrors(result);
 alert(messages.join("\n"));

 // Get field names
 const fields = getInvalidForeignKeys(result);
 highlightFields(fields);
}
```

### Graceful Degradation

```typescript
async function saveCollarSafely(collar: Collar) {
 try {
  // Try with FK validation
  const fkResult = await validateCollarForeignKeys(collar);
  if (!fkResult.isValid) {
   // Log but don't block
   console.warn("FK validation failed:", formatForeignKeyErrors(fkResult));
  }
 }
 catch (error) {
  // FK validation failed (e.g., table not found)
  console.error("FK validation error:", error);
 }

 // Always save with schema validation
 const validated = validateCollarDb(collar);
 await collarRepo.save(validated);
}
```

## Best Practices

### ✅ DO

- Enable FK validation after lookup tables are synced
- Use batch validation for multiple records
- Validate only changed fields on updates
- Provide clear error messages to users
- Log FK validation failures for debugging

### ❌ DON'T

- Don't enable FK validation before tables are ready
- Don't validate FKs on every keystroke (debounce)
- Don't block saves due to FK errors in offline mode
- Don't forget to disable FK validation for batch imports
- Don't assume all lookup tables are always available

## Troubleshooting

### FK Validation Always Passes

**Problem**: FK validation returns true even for invalid values

**Solutions**:

1. Check if FK validation is enabled: `FKValidationConfig.enabled`
2. Verify table is configured: `FKValidationConfig.tables.projects`
3. Confirm table exists in IndexedDB: `await db.projects.count()`
4. Check table name matches Dexie schema exactly

### FK Validation is Slow

**Problem**: FK validation takes too long

**Solutions**:

1. Use `batchValidateForeignKeys` for multiple checks
2. Validate only changed fields
3. Disable FK validation for batch operations
4. Add indexes to lookup tables
5. Cache validation results

### Table Not Found Errors

**Problem**: "Table X not found in database"

**Solutions**:

1. Add table to Dexie schema
2. Update FK mappings in `collar.fk.validation.ts`
3. Sync lookup tables before enabling validation
4. Check table name spelling

## Migration from No FK Validation

### Phase 1: Add FK Validation (Opt-In)

```typescript
// FK validation available but disabled by default
// Existing code continues to work
await collarRepo.save(collar);
```

### Phase 2: Enable for New Records

```typescript
// Enable FK validation for new saves
if (isNewRecord(collar)) {
 const fkResult = await validateCollarForeignKeys(collar);
 // ...
}
```

### Phase 3: Enable Globally

```typescript
// Enable for all operations
enableFKValidation();
```

## Summary

Foreign key validation is a **powerful but optional** layer that ensures referential integrity. Use it when:

1. ✅ Lookup tables are synced to IndexedDB
2. ✅ Data quality is important
3. ✅ Users select from dropdowns
4. ✅ You need to catch broken references

Skip it when:

1. ❌ Tables aren't synced yet
2. ❌ Performance is critical (batch operations)
3. ❌ Working offline with limited data
4. ❌ Validating draft/partial data

---

**Next Steps**:

1. Add lookup tables to Dexie schema
2. Configure FK mappings
3. Enable FK validation after sync
4. Test with real data
