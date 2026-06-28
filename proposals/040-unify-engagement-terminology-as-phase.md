# Proposal 040: Unify Engagement Terminology as 국면

## Context

The rules should use `국면` instead of `교전` for the battle-state concept.
`전투` remains the term for a single attack/fight.
The old `교전` concept is absorbed into `국면`.

## Resolved Clarifications

1. `전투` stays as the term for an individual fight started by an attack declaration.
2. `교전` should be removed as a primary rules term and replaced with `국면`.
3. `국면` starts when combat is declared and ends when the units tied to that conflict condition are gone; weather changes when the 국면 ends.

## Proposed Changes

1. Update `docs/rules/v0.1.md` so terminology and combat sections define `전투`, `국면`, and `국면 전환`.
2. Replace lingering `교전` references in onboarding card docs with `국면`.
3. Update `src/data/cards.json` card effects/flavor/keywords that still say `교전`.
4. Update app copy and keyword chip palette from `교전` to `국면`.
5. Run a search to confirm no unintended `교전` remains.
6. Run `pnpm run build`.

## Acceptance Criteria

- Rules and card text consistently use `국면`.
- `전투` still means one fight.
- App pages and card previews no longer surface `교전`.
- `pnpm run build` passes.
