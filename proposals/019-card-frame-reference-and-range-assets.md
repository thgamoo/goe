# Proposal 019: Card Frame Reference And Range Assets

## Status

Implemented.

## Context

The Card DB currently uses one existing frame image:

- `public/card-assets/common/card-frame.png`

The user has added a new frame/design reference file at the project root:

- `card-design.webp`

The goal is to preserve this reference, generate a clean frame-only asset from it, and begin preparing reusable range-marker image assets for card-specific movement/control and attack patterns.

## Recommendation On Directory

Do not store source design references inside `proposals/`.

Proposal documents should describe decisions and implementation plans, while reusable visual source files should live with the project assets. A better structure is:

```text
public/card-assets/reference/card-design.webp
public/card-assets/common/goe-card-frame-v2.png
public/card-assets/ranges/range-grid-frame.png
public/card-assets/ranges/range-cell-control.png
public/card-assets/ranges/range-cell-attack.png
```

This keeps the reference image, generated frame, and generated marker assets easy to use from the app.

## Goals

- Create a directory for card design references.
- Move `card-design.webp` into that reference directory.
- Generate a frame-only version from the reference by removing or masking the illustration area while preserving the card frame design.
- Generate reusable transparent range-marker assets instead of pre-rendering every combination.
- Create a 3x3 range grid frame overlay.
- Create one active-cell overlay for `장악범위`.
- Create one active-cell overlay for `공격범위`.
- Keep the assets transparent PNGs so the app can compose the needed pattern later.

## Non-Goals

- Do not replace the live Card DB frame yet unless separately approved.
- Do not generate the full `2^8` range set in this pass.
- Do not generate the temporary `2^5 = 32` range combinations in this pass.
- Do not redesign all card text positioning in this pass.
- Do not change card data fields unless needed for asset naming or preview wiring.

## Proposed Asset Naming

Use reusable pieces rather than baked combinations:

```text
public/card-assets/ranges/range-grid-frame.png
public/card-assets/ranges/range-cell-control.png
public/card-assets/ranges/range-cell-attack.png
```

Later, the app can place active cells according to a stable 3x3 order:

```text
top-left, top, top-right,
left, center, right,
bottom-left, bottom, bottom-right
```

The current design work only needs the frame and active-cell pieces.

## Open Questions

Resolved:

- Do not generate 64 baked pattern images.
- Use transparent PNG overlays.
- Generate one 3x3 range grid frame.
- Generate one active-cell image for `장악범위`.
- Generate one active-cell image for `공격범위`.
- `장악범위` and `공격범위` should use different colors.
- The regenerated card frame should have a transparent illustration area.
- Generated assets should be PNG.

Still to confirm during implementation:

- Exact active colors can be adjusted after preview if the first pass feels off.

## Files Expected To Change After Approval

- `task.csv`
- `docs/project-sync.md`
- `public/card-assets/reference/card-design.webp`
- `public/card-assets/common/goe-card-frame-v2.png`
- `public/card-assets/ranges/range-grid-frame.png`
- `public/card-assets/ranges/range-cell-control.png`
- `public/card-assets/ranges/range-cell-attack.png`

Possibly:

- `src/App.tsx`
- `src/data/cards.json`

Only if the user wants to preview or apply the new generated assets immediately.

## Implementation Steps After Approval

1. Add a task row to `task.csv` and mark it `in_progress`.
2. Create the reference and range asset directories.
3. Move `card-design.webp` into `public/card-assets/reference/`.
4. Inspect the reference image dimensions and layout.
5. Generate a frame-only asset from the reference image.
6. Generate the 3x3 range grid frame PNG.
7. Generate one active-cell PNG for `장악범위` and one for `공격범위`.
8. Save generated assets with stable names.
9. Update `docs/project-sync.md`.
10. Run verification commands and inspect generated assets.
11. Mark the task `done`.

## Approval

Approved by the user.
