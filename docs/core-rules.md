# Core Game Rules Draft

This document captures the current working rules for the new GRNS-based board/card game.

## Board

- The battlefield is a 5x5 grid.
- The physical board is based on two playmats placed together.
- Each cell is based on the vertical length of a standard card, 90mm.
- A 30cm x 65cm playmat starts from a half-height square, 45mm x 90mm, at the top, then continues with two more grid rows.
- Below the battlefield, each player has a slot for one general card.
- The general card is revealed at the start of the game.
- Each general has a unique ability.
- Each player's castle is attached to the center of the board.
- Because of the castle position, each player begins with 1 cell of influence.

## Victory Condition

- A player wins by occupying more than half of the land.
- The center castle is not counted as land for this victory condition.
- Occupation is marked with facedown cards.
- Card orientation distinguishes player ownership:
  - First player: one orientation.
  - Second player: the other orientation.

## Core Terms

- `국면`: A round.
- `차례`: A turn.
- `명령`: The action performed on a turn.
- `훈련소`: The soldier deck.
- `군영`: The player's hand.
- `징집소`: A 30-card soldier deck.
- `전략`: A 20-card operation deck.
- `교전`: The operation-card subgame that decides combat.

## Turn Structure

During a 국면, players alternate 차례.

On a 차례, the active player performs one 명령.

Available commands:

1. `훈련`: Move a soldier card from the training ground deck into the camp hand.
2. `출정`: Deploy a soldier face-up into the player's basic influence area.
3. `전투`: Choose an opposing soldier in the attacking soldier's printed attack influence and start combat.
4. `이동`: Move a soldier within its printed movement range.

Basic influence means cells orthogonally adjacent to the player's own cards.

## Card Types

### Soldier Cards

Soldier cards are the core cards placed onto the 5x5 board to occupy land.

Layout:

1. Top left: movement range.
2. Top center: card name.
3. Top right: capability value used as combat resource.
4. Center: portrait art.
5. Below portrait: ability text, or flavor text if the card has no effect.
6. Bottom left: species and faction.
7. Bottom center: faction emblem.
8. Bottom right: rarity and serial number.

### General Cards

Each player may include exactly 1 general card. A general starts at the player's center castle.

Layout:

1. Card name.
2. Portrait art.
3. Ability text.
4. Species and faction.
5. Faction emblem.
6. Rarity and serial number.

### Operation Cards

Operation cards are used during engagements. Opponents know the contents of each player's operation card composition before the game starts.

Layout:

1. Card name.
2. Top right: power, meaning the capability cost paid to use the card.
3. Portrait art.
4. Ability text.
5. Rarity and serial number.

## Deck Construction

- `징집소`: 30 soldier cards.
- `전략`: 20 operation cards.

## Combat Sequence

1. The active player declares an attack by choosing an opposing soldier inside the attacking soldier's influence.
2. Identify all participating soldiers:
   - The attacking soldier.
   - The target soldier.
   - Soldiers adjacent to the target.
3. Resolve pre-combat effects.
4. Enter 교전.

Example pre-combat effect:

- If the opponent is in `정비 상태`, meaning they already attacked and are resting, apply `급습`.

## Engagement

The winner of combat is the winner of the engagement.

Engagement sequence:

1. The attacker draws 5 operation cards from the strategy deck.
2. The defender draws 4 operation cards from the strategy deck.
3. Starting with the attacker, players play operation cards.
4. A player wins when the opposing side is annihilated, surrenders, or retreats.
5. If the attacker wins, the attacked cell is occupied by a soldier that participated in the combat.

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

## Open Questions Kept For Later

1. Whether soldier cards themselves remain on board or whether occupation markers persist independently.
2. Exact 국면 end condition.
3. Whether each 차례 always allows exactly one command.
4. How strategy cards are discarded, retained, or reset after engagement.
5. Whether adjacent participating soldiers include both attacker-side and defender-side adjacent soldiers.
6. Whether generals move and fight on the board or only provide castle abilities.
