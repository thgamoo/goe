# Proposal 009: Reuse GRNS Card Names And Serials

## Goal

Reuse card names from the existing `grns-card` card pool and switch example card serials to the existing pack-style convention with rarity added.

## Confirmed Decisions

1. Reuse names for soldiers, generals, and operations from `../data/card-2026-06-01-v1/`.
2. Use `../data/card-2026-06-01-v1/` as the source card pool.
3. Serial format should be like `st01-r001`.
   - Pack prefix from the source card serial.
   - Lowercase rarity letter.
   - Three-digit serial number.
4. Hide the Card DB explanatory text during print.

## Proposed Changes

1. Update `src/data/cards.json`.
   - Replace example card names with names from the existing card pool.
   - Replace serials with `pack-rarity###`, e.g. `st01-r001`.

2. Update `src/App.tsx`.
   - Add `print:hidden` to the Card DB explanatory paragraph.

3. Update `task.csv`.
   - Add task 8 and mark complete after verification.

## Verification

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Verify `/goe/cards` still renders.

## Approval

Approved by user in this thread.
