# IQ Push

### 🚀 Live Demo: [https://rustbasic.github.io/iqpush/](https://rustbasic.github.io/iqpush/)

> This README introduces the project and provides a starting point for contributors. For current behavior and rules, refer to the source code, as details may change.

## Game Overview

IQ Push is a 3D puzzle game in which you move a player and boxes of different sizes to activate every button, open an exit on the edge of the map, and clear each round. The game contains multiple maps, lets you rate their difficulty, and supports browsing maps by difficulty group.

### Story

A powerful earthquake has destroyed a research facility. Push the lab equipment to activate emergency switches, avoid gaps in the damaged floor, and open the exit to escape to safety.

## How to Play

- Use the arrow keys to move one tile at a time. In Portrait mode, directional input is rotated to match the screen orientation.
- Click an adjacent floor tile to move one step.
- Click the player to enable pointer-follow mode. The player follows the pointer even after you release the mouse button, and can push boxes while moving. Click the player again to turn pointer-follow mode off.
- You can also hold the left mouse button on the player and drag to move; boxes can be pushed this way as well.
- You can push boxes but cannot pull them. Be careful not to push a box into a dead end.
- Every button must be pressed to open the exit. The player and large boxes can activate both small buttons (`s`) and large buttons (`S`); small boxes (`b`) can activate only small buttons. The exit is on the edge of the map. Step onto its tile while it is open to clear the round.
- Press `Z` to undo one move and `R` to restart the current round. You can also use the on-screen Undo and Restart buttons.
- Each round has move and box-push limits. Exceeding a limit causes failure; use Retry to try again. After clearing a round, use Next Round to continue to the next unfinished map.
- Use the Portrait / Landscape buttons to change the screen orientation.

## Map Selection and Difficulty Ratings

- In the map selection menu, choose unrated maps (`U`) or a difficulty group from 1 to 6, then use the previous/next map buttons to browse maps in that group.
- Rate difficulty with stars from 1 to 5 or the red star (6). The red star counts as 10 points in the internal score total.
- Initial rating scores and vote counts for each map are provided by embedded data. Ratings changed during play apply only to the current run session.

## Creating Maps

See [MAP_GUIDE.md](MAP_GUIDE.md) for map data, tile rules, layout requirements, and examples.

## Code Structure

- `src/mapdata.rs`: map list, map size calculations, starting positions, and tile lookups
- `src/game.rs`: game state and puzzle rules such as movement, pushing, and undo
- `src/main.rs`: Bevy app setup, rendering and UI, input handling, camera orientation, map selection, rating display, and persistence integration
- `Cargo.toml`: package configuration and Bevy dependencies

When changing map rules, check whether both the data definitions and game logic are affected. After changing the UI or controls, it is a good idea to test map navigation, orientation changes, undo, restart, and both clear and failure flows.

## Build

With Rust and Cargo installed, run this command from the repository root:

```sh
cargo run
```

You can use `cargo build` to verify a development build.