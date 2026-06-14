# Proposal 002: Core Game Rules Draft

## Goal

Capture the currently confirmed rules for the new GRNS-based board/card game so future website copy, card design, and prototype implementation have a shared rules source.

## Confirmed So Far

- The game uses a 5x5 shared battlefield.
- The board is designed around two playmats placed together.
- Each cell corresponds to the vertical length of a standard card, 90mm.
- A playmat sized 30cm x 65cm begins with a half-height 45mm x 90mm square at the top, followed by two more grid rows.
- Each player has a general card slot below the battlefield area.
- Each player reveals one general card at the start.
- General cards have unique abilities.
- The win condition is to occupy more than half of the land.
- The center castle is not counted as land for this win condition.
- Because the castle is attached to the center of the board, each player begins with 1 cell of influence.
- Occupation markers are represented by facedown cards, with orientation distinguishing first and second player ownership.
- A round is called a `국면`.
- A turn is called a `차례`.
- During a 국면, players alternate 차례.
- On a 차례, a player performs one command.

## Commands

1. `훈련`: Draw or move a soldier card from the training ground deck into the camp hand.
2. `출정`: Deploy a soldier face-up into the player's basic influence area. Basic influence means cells orthogonally adjacent to the player's own cards.
3. `전투`: Declare combat against an opposing soldier inside the attacking soldier's printed attack influence.
4. `이동`: Move a soldier within its printed movement range.

## Card Types

### Soldier Card

Soldier cards are the core cards placed onto the 5x5 board to occupy land.

Layout:

1. Top left: movement range.
2. Top center: card name.
3. Top right: capability value used as a combat resource.
4. Center: portrait art.
5. Below portrait: ability text, or flavor text if the card has no effect.
6. Bottom left: species and faction.
7. Bottom center: faction emblem.
8. Bottom right: rarity and serial number.

### General Card

Each player may include exactly 1 general card. The general begins at the player's center castle.

Layout:

1. Card name.
2. Portrait art.
3. Ability text.
4. Species and faction.
5. Faction emblem.
6. Rarity and serial number.

### Operation Card

Operation cards are used for engagements. Opponents know the contents of each player's operation card composition before play begins.

Layout:

1. Card name.
2. Top right: power, meaning the capability cost paid to use the card.
3. Portrait art.
4. Ability text.
5. Rarity and serial number.

## Deck Construction

1. `징집소`: A 30-card deck made of soldier cards.
2. `전략`: A 20-card deck made of operation cards.

## Combat Sequence

1. Declare an attack by choosing an opposing soldier inside the attacking soldier's influence.
2. Identify all participating soldiers. This includes the attacking soldier, the target soldier, and soldiers adjacent to the target.
3. Resolve pre-combat effects. Example: if the opponent is in a maintenance state after already attacking, apply `급습`.
4. Enter engagement.

## Engagement

Combat is won by winning the engagement.

Engagement sequence:

1. The attacker draws 5 operation cards from the strategy deck.
2. The defender draws 4 operation cards from the strategy deck.
3. Starting with the attacker, players play operation cards.
4. A player wins when the opposing side is annihilated, surrenders, or retreats.
5. When the attacker wins, the attacked cell is occupied by a soldier that participated in the combat.

## Engagement Outcomes

### Annihilation

Some operation cards attack and eliminate opposing troops. Most elimination effects should require repeated attacks or special conditions rather than a single unconditional play.

If all soldiers participating on one side are eliminated, that side is annihilated and automatically loses the engagement.

### Surrender

On a player's engagement turn, that player may declare surrender and lose the engagement.

When this happens, the winner chooses 1 operation card from the loser and sends it to the used operation card pile.

### Retreat

On a player's engagement turn, that player may use an operation card with a retreat effect to lose the engagement by retreating.

When this happens, the retreating player gives up only the occupied land. During the next engagement, that player draws 1 additional card from the strategy deck.

## Deferred Questions

The user asked to keep the remaining unresolved questions for later. Important deferred questions include:

1. Whether soldier cards themselves remain on board or whether occupation markers persist independently.
2. Exact 국면 end condition.
3. Whether each 차례 always allows exactly one command.
4. How strategy cards are discarded, retained, or reset after engagement.
5. Whether adjacent participating soldiers include both attacker-side and defender-side adjacent soldiers.
6. Whether generals move and fight on the board or only provide castle abilities.

## Implementation Plan After Approval

1. Create a durable rules document at `docs/core-rules.md`.
2. Add a task row to `task.csv`.
3. Keep this proposal as the source for future refinement.
4. Commit and push the current project setup and rules draft to `origin/main`.
