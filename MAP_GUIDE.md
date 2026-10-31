# IQ Push Map Creation Guide

Map data is defined as `MapData` entries in the `MAPS` list in `src/mapdata.rs`. This guide explains tile rules, map design requirements, and an example based on an existing map.

## Map Fields

- `title`: Map name.
- `metadata`: Five lines for the author and map description.
- `max_moves`, `max_box_moves`: Limits for player movement and box pushes.
- `rows`: A list of strings, with each string representing one row of map tiles. Rows may have different lengths. The longest row determines the map width. Maps support up to 100 columns by 60 rows.

## Tile Symbols

| Symbol | Meaning |
| --- | --- |
| `#` | Wall |
| (space) | Floor |
| `P` | Player starting position |
| `b` / `B` | Small box / large box |
| `s` / `S` | Small button / large button |
| `D` | Door and exit in the outer boundary. It opens when all buttons are pressed; step onto an open door to complete the level. |
| `O` | Pit or void. The player fails if they enter it, while a box pushed into it disappears. |

A small box (`b`) can press only small buttons (`s`). Large boxes (`B`) and the player can press both small and large buttons. One or more doors (`D`) may be placed in the map boundary, each replacing one tile of the outer wall line. A door is drawn in its default orientation when walls are above and below it, and rotated 90 degrees when walls are to its left and right. When all buttons are pressed, every door opens. Step onto any open door tile to complete the level. Boxes can only be pushed, not pulled.

## Ideas for Using `O` Pits

`O` is more than an obstacle: it lets the player choose to sacrifice or clear away a box. For example, a spare box blocking a passage can be pushed into a pit to open the route, while boxes needed for buttons are preserved. A box that falls into a pit cannot be recovered, so make sure not to lose one needed to press a button. The player fails upon entering a pit, so also account for a safe position from which to push a box without stepping into the pit.

## Placement Rules

Include `P`, at least one door (`D`), at least one box (`B` or `b`), and at least one button (`S` or `s`). Each `D` must replace a tile in the outer wall boundary. Check that the wall line continues on both sides of the door, either horizontally or vertically. Multiple `b`, `B`, `s`, and `S` tiles are allowed. Verify that the puzzle is solvable with the chosen box and button types and counts. Box pushes can create irreversible deadlocks, so check that each box can reach a button needed by the intended solution.

Maps may be up to 100 columns wide and 60 rows high. The current automatic validation checks for a player, at least one door `D` with a valid wall frame, at least one box (`B` or `b`), and at least one button (`S` or `s`). It does not check whether a door is actually on the map boundary, whether the box and button counts are compatible, whether routes are connected, or whether the puzzle is solvable. After adding or changing a map, test it in the game: press every button, open every door, and make sure the player can pass through a door.

## Testing and Publishing

Use **Practice play** to play a newly created map in the game and verify that it is solvable. Once you complete the map successfully, **Publish Map** becomes available. Select it to save the map to the database and make it public to everyone.

## Example: Final Approach

The following is the `Final Approach` map from `src/mapdata.rs`. It demonstrates several large boxes and large buttons. Floor tiles are represented by spaces, including the spaces beyond the exit door. Spaces at the ends of rows are intentional and must not be trimmed. `O` represents a pit; unlike floor, it cannot be entered by the player.

```text
###### 
#  BS# 
# BBS# 
#P #S### 
#      D 
######## 
```

The `D` tile is the exit. The floor space to its right represents the area beyond the door. There are multiple large boxes (`B`) and large buttons (`S`). Use `O` for pits and spaces for walkable floor, including floor passages that continue outside the boundary.

## Difficulty and Testing

Puzzle difficulty comes from box and button placement, the order in which boxes must be pushed, and how routes interfere with one another—not simply from map size. Adding more boxes alone does not make a good puzzle. Design meaningful solution steps and check the intended solution, especially when a wrong push can make the puzzle unsolvable. Also make sure restarting is possible when needed.

Setting `max_moves` or `max_box_moves` too low can make the move limit, rather than the puzzle logic, the main source of difficulty. Test the solution yourself and leave a reasonable margin. Automatic validation does not guarantee that a map is solvable. After adding or changing a map, play it from start to finish and verify that all buttons can be pressed and the player can pass through an open door on the boundary.

A map's difficulty group is determined by the average player rating, not by a value set on the map. The puzzle's design difficulty and its rating-based group are separate.