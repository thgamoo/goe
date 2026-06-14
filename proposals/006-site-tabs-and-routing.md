# Proposal 006: Site Tabs And Routing

## Goal

Replace the current single landing page with a user-facing tab structure that better matches the game information users need first.

## Confirmed Direction

The user wants the website to focus on:

1. Rules.
2. Board.
3. Card DB.
4. Tutorial.
5. Development notes.

The user also asked to keep `/goe` normalized to `/goe/`, without redirecting unrelated bad paths such as `/goe/grns-card/`.

## Proposed Tabs

1. `처음` at `/goe/`
2. `룰` at `/goe/rules`
3. `보드` at `/goe/board`
4. `카드 DB` at `/goe/cards`
5. `튜토리얼` at `/goe/tutorial`
6. `개발노트` at `/goe/notes`

## Proposed Changes

1. Update `src/App.tsx`
   - Add lightweight path-based navigation without adding a router dependency.
   - Use History API navigation for tab clicks.
   - Normalize `/goe` to `/goe/`.
   - Add page sections for each tab.
   - Move the current landing content into a more useful `처음` overview.

2. Update `src/styles.css`
   - Add layout styles for the new app shell, tab bar, page sections, rule summaries, board diagram, card DB placeholders, tutorial steps, and dev notes.

3. Update `task.csv`
   - Add task 5 for tab/routing implementation.

4. Keep future example cards as a separate task.

## Verification

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Verify `/goe/`, `/goe/rules`, `/goe/board`, `/goe/cards`, `/goe/tutorial`, and `/goe/notes` render.
4. Verify `/goe` normalizes to `/goe/`.

## Approval

Approved by user with `go`.
