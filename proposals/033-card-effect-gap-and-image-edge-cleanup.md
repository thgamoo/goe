# Proposal 033: Card Effect Gap and Image Edge Cleanup

## Context

The latest card preview update enlarged the effect text area and moved it upward.
On weather cards such as `전무`, the effect text now sits too close to the bottom of the illustration.
This makes the text harder to read and exposes a dark illustration edge that looks like an unintended border.

## Clarifying Questions

1. Should this fix apply to every card preview type, including 병사, 장군, 도구, 작전, 날씨, and 대장군?
2. Should the dark edge be removed by creating more blank paper gap between illustration and effect text, instead of adding a visible text background panel?
3. Should we keep the current maximum of 4 effect lines, even if that means moving the effect block slightly lower again?

## Proposed Changes

1. Reduce the illustration height a little more so its bottom edge ends clearly above the effect text.
2. Move the effect text block down slightly to restore a readable paper gap while keeping the enlarged text area as much as possible.
3. Add a subtle text readability treatment only if needed, using transparent paper-tone spacing rather than a visible card-like panel.
4. Keep keyword chips and bold backtick rendering unchanged.
5. Verify on `http://localhost:5173/goe/cards`, especially weather cards with short effects and cards with 3-4 line effects.

## Acceptance Criteria

- No unintended dark horizontal edge appears directly above or behind the effect text.
- Effect text is readable and visually separated from the illustration.
- Effects still display up to 4 lines.
- Existing keyword chip rendering remains intact.
- `pnpm run build` passes.
