# Proposal 038: Generate Referenced Card Art And Replace Grand Generals

## Context

The current card illustration pass is paused after the first batch. The user now wants to continue in a smaller, named-card batch using specific external reference images, and also wants two grand general card identities changed:

- `st01-0018`: 길잡이 마로 / current DB name `길잡의 부대의 마로`
- `st01-0019`: 정벌자 괴유 / current DB name `정벌자 부대의 괴유`
- `st04-0009`: 다루태자
- `st04-0010`: 덕좌태자
- Replace `탈해 이사금` with `아루`, referencing `ex01-0023`
- Replace `내려온 건길지` with `귀후 어륙`, with a newly generated antique ghost queen illustration

## Clarifications Needed

1. For `다루태자` and `덕좌태자`, the user text says `st01-0009` and `st01-0010`, but the attached file paths are `st04-0009.png` and `st04-0010.png`. I will use the attached `st04-*` files unless corrected.
2. For `탈해 이사금` -> `아루`, should only the name and illustration change, or should faction, stats, effect, and flavor also be changed to match `아루` if source data exists?
3. For `내려온 건길지` -> `귀후 어륙`, should the existing 십제 grand-general stats/effect remain and only name/flavor/illustration change, or should this become a mechanically different card?

## Proposed Work

1. Inspect current card DB entries and asset paths for the six named cards.
2. Generate or adapt art for:
   - `길잡의 부대의 마로`
   - `정벌자 부대의 괴유`
   - `다루태자`
   - `덕좌태자`
   - `아루`
   - `귀후 어륙`
3. Preserve the current ink-wash direction:
   - high contrast black ink and white hanji space
   - restrained faction highlight color
   - more symbolic than literal, while still readable from the card name
4. Update `src/data/cards.json`:
   - point the relevant entries to generated or adapted image assets
   - rename `탈해 이사금` to `아루`
   - rename `내려온 건길지` to `귀후 어륙`
   - preserve existing faction, stats, effect, and timing
5. Redraw or revise the horizontal grand-general frame so the illustration reads as fully covered inside the frame, without awkward cropping.
6. Remove the underline treatment from bottom explanatory/meta text.
7. Keep the work scoped to this named batch rather than continuing all remaining cards at once.

## Expected Files

- `src/data/cards.json`
- `public/card-assets/illustrations/card-08.png`
- `public/card-assets/illustrations/card-16.png` or the DB-selected path for Maro
- `public/card-assets/illustrations/card-20.png` or the DB-selected path for Daru
- `public/card-assets/illustrations/card-21.png` or the DB-selected path for Deokjwa
- `public/card-assets/grand-generals/aru-ink-v1.png`
- `public/card-assets/grand-generals/guihu-eoryuk-ink-v1.png`
- `public/card-assets/common/goe-grand-general-frame-v1.svg`
- `task.csv`

## Acceptance Criteria

- The six requested card identities have usable ink-wash illustrations.
- `아루` replaces `탈해 이사금` in the card DB.
- `귀후 어륙` replaces `내려온 건길지` in the card DB.
- The grand-general illustration uses cover-style framing inside the horizontal card frame.
- Bottom description/meta labels no longer use underlines.
- Existing user-approved assets outside this named batch are not regenerated.
- The task row is kept current in `task.csv`.

## Approved Defaults

- Use the attached `st04-0009.png` and `st04-0010.png` files for `다루태자` and `덕좌태자`.
- `아루` keeps the existing `탈해 이사금` faction, stats, effect, and timing.
- `귀후 어륙` keeps the existing `내려온 건길지` faction, stats, effect, and timing.
