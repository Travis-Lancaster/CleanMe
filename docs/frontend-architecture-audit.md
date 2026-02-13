# Frontend Architecture Audit

## 1) Repository Inventory (Current State)

### Top-level modules
- `src/data-layer`: data access, database schemas, domain services, stores, and API clients.
- `src/ui-scaffold`: cross-app shell (layout, routing, localization, global store, reusable UI infra).
- `src/ux`: product-facing UX flows and page-level business interactions (especially drill-hole workflows).

### Directory-level inventory (depth ≤ 3)
| Area | Current role | Observed dependencies/relationships |
|---|---|---|
| `src/data-layer/api` | HTTP client adapters + generated API contracts | Consumed by services/domain repos in `data-layer` |
| `src/data-layer/db` | Dexie/IndexedDB connection, schema, migrations, query optimization | Foundation for repository layer |
| `src/data-layer/domain` | Domain-specific repo/service/schema modules (collar, drill-plan, rig-setup, geology, many table schemas) | Self-contained domain logic with strong intra-domain coupling |
| `src/data-layer/services` | Cross-domain orchestration services | Depends on API + domain + store |
| `src/data-layer/store` | Zustand-like local state (work mode/auth token) | Used by data/service flows |
| `src/data-layer/types` | Shared data-layer types and simplified contracts | Imported across data-layer |
| `src/ui-scaffold/components` | Reusable app-shell components (table/form/card/button/system widgets) | Used by pages/layout |
| `src/ui-scaffold/layout` | App container/frame, menu/header/footer/tabbar/mobile layouts | Depends on router/store/hooks |
| `src/ui-scaffold/router` | Route config + guards + route utils | Depends on pages/layout constants |
| `src/ui-scaffold/store` | global app preferences/session/config state | Depends on constants/types/hooks |
| `src/ui-scaffold/locales` | i18n bundles | used by app bootstrap and UI text |
| `src/ui-scaffold/utils` | generic utility modules (request/dom/progress/tree/etc.) | consumed broadly by scaffold |
| `src/ux/pages` | business pages (drill-hole data and shared page components) | depends on ux hooks/components + data-layer |
| `src/ux/components` | UX-specific reusable components | used by UX pages |
| `src/ux/hooks` | UX business hooks/form orchestration | used by UX pages/components |
| `src/ux/types` | UX-facing domain types | used within UX module |

### Inter-module coupling (import scan)
- `data-layer -> data-layer`: strong internal cohesion (many internal imports).
- `ui-scaffold -> ui-scaffold`: shell is mostly self-contained.
- `ux -> ux`: UX module is mostly self-contained.
- Very low explicit cross-imports at top module root level, which is good for bounded-context separation.

## 2) Proposed Target Structure (Scalable)

```text
src/
├── app/
│   ├── bootstrap/                 # app init, providers, i18n, router wiring
│   ├── routes/                    # final route registration
│   └── layout/                    # app-level shell composition
├── shared/
│   ├── ui/                        # design-system reusable primitives (atomic)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── hooks/                     # framework-agnostic/shared hooks
│   ├── lib/                       # utility helpers (pure functions)
│   ├── config/                    # static config/constants
│   ├── types/                     # globally shared types
│   └── assets/
├── entities/
│   ├── collar/
│   ├── drill-plan/
│   ├── rig-setup/
│   └── ...                        # domain entities (schema + mapper + validators)
├── features/
│   ├── drill-hole-data/
│   │   ├── model/                 # business logic hooks/use-cases
│   │   ├── ui/                    # feature views/components
│   │   ├── api/                   # feature-specific network contracts
│   │   └── types/
│   └── ...
├── processes/                     # multi-feature workflows/orchestration
├── pages/                         # route-level page assembly
├── data-access/
│   ├── db/                        # dexie connection/migrations/schema infra
│   ├── api-client/                # HTTP base + interceptors
│   └── repositories/              # repo implementations by entity
└── legacy/
    └── NeedsAttention/
        └── RefactorRequired/
```

### Why this structure
- Separates **business entities** (`entities`) from **feature workflows** (`features`) and **infrastructure** (`data-access`).
- Enables domain-driven ownership and clearer scaling as new products/features are added.
- Supports atomic UI composition for consistent enterprise design systems.
- Limits coupling and improves discoverability by putting “what changes together” in the same boundary.

## 3) Migration Plan (Current -> Target)

| Current path | Target path | Reason |
|---|---|---|
| `src/data-layer/db/*` | `src/data-access/db/*` | Infrastructure concern, not domain concern |
| `src/data-layer/api/*` | `src/data-access/api-client/*` and `src/features/*/api/*` | Split shared transport from feature contracts |
| `src/data-layer/domain/tables/*` | `src/entities/<entity>/schema/*` | Entity-centric schema ownership |
| `src/data-layer/domain/{collar,drill-plan,rig-setup,...}` | `src/entities/<entity>/*` | Consolidate domain logic per entity |
| `src/data-layer/services/*` | `src/processes/*` or `src/features/*/model/*` | Orchestration belongs to process/feature layers |
| `src/data-layer/store/*` | `src/shared/store/*` or feature-local model stores | Separate global vs feature state |
| `src/ui-scaffold/components/*` | `src/shared/ui/*` | reusable component system |
| `src/ui-scaffold/layout/*` | `src/app/layout/*` | app-shell responsibility |
| `src/ui-scaffold/router/*` | `src/app/routes/*` | routing bootstrap concern |
| `src/ui-scaffold/locales/*` | `src/shared/config/i18n/*` | shared cross-app config |
| `src/ux/pages/*` | `src/pages/*` and `src/features/*/ui/*` | page composition + feature UI split |
| `src/ux/hooks/*` | `src/features/*/model/*` or `src/shared/hooks/*` | place hooks by ownership |
| `src/ux/types/*` | `src/features/*/types/*` or `src/shared/types/*` | avoid generic dumping ground |

## 4) Files Requiring Attention

### A. Legacy prototype/source stubs committed as `.txt` (high priority)
These files are source-like TypeScript/TSX but stored as `.txt`, making them non-compilable and hard to discover.
- `ConflictResolver.tsx.txt`
- `survey.repo.ts.txt`
- `surveyLog.repo.ts.txt`
- `index.ts.txt` (survey)
- `useSurveyForm.ts.txt`
- `useCollarValidation.ts.txt`
- `useRigSheetForm.ts.txt`

**Action**: either restore as active `.ts/.tsx` files with tests or archive outside active source tree.

### B. Fragmented implementation docs mixed inside domain source (medium priority)
- `IMPLEMENTATION_SUMMARY.md`, `INSTALLATION.md`, `FK_VALIDATION.md`, `COLLAR_IMPLEMENTATION_SUMMARY.md`

**Action**: centralize into architecture/docs area; keep domain folders code-first.

### C. Configuration hygiene (high priority)
- Repository appears to miss standard root config files in tracked tree (`tsconfig*.json`, eslint config, vite config) despite script/dependency references.

**Action**: reintroduce canonical configs, enforce CI checks (`typecheck`, `lint`, `test`).

### D. Testing gaps (high priority)
- Very few tests relative to module size (one observed domain test in extensions).

**Action**: baseline tests for repositories/services/hooks + smoke tests for route pages.

## 5) NeedsAttention Classification (Implemented)

The following files were moved into `NeedsAttention/RefactorRequired` with category subfolders:

- `NeedsAttention/RefactorRequired/legacy-prototypes/*` for `.txt` source stubs.
- `NeedsAttention/RefactorRequired/ux-prototypes/*` for UX prototype `.txt` source.
- `NeedsAttention/RefactorRequired/domain-docs/*` for implementation docs mixed into domain code.

## 6) Prioritized Recommendations

1. **High impact / low-medium effort**
   - Recreate missing root build/lint/type configs and enable CI gates.
   - Convert or delete prototype `.txt` source stubs.

2. **High impact / medium effort**
   - Move to `entities + features + shared + app + data-access` layered structure incrementally.
   - Add import-boundary lint rules to prevent cross-layer leaks.

3. **Medium impact / medium-high effort**
   - Introduce domain test harness per entity (repo/service/schema contract tests).
   - Refactor large page workflows into feature model + presentation components.

4. **Medium impact / low effort**
   - Standardize naming conventions (kebab-case files, consistent hook naming, explicit type suffixing).
   - Establish architecture decision records (ADR) for routing, data fetching, and offline strategy.

## 7) Implemented File Relocations (Follow-up)

To reduce documentation/code intermixing, module-local markdown notes were moved out of `src` into `docs/source-notes/**` while preserving their original module path structure.

| Old path (under `src`) | New path |
|---|---|
| `data-layer/domain/collar/README.md` | `docs/source-notes/data-layer/domain/collar/README.md` |
| `data-layer/domain/drill-plan/README.md` | `docs/source-notes/data-layer/domain/drill-plan/README.md` |
| `data-layer/domain/extensions/README.md` | `docs/source-notes/data-layer/domain/extensions/README.md` |
| `data-layer/domain/rig-setup/README.md` | `docs/source-notes/data-layer/domain/rig-setup/README.md` |
| `data-layer/domain/schema-helpers/README.md` | `docs/source-notes/data-layer/domain/schema-helpers/README.md` |
| `ui-scaffold/api/README.md` | `docs/source-notes/ui-scaffold/api/README.md` |
| `ui-scaffold/assets/README.md` | `docs/source-notes/ui-scaffold/assets/README.md` |
| `ui-scaffold/locales/README.md` | `docs/source-notes/ui-scaffold/locales/README.md` |
| `ui-scaffold/plugins/README.md` | `docs/source-notes/ui-scaffold/plugins/README.md` |
| `ui-scaffold/router/README.md` | `docs/source-notes/ui-scaffold/router/README.md` |
| `ux/components/WorkflowActionBar.README.md` | `docs/source-notes/ux/components/WorkflowActionBar.README.md` |
| `ux/hooks/USE_FORM_HOOK_README.md` | `docs/source-notes/ux/hooks/USE_FORM_HOOK_README.md` |
| `ux/pages/_shared/components/EmptyState/README.md` | `docs/source-notes/ux/pages/_shared/components/EmptyState/README.md` |
| `ux/pages/_shared/components/ErrorBoundary/README.md` | `docs/source-notes/ux/pages/_shared/components/ErrorBoundary/README.md` |
| `ux/pages/_shared/components/LoadingSpinner/README.md` | `docs/source-notes/ux/pages/_shared/components/LoadingSpinner/README.md` |
| `ux/pages/_shared/components/StatusBadge/README.md` | `docs/source-notes/ux/pages/_shared/components/StatusBadge/README.md` |
| `ux/pages/drill-hole-data/README.md` | `docs/source-notes/ux/pages/drill-hole-data/README.md` |
| `ux/pages/drill-hole-data/sections/forms/rig-setup/README.md` | `docs/source-notes/ux/pages/drill-hole-data/sections/forms/rig-setup/README.md` |

Rationale: keeps production source folders code-only, improves documentation discoverability under `docs`, and supports future doc linting/versioning independent of runtime code.
