# Proposal 008: Tailwind Card DB Assets

## Goal

Refactor the app styling to use Tailwind class names directly and upgrade the Card DB with copied `grns-card` frame/illustration assets, fixed standard card ratios, and richer filters.

## Confirmed Decisions

1. Keep only Tailwind/shadcn imports, theme tokens, and minimal global styles in `src/styles.css`.
2. Move all app/component styling into `className` strings.
3. Include Card DB work in the same task.
4. Copy existing `grns-card` frame and illustration assets into `public/card-assets/`.
5. Use standard card aspect ratios:
   - Soldier/operation: `aspect-[63/90]`.
   - General: `aspect-[90/63]`.
6. Add filters inspired by the existing `grns-card` Card DB:
   - Search.
   - Card type.
   - Faction.
   - Rarity.
   - Capacity/power cost.
   - Keyword.
   - Pack.
7. Keep future expansion possible through JSON fields.

## Proposed Changes

1. Copy assets:
   - `../docs/card-assets/common/card-frame-20260601.png`
   - `../docs/card-assets/common/backside.png`
   - selected illustrations from `../docs/card-assets/illustrations/base/`

2. Update `src/data/cards.json`:
   - Add `frame`, `illustration`, `keywords`, and `packId` where useful.
   - Keep serial format like `R-S001`.

3. Rewrite `src/App.tsx`:
   - Replace custom CSS classes with Tailwind class names.
   - Improve Card DB filter UI.
   - Render card previews with frame/illustration assets.
   - Keep the app path tabs.
   - Simplify the landing page.

4. Rewrite `src/styles.css`:
   - Keep imports and theme tokens.
   - Remove app-specific custom classes.

5. Update `task.csv`:
   - Add task 7.

## Verification

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Verify `/goe/cards`.
4. Confirm no app-specific class selectors remain in `src/styles.css`.

## Approval

Approved by user with `go`.
