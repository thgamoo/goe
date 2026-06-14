# Proposal 003: Rename Game To 괴이전

## Goal

Rename the project-facing game title from `Boundary Runners` to `괴이전`.

## Working Assumptions

Based on the user's confirmation, this proposal assumes:

1. The primary displayed title should be `괴이전`.
2. The old title `Boundary Runners` should be removed from the main user-facing website copy.
3. The project can keep an English-friendly repository/package name, but visible branding should use `괴이전`.
4. Website metadata, README text, and the main hero should all reflect the new title.

## Proposed Changes

1. Update `index.html`
   - Change `<title>` from `GRNS: Boundary Runners` to `괴이전`.
   - Update the description metadata if needed.

2. Update `src/App.tsx`
   - Change the hero heading from `Boundary Runners` to `괴이전`.
   - Replace `GRNS alternate game concept` with a Korean-facing label such as `GRNS 세계관 보드/카드 게임`.
   - Keep the existing visual layout unless the user asks for a broader redesign.

3. Update `README.md`
   - Change the heading from `GRNS: Boundary Runners` to `괴이전`.
   - Keep setup instructions unchanged.

4. Update `docs/core-rules.md`
   - Add `괴이전` as the current game title near the top.

5. Update `task.csv`
   - Add a new task row for the rename once implementation begins.

## Out Of Scope

- Changing the GitHub repository name.
- Changing the package name from `grns-new-game`.
- Redesigning the full homepage.
- Creating a logo or title treatment.

## Approval

Waiting for the user to say `go`.
