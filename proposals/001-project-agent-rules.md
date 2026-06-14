# Proposal 001: Project Agent Rules

## Goal

Add an `AGENTS.md` file to the `grns-new-game` project so future Codex work in this repository has a persistent project-specific workflow to reference.

## Decisions Confirmed

- The rules should live inside `grns-new-game`, not the parent `grns-card` repository.
- The canonical rule file should be `grns-new-game/AGENTS.md`.
- Proposal documents should live under `grns-new-game/proposals/`.
- Implementation must wait until the user explicitly says `go`.
- Work tracking should use `grns-new-game/task.csv`.
- `task.csv` columns should be: `id,task,status,notes,updated_at`.

## Proposed `AGENTS.md`

```md
# AGENTS.md

This file is mandatory for all Codex work in this repository.
Read this before creating proposals, editing files, updating tasks, or running project-changing commands.

These rules apply only to the `grns-new-game` project.

## Project Workflow

Before starting any new task:

1. Ask the user at least 3 clarification questions to elaborate the request.
2. Create a proposal document under `proposals/`.
3. Wait until the user explicitly says `go`.
4. Do not implement the task before `go`, unless the user is only asking for analysis or a proposal.

## Task Tracking

When implementation starts:

1. Create `task.csv` in the project root if it does not exist.
2. Use this exact CSV header:

   ```csv
   id,task,status,notes,updated_at
   ```

3. Add a numbered task row for the work being started.
4. Keep the `status` field current as work progresses.
5. Use concise status values such as `proposed`, `in_progress`, `blocked`, `done`, or `cancelled`.

## Repository Boundaries

- Treat `grns-new-game` as its own repository.
- Do not assume parent repository rules apply unless the user explicitly says so.
- Do not modify files outside `grns-new-game` for this project unless the user explicitly requests it.

## Package Manager

- Use `pnpm`, not `npm`.
- Keep `pnpm-lock.yaml`.
- Do not create or reintroduce `package-lock.json`.

## Stack

- Use React with Vite.
- Use shadcn-style components and project-local UI primitives where appropriate.
- Prefer existing project patterns before introducing new abstractions.
```

## Implementation Plan After `go`

1. Create `AGENTS.md` in the `grns-new-game` root with the proposed content.
2. Create or update `task.csv`.
3. Mark this rules setup task as `done`.
4. Verify git status inside `grns-new-game`.

## Approval

Waiting for the user to say `go`.
