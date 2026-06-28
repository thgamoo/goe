# Proposal 037: Fit Keyword Chips in Card Effects

## Context

Keyword chips inside card effect text can be clipped vertically.
The likely cause is that the chip is rendered as `inline-flex` with border, padding, and vertical translation inside a tightly clamped four-line paragraph.

## Clarifying Questions

1. Should keyword chips keep the current outlined pill look, or can they become flatter inline labels with less height?
2. Should effect text still stay at a maximum of 4 lines after this adjustment?
3. Should this fix apply to all card previews, including weather, tools, operations, soldiers, generals, and grand generals?

## Proposed Changes

1. Remove the chip vertical translation and make chips align to the text baseline.
2. Reduce vertical chip height by using tighter padding and a slightly smaller internal line height.
3. Increase the effect paragraph line height just enough to prevent clipping without making text smaller.
4. Keep the current 4-line clamp unless a card still overflows after the chip adjustment.
5. Verify with cards containing chips near the first line, especially `[단말마]`, `[전투광]`, `[출정]`, and `[보류]`.

## Acceptance Criteria

- Keyword chips are not clipped on the top or bottom.
- Effect text remains readable.
- The card effect area does not overlap the illustration or bottom metadata.
- `pnpm run build` passes.
