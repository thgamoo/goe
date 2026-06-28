# Proposal 018: Occupation Card Print 108 Copies

## Status

Implemented.

## Context

The previous print implementation interpreted the requirement as a 25-card occupation set made by repeating the four existing occupation-card designs.

The user clarified that the intended output is:

- Each occupation-card design should be printed enough times to fill full 9-card sheets.
- There are currently 4 occupation-card designs.
- Each design should be grouped together.
- The initially discussed 25 copies per design would leave a final partial page.
- The final decision is 27 copies per design, so each design fills exactly three 9-card pages.
- Total output should therefore be 108 cards.
- Each card remains double-sided with different front and back images.
- Card size remains `63mm x 88mm`.
- Sheets should still use 9 cards per page where possible, with no gaps between cards.

## Goals

- Update the occupation-card print generator from 25 total cards to 108 total cards.
- Print 27 copies of each existing occupation-card design.
- Keep front-side and back-side print flows separate.
- Keep exact `63mm x 88mm` print dimensions.
- Keep 3x3, 9-card no-gap page sheets.
- Make the screen UI clearly state that the output is 4 designs x 27 copies = 108 cards.

## Non-Goals

- Do not create new occupation-card illustrations.
- Do not change the existing gallery tab.
- Do not change the card size.
- Do not implement print-shop bleed or crop marks unless separately requested.

## Proposed Behavior

The print page should generate cards in grouped order:

1. `광소하는 광전사` x 27
2. `옥좌의 외뿔 도깨비` x 27
3. `청철 촉수거인` x 27
4. `보랏빛 손아귀 귀신` x 27

Total:

```text
4 designs x 27 copies = 108 cards
```

At 9 cards per page:

```text
108 / 9 = 12 pages
```

So each side should print as:

- Front sheets: 12 pages.
- Back sheets: 12 pages.
- Every page contains 9 cards.

## Open Questions

Resolved:

- Copies are grouped by design.
- The final output fills all pages by printing 27 copies per design.
- The on-screen preview may show per-design counts, while actual print faces remain image-only.

## Files Expected To Change After Approval

- `src/App.tsx`
- `docs/project-sync.md`
- `task.csv`

Possibly:

- `src/styles.css` if the page labels or sheet layout need print-specific adjustments.

## Implementation Steps After Approval

1. Add a task row to `task.csv` and mark it `in_progress`.
2. Change the occupation-card print data generator to produce 27 copies of each design.
3. Update page counts and UI copy from 25 total cards to 108 total cards.
4. Keep front/back print buttons and 63mm x 88mm no-gap sheet layout.
5. Update `docs/project-sync.md`.
6. Run `pnpm build` and `pnpm lint`.
7. Browser-check `/goe/print` for 108 cards, 12 sheets per side, and back-side switching.
8. Mark the task `done`.

## Approval

Approved by the user.
