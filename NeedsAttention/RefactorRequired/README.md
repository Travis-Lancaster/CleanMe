# Refactor Required Index

## legacy-prototypes

| File | Issue | Recommended action |
|---|---|---|
| `legacy-prototypes/ConflictResolver.tsx.txt` | React component stored as `.txt` (not part of build/test pipeline) | Convert to `.tsx` under feature UI or delete if obsolete |
| `legacy-prototypes/survey.repo.ts.txt` | Repository implementation stored as `.txt` | Convert to `.ts` and add repository contract tests |
| `legacy-prototypes/surveyLog.repo.ts.txt` | Repository implementation stored as `.txt` | Convert to `.ts` and add repository contract tests |
| `legacy-prototypes/index.ts.txt` | Barrel export stored as `.txt` | Convert to `.ts` if module should be active |
| `legacy-prototypes/useSurveyForm.ts.txt` | Hook stored as `.txt`, bypassing lint/type checks | Convert to `.ts` in feature model/hooks folder |
| `legacy-prototypes/useCollarValidation.ts.txt` | Validation hook stored as `.txt` | Convert to `.ts` and colocate with collar entity/feature |

## ux-prototypes

| File | Issue | Recommended action |
|---|---|---|
| `ux-prototypes/useRigSheetForm.ts.txt` | UX form hook stored as `.txt` and detached from runtime code | Convert to `.ts` in `features/drill-hole-data/model` or remove |

## domain-docs

| File | Issue | Recommended action |
|---|---|---|
| `domain-docs/IMPLEMENTATION_SUMMARY.md` | Domain implementation doc mixed with source in original layout | Keep in docs area with ADR link |
| `domain-docs/INSTALLATION.md` | Installation instructions located in code directory | Move/maintain in centralized docs |
| `domain-docs/FK_VALIDATION.md` | FK validation policy doc scattered in domain tree | Convert to shared architecture guide |
| `domain-docs/COLLAR_IMPLEMENTATION_SUMMARY.md` | Duplicate collar-summary context | Merge with single canonical collar architecture doc |
