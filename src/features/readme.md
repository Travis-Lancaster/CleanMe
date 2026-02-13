# UX Module - Gold Exploration Interface

This module contains the field-ready user experience for B2Gold gold exploration data management.

## 📁 Folder Structure (Domain-Driven Design)

```
src/ux/
├── core/                    # Foundation layer (DRY)
│   ├── constants/           # RowStatus, ValidationStatus, colors
│   ├── hooks/               # useConsoleLog, useAutoSave
│   ├── utils/               # MockDataFactory, validators, formatters
│   └── types/               # Base interfaces
│
├── shared/                  # Reusable UI patterns (SOLID)
│   ├── components/
│   │   ├── Status/         # StatusBadge, SyncIndicator
│   │   ├── Layout/         # PageHeader, EmptyState
│   │   ├── Grid/           # FieldReadyGrid (TODO)
│   │   ├── Drawer/         # InspectorDrawer (TODO)
│   │   └── Inputs/         # SmartField (TODO)
│   └── layouts/            # WorkspaceLayout, DashboardLayout
│
├── features/               # Domain modules (Vertical slices)
│   ├── dashboard/          # Mission Control ✓
│   ├── collar/             # Workspace shell ✓
│   └── geology-log/        # Core feature (TODO)
│
├── config/                 # Design system
│   ├── tailwind-tokens.ts  # Field-ready tokens
│   └── antd-theme.ts       # AntD overrides
│
└── index.ts                # Central export
```

## ✅ Implemented Features

### Phase 1: Foundation ✓

- Core constants (RowStatus, ValidationStatus)
- Mock data factory
- Console logging hook
- Field-ready design tokens
- AntD theme configuration

### Phase 2: Shared Components ✓

- StatusBadge - Consistent status display
- SyncIndicator - Offline/online status
- PageHeader - Consistent page headers
- EmptyState - Helpful empty states

### Phase 3: Dashboard Feature ✓

- Mission Control interface
- CollarCard - Clickable collar cards
- SyncStatusWidget - Sync queue status
- AlertPanel - Validation alerts
- Mock data integration

### Phase 4: Collar Workspace ✓

- Context header (sticky, shows hole info)
- Tab navigation (5 tabs: Setup, Geology, Geotech, Sampling, QAQC)
- Action bar (Mark Complete, Sync)
- All tab placeholders created

### Phase 5: Router Integration ✓

- Exploration routes module
- Dashboard route: `/exploration/dashboard`
- Workspace route: `/exploration/collar/:collarId`

## 🚧 TODO - Next Phase

### Phase 6: Geology Log (Core Feature)

- [ ] Lens system (Litho, Alt, Min, Vein)
- [ ] FieldReadyGrid component (AG Grid wrapper)
- [ ] GeologyGrid with lens switching
- [ ] InspectorDrawer for detailed editing
- [ ] Column definitions for 80+ fields

### Phase 7: Zustand State Management

- [ ] App store with slices
- [ ] UI slice (lens state, drawer state)
- [ ] Sync slice (offline queue)

## 🎨 Design Principles Applied

1. **Cognitive Load** - Progressive disclosure (Lens system)
2. **Information Architecture** - Clear 3-level hierarchy
3. **Feedback & Status** - Console logs, status badges everywhere
4. **Error Prevention** - Two-tier validation ready
5. **Speed & Performance** - Optimistic UI patterns
6. **Accessibility** - 44px touch targets, high contrast
7. **Discoverability** - Clear navigation, helpful empties
8. **Consistency** - StatusBadge reused everywhere

## 🔍 Console Logging

All components use tagged logging for debugging:

```typescript
console.log("ComponentName");
console.info("Component mounted", { data });
console.log("Button clicked", { id });
```

**Filter in browser console:**

- `[Dashboard]` - Dashboard events
- `[CollarWorkspace]` - Workspace events
- `[UI]` - UI component events
- `[DATA]` - Data operations
- `[MOCK]` - Mock data generation

## 🧪 Testing

### Manual Testing

1. Navigate to `/exploration/dashboard`
2. Click a collar card
3. Navigate to workspace
4. Switch between tabs
5. Check console logging

### Success Criteria

✅ Dashboard loads with 8 mock collars
✅ Collar cards are clickable
✅ Navigation works
✅ Tabs switch correctly
✅ Console logging comprehensive
✅ No TypeScript errors

## 📚 Related Documentation

- [UX Design Specification](../plans/ux-design-specification.md)
- [Visual Design Tokens](../plans/visual-design-tokens.md)
- [Component Specifications](../plans/component-specifications.md)
- [Implementation Plan](../plans/ux-scaffold-implementation-plan.md)
- [Build Guide](../plans/ux-scaffold-build-guide.md)

---

**Status**: Phase 1-5 Complete | Phase 6-7 TODO
**Estimated Completion**: 6 more hours for full scaffold
