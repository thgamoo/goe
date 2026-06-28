# Proposal 020: Clean Card Frame Transparent Art Zone

## Status

Implemented.

## Context

`public/card-assets/common/goe-card-frame-v2.png` was generated from `public/card-assets/reference/card-design.webp`.

The first extraction removed the central illustration area and range UI areas, but some leftover brush/illustration fragments remain around the transparent cutout edge. Those fragments can overlap future card illustrations.

The user wants those remaining fragments fully removed, or the frame regenerated more cleanly.

## Goals

- Clean `goe-card-frame-v2.png` so the illustration area is truly usable as a transparent art window.
- Remove leftover illustration fragments around the transparent region.
- Preserve the outer card border, corner ornaments, bottom text/ornament areas, and general paper/frame mood.
- Keep the output as transparent PNG.
- Keep existing range overlay assets unchanged unless they need visual alignment after the frame cleanup.

## Non-Goals

- Do not apply the new frame to Card DB cards in this pass.
- Do not redesign the whole card layout.
- Do not change card text positions.
- Do not create final production print bleed or crop marks.

## Proposed Approaches

### Option A: Stronger Mask Cleanup

Regenerate `goe-card-frame-v2.png` from the reference using a larger and cleaner transparent mask.

This is fastest and keeps the current extracted-frame style.

### Option B: Minimal Reconstructed Frame

Use the reference only for outer paper texture, border, bottom ornaments, and corner marks, then remove nearly all central ink/illustration content.

This gives a cleaner frame but may feel less like the original generated design.

### Option C: Fully Regenerate Frame-Like Asset

Create a new frame-like PNG by drawing/rebuilding the frame motifs and paper field rather than relying on the source image extraction.

This is cleanest conceptually but more speculative.

## Recommendation

Start with Option B.

The current problem is that the illustration leaks into the art window. A minimal reconstructed frame that keeps only structural frame elements is more useful for future card art than a pretty but contaminated extraction.

## Open Questions

1. Should the transparent art window cover almost the whole upper/middle card, from below the title/range area down to just above the effect text area?
2. Should bamboo/side ink decorations be removed too, or are they considered part of the frame mood?
3. Should the top range UI zones remain fully transparent in the frame, with range overlays added separately?
4. Should the bottom black brush label area remain in the frame, or should it also be cleared for future text UI?
5. Should I overwrite `goe-card-frame-v2.png`, or create `goe-card-frame-v3.png` so we can compare versions?

## Files Expected To Change After Approval

- `public/card-assets/common/goe-card-frame-v2.png` or `public/card-assets/common/goe-card-frame-v3.png`
- `docs/project-sync.md`
- `task.csv`

Possibly:

- `proposals/020-clean-card-frame-transparent-art-zone.md`

## Implementation Steps After Approval

1. Add a task row to `task.csv` and mark it `in_progress`.
2. Regenerate a cleaner transparent frame asset from `card-design.webp`.
3. Inspect the output visually with a temporary checkerboard preview.
4. Remove temporary QA preview files.
5. Update `docs/project-sync.md`.
6. Mark the task `done`.

## Approval

Approved by the user.
