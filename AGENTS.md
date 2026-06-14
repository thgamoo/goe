# AGENTS.md

This file is mandatory for all Codex work in this repository.
Read this before creating proposals, editing files, updating tasks, or running project-changing commands.

These rules apply only to the `grns-new-game` project.

## Project Workflow

Before starting any new task:

1. Ask the user at least 3 clarification questions to elaborate the request.
2. Create a proposal document under `proposals/`.
3. Wait until the user explicitly says `go` or otherwise clearly asks to proceed with the work.
4. Do not implement the task before approval, unless the user is only asking for analysis or a proposal.

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
