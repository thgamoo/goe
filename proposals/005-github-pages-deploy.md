# Proposal 005: GitHub Pages Deployment

## Goal

Configure GitHub Pages deployment so the `괴이전` site builds and deploys automatically when changes are pushed.

## Confirmed Decisions

1. Use GitHub Actions.
2. Build with `pnpm build`.
3. Deploy the Vite `dist/` directory to GitHub Pages.
4. Use the GitHub Pages context path `/goe/`.
5. Add the workflow at `.github/workflows/deploy-pages.yml`.

## Proposed Changes

1. Update `vite.config.ts`
   - Change `base` from `./` to `/goe/`.

2. Add `.github/workflows/deploy-pages.yml`
   - Trigger on pushes to `main`.
   - Use Node 22.
   - Enable pnpm through Corepack.
   - Run `pnpm install --frozen-lockfile`.
   - Run `pnpm build`.
   - Upload `dist/` as a Pages artifact.
   - Deploy through the official GitHub Pages action.

3. Update `task.csv`
   - Add a task row for GitHub Pages deployment setup.
   - Mark it `done` after local verification.

## Verification

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Confirm generated assets use `/goe/` paths.

## Approval

Approved by user with `go`.
