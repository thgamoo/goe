# Proposal 028: Vertical General Card Preview

## Status

Implemented.

## Context

General cards currently render as horizontal cards in Card DB.

The user wants ordinary `장군` cards to use the same vertical card layout as soldiers/tools/operations. The old horizontal style will be reserved for a separate future `대장군` card type.

## Goals

- Render `cardType: "general"` cards using the vertical standard-card preview.
- Reuse the current minimal frame and card UI components:
  - brush title
  - range grids
  - power circle
  - species/type line
  - rarity/serial meta
- Preserve general card data and deck composition.
- Keep future `대장군` outside this pass.

## Non-Goals

- Do not add a `greatGeneral` / `대장군` card type yet.
- Do not redesign the future 대장군 horizontal layout.
- Do not change current general card rules or quantities.
- Do not create new general-card art.

## Proposed Implementation

- Remove the special horizontal branch in `CardPreview` for `isGeneral`.
- Let generals flow through the same vertical preview path as soldiers.
- Keep `cardTypeLabel("general")` as `장군`.
- Update sync docs so horizontal layout is no longer described as ordinary general-card behavior.

## Open Questions

- Resolved: ordinary 장군 cards use the same `goe-card-frame-minimal-v1.png` frame as soldiers.
- Resolved: remove the old horizontal JSX branch entirely. 대장군 layout will be created later.
- Resolved: keep the existing `장군` Card DB type/filter.

## Files Expected To Change After Approval

- `task.csv`
- `src/App.tsx`
- `docs/project-sync.md`
- `proposals/028-vertical-general-card-preview.md`

## Implementation Steps After Approval

1. Add a task row to `task.csv` and mark it `in_progress`.
2. Remove or bypass the general horizontal rendering branch.
3. Verify general cards render vertically with range grids and power circle.
4. Run `pnpm build` and `pnpm lint`.
5. Browser-check Card DB general filter.
6. Update docs and mark task `done`.

## Approval Needed

Approved by the user and implemented.

## Implementation Notes

- Removed the `isGeneral` horizontal rendering branch from `CardPreview`.
- Existing `cardType: "general"` records now flow through the vertical standard-card rendering path.
- Did not add a `대장군` type or layout.
