#!/usr/bin/env python3
"""Build a navigable frame and transcript study for selected gallery videos."""

import concurrent.futures
import csv
import html
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

import craft
import motion_sequences


HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
VIDEOS = json.loads((REPO / "gallery/videos.json").read_text())["videos"]
NUMBERS = [*range(1, 14), 16, 17, 28, *range(29, 36), *range(41, 75)]
# Seconds between library frames. Short clips are sampled more densely than one per second.
FRAME_STEP = {47: 0.25}
CURATED_FRAMES = {
    # Apple MacBook Pro M6: selected by reviewing the one-second contact sheet.
    # The cut detector misses the film's shifting masks and typography.
    34: [0, 2, 4, 6, 7, 8, 10, 11, 14, 16, 17, 19, 20, 22, 23, 27, 29, 32, 36, 39],
}
SHOT_NOTES = {
    # Google Labs Playground: one shot per camera idea, with its position, lens and move.
    35: {
        0: "Screen POV. A wide lens sits where the laptop is and looks up at her; the arched window frames her head.",
        2: "Same POV. Chat bubbles are composited in screen space, as if the lens is the phone receiving them.",
        5: "High over-the-shoulder onto the laptop, her hair soft in the foreground. First look at the product.",
        6: "Extreme macro on the screen, tilted. The pixel grid and cursor turn the prompt box into texture.",
        10: "Macro along the keyboard at key height. Fingers enter from frame right with very shallow focus.",
        12: "High three-quarter angle across the laptop. The ube latte jar in the foreground ties prop to prompt.",
        14: "Close side profile from below on a wide lens, lit by the window. A reaction beat.",
        15: "Locked-off, symmetrical wide of the brick nook. The mug on the table is the prop the game will reuse.",
        16: "Same lock-off, re-dressed as the game. The match frame is the transformation: nothing moves but the world.",
        18: "Worm's-eye wide from under the desk. Her foot on the desk forces deep perspective toward her knitting.",
        21: "Tabletop height. A yarn ball flies into the lens while the prompt UI floats beside her.",
        22: "Same camera; the wall bursts open into a racetrack. A cartoon cutaway inside the live set.",
        25: "Insert of her real cat on the cat tree, composited in front of the game world.",
        28: "Identical framing, now the illustrated giant-boss cat. Second match-frame transformation.",
        29: "Phone screen fills the frame. Pure gameplay, no room.",
        30: "First-person POV down at the phone in her hands, knitting on her lap.",
        33: "High-angle medium as she eats a sandwich in the hallway. Sets up the next prompt.",
        34: "One-point-perspective hallway, deep and centered, with her at the far end.",
        36: "Same hallway frame turned into a tower-defense lane; olives march along the real floor.",
        40: "Front-on lock-off of the living room as a haunted endless runner, HUD over the plate.",
        43: "Same plate swapped to a western level. The genre changes, the camera does not.",
        46: "Same plate again as a city platformer. Three genres from one locked-off shot.",
        50: "Eye-level, centered medium close-up on the orange sofa, eyes off camera. A thinking beat.",
        54: "Full-screen title card of the game she made. Push-in on the Share button.",
        55: "New character, same screen-POV grammar: phone held to the lens with a share notification.",
        57: "Locked-off centered wide of his room, window light from frame right.",
        58: "Same frame; the wall cracks into voxel blocks and the room starts to break apart.",
        60: "Full transformation into the ocean battle, with pixel-type tagline over the live plate.",
        63: "Glitch transition: RGB pixel smear collapses the image to black.",
        65: "End card. Pixel wordmark and line on black, the type style borrowed from the games.",
    },
    # Kevin Ngo's JavaScript animations: one frame per visual idea, transition or style move.
    41: {
        0: "Opening wide in torn paper and crayon: the girl in her lit window, the Claude spark in the night sky, paper planes climbing toward it.",
        3: "Insert on her notepad. The question appears word by word in hand lettering, her green sleeve entering from frame right.",
        5: "Warm reverse inside her room: yellow wall, pink curtains, her drawing of the spark pinned up. She lifts the folded note to send it.",
        6: "Back to the night sky. Her plane is one of many, each trailing a dashed flight line.",
        8: "Centered character shot. The spark holds her note like a sign, eyes closed, thinking.",
        10: "The answer becomes a list. Each love gets a flat color field and a lowercase caption: a newsprint book with letters floating up, 'words'.",
        11: "'the sea' on pink: the spark rides a newspaper boat over torn-paper waves. Subject and caption keep the same positions card to card.",
        13: "'rain': a cloud cut from newsprint over a green umbrella. Found paper keeps every card in one material.",
        14: "'the stars' breaks the square into a round night sky, with a planet, comet and spiral galaxy around the spark.",
        17: "Every card collapses into one heart collage around the spark, on a background of handwritten-letter texture.",
        19: "The spark folds its reply into a plane and sends it back down, reversing the opening flight.",
        22: "Her hands hold the reply: her own question with 'you' circled in red and a small spark drawn in the corner.",
        23: "Reaction close-up, eyes closed, wide smile. The ink shows through the paper backwards.",
        26: "She pins the note to her window, 'you' still circled, next to her drawing of the spark.",
        27: "The last frame matches the first. She writes again while new planes leave the other windows in town.",
    },
    42: {
        0: "Top-down specimen view of a fly on an orange. Fine cross-hatching and diagonal cream stripes give it the look of a natural-history engraving.",
        2: "Cut to a dark navy diagram: the egg as a thin outline with a dividing nucleus. A small lineage tree sketches itself in the corner.",
        3: "Nuclei multiply into a dotted lattice, and the tree in the corner branches with them.",
        6: "Green bands paint the body plan onto the embryo. Development reads as graphic design, with no labels.",
        7: "Back in warm paper: the larva breaks out of its egg onto fruit flesh drawn as pebble-like cells.",
        8: "The larva grows across the frame in one long diagonal.",
        9: "Pupal stage, back on navy: the adult forms inside the case as spiral clusters of cells.",
        10: "The adult climbs out of the brown pupal case onto the same orange as the first frame, wings still pale.",
        12: "Fly's-eye view: the world through a fisheye circle with faint hexagonal facets. Bananas, a window, a lamp, a spider and a cloud cut past.",
        13: "Inside the head: the brain as a glowing wiring diagram, the second science interlude.",
        14: "Top-down plate of fruit. Colored rings around the peach show the smell the fly is following.",
        15: "A fast top-down flight across the kitchen in two-frame hops: plate, lampshade, rug, tiles, curtain, window.",
        18: "Danger: a hatched shadow sweeps in, and red arcs and an arrow plot the fly's escape.",
        20: "Two flies face to face on the fruit at sunset. The male's wing song is drawn as a fan of lines with a target ring.",
        21: "Courtship as a diagram: pink and yellow looping paths trace the dance around the pair.",
        23: "Night, with tally marks counting days in the sky as she lays a neat row of eggs.",
        24: "A water drop on a leaf works as a lens. The window and sun bend inside it, with the fly at its edge.",
        26: "Back to the navy egg diagram with one dividing nucleus, so the cycle restarts. Signed 'opus 5'.",
    },
    43: {
        0: "Cream paper, one blue dot, one ring. The whole film grows from this mark.",
        1: "Arcs ripple out from the dot like sound waves. The graphic motif doubles as the soundtrack.",
        3: "The ring turns into a porthole onto a riso-printed jellyfish scene.",
        5: "Full-bleed riso scene: a temple bell struck, its rings echoing over halftone water. The pink and yellow inks sit slightly out of register.",
        7: "Montage of things that make sound: record, phone, frogs, bats, wave, a cat in the rain, a bee. Every subject sits on the same center dot.",
        8: "The wave curls around the center point. Each scene is composed around the dot, not around its subject.",
        10: "A Ferris wheel with its hub exactly on the dot, so the cut reads almost like a dissolve.",
        11: "Piano strings from above, curving like ripples. From here the cuts land every six frames.",
        13: "A snowflake at night. Even the quiet subjects are radial.",
        14: "Second pass: the same scenes return with a white ring drawn over them, now cutting every three frames.",
        15: "The cat at the rainy window again, inside the ring.",
        16: "Everything shrinks into a grid of round thumbnails around the dot: the whole montage at once.",
        17: "The thumbnails drain to blue dots and scatter, clearing the page.",
        20: "A pink dot appears and orbits the blue one: a second voice.",
        22: "A riso flower blooms where the two orbits meet.",
        24: "Night version: two ringed dots, blue and pink, circling each other.",
        25: "A sky full of ringed dots, many voices.",
        27: "End card: 'opus 5', a blue and a pink dot, and 'claude' below, all in the same hand lettering.",
    },
    44: {
        0: "Top-down specimen view of a bee on comb, the cells filled with different colors of pollen. The engraved, cross-hatched style of the fruit fly film.",
        1: "The bee drops to bare line work for a beat, showing the drawing underneath.",
        2: "Dark brown interlude: a seed-of-life rosette in thin blue line, geometry the film returns to at the end.",
        4: "The egg as a diagram, nuclei multiplying into a dotted lattice. The fruit fly film's template, recolored for the hive.",
        6: "Green and magenta bands paint the body plan onto the egg.",
        8: "Back in the comb: a curled larva in its cell, a worker leaning in to feed it.",
        10: "The pupa mounted in a wooden specimen frame, flanked by ghosted silhouettes of the stages before and after.",
        11: "Same frame, now holding the grey adult forming inside. One fixed layout works as a slideshow of stages.",
        12: "Emergence from inside the cell: only the mandibles break through the wax cap.",
        13: "Freshly emerged and still grey. A second later she is fully colored, so the color arriving is the bee maturing.",
        15: "Building comb: hexagons drawn first as construction geometry, then filled in as solid wax.",
        17: "The bee heads toward a bright opening, light falling in rays: the first flight out.",
        18: "Bee's-eye view: a sunflower rendered through hexagonal facets in a round vignette.",
        20: "Top-down map of the meadow, the flight path traced between flower patches.",
        21: "Side view of a blossoming apple branch against the sky, the longest-held composition in the film.",
        24: "A round inset diagrams the flower in cross-section as the bee works the blossom.",
        30: "Time-lapse in one held frame: petals drop and the blossoms swell into green apples while the bee keeps visiting.",
        38: "End of the hold: the branch is heavy with ripening fruit.",
        40: "Waggle dance on the dark comb. A red line traces the run and its angle to a small sun icon.",
        42: "The dance decoded: the same angle laid over the meadow map, with distance ticks pointing to the flowers.",
        43: "Two bees face to face, mirrored from above, passing food.",
        45: "Capping honey: amber cells under fine hatching.",
        46: "The hive entrance in a hollow tree at night. Tally marks in the sky count the days.",
        47: "Same framing by day, with more tallies. A locked-off match cut passes time.",
        48: "Inside the hive: a symmetrical one-point view out through the entrance.",
        49: "Push-in to the bee's face, the outside world reflected upside down in its eye.",
        52: "Ends on the seed-of-life geometry, signed 'op'.",
    },
    45: {
        0: "Split screen, same prompt. Left, Sonnet 5: flat silhouettes on blocks of color. Right, Sonnet 5.5: ballpoint and crayon on cream, an eye peering out of a cracked egg.",
        2: "Sonnet 5.5 hatches its character and adds a running caption, '230 million years ago'. The left panel never uses text.",
        5: "The hatchling chases a dragonfly. The right panel gives its character something to want.",
        8: "160 million years ago: teal-striped sauropod legs fill the frame, with the little dinosaur underneath for scale.",
        14: "68 million years ago: a scribbled orange sun with the little dinosaur in front of it.",
        15: "The sun becomes a T. rex eye, a match cut on the circle. The left panel never changes its framing.",
        17: "Both models reach for the same beat, a volcano and a T. rex: a black triangle on the left, a snarling crayon drawing on the right.",
        19: "The busiest frame: T. rex, Triceratops and pterosaurs overlapping in loose ballpoint.",
        25: "A red target ring marks the asteroid before impact.",
        27: "Impact. The right panel shatters into a yellow scribbled starburst; the left goes black with embers.",
        29: "Graphite scribbles fill the sky with ash. The caption ticks to '66 million years ago'.",
        32: "Black crayon sky drips down over an empty white ground. Texture carries the mood instead of color.",
        35: "A small survivor curls up next to a skeleton under a pale moon.",
        39: "Life returns as ferns unfurl, '40 million years ago'.",
        41: "'5 million years ago': a shaggy mammal among the ferns. On the left, a flock of bird silhouettes.",
        43: "'0 million years ago': a robin on a branch, eyeing a worm.",
        44: "Same branch, same worm, the robin swapped for a T. rex. The match cut makes the film's point: birds are dinosaurs.",
        46: "The caption types 'still here.' under an egg in a nest. The film ends on an egg, as it began.",
    },
    46: {
        0: "Opens on the finished picture: a sunrise meadow, the orange block creature, a rainbow pond, and a dip pen at frame right. Signed 'opus 5'.",
        1: "The same picture flips to night, a preview of the middle of the story.",
        3: "Back to a blank page. The pen sets the horizon, with Bézier handles, construction circles and a grid over cross-hatched paper.",
        5: "The body is blocked in as a rectangle and scribbled in with orange-red crayon.",
        7: "Legs, side nubs and closed eyes. A spark is drawn above the head, the construction guides still showing.",
        8: "The eyes open. The character comes alive the moment its eyes are drawn.",
        11: "Cut to the finished night scene. The pen leans in from the top right as a character in its own right.",
        13: "Close on the creature as the pen points at a star, a dandelion clock beside them.",
        15: "The pen connects stars freehand on a hatched navy sky.",
        17: "The constellation turns out to be the creature.",
        18: "A spirograph rose drawn by the pen on teal, a show-off flourish.",
        19: "A Lissajous figure on a blueprint grid, the creature watching from the corner.",
        20: "The creature gets dizzy: spiral eyes.",
        21: "It tips over and a small block falls off.",
        28: "Happy '^ ^' eyes as the pen taps the ground and a sparkle pops.",
        30: "A '> <' squint as the pen pokes the ground beside it. A comic beat between two characters.",
        33: "A gold star pops out of the constellation.",
        37: "Dawn wipes in across the night sky.",
        40: "The pen paints a butterfly and flowers into the grass.",
        41: "Low angle up at the pen as it draws a cloud and birds.",
        47: "The pen signs 'opus 5' on a torn paper scrap while the creature squints.",
        48: "The film closes on its opening picture, so it loops.",
    },
    # Kimi Code tutorial #4: only the first eight seconds, the cold open, sampled every quarter second.
    47: {
        0: "Establishing wide from behind the black spiral-stair railing. A tall, quiet loft with her small at the far desk; only the K mark sits in the corner.",
        1: "Cut to an eye-level medium in warm window light as she writes. 'Build' sets in a light serif in the empty wall above her shoulder.",
        1.75: "'3D' and 'Websites' land, the second word on the red panel at right. Each word takes its own patch of empty wall, so the title wraps around her and never crosses her.",
        2.25: "'With' fills the gap at left. The whole title is set in about a second and a half, word by word.",
        2.75: "A punch-in as she turns the page. The title is already typing itself out letter by letter ('Build 3D' is down to 'B') while 'Kimi Code' arrives low at right by the laptop.",
        3.25: "Cut to a lateral move behind a red pillar, the room empty. 'Kimi [Quick G' types in at left over the KIMI Academy series mark.",
        3.5: "'Kimi Cod [Quick Guide]'. Both lines type at once, each at its own pace.",
        4: "The brackets drop away, leaving a plain two-line series card. A small type edit, timed as its own beat.",
        4.25: "The camera keeps moving while the card holds still; the blurred pillar slides across the frame and sells the depth.",
        4.75: "Cut back to her, now looking straight into the lens. The b-roll ends and she starts talking to you.",
        5.5: "The name label decodes in from glyph noise, still reading 'R0quel', as the small caption 'Hi, I'm Raquel' appears below.",
        6.25: "It settles to 'Raquel, KIMI Global Team' in the same serif as the title, tying the lower third to the opening type.",
        7.25: "Hard switch to a paper-texture board. Her shot shrinks into a framed card as two AI-built ceramics sites slide in at left.",
        7.75: "The settled layout: two sites stacked at left, her card at right, and the caption 'Both of these websites were built with AI' sets up the tutorial's comparison.",
    },
    # HACKING GOOGLE EP002: one frame per visual idea across a 16-minute documentary.
    48: {
        5: "The cold open starts in history: engraved Victorian firemen in red, the fire-department metaphor set up before a single computer appears.",
        10: "A sprinkler patent drawing on cream paper. Each invention in the timeline gets its own period material.",
        30: "The 'precious things' montage: warm, shallow-focus inserts of heirlooms, photos and kids, the things a fire would take.",
        45: "The spark: an extreme close-up on an email, 'Check out this exploit'. A digital arson that ignites with a click.",
        50: "The click detonates into a red and pink pixel mosaic, the series' glitch transition.",
        65: "First look at the set: a subject sits small in front of a huge LED wall showing the red warning triangle.",
        95: "Episode card in monospace on the dark LED wall, the subject still seated beneath it. Title and interview share one space.",
        100: "Matt Linton's interview look: standing, mohawk, black tee, flat pale dotted backdrop. The lower third is set in small spaced caps.",
        120: "His backstory is hung like a gallery: a framed portrait on a mint wall.",
        130: "Certificates in gilt frames on navy. The camera dollies across each one like a museum wall.",
        145: "A real résumé screen for the punchline, 'Yep... NASA.'",
        225: "Royal Hansen introduced through bonsai, the hobby before the job title. Each new voice gets a human detail first.",
        255: "The internet drawn as a white voxel city of app icons. This 3D block world carries every abstract idea in the film.",
        270: "Fatima Rivera interviewed in front of that same block world on the LED wall, so the graphic and the person share the frame.",
        300: "Tim Nguyen on stage while a video call plays on the wall behind him, a callback to his role in episode one.",
        355: "The heist becomes a recipe: a screen-recorded search for 'popular mens name in US', cut to Etta James' 'Trust in Me'.",
        365: "The list scrolls and stops on '30. Carter'. A highlighted pick, played for comedy.",
        410: "The finished fake, Carter Edwards, on a tilted white plane. The UI is tipped into 3D rather than shown flat.",
        420: "The camera pulls back to an entire network of invented researchers, the army spreading across the plane.",
        455: "The approach as chat bubbles: 'Can you look at my work?' Plain message UI, no device chrome.",
        470: "The vulnerability report glitches apart mid-read: the attack shown as corrupted text.",
        500: "Archival footage of North Korean computer labs, used sparingly against the clean studio look.",
        550: "The lineup: each fake profile projected huge behind the interviewee as he's asked 'Have you talked to Piper Webster?'",
        565: "Carter Edwards' profile, with a wink chime. 'That's the spark.'",
        585: "The fire as a red voxel sculpture flickering on the wall beside Matt. The metaphor stays in the block-world style.",
        620: "Alex Stamos, the outside voice, gets a different set: a warm, dark room with lockers instead of the LED stage.",
        660: "The fleet check: Tim sits small in a white void while laptops float around him, every machine at Google checked.",
        680: "A globe of data points on the LED wall, the subject tiny at its base. Scale shown with one person.",
        720: "Rubik's cube macro for Matt's analogy about analysts solving a jumble into a clear picture.",
        795: "The hunt as a top-down maze, a red attacker boxed in by the white walls.",
        815: "A red trail snaking through the voxel world: the attacker's path, then the fire spreading.",
        855: "The reveal wide: Matt seated before a full LED wall of fire. The stage is the effect.",
        860: "A high angle shows the LED volume and its rig, admitting how the film is made.",
        895: "Blue blocks close over the red: the fire is out, in the same visual language.",
        920: "Epilogue in real offices: handheld, candid, warm light after the controlled stage.",
        980: "Next-episode tease framed as a 'PLEASE STAND BY' TV test card in pixel blocks.",
    },
    # Notion x La Cabra: the Chelsea flagship opening.
    49: {
        0: "Opening on the High Line through the slanted window frames of the empty shell.",
        2: "'just off the manhattan high line' handwritten in white, staggered over three lines. Handwriting is the film's only type.",
        3: "The caption holds across the cut into the construction site, linking place to project.",
        8: "Esben Piper walks into the raw space and across frame before he ever speaks.",
        11: "The interview set is a wide of him at a table of plans in the unfinished shell, a white sheet as backdrop.",
        13: "The Notion mark rides a whip-blurred brownstone, a logo bug set into the city.",
        14: "Steel bridge truss from below, a restless handheld city montage at the pace of the music.",
        20: "His name handwritten beside him as he drinks: 'Esben Piper'.",
        21: "Cut back to the wide for 'La Cabra'. The name and the company land on two different shots.",
        23: "Photos of the plans laid out in a row on pale blue, like a Notion gallery view without the interface.",
        27: "Barista tamping, a matcha whisk in the foreground. Craft inserts at counter height.",
        36: "A pour-over framed through flowers and stems. Foreground layers in almost every café shot.",
        40: "The room seen through a round window, a porthole frame.",
        45: "Esben tasting at the bar, staff and guests soft behind him. Long lens, shallow focus.",
        51: "The roaster's cooling tray, beans stirred in macro.",
        57: "Notion appears only as a laptop on a café table, no screen recording.",
        61: "Back to Esben at the window seat, smiling into his cup.",
        65: "The wide in the raw shell returns: the film ends where it began, before the opening.",
        66: "Notion end card on off-white: the cube icon first, then the wordmark.",
    },
    # Notion x La Cabra: operations across locations.
    50: {
        0: "Cyril Alcazar on a white bouclé sofa against tall windows, a locked-off, bright interview wide.",
        2: "Pastry macro through glass, gloved hands. Short craft inserts carry the pace.",
        6: "The Notion mark floats over the Manhattan skyline from a rooftop.",
        9: "The La Cabra flag fills the frame, the brand's own line drawing.",
        11: "Product UI on a brand-yellow field: the 'La Cabra Locations' map in Notion, shown as a clean card.",
        13: "The card zooms out from New York to the world map: Brooklyn, Denmark, the Middle East.",
        16: "Following a barista into the café from behind, a walk-in establishing shot.",
        22: "Espresso pulling into a steel cup, low and close.",
        24: "Name in the same white handwriting as the Grand Opening film, with the title in small caps: 'Cyril Alcazar, Managing Director'.",
        27: "'chelsea, new york' written over the build site, reusing footage from the opening film.",
        33: "A tighter angle for the confession about Google Sheets.",
        38: "Roaster drum and beans in macro.",
        42: "A queue outside, seen through the café window.",
        51: "Overhead of the café floor down the stair.",
        56: "Guests seen through the porthole window again, a shot shared with the companion film.",
        60: "The Notion AI face pops in beside him on 'you just type what you want'.",
        61: "Three prompt chips stack above the face: expenses, the weekly huddle summary, missed emails. UI as a caption.",
        63: "The same chips hold over the cut to the wide.",
        64: "La Cabra's raised letters on painted brick.",
        66: "Liz Whitman's handwritten lower third at the roastery.",
        70: "Overhead of a laptop on a round café table, the only product shot.",
        81: "Symmetrical wide of the bar: three baristas, one counter.",
        85: "A tight closing interview: Notion as the one place the team feeds and pulls from.",
        93: "Notion wordmark on cream, a warmer end card than the first film.",
    },
    # Notion x Monumental Labs: proposals drafted by a Notion agent.
    51: {
        0: "Micah Springut on a phone-style front camera: a yellow wall, a white angel sculpture and a carver at work behind him.",
        2: "Cool teal light on a huge marble figure in the warehouse, two people for scale.",
        4: "A carver in a respirator sands stone, lit with the same teal cast.",
        8: "Lower third in small white sans: 'Micah Springut, Founder & CEO'. Plain, unlike Notion's handwritten captions.",
        10: "Macro of a gloved hand and a chisel in stone.",
        20: "A robot arm cutting marble through spray, the turn from hand craft to automation.",
        24: "Three app icons pop around his head, the tools the agent will replace.",
        26: "Co-brand card: 'Notion × Monumental Labs' in black on white.",
        28: "Chet Lubarsky, Lead Estimator, in the same selfie framing, the sculpture behind him.",
        32: "Screen recording of the Opportunities database, shown full-frame and unstyled.",
        39: "Scrolling the meeting notes and project info the agent will read.",
        45: "A punch-in on the sidebar's agents: Proposal Generator, GPCalc, Slacker Sales Guy.",
        48: "The Proposal Generator prompt is typed in with the project and template mentioned.",
        57: "The result: 'Proposal – Athena Sculpture' under the Monumental Labs logo.",
        62: "A long scroll through the generated scope, terms and timeline.",
        72: "The Notion AI face sits beside Chet as he talks about 'the little agent in the corner'.",
        81: "Drive, Jira, Slack, Asana, Zendesk, GitHub and Teams icons orbit on white.",
        83: "The icons draw in and tighten into a ring.",
        84: "They collapse into the Notion cube.",
        89: "Walking through the stone yard among blocks and robots.",
        90: "A carver's eyes over a dust mask and headphones, 'what they do best'.",
        94: "Notion wordmark end card.",
    },
    # Google Gemini, Tasks: one "Right now, I'm…" line per person, each in their own world.
    52: {
        0: "Cold open on a long lens down a Harlem street at golden hour, the 158th Street corner in frame. Deep, compressed perspective.",
        2: "Side-on tracking shot as she runs past construction barriers: 'Right now, I'm reworking my business plan.' Gemini works while she doesn't.",
        5: "Handheld close-up mid-run as she talks to us. Every character gets the same 'Right now…' line in a different world.",
        7: "Hard cut from the city to a dairy farm: a wide with a pickup in the foreground and cows across the field.",
        9: "Medium on the farmer at a fence post. A cow moos and he answers, 'Yeah, I hear ya.' The film's comic rhythm in one beat.",
        11: "Product in situ: Gemini's task list on a phone propped on a saddle, finished steps in grey, the live step in white with animated dots.",
        13: "Pink tiled bathroom, a woman in a headwrap painting her toenails as she glances to camera.",
        16: "Her phone among the makeup: 'Checking marketplaces for used c…' at the foot of a vertical timeline of steps. Each phone insert is dressed with its owner's things.",
        17: "Pool shot from lane-line height for 'I'm planning my semester abroad.'",
        21: "Restaurant kitchen through foreground clutter, steam and flame: 'comparing 15 different napkin suppliers.'",
        24: "A cyclist under the elevated tracks, taxis passing: the start of a fast, motion-blurred city montage.",
        28: "Locked-off wide of a sunroom full of cats. She reads the paper as a second voice adds, 'I'm also doing that.'",
        31: "Genre parody: a storm reporter in the rain under a full news lower third, 'STORM MAKES LANDFALL'.",
        38: "Close on a partygoer in a giraffe costume, red cup in hand. The gag is the gap between the setting and the task.",
        40: "Low, dark bedroom shot of someone asleep: 'I'm keeping an eye on Doja Cat tickets.'",
        42: "Symmetrical wide of an empty ice rink under an arched roof, a Zamboni mid-frame: 'I'm researching vacations.'",
        44: "Hotel room wide, a man bent over his ironing board: 'I'm ironing my tie… but I'm also revising my presentation.'",
        48: "The payoff insert: a notification on his phone, 'Presentation Formatting: Updated styles across all slides.'",
        50: "Back to the bathroom phone: 'Car Listings Found: Added four more vehicles near you.' The setups pay off in order.",
        51: "She looks up from her toes: 'I did it.'",
        52: "Back to the opening street, now from the ground: the runner jumps in the middle of the road, 'I did it!'",
        55: "'LOOK' lands in heavy condensed white caps over the street, with no animation on the word itself.",
        56: "'LOOK WHAT YOU CAN DO.' The jumping runner stays in front of the 'U', so the type sits inside the shot.",
        57: "End card on black: a Chat/Task toggle, the white pill on Task with a soft glow.",
        59: "Google Gemini lockup, with 'Try Tasks for free in the Gemini app' in small type below.",
    },
    # TED-Ed, 4 ways to tell a great story: flat dots on flat color, animated by Kozmonot Animation Studio.
    53: {
        2: "A quote card in thin grey type, Audre Lorde's 'What is most important to me must be spoken…'. Four seconds of stillness before the animation.",
        9: "The visual system in one frame: flat dots on cream, the red dot at the center, five friends on spring-like lines. People are dots for the rest of the film.",
        14: "A pull-back through type: the network turns out to sit inside the O of 'STORY'. Lime type on salmon.",
        18: "'Stories helped make us who we are…' in a rounded sans, the last line in lime. The ellipsis is three red dots, and they will move.",
        23: "Cave painting in white line on red: hunters, a canoe, a spiral. Inside the circle the camera just dived through.",
        29: "Dots queue into a cloud outline that grows brain folds: ideas entering a mind.",
        33: "Campfire on purple, ringed by dashed circles and rows of dots. The fire is the film's one textured, hand-animated element.",
        42: "The fire flares into a vortex of flame bands inside the rings, the start of a transition rather than a scene.",
        47: "The same fire relit on green, yellow-green dots for the people around it.",
        53: "A red dot by the fire grows a tiny speech bubble. The camera is about to dive into it.",
        57: "Inside the bubble, the next red dot opens like a porthole onto a lime disc with the fire.",
        63: "Near and far as scale: a huge green disc, a small dot, a speck with a ripple ring.",
        68: "Dots become emoji faces for laughter, tension and amazement.",
        76: "Stories spread: a dense constellation of dots and lines, big dots passing close as the camera pulls back.",
        79: "The constellation resolves into a world map made of the same dots.",
        84: "The storyteller as the red dot on top of a pyramid of purple listeners.",
        92: "Hearts in a six-fold pattern: the listeners' response.",
        97: "Dots smear and stretch like liquid while they rearrange.",
        102: "The amphitheater: a speaker dot at the top, listeners in a fan, red arcs as sound waves. The layout returns three times.",
        114: "Story structure as a physics toy: a ball with a goal (the flag in its thought bubble) against a triangle obstacle.",
        119: "A plank turns the obstacle into a seesaw, and the ball rides it over the top.",
        126: "'4 keys' in a purple badge on sky blue.",
        131: "Key 1, character: a red dot ringed by cyan listeners. Number and label in a heavy rounded sans.",
        133: "Center and ring turn the same blue. Empathy is shown as shared color.",
        137: "Key 2, tension: the dot on a seesaw against a question mark.",
        142: "The question mark becomes a warning sign, the danger version of tension.",
        145: "Key 3, detail: a circle packed with fine hatching, too much detail.",
        151: "The hatching thins and the circle fills solid: the right amount.",
        155: "Key 4, conclusion: one dot has divided into three.",
        158: "The third dot cycles through the kinds of ending: funny, moving, surprising. Here, the heart.",
        169: "The journey: icons strung on one white line that climbs to a peak and falls, a talk's throughline as a plot graph.",
        175: "A ring of triangles around a purple center, about to fold into the compass.",
        179: "The compass travels and draws the line behind it.",
        184: "The trap: a tightrope that hinges open under the dot.",
        185: "A glitch between scenes: vertical streaks and a muddy color shift, the film's only rough texture.",
        192: "The gift: a light-blue circle whose three dots turn into faces.",
        200: "What the audience takes away, one icon at a time: an eye for a new way of understanding.",
        203: "A play button: actionable information.",
        205: "A dove: hope.",
        208: "Rambling: the ellipsis inside a sun of rays that keep turning.",
        213: "'meaning' handwritten in one continuous red line, confetti all around.",
        226: "The compass needle swings toward a fist, 'powerful'. Each value is a direction.",
        232: "A purple heart pulses by the needle: vulnerability.",
        245: "Three dots with checkmarks: the story has to be true.",
        250: "Exaggeration: the dots inflate, their red cores draining to empty orange halos.",
        257: "A spotlight on a stage. The dot grows while it stands in the light.",
        264: "A reputation drawn as a star that cracks before it shatters.",
        275: "The gift sends out sound-wave arcs on both sides.",
        279: "Callback: the campfire network from the opening returns.",
        284: "'Let it mean something…', the red ellipsis ticking in.",
        298: "The credits bar slides up under a recap of the triangle ring.",
    },
    # TED-Ed, What is sumo: ukiyo-e color and character animation by Masayoshi Nakamura and Good General.
    54: {
        2: "A quote card in thin grey type: 'The object in sumo is simple: knock your opponent out of the circle or down to the ground.' The circle is the film's thesis.",
        7: "Opening map: Japan as one flat yellow shape over a teal-to-coral gradient, pink cloud bands drifting. The palette for the whole film.",
        12: "Straight down onto a street: a wrestler's topknot, the crowd as heads with hats. Flat ukiyo-e color with clean, even line.",
        16: "Two pros from the Tokyo guild in dark jackets, arms folded. Even faces and weight, no shading, just line and fill.",
        21: "Their backs to us, 東京 and 相撲 across the jackets. Type is carried by costume, not captions.",
        29: "After the slash: one pro down, the other clutching his head. The violence is implied by a cut.",
        35: "A one-point road to the horizon, the runner centered. The film loves symmetrical, locked-off frames.",
        43: "He reaches the magistrate's house, which rose from the horizon to fill the frame.",
        51: "The magistrate lifts his decree, framed symmetrically between teal sayagata panels.",
        55: "A lone wrestler on a blank cream ground, arms raised. The ritual is staged with nothing around it.",
        62: "Mid-stomp, leg high, body tilted: the strongest pose in the film's animation.",
        67: "Petals dissolve the wrestler. Particles carry the transition from Edo back to the imperial court.",
        73: "The emperor on his red-railed platform under a coral sky, petals falling.",
        79: "The wrestlers flank the emperor in profile, a frieze composition.",
        87: "The throw: one wrestler upended in a high arc while the emperor watches, unmoved.",
        91: "A close two-shot as they clash, the only close framing in the court scene.",
        98: "Inside a tunnel of flat colored planes, the perspective built from trapezoids.",
        101: "The samurai helmet as a character, pink face, white moustache, gold crest.",
        105: "Its turnaround: the helmet seen from the back.",
        109: "Two wrestlers on a black hill silhouette, the sky shifting to teal.",
        117: "The collage: a boat, a bridge, cherry trees and a giant blue Buddha in overlapping layers.",
        121: "Fuji, a temple, cranes and wrestlers in one stacked ukiyo-e composition.",
        127: "A torii and offering box alone on the gradient, coins falling in: sumo as fundraising.",
        136: "The wrestler steps into a spinning sunburst of coral, teal and cream wedges.",
        142: "The guild hall on a pink-to-lime gradient, 相撲会所 on its front.",
        152: "The queue of customers stretches across frame, each figure a different costume.",
        156: "Street-corner sumo between shopfronts, spectators at the edges.",
        166: "A cartoon dust cloud with stars, the brawl drawn as a gag.",
        176: "Red crosses spread across the map: bans in the cities.",
        185: "The boundary drawn in as a single ellipse around the crouching pair.",
        191: "Top-down, the boundary mid-morph: the rule is still being decided.",
        196: "土俵 / DOHYO, white on the gradient, the film's one title card.",
        206: "Falling backwards out of the ring into grey.",
        209: "Mid-fall, he gets heavier: belt now gold, body rounder.",
        214: "Torii, lanterns and fox statues rising out of the dark.",
        222: "Five wrestlers in a floating ring of held hands.",
        229: "Rinsing with the ladle, one gesture held.",
        234: "The ritual again: the exact animation from 0:54 reused, now as an invented tradition.",
        255: "The rope pulled tight by two helpers in a glowing burst.",
        256: "The finished yokozuna, zigzag streamers at his waist, on a perspective grid.",
        264: "A full court of doll-wrestlers flanking the shōgun on his dais.",
        270: "A giant hand pinches the shōgun off his dais: 1868 as a gesture.",
        281: "The modern arena, stands rising around a small ring.",
        292: "The bout on a TV screen, a gunbai fan held in front.",
        300: "The thin wrestler mid-inflation, belly swelling sideways.",
        318: "Banners and portraits at the top of the arena, the end of a long tilt up.",
        323: "End card: a red-and-white map of castles and roads on a grid.",
    },
    # TED-Ed, The incredible engineering of Venice: flat geometric shapes and circle transitions, directed by Sofia Pashaei.
    55: {
        2: "A quote card in thin grey type: Erica Jong's 'It is two cities: one above and seemingly solid; one below and reflected in the waters.'",
        7: "A storybook opens on lavender, a walled city printed across its pages. The history is framed as a book being read.",
        14: "Raiders and flames across the plan, all icons with no outlines.",
        17: "The sea as stacked bands of blue under a gradient sky, the film's water everywhere.",
        20: "Pink horsemen in the foreground, boats behind. Shapes are geometric and flat, with no line work at all.",
        23: "Top-down: boats among sand-colored islands on one flat blue.",
        30: "A map of the lagoon with yellow arrows for the rivers, labelled Po and Piave.",
        38: "The islands shift and split between the arrows: the lagoon refuses to stay put.",
        42: "A figure peeks out from behind a leaf in a cream square: the lagoon as the perfect place to hide.",
        47: "Wooden blocks hover over the sea in isometric, about to be stacked.",
        52: "A giant hand assembles a house from the blocks. Scale is used for emphasis, not realism.",
        59: "Fishermen's stilted huts in a row on the water bands.",
        63: "A huge yellow boot steps onto the mud, the newcomers arriving. Scale jumps are the film's emphasis.",
        70: "A white palace on a blue base under a gradient sky, Venice as one composed object.",
        76: "Cross-section: a pile pressed into banded mud by a giant pair of fingers.",
        79: "The row of piles, each one driven by the same loop.",
        89: "Close on the sealed wood with insects and fungus that can't get in.",
        99: "Sparkles across the clean wood, the oxygen-free seal.",
        117: "Platform and stone stacked on the piles: the whole foundation in one cross-section.",
        124: "The palace again, now with a flag on top: the Republic declared.",
        130: "Wooden footbridges between pink buildings, the foreground framing the canal.",
        134: "Small flames along the bridges.",
        138: "The Rialto's first version, a grey wooden arch, labelled on lavender.",
        142: "The second version in white stone on the same spot.",
        145: "The final covered Rialto, the third design on the same spot.",
        150: "Top-down canals with gondolas in motion, a map that moves.",
        162: "Everyone travels by gondola, nobles and commoners in the same boat.",
        171: "A seed dropped from a giant hand: no land to farm.",
        180: "The Mediterranean on an oval card, sea routes radiating from Venice.",
        190: "The city's canal plan on the same oval card.",
        200: "The Rialto with ships passing beneath, on the oval.",
        217: "The Fourth Crusade Agreement on a cream document with a scalloped border.",
        223: "Two hands clasp on coral: the deal with Dandolo.",
        230: "San Marco above a fleet of galleys.",
        236: "A hand holding up a gold coin, the payment that fell short.",
        245: "The red route from Venice curling through the Aegean to Constantinople.",
        250: "The Venetian flag, the lion of Saint Mark, flying.",
        253: "A merchant ship in profile, bobbing on the bands.",
        258: "The Silk Road traced across Asia to Yuan China.",
        265: "A colonnade with a palette and a book in its arches, the Renaissance.",
        280: "Loom, printing press and glassware panels in a scrolling row.",
        287: "'ART', 'SILK', 'SPICES' in a column on lavender.",
        292: "The words replaced by rows of people: the enslaved trade said by substitution.",
        298: "The Grand Canal façades with a gondolier passing.",
        303: "A 'Venice' guidebook, the turn toward tourism foreshadowed.",
        308: "The guidebook's page: an Ottoman army before the Hagia Sophia.",
        315: "Galleys and new transoceanic ships crossing.",
        320: "A hand holding the Venetian flag.",
        330: "Venice under a flag that keeps changing as it passes between France and Austria.",
        346: "A Venice postcard held in a hand.",
        350: "Deck chairs and a white box drift on the lagoon below the campanile: the tourist city.",
        360: "San Marco with the water partway up its base, mid-flood.",
        375: "Top-down traffic of motorboats in lanes.",
        385: "Tourists' backs blocking the view from a loggia.",
        400: "End card: the red map of castles and roads, shared across TED-Ed lessons.",
    },
    # TED-Ed, Do imaginary friends make you smarter?: hand-drawn character animation directed by Caitlin McCarthy.
    56: {
        2: "Partner card: 'This lesson was made in partnership with LEGO, LEGO Foundation.'",
        7: "A pink hand and a blue hand grip in close-up. The relationship before the characters.",
        9: "Amia and Zelba hand in hand on yellow: flat saturated color with thin colored outlines, Zelba already glowing.",
        12: "Inside the whisper bloom: flat orange, with faint line art drawing in at the edges.",
        15: "Memory as line art: the two of them ruling a castle, drawn in thin blue line on turquoise.",
        19: "Amia's face in orange line on yellow, doodles drifting out as she talks.",
        23: "The same faces after a red wash, Zelba's color drained to pink.",
        26: "Line-art dinner: the spaghetti goes on her head.",
        31: "Color blooms back: the bad idea in full color, Amia smiling under the noodles.",
        33: "Extreme close-ups of the parents, frozen in shock.",
        36: "Zelba fades in at the table and hugs her, glowing.",
        41: "A yellow thought cloud on pink with sparkles: what the two of them share.",
        45: "Other kids crowd in from the bottom edge, reaching.",
        49: "The pair melted to a line with bumps, mid-morph into a family.",
        53: "The family with a blue friend and a monkey added at the edges.",
        57: "Top-down playground, every kid on a loop.",
        64: "Alone at a birthday table, blowing out candles.",
        72: "The table packed with imaginary guests of every shape.",
        77: "Line-drawn kids on pink, each one's imaginary friend in color beside them.",
        80: "Zelba as a blue heart around Amia.",
        84: "A story cloud with a sea serpent blooms in the classroom.",
        88: "Words and equations stream out of Amia's mouth in blue script.",
        94: "The teacher's pointing arm, the same swing on a loop.",
        106: "Zelba as a blue cat, one of many shapes in a few seconds.",
        110: "Imaginary friends in trios: an old woman, a girl, a dancer.",
        112: "A princess, a witch and a long-nosed puppet.",
        117: "A family of yellow creatures, each bouncing on its own loop.",
        123: "The toybox open, toys climbing out.",
        131: "A globe with companions popping onto its surface.",
        134: "The film within the film: an audience watching Amia and Zelba on a projected flag.",
        141: "A cartoon car with a face on the projected screen.",
        147: "Companions turned into shapes with faces: heart, rectangle, triangle, star.",
        151: "A child in bed with a blue companion sprawled on the rug, a cozy cutaway room.",
        152: "A pink companion as the scapegoat for 'I ♥ MUMMY' drawn on the wall.",
        154: "A toy car racing across the rug as an errand buddy.",
        156: "Feeding a baby companion with a spoon: the caregiving role.",
        163: "'COMPANIONS' hand-lettered in a ring of small characters.",
        168: "Amia and a row of Zelbas collide, colored echoes behind each.",
        170: "The fight as a yellow cartoon cloud.",
        172: "Zelba as a spiky monster over a crouching Amia.",
        177: "Warm orange: the monster softens back into Zelba.",
        180: "A hug on orange, the conflict over.",
        183: "Three kids on yellow with companions passing between them.",
        191: "The sea serpent wrapped around Amia in a spiral.",
        198: "An argument in jagged shapes between close profiles.",
        205: "Two girls make up, then hug.",
        212: "The rooftop at night with dotted-line drawings in the sky.",
        215: "Zelba moves to sit on the far wall, away from her.",
        222: "Zelba has flickered out; Amia alone under a shooting star.",
        226: "The empty rooftop as she leaves through the door.",
        232: "Polaroids of Amia at 2, 7, 14, 18, 25, 36, 53 and 87.",
        236: "A round table of kids and companions, all equal.",
        247: "The barbell grown huge, Amia hoisting it overhead.",
        252: "'THEORY OF MIND' arcing over Amia and Zelba.",
        261: "Zelba's arms stretch round the whole group.",
        265: "Zelba on the bathroom counter by the sink.",
        269: "The reflection is grown-up Amia.",
        271: "Rehearsing in the shower.",
        274: "Grown-up Amia talking to her cat from the sofa.",
        278: "The room is a dollhouse with Zelba looking in.",
        284: "Grown-up Amia and Zelba side by side with drinks.",
        290: "A girl with her own pink imaginary friend walks past.",
        300: "End card: the family of yellow creatures again, 'TED.COM/PLAY' above.",
    },
    # MoMA, How to Make an Artist Book: Rhea Karam's studio demonstration, live action with section titles and reference cards.
    57: {
        0: "Opening wide: Rhea Karam at her desk in a white studio of pinned prints and colored spines. Her magenta T-shirt is the strongest color in every wide.",
        4: "Insert on the pinboard: an accordion dummy of brick and tile photographs hanging from a clip. The cold open starts with the object, not the person.",
        7: "Hands open the two-sided dummy on the table, both halves fanning at once. The finished idea is shown before any step.",
        18: "Series title over a low macro of pages fanned around the spine: 'In the Studio' small, 'Bookmaking' large, bold white sans at top left.",
        29: "Reference card: the work as a photo at right on white, with artist, italic title and year set small in black at bottom left. Every outside reference uses this layout.",
        34: "Delaunay's book unfolded to its full length as a cutout on white, one tall strip filling the frame height.",
        48: "Her own small accordion of street photographs pulled open on her lap.",
        57: "Section title 'Book design' over the top-down sketchbook: the book drawn as rough boxes, flat, open and standing.",
        63: "Pencil close-up in shallow focus, the words of the sketch soft beyond the hand.",
        100: "Her book ECHO as a cutout on white, fanned so each photographed wall reads as one vertical strip.",
        107: "ECHO turned edge-on with the caption 'Rhea Karam / ECHO. 2025', the same card type used for MoMA's collection.",
        110: "Her wheatpaste on a painted brick wall: a blue square with yellow and red triangles. The book's palette comes from the street.",
        116: "Section title 'Book dummies' over a color-block accordion dummy standing open on the desk.",
        144: "The cast-concrete brick slipcase with her name cast into it, one of many material tests for a single book.",
        172: "Overhead on the finished dummy: both halves open, strip after strip of wall side by side.",
        180: "Section title 'Printing' over the Epson feeding a print. Every chapter opens with its name in the same place.",
        205: "Screen insert: two spreads placed on one sheet in her layout software, crop marks at the corners.",
        224: "Paper swatch books fanned in her hands. Texture and weight are chosen by touch.",
        250: "Section title 'Sequencing' over the wall of trimmed prints, the yellow window frame cutting the left edge.",
        270: "Close on her arm reaching across the sequencing wall to swap a print.",
        290: "A second interview setup: tighter, by the window, with foliage soft behind her.",
        320: "The prints pinned edge to edge as one composition, a corner in each image ready to sit on a fold.",
        351: "Section title 'Embellishing prints' over spray-paint cans in shallow focus.",
        363: "An earlier accordion in black with cut red and yellow triangles, shown low across the table.",
        368: "Overhead: a book bound in green tarp lifted off the table, one of her industrial-material examples.",
        389: "A spread in stripes of yellow, pink, black and blue: prints worked over with spray paint and cutting.",
        402: "Reference card: Joan Miró, 'À toute épreuve (Proof Against All). 1958'.",
        411: "A full-frame Miró spread on cream paper, held still so the color does the work.",
        417: "Tauba Auerbach's pop-up: a coil of colored bands rising from a flat black book, white caption at bottom left.",
        470: "Outdoors in a red sweater and purple gloves, spraying a print's edge through a cardboard stencil. The only scene outside the studio.",
        483: "Reference card: John Baldessari, 'Lamp. 1993'.",
        503: "Close on yellow cloth tape being torn off the roll, the print waiting on the table.",
        553: "Her 'Leporello. 2022' on white: a black accordion with neon triangles cut from each fold.",
        557: "Her '1982. 2025' with its concrete slipcase: the brick dummy made real.",
        587: "Cut to the street: paper triangles pasted around a red fire bell on a concrete corner. The collage on the table repeats the move.",
        601: "Overhead: a blue paper triangle laid on the corner of a brick print, tape gun and cutter at hand.",
        653: "Signing the back page with a marker, the edition number written into the photographed wall like a tag.",
        665: "Section title 'Trimming the prints' over the roller trimmer seen straight down, the print squared to its grid.",
        685: "Macro along the trimmer's steel rail as the blade passes.",
        765: "Section title 'Scoring and folding' over the bone folder lying across the scoring board.",
        826: "Overhead: one hand flat on the print, the bone folder's point drawn down the board's groove.",
        838: "Low side angle on the fold, the bone folder pressed along the crease.",
        854: "Section title 'Binding' over the dark macro of pages fanned from the spine, reused from the opening.",
        868: "Her 'Book I. 2025' on white: teal and orange covers with a cut window.",
        912: "Overhead: the folded sheets in a row with double-sided tape run along each edge.",
        980: "The stack shaken square and clamped at the spine, held up toward the overhead lens.",
        998: "Low macro: lifting each page and pulling the tape backing, page by page through the stack.",
        1032: "Overhead: the bound left side flipped spread by spread, each one a different wall.",
        1076: "Left and right books open side by side, city corners meeting across the gutter.",
        1081: "Section title 'Making the cover' over a shallow-focus macro of the finished cover with her stenciled name.",
        1090: "The cover material: cardboard she used as a spray-paint backstop, layered with stencil colors.",
        1135: "Overhead: marking the sprayed cardboard with a steel ruler before cutting.",
        1172: "Reference card: Giorgio de Chirico, 'Défense de savoir (Knowledge Forbidden). 1928'.",
        1180: "The de Chirico book standing open: shattered glass between sheets of lead, shot plainly on gray.",
        1220: "Overhead: the signed back-page print scored to wrap the back cover.",
        1330: "Overhead: a paper stencil of her name taped across the cardboard cover.",
        1342: "Low angle: white acrylic dabbed through the stencil with a sponge.",
        1349: "The stencil lifted: 'RHEA KARAM' in rough white capitals on the sprayed cardboard.",
        1398: "Macro across the guillotine clamp, the stack's colored edges in a thin line under the blade.",
        1416: "Wide: she pulls the guillotine lever across her body. The cut is shown in macro and wide back to back.",
        1468: "Overhead: the two narrow front covers and the back with its stenciled name, ready to join.",
        1539: "Overhead: the finished book closed, its two front covers side by side.",
        1546: "The same overhead with both halves open, walls fanned left and right.",
        1555: "The book stood on end and opened into a zigzag of walls.",
        1559: "The low dark macro of the opening returns: pages fanned around the spine.",
        1566: "Another edition of the same book: plywood and aluminum covers with barrel bolts and industrial pulls.",
        1601: "Macro on a barrel bolt sliding shut.",
        1606: "End card: the MoMA wordmark in black on white.",
        1608: "Credits in three dense columns of small black type, listing every work and fabricator.",
    },
    # MoMA, channel trailer: a fast montage of clips from its YouTube series, framed by on-set outtakes.
    58: {
        0: "Cold open on an outtake: a man at his editing desk asks 'What's the tone of this?' The trailer starts behind the scenes, not on the art.",
        3: "A slate claps in front of him after a single frame of color bars. 'Take three' doubles as the title card.",
        4: "A deep wide of an artist's studio, paintings on the far wall: the first proper interview location.",
        5: "An interviewee framed low against a wall of speaker stands, with plenty of headroom.",
        8: "Two people study Matisse's Red Studio under a round lamp, the painting filling the frame behind them.",
        9: "Visitors in silhouette against a projected image that fills the wall.",
        11: "The MoMA banner on the building, shot up from the street on a long lens.",
        13: "A photographer on an elevated platform as a train smears past behind him.",
        14: "Archival black-and-white film of a suspended railway over a river.",
        16: "Interview close-up of a woman in glasses against a dark workshop.",
        18: "Gloved handlers lift The Starry Night above a padded table.",
        19: "A man covers his face with his hand, overwhelmed.",
        20: "Interview from below, a woman in a studio of pinned papers.",
        21: "Someone peeks out between two tall wooden doors.",
        23: "Start of the half-second montage: a macro of loose threads on burlap under a conservator's microscope.",
        24: "A gloved hand holds an orange negative up to the light.",
        25: "Handlers guide a bundled sculpture of yellow and orange forms on a hoist.",
        27: "Four handlers walk a tall silver Warhol Elvis in a glazed frame.",
        30: "A crate lid tilts out of a freight elevator and a man ducks under it. A comic beat in the middle of the reel.",
        32: "Three people in a storage room laugh, one bent double.",
        34: "A woman lifts an instant camera overhead to shoot herself.",
        36: "An older woman blows into a long metal cone.",
        37: "Point of view from the bow of a painted long-tail boat under a red canopy.",
        39: "Line drawings on a white wall that seem to float beside a stairwell.",
        40: "A woman works close against a huge yellow and red painting.",
        42: "Flat animation: a red-and-white marionette dancing on blue, the curtains drawn back.",
        44: "Hands rest a clay vessel among broken slabs of clay.",
        45: "A woman turns a large painting of figures toward the camera.",
        46: "Macro on a pen hatching a dense black pattern.",
        47: "Two people in the sculpture garden in front of a bronze.",
        48: "A woman laughing at an easel outdoors, trees soft behind her.",
        50: "Collage animation: Matisse's Red Studio as a small card on pale blue, with the works it shows popping in around it.",
        51: "Hand-drawn animation: a black eel inside a ring of tulips that turns as you watch.",
        53: "A woman lit by a projector beam in the dark.",
        54: "Archival film of a man leaping from a window.",
        55: "Silent-film close-up in sepia inside an iris vignette, eyes wide.",
        57: "Camcorder footage: a man screams straight into the lens on a crowded street.",
        58: "A dancer in a red paper costume, the camera swinging with her.",
        60: "Dancers carry a woman overhead across a white gallery.",
        62: "'Passionate perspectives on art' centered in bold white sans over a photographer beside a bronze head.",
        64: "'Subscribe on YouTube' over an extreme close-up through a magnifier.",
        65: "The last interview, a woman in a black T-shirt in a bright studio.",
        67: "She claps, then folds her hands under the white MoMA wordmark.",
    },
}
FRAME_COPY = {
    # Tab label and intro for videos with SHOT_NOTES. Others fall back to DEFAULT_FRAME_COPY.
    35: ("Shots and angles", "One frame per shot idea, with where the camera sits and how it moves."),
    47: ("Beats", "One frame per beat of the cold open: each cut, title move and type change."),
}
TRANSCRIPT_KIND = {
    47: "YouTube auto captions, trimmed to the opening and corrected to the on-screen name",
    49: "Local speech recognition, corrected to the on-screen names",
}
DEFAULT_FRAME_COPY = ("Key frames", "One frame per visual idea, with a note on its style, composition or transition.")
# Music-only soundtracks. Whisper returns only hallucinated lines for these, so no transcript is kept.
NO_NARRATION = set(range(41, 47))

# From video 59 on, each film's notes live in its own file, studies/<NN>-<slug>.json, instead of the dicts above:
# "shot_notes" ({second: note}), "frame_copy" ([tab label, intro]), "transcript_kind", "no_transcript" (shown
# instead of a transcript when the film has no speech), "note" (the gallery card note), "motion_intro" and
# "motion" (as in motion_sequences.py), and "craft" (see craft.py).
STUDIES = {}
for _path in sorted((HERE / "studies").glob("*.json")):
    _number = int(_path.name.split("-")[0])
    _study = STUDIES[_number] = json.loads(_path.read_text())
    if "shot_notes" in _study:
        SHOT_NOTES[_number] = {(int(float(k)) if float(k).is_integer() else float(k)): v for k, v in _study["shot_notes"].items()}
    if "frame_copy" in _study:
        FRAME_COPY[_number] = tuple(_study["frame_copy"])
    if "transcript_kind" in _study:
        TRANSCRIPT_KIND[_number] = _study["transcript_kind"]
    if _study.get("motion"):
        motion_sequences.MOTION[_number] = _study["motion"]
        motion_sequences.MOTION_INTRO[_number] = _study["motion_intro"]
TAG = re.compile(r"<[^>]*>")
TIMING = re.compile(r"^((?:\d\d:)?\d\d:\d\d\.\d+)\s+-->")
SCENE_LOG = re.compile(r"n:\s*(\d+)\s+pts:\s*\d+\s+pts_time:([\d.]+)")


def stem(number):
    return f"{number:02d}-{VIDEOS[number - 1]['slug']}"


def source_file(number):
    base = HERE / "source" / stem(number)
    return next((p for ext in ("mp4", "mkv", "webm") if (p := base.with_suffix("." + ext)).exists()), None)


def probe(path):
    p = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration,size:stream=codec_type,width,height,avg_frame_rate", "-of", "json", str(path)],
        capture_output=True, text=True, check=True,
    )
    data = json.loads(p.stdout)
    video = next(s for s in data["streams"] if s["codec_type"] == "video")
    return {"duration": float(data["format"]["duration"]), "bytes": int(data["format"]["size"]),
            "width": video["width"], "height": video["height"], "fps": video["avg_frame_rate"]}


def run_ffmpeg(command):
    p = subprocess.run(command, capture_output=True, text=True)
    if p.returncode:
        raise RuntimeError(p.stderr[-1800:])
    return p.stderr


def extract_frames(number, source):
    base = HERE / "frames" / stem(number)
    seconds = base / "seconds"
    scenes = base / "scene-cuts"
    seconds.mkdir(parents=True, exist_ok=True)
    scenes.mkdir(parents=True, exist_ok=True)
    if not (base / ".seconds-done").exists():
        run_ffmpeg(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
                    "-vf", f"fps={1 / FRAME_STEP.get(number, 1):g}:start_time=0,scale='min(1280,iw)':-2", "-q:v", "4",
                    str(seconds / "second-%05d.jpg")])
        (base / ".seconds-done").touch()
    if not (base / ".scenes-done").exists():
        try:
            log = run_ffmpeg(["ffmpeg", "-hide_banner", "-loglevel", "info", "-y", "-i", str(source),
                              "-vf", "select='gt(scene,0.30)',showinfo,scale='min(1280,iw)':-2",
                              "-fps_mode", "vfr", "-q:v", "4", str(scenes / "scene-%05d.jpg")])
        except RuntimeError as error:
            # A film with no hard cuts selects no frames, and FFmpeg treats the empty output as an error.
            if "No filtered frames" not in str(error):
                raise
            log = ""
        matches = [(int(n) + 1, float(t)) for n, t in SCENE_LOG.findall(log)]
        with (base / "scene-cuts.csv").open("w", newline="") as f:
            w = csv.writer(f)
            w.writerow(["filename", "time_seconds"])
            for n, t in matches:
                w.writerow([f"scene-{n:05d}.jpg", f"{t:.3f}"])
        (base / ".scenes-done").touch()
    return len(list(seconds.glob("second-*.jpg"))), len(list(scenes.glob("scene-*.jpg")))


def format_time(seconds):
    seconds = int(seconds)
    return f"{seconds // 60:02d}:{seconds % 60:02d}"


def format_frame_time(seconds, step=1):
    """Whole seconds as 00:05; quarter-second frames as 00:05.25."""
    if step >= 1:
        return format_time(seconds)
    return f"{int(seconds) // 60:02d}:{seconds % 60:05.2f}"


def make_overview(number):
    name = stem(number)
    out = HERE / "overviews" / f"{name}.jpg"
    out.parent.mkdir(exist_ok=True)
    if out.exists():
        return
    frames = sorted((HERE / "frames" / name / "seconds").glob("second-*.jpg"))
    chosen = frames[::10]
    if not chosen:
        return
    thumb_w, thumb_h, label_h, cols = 220, 124, 24, 8
    rows = (len(chosen) + cols - 1) // cols
    canvas = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), "#111111")
    draw = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 15)
    except OSError:
        font = ImageFont.load_default()
    for i, path in enumerate(chosen):
        x, y = (i % cols) * thumb_w, (i // cols) * (thumb_h + label_h)
        with Image.open(path) as im:
            canvas.paste(ImageOps.fit(im.convert("RGB"), (thumb_w, thumb_h)), (x, y))
        second = (int(path.stem.split("-")[-1]) - 1) * FRAME_STEP.get(number, 1)
        draw.text((x + 7, y + thumb_h + 3), format_frame_time(second, FRAME_STEP.get(number, 1)), fill="white", font=font)
    canvas.save(out, quality=85, optimize=True)


def transcript(number):
    name = stem(number)
    folder = HERE / "transcripts"
    candidates = [folder / f"{name}.en.vtt", folder / f"{name}.ja.vtt", folder / f"{name}.vtt"]
    vtt = next((p for p in candidates if p.exists()), None)
    if not vtt:
        return None
    lines = []
    previous = []
    for block in re.split(r"\n\s*\n", vtt.read_text().replace("\r\n", "\n")):
        raw = block.splitlines()
        pos = next((i for i, line in enumerate(raw) if TIMING.match(line)), None)
        if pos is None:
            continue
        timestamp = TIMING.match(raw[pos]).group(1).split(".")[0]
        if timestamp.count(":") == 1:
            timestamp = "00:" + timestamp
        current = [html.unescape(TAG.sub("", line)).strip() for line in raw[pos + 1:]]
        current = [line for line in current if line]
        if vtt.name.endswith(".en.vtt") and number in (1, 7, 9, 48, 53, 54, 55, 56, 57, 58):
            current = [" ".join(current)] if current else []
        overlap = 0
        for n in range(min(len(previous), len(current)), 0, -1):
            if previous[-n:] == current[:n]:
                overlap = n
                break
        for line in current[overlap:]:
            lines.append(f"[{timestamp}] {line}")
        previous = current
    out = folder / f"{name}.transcript.txt"
    out.write_text("\n".join(lines).strip() + "\n")
    if number in TRANSCRIPT_KIND:
        kind = TRANSCRIPT_KIND[number]
    elif vtt.name.endswith(".ja.vtt"):
        kind = "Japanese speech recognition"
    elif vtt.name.endswith(".en.vtt"):
        kind = "creator captions" if number in (1, 7, 9, 29, 30, 32, 33, 48, 52, 53, 54, 55, 56, 57, 58) else "YouTube auto captions"
    else:
        kind = "local speech recognition"
    return {"vtt": str(vtt.relative_to(HERE)), "text": str(out.relative_to(HERE)), "kind": kind}


def write_pages(items):
    def document(title, content, gallery=False):
        gallery_css = '<link rel="stylesheet" href="../../gallery/app.css">' if gallery else ''
        main_class = 'gallery' if gallery else 'shell'
        return (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
                f'<meta name="viewport" content="width=device-width, initial-scale=1">'
                f'<title>{html.escape(title)} · GoodDesigns</title>'
                f'<meta name="description" content="A frame and script study of videos worth watching.">'
                f'{gallery_css}<link rel="stylesheet" href="study.css"><script src="study.js" defer></script>'
                f'</head><body><main class="{main_class}">{content}'
                f'<footer class="foot">For design study only. Trademarks, copy and imagery belong to their owners.</footer>'
                f'</main></body></html>')

    def topbar():
        return ('<header class="topbar"><a class="brand" href="index.html#videos" '
                'aria-label="GoodDesigns home">Good<span>Designs</span></a>'
                '<nav class="topnav" aria-label="Main navigation">'
                '<a href="index.html#videos">Back to videos</a>'
                '</nav></header>')

    def frame_card(path, seconds, note=None, step=1):
        label = format_frame_time(seconds, step)
        note = f'<p class="frame-note">{html.escape(note)}</p>' if note else ''

        return (f'<figure class="frame-card"><a href="{path}" target="_blank" rel="noopener" '
                f'aria-label="Open frame at {label}"><img loading="lazy" src="{path}" alt="Frame at {label}"></a>'
                f'<figcaption><span class="frame-label">{label}</span><button class="frame-play" type="button" '
                f'data-seek="{seconds:.3f}" aria-label="Play video at {label}">Play frame</button></figcaption>{note}</figure>')

    thumbs = HERE / "thumbs"
    thumbs.mkdir(exist_ok=True)
    for item in items:
        name = stem(item["number"])
        number = item["number"]
        title = html.escape(item["title"])
        author = html.escape(item["author"])
        thumb = f'thumbs/{item["slug"]}.jpg'
        shutil.copy2(REPO / "gallery/thumbs/videos" / f'{item["slug"]}.jpg', HERE / thumb)
        page = f"{name}.html"

        player = (f'<div id="study-video" class="youtube-player" data-youtube-id="{html.escape(item["slug"].removeprefix("youtube-"))}"></div>'
                  if number >= 29 and item["duration"] > 600 else
                  f'<video id="study-video" controls preload="metadata" poster="{thumb}" src="source/{name}.mp4"></video>')
        detail = [topbar(),
                  f'<div class="detail-head"><div><h1>{title}</h1><p>{author} · {format_time(item["duration"])} film</p></div>'
                  f'<a class="source-link" href="{html.escape(item["url"])}" target="_blank" rel="noopener">Watch original ↗</a></div>',
                  '<div class="workspace"><div class="player-card">',
                  player,
                  '</div>']

        note = VIDEOS[number - 1].get("note")
        if note:
            detail.insert(2, f'<p class="study-note">{html.escape(note)}</p>')

        tr = item.get("transcript")
        if tr:
            detail.append(
                f'<aside class="transcript" aria-label="Transcript"><div class="transcript-head">'
                f'<h2>Transcript</h2><a href="{tr["text"]}" download>Download text</a></div>'
                f'<p class="transcript-kind">{html.escape(tr["kind"])} · <a href="{tr["vtt"]}">Timed captions</a></p>'
                '<div class="transcript-lines">')
            for line in (HERE / tr["text"]).read_text().splitlines():
                match = re.match(r"^\[(\d\d):(\d\d):(\d\d)\]\s*(.*)", line)
                if not match:
                    continue
                hour, minute, second, words = match.groups()
                at = int(hour) * 3600 + int(minute) * 60 + int(second)
                label = f"{hour}:{minute}:{second}" if int(hour) else f"{minute}:{second}"
                detail.append(
                    f'<button class="transcript-line" type="button" data-time="{at}" data-seek="{at}" '
                    f'aria-label="Play at {label}: {html.escape(words)}">'
                    f'<span class="transcript-time">{label}</span>'
                    f'<span class="transcript-words">{html.escape(words)}</span></button>')
            detail.append('</div></aside>')
        else:
            missing = (STUDIES.get(number, {}).get("no_transcript")
                       or ('No narration. The soundtrack is music only.' if number in NO_NARRATION else 'Transcript pending.'))
            detail.append(f'<aside class="transcript"><div class="transcript-head"><h2>Transcript</h2></div><p>{missing}</p></aside>')
        detail.append('</div>')

        craft_notes = STUDIES.get(number, {}).get("craft")
        if craft_notes:
            detail.append(craft.section(name, item, craft_notes))
            (HERE / "frames" / name / "craft.md").write_text(craft.markdown(name, item, craft_notes))

        step = FRAME_STEP.get(number, 1)
        selected = item.get("selected_frames")
        if number in motion_sequences.MOTION:
            seqs = motion_sequences.MOTION[number]
            data = json.loads((HERE / "frames" / name / "energy.json").read_text())
            detail.append(motion_sequences.section(number, name, item, seqs, data, frame_card))
            key_frames = sorted(SHOT_NOTES.get(number, {}).items())
            (HERE / "frames" / name / "motion.md").write_text(
                motion_sequences.markdown(number, name, item, seqs, data, key_frames))
        notes = SHOT_NOTES.get(number, {})
        tab_label, note_intro = FRAME_COPY.get(number, DEFAULT_FRAME_COPY)
        grid_class = "frame-grid is-square" if item["width"] == item["height"] else "frame-grid"
        frame_intro = (f'{note_intro} Open a frame at full size or play from its timestamp.'
                       if notes else
                       'Handpicked compositions from the film. Open a frame at full size or play from its timestamp.'
                       if selected else
                       'Hover over a frame to preview it larger. Select a frame for full size, or play from its timestamp.')
        detail.append(
            '<section class="study-section" aria-labelledby="frames-title"><div class="frame-tools">'
            '<h2 id="frames-title">Frame library</h2><div class="frame-tabs" role="tablist" aria-label="Frame collection">'
            f'<button type="button" id="tab-scenes" role="tab" data-tab="scenes" aria-controls="panel-scenes" aria-selected="true">'
            f'{tab_label if notes else "Selected frames" if selected else "Scene changes"} <span>{len(selected) if selected else item["scene_frames"]}</span></button>'
            f'<button type="button" id="tab-seconds" role="tab" data-tab="seconds" aria-controls="panel-seconds" aria-selected="false">'
            f'{"Every second" if step == 1 else "Every quarter second" if step == 0.25 else f"Every {step:g} s"} <span>{item["second_frames"]}</span></button></div></div>'
            f'<p>{frame_intro}</p>')
        detail.append(f'<div class="{grid_class}" id="panel-scenes" role="tabpanel" aria-labelledby="tab-scenes">')
        if selected:
            for second in selected:
                path = f"frames/{name}/seconds/second-{round(second / step) + 1:05d}.jpg"
                detail.append(frame_card(path, second, notes.get(second), step))
        else:
            with (HERE / "frames" / name / "scene-cuts.csv").open() as f:
                for row in csv.DictReader(f):
                    path = f"frames/{name}/scene-cuts/{row['filename']}"
                    detail.append(frame_card(path, float(row["time_seconds"])))
        detail.append(f'</div><div class="{grid_class}" id="panel-seconds" role="tabpanel" aria-labelledby="tab-seconds" hidden>')
        for n in range(1, item["second_frames"] + 1):
            path = f"frames/{name}/seconds/second-{n:05d}.jpg"
            detail.append(frame_card(path, (n - 1) * step, step=step))
        detail.append('</div></section>')
        (HERE / page).write_text(document(item["title"], ''.join(detail)))

    site_manifest = json.loads((REPO / "gallery/sites.json").read_text())
    site_cards = []
    for site in site_manifest["sites"]:
        slug = html.escape(site["slug"])
        source_url = f'{site_manifest["repo"]}/tree/{site_manifest["branch"]}/{site["folder"]}'
        site_cards.append(
            f'<li class="card"><a class="thumb" href="https://gooddesigns.web.app/#/{slug}" '
            f'aria-label="View {html.escape(site["name"])}"><img src="../../gallery/thumbs/{slug}.jpg" '
            f'alt="{html.escape(site["name"])} preview" loading="lazy" width="1200" height="750"></a>'
            f'<div class="meta"><h2><a href="https://gooddesigns.web.app/#/{slug}">{html.escape(site["name"])}</a></h2>'
            f'<a class="src" href="{html.escape(source_url)}" target="_blank" rel="noopener">Source ↗</a></div>'
            f'<p class="tag">{html.escape(site["tagline"])}</p></li>')

    available = {item["slug"]: item for item in items}
    video_cards = []
    for video in VIDEOS:
        slug = video["slug"]
        title = html.escape(video["title"])
        thumb = f'thumbs/{slug}.jpg'
        shutil.copy2(REPO / "gallery/thumbs/videos" / f'{slug}.jpg', HERE / thumb)
        breakdown = available.get(slug)
        button = (f'<a class="breakdown-button" href="{stem(breakdown["number"])}.html">Breakdown</a>'
                  if breakdown else '')
        video_cards.append(
            f'<li class="card card--video"><a class="thumb" href="https://gooddesigns.web.app/#/videos/{slug}" '
            f'aria-label="Play {title}"><img src="{thumb}" alt="" loading="lazy" width="1280" height="720">'
            '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22">'
            '<path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span></a>'
            f'<div class="meta"><h2><a href="https://gooddesigns.web.app/#/videos/{slug}">{title}</a></h2>'
            f'<a class="src" href="{html.escape(video["url"])}" target="_blank" rel="noopener">Source ↗</a></div>'
            f'<p class="tag">{html.escape(video["author"])}</p>{button}</li>')

    index = (
        '<header class="masthead"><h1>Good<span>Designs</span></h1>'
        '<p>Recreations of sites worth studying, and videos worth watching. Open one to explore it, or jump to its source.</p>'
        '<nav class="sections" aria-label="Sections">'
        f'<a href="#sites">Sites <span>{len(site_manifest["sites"])}</span></a>'
        f'<a href="#videos">Videos <span>{len(VIDEOS)}</span></a></nav></header>'
        '<section id="sites" class="section" aria-labelledby="sites-title">'
        '<h2 class="section-title" id="sites-title">Good <em>Sites</em></h2>'
        '<ul class="grid" aria-label="Sites">' + ''.join(site_cards) + '</ul></section>'
        '<section id="videos" class="section" aria-labelledby="videos-title">'
        '<h2 class="section-title" id="videos-title">Good <em>Videos</em></h2>'
        '<ul class="grid" aria-label="Videos">' + ''.join(video_cards) + '</ul></section>')
    (HERE / "index.html").write_text(document("Gallery review", index, gallery=True))


def one(number):
    video = VIDEOS[number - 1]
    source = source_file(number)
    if not source:
        raise FileNotFoundError(f"Missing source for #{number}")
    info = probe(source)
    seconds, scenes = extract_frames(number, source)
    make_overview(number)
    if number in motion_sequences.MOTION:
        base = HERE / "frames" / stem(number)
        motion_sequences.energy(source, base, info["fps"])
        motion_sequences.extract(source, base, motion_sequences.MOTION[number], run_ffmpeg)
    return {"number": number, "slug": video["slug"], "title": video["title"],
            "author": video["author"], "url": video["url"], **info,
            "second_frames": seconds, "scene_frames": scenes, "transcript": transcript(number),
            **({"selected_frames": CURATED_FRAMES[number]} if number in CURATED_FRAMES else {}),
            **({"selected_frames": sorted(SHOT_NOTES[number])} if number in SHOT_NOTES else {})}


if __name__ == "__main__":
    # `build_study.py 52 53` rebuilds only those videos, for when the other sources are no longer
    # on disk. Their manifest entries replace the old ones; the rest of the manifest is kept.
    only = [int(n) for n in sys.argv[1:]]
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        items = sorted(pool.map(one, only or NUMBERS), key=lambda item: item["number"])
    manifest = HERE / "manifest.json"
    kept = [item for item in json.loads(manifest.read_text()) if item["number"] not in only] if only else []
    manifest.write_text(json.dumps(sorted(kept + items, key=lambda item: item["number"]), indent=2, ensure_ascii=False) + "\n")
    write_pages(items)
    for item in items:
        print(f"#{item['number']:02d}: {item['second_frames']} second frames, {item['scene_frames']} cuts, transcript={bool(item['transcript'])}")
