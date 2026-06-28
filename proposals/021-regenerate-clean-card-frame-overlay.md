# Proposal 021: Regenerate Clean Card Frame Overlay

## Status

Implemented.

## Context

The extracted frame versions from `card-design.webp` are not good enough.

- `goe-card-frame-v2.png` still feels like a masked illustration.
- `goe-card-frame-v3.png` is cleaner, but the extraction process makes the frame awkward and visually weak.

The user prefers regenerating a clean frame image from scratch and placing it over future card illustrations.

## Goals

- Generate a new clean card-frame overlay as a fresh bitmap asset.
- Use `card-design.webp` only as a style/layout reference, not as a source to mask.
- Make the frame suitable for layering above card illustrations.
- Produce a transparent PNG final asset.
- Keep the center illustration area transparent.
- Keep top range zones empty/transparent so range overlays can be placed separately.
- Keep the bottom label area clean/transparent.
- Generate the bottom brush label as a separate transparent PNG overlay.
- Generate the range person marker icon as a separate transparent PNG overlay.
- Avoid baked-in characters, creatures, landscapes, bamboo, and illustration content.

## Non-Goals

- Do not apply the regenerated frame to the live Card DB yet.
- Do not change card data or text coordinates in this pass.
- Do not regenerate card illustrations.
- Do not generate the full range-combination set.

## Proposed Output

Create:

```text
public/card-assets/common/goe-card-frame-clean-v1.png
public/card-assets/common/goe-card-brush-label-v1.png
public/card-assets/ranges/range-person-marker-v1.png
```

Keep existing comparison assets:

```text
public/card-assets/common/goe-card-frame-v2.png
public/card-assets/common/goe-card-frame-v3.png
```

## Proposed Visual Direction

The frame should be:

- Clean, readable, and usable as a production overlay.
- Korean dark-fantasy / ink-wash inspired.
- Parchment and black ink with subtle gold corner ornaments.
- Minimal enough that future card illustrations are the star.
- Transparent in the central art window.
- Transparent around top-left and top-right range UI positions.
- Transparent/clean where the bottom brush label will be placed.
- No baked-in dragon, human figure, bamboo, landscape, or central illustration.
- No text, no watermark.

The separate brush label should be:

- Black ink brush stroke on transparent background.
- Wide horizontal shape, suitable for placing near the bottom information area.
- No text.

The separate range person marker should be:

- A simple black ink silhouette/icon.
- Transparent background.
- Readable at small size inside the 3x3 range grid.
- No text.

## Generation Plan

Use the `imagegen` skill with the built-in image generation tool.

Because the desired final is transparent PNG, the default path is:

1. Generate a clean card frame on a flat chroma-key background.
2. Remove the chroma-key locally to create alpha transparency.
3. Save the final PNG into `public/card-assets/common/`.
4. Inspect the result.
5. Iterate once if the first result is visibly unusable.

## Open Questions

Resolved:

- Use the standard card ratio, not an exact match to the reference dimensions.
- Keep top range UI areas blank/transparent.
- Keep the bottom label area clean/transparent.
- Create the brush label as a separate overlay.
- Use ivory paper, black ink, and muted gold ornament direction.
- Generate one strong draft.
- Also generate a separate range person marker icon.

Still to confirm during implementation:

- If chroma-key removal creates poor transparency for the full frame, a deterministic post-process cleanup may be needed.

## Files Expected To Change After Approval

- `public/card-assets/common/goe-card-frame-clean-v1.png`
- `public/card-assets/common/goe-card-brush-label-v1.png`
- `public/card-assets/ranges/range-person-marker-v1.png`
- `docs/project-sync.md`
- `task.csv`

Possibly:

- temporary generated source image under `tmp/` or `$CODEX_HOME/generated_images/`, not committed.

## Implementation Steps After Approval

1. Add a task row to `task.csv` and mark it `in_progress`.
2. Generate the clean frame image with the built-in image generation tool.
3. Generate the brush label overlay.
4. Generate the range person marker icon.
5. Convert outputs to transparent PNG through chroma-key removal if needed.
6. Save the final assets into `public/card-assets/common/` and `public/card-assets/ranges/`.
7. Inspect alpha and visual quality.
8. Update `docs/project-sync.md`.
9. Mark the task `done`.

## Approval

Approved by the user.
