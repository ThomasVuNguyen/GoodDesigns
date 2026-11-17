"""Motion sequences for films whose movement does not survive one-frame-per-second sampling.

Each sequence is a short run of frames sampled at a fixed rate (its `fps`), with a note on what
moves and how. The build also writes an onion-skin trail per sequence (earlier positions faded,
the last frame solid) and a motion-energy curve: the mean RGB change between consecutive
24 fps frames, downscaled to 96x54. Everything is also written to `motion.md` beside the
frames, so an agent reading the folder gets the motion as text, in order, with timings.
"""

import html
import json
import shutil
import subprocess
from fractions import Fraction

import numpy as np
from PIL import Image

SPARK = "▁▂▃▄▅▆▇█"

MOTION_INTRO = {
    52: ("Most of the film is live action cut on the line reads. The motion design is in the last five seconds: "
         "the title builds word by word behind a jumping runner, then a Chat/Task toggle flips and gives way to the wordmark."),
    54: ("Masayoshi Nakamura and Good General draw sumo's history as flat ukiyo-e color with clean line, under gradient skies "
         "of teal, cream and coral. Most of the motion is character animation: walk and run cycles, the ring-entering ritual, "
         "throws and tumbles, all timed on twos with snappy holds. Between scenes the camera rarely just cuts. It dives into a "
         "map, rushes through a tunnel of flat planes or torii gates, tilts up a layered collage, or lets a sunburst, a dust "
         "cloud or a falling body carry it into the next idea. Shapes morph to explain rules: the boundary cycles through "
         "polygons before it settles as a circle."),
    55: ("Sofia Pashaei draws Venice in flat geometric shapes with no outlines: stacked bands of blue for water, gradient "
         "skies, and buildings built from rectangles and arches. Almost every scene change is the same move. A small dot appears "
         "on one detail of the current picture, grows into a solid circle that fills the frame, and the next scene is waiting "
         "inside it. Within scenes the motion is mostly mechanical and repeated: piles driven one after another, boats sliding "
         "past on loops, tiles stacking in a grid, a route drawing itself across a map."),
    56: ("Caitlin McCarthy animates Amia and her imaginary friend Zelba as hand-drawn characters in flat, saturated color with "
         "thin colored outlines. Zelba is always a soft, glowing blue shape that can stretch, melt or turn into anything, and the "
         "film animates him that way: he morphs into a cat, a cloud of fur, a sea serpent, a heart. Scene changes are soft-edged "
         "color blooms that grow out of a character and wash over the frame, and remembered or imagined scenes drop to thin "
         "line art on a single color. The motion is full character animation on ones and twos, with smears, squash and stretch "
         "and big held reaction poses."),
    53: ("Kozmonot Animation Studio builds the whole film from flat dots on flat color fields. People are dots, a group is a ring "
         "or a fan of dots, and the storyteller is the red one. There is one hard cut in five minutes. Every other scene change "
         "goes through a shape: the camera dives into a dot, a speech bubble or the O of a word, a circle irises open or shut, "
         "or a hand-drawn fire swirls across the frame. Motifs return (the campfire, the amphitheater of listeners, the "
         "speech bubble, the compass), and the ending replays them in reverse."),
}

# Times are seconds in the source. `fps` is the sampling rate inside the sequence. `trail: True` adds an onion-skin image,
# only where the background holds still; across a wipe or a camera move the trail turns to mud.
MOTION = {
    52: [
        {"id": "whip-montage", "start": 24.0, "end": 28.5, "fps": 4,
         "title": "Motion-blurred city montage",
         "tags": ["handheld", "whip", "motion blur", "fast cutting"],
         "text": "Four lines of dialogue in four seconds, each on its own shot of a cyclist or the street. Long shutter smears "
                 "the foreground, so the cuts read as one fast ride through the city rather than separate setups."},
        {"id": "title-build", "start": 54.75, "end": 57.0, "fps": 8,
         "title": "The title builds behind the runner",
         "tags": ["type-on", "word by word", "depth layering"],
         "text": "Over the locked-off street, 'LOOK' snaps on at 55.0 in heavy condensed white caps, with no fade or scale. "
                 "'WHAT', 'YOU' and 'CAN DO.' follow at roughly one word every sixth of a second. The jumping runner stays in "
                 "front of the 'U', so the type sits inside the shot instead of on top of it."},
        {"id": "toggle", "start": 56.9, "end": 58.1, "fps": 12,
         "title": "Chat flips to Task",
         "tags": ["hard cut", "toggle", "slide", "glow"],
         "text": "Hard cut to black with a small segmented control. The white pill starts on 'Chat' and slides right to 'Task' "
                 "in about a sixth of a second, picking up a soft glow as it lands. The control holds still for a beat after."},
        {"id": "wordmark", "start": 57.9, "end": 59.6, "fps": 10,
         "title": "The toggle gives way to the wordmark",
         "tags": ["pop", "shrink", "wipe-on", "fade-in"],
         "text": "The Gemini spark pops in at the left of the toggle while the toggle dims and shrinks away behind it. 'Google "
                 "Gemini' then wipes on left to right from the spark over about two thirds of a second, and the 'Try Tasks for "
                 "free' line fades up underneath."},
    ],
    53: [
        {"id": "bond", "start": 6.0, "end": 10.0, "fps": 6,
         "title": "A dot gathers its people",
         "tags": ["iris-in", "orbit", "burst", "spring"],
         "text": "A peach disc with a red center closes in on itself over about a second until only the red dot is left, like "
                 "an iris shutting on the subject. A thin arc circles the dot once as a wind-up. At 8.0 five colored dots burst "
                 "out from behind it to their places, a ring pulses outward and fades, and the lines to them grow out wobbly and "
                 "straighten as if on springs. Faces arrive last, at 10.25."},
        {"id": "story", "start": 13.75, "end": 16.75, "fps": 6,
         "title": "Pull back through the O",
         "tags": ["zoom-out", "type as frame", "ease-out", "hard cut"],
         "text": "The network doesn't cut away. A lime 'O' sweeps in at huge scale with the network inside its counter, and the "
                 "camera pulls back until 'STORY' sits mid-frame with the red dot as the O's center. Most of that scale change "
                 "happens in the first half second; the word keeps shrinking slowly for two more. Then the film's only hard cut, "
                 "to orange at 16.75."},
        {"id": "type-on", "trail": True, "start": 16.75, "end": 18.75, "fps": 8,
         "title": "A dot writes the line",
         "tags": ["type-on", "cursor", "stagger"],
         "text": "'Stories helped make us who we are' types on line by line, a small red dot running ahead like a cursor. The "
                 "ellipsis is set last, one dot at a time, and those three dots become the next scene."},
        {"id": "portal", "start": 20.0, "end": 23.0, "fps": 8,
         "title": "The ellipsis opens a window",
         "tags": ["push-in", "pan", "zoom-through"],
         "text": "The camera pushes in and drifts right, so the text slides out left while the ellipsis grows. By 21.75 the "
                 "third dot holds a cave painting, and the camera keeps pushing until that dot is the whole frame. A circle is "
                 "the transition, as it is almost everywhere in the film."},
        {"id": "iris-cloud", "start": 24.75, "end": 25.75, "fps": 12,
         "title": "Iris out to the next idea",
         "tags": ["iris-out", "draw-on"],
         "text": "A salmon circle opens from the center over the cave painting and covers the frame in about half a second. A "
                 "yellow cloud outline then draws itself into the clean space."},
        {"id": "mind", "trail": True, "start": 27.0, "end": 29.5, "fps": 6,
         "title": "Dots queue into a mind",
         "tags": ["stream", "grow", "pan"],
         "text": "A red dot enters the cloud, then a row of dots streams in from the left, each entering as the next arrives. "
                 "The outline gains folds with every dot until it reads as a brain, and the row pushes the whole picture right."},
        {"id": "fire-swirl", "start": 29.75, "end": 31.75, "fps": 12,
         "title": "Fire-swirl wipe",
         "tags": ["shape wipe", "swirl", "particle dissolve"],
         "text": "Flame shapes in red and yellow sweep in from the left and cover the frame in about a quarter second. As they "
                 "swirl, purple shows through the gaps with the campfire already in place, and the last scraps of flame drift "
                 "off right as particles. The same wipe comes back at 59.75."},
        {"id": "rings", "trail": True, "start": 31.75, "end": 35.75, "fps": 4,
         "title": "Rings breathe out from the fire",
         "tags": ["radial", "ripple", "loop", "color drift"],
         "text": "Dashed rings expand from the fire one after another while concentric rows of dots drift outward and grow until "
                 "they fill the frame. Over the next ten seconds the dots shift from lavender to pink. Fire drawing people "
                 "together is said with rings alone, no figures."},
        {"id": "vortex", "start": 41.0, "end": 45.75, "fps": 5,
         "title": "The fire becomes a vortex",
         "tags": ["flare", "spiral", "shrink to a point", "color change"],
         "text": "The flame flares into a ball and blows out into a ring of fire between the dashed circles. The rings spiral "
                 "inward while everything shrinks toward the center, down to a speck by 45.0, when the background lightens and "
                 "turns green."},
        {"id": "relight", "trail": True, "start": 45.5, "end": 48.0, "fps": 8,
         "title": "The fire relights",
         "tags": ["drop-in", "overshoot", "settle"],
         "text": "Two logs drop in spinning, the flame pops up taller than its resting height and settles back over about a "
                 "second, and yellow-green dots appear around it."},
        {"id": "bubble", "start": 52.25, "end": 56.0, "fps": 6,
         "title": "Into the speech bubble",
         "tags": ["pop", "push-in", "zoom-through", "accelerate"],
         "text": "A red dot beside the fire grows a tiny speech bubble with an ellipsis in it. Then the camera dives: within a "
                 "quarter second the bubble fills a quarter of the frame, and by 55.75 its cream interior is the background, "
                 "the three dots inside it."},
        {"id": "through-dot", "start": 56.0, "end": 58.75, "fps": 8,
         "title": "Through the red dot",
         "tags": ["pan", "zoom-through", "nested circles"],
         "text": "The three dots slide left past camera like a pan. The next dot carries a tiny fire; it grows as it reaches "
                 "center until its lime core, with the fire and rings of dots, becomes the frame. Each scene is entered "
                 "through a circle in the one before."},
        {"id": "near-far", "trail": True, "start": 60.5, "end": 66.25, "fps": 4,
         "title": "Near and far as scale",
         "tags": ["converge", "scale", "ripple", "slide"],
         "text": "Specks converge into three green dots. One springs up into a huge disc (nearby) while another shrinks to a "
                 "speck that sends out a ripple ring (distant lands). The big disc slides to center and the rest vanish."},
        {"id": "faces", "start": 66.75, "end": 70.25, "fps": 6,
         "title": "Faces pop out of a dot",
         "tags": ["pop", "stagger", "merge", "iris-out"],
         "text": "A dot gets a laughing face, then a second and third dot pop out to its right with tense and amazed faces. They "
                 "squeeze back into one dot, which opens as a purple iris onto the next scene."},
        {"id": "constellation", "start": 72.75, "end": 79.25, "fps": 3,
         "title": "Constellation to world map",
         "tags": ["pull-back", "parallax", "morph"],
         "text": "Dots and lines multiply as the camera pulls back, and big dots pass close to camera, which gives the flat "
                 "network depth. At 78.5 the network rearranges into a world map made of the same dots."},
        {"id": "storyteller", "start": 80.25, "end": 83.5, "fps": 6,
         "title": "The world becomes a storyteller",
         "tags": ["iris-in", "stream", "stack"],
         "text": "The map shrinks inside a purple circle that closes down to a red dot with a purple rim. Purple dots peel off "
                 "that rim in a curving stream and stack into a pyramid beneath it, the red dot left on top."},
        {"id": "hearts", "start": 86.75, "end": 92.75, "fps": 4,
         "title": "The pyramid melts into hearts",
         "tags": ["swirl", "scatter", "morph", "color shift"],
         "text": "The pyramid loosens into a swirl, spreads into a scatter, and turns from purple to red as it goes. The dots "
                 "become hearts and settle into a six-fold pattern, then flip to purple dots for a beat and back to red."},
        {"id": "liquid", "start": 96.5, "end": 99.75, "fps": 6,
         "title": "Dots that move like liquid",
         "tags": ["squash and stretch", "smear", "color shift"],
         "text": "As the dots rearrange, the fast ones stretch into smears and neighbors briefly merge like drops of liquid. It "
                 "is the film's nearest thing to cartoon squash and stretch, and it turns from red to magenta to purple on "
                 "the way."},
        {"id": "amphitheater", "start": 100.25, "end": 106.0, "fps": 4,
         "title": "The amphitheater, then into the bubble",
         "tags": ["settle", "draw-on", "push-in", "unroll"],
         "text": "The dots settle into a fan of listeners under a speaker dot, and red arcs draw in between them like sound "
                 "waves. A small speech bubble pops above the speaker, the camera dives into it, and its outline unrolls off "
                 "the bottom of the frame, leaving the three dots."},
        {"id": "goal", "trail": True, "start": 110.5, "end": 115.0, "fps": 4,
         "title": "A ball with a goal meets an obstacle",
         "tags": ["pop", "slide-in", "roll"],
         "text": "A red ball appears and a thought bubble rises from it in three puffs, showing a flag. A yellow triangle slides "
                 "in from the right. The ball rolls up its side and slides back down."},
        {"id": "seesaw", "trail": True, "start": 115.0, "end": 122.5, "fps": 3,
         "title": "Over the top",
         "tags": ["draw-on", "tilt", "roll", "settle"],
         "text": "A white plank draws itself in along the slope. The ball rides it up, the plank tips over the peak like a "
                 "seesaw, and the ball rolls down the far side to the flag, the resolution, at 122."},
        {"id": "keys", "start": 125.5, "end": 128.75, "fps": 6,
         "title": "The 4 keys badge wipes",
         "tags": ["pop", "scale-up", "shape wipe"],
         "text": "The middle dot becomes a purple '4 keys' badge. It grows past the edges of the frame, and a purple slab with "
                 "a rounded cutout sweeps across, leaving lime for the list."},
        {"id": "key-1", "start": 128.75, "end": 134.0, "fps": 4,
         "title": "Key 1: empathy as color",
         "tags": ["spiral-in", "ring", "color propagation"],
         "text": "'1.' sets, cyan dots spiral in around a red dot, and 'CHARACTER' rises from the bottom edge. The center turns "
                 "blue, then the ring does: listener and character end up the same color."},
        {"id": "key-2", "start": 134.0, "end": 142.5, "fps": 2.5,
         "title": "Key 2: a seesaw of tension",
         "tags": ["fall-in", "assemble", "tilt", "swap"],
         "text": "The ring falls apart and reassembles as a seesaw; '1.' drops out and '2.' drops in from the top. The red dot "
                 "faces a question mark and the plank tips back and forth. The question mark becomes a warning sign for "
                 "'actual danger'."},
        {"id": "key-3", "start": 142.75, "end": 152.75, "fps": 2,
         "title": "Key 3: detail as hatching",
         "tags": ["morph", "texture", "fall-out"],
         "text": "The seesaw collapses into a circle of fine hatching. The hatching coarsens and thins, then the circle fills "
                 "solid red, the right level of detail, and drops out of the bottom with '3.'."},
        {"id": "key-4", "start": 154.5, "end": 161.0, "fps": 3,
         "title": "Key 4: one dot divides, three endings",
         "tags": ["divide", "stagger", "morph"],
         "text": "One dot divides into two, then three, with 'CONCLUSION' rising beneath. The third dot cycles through endings: "
                 "a laughing face, a heart, then an exclamation mark that stretches up out of it."},
        {"id": "journey", "start": 165.75, "end": 168.75, "fps": 6,
         "title": "A journey drawn as a line",
         "tags": ["pop", "draw-on", "plot"],
         "text": "Small icons pop in along an invisible curve. A white line then draws through them left to right, climbing to "
                 "a peak marked by a triangle and dropping again: a talk as a plot graph."},
        {"id": "compass", "start": 171.25, "end": 176.0, "fps": 4,
         "title": "Ring to triangles to compass",
         "tags": ["color propagation", "shape morph", "converge"],
         "text": "The icons fold into a ring of white dots around a purple center. The dots turn purple one after another around "
                 "the ring, the center becomes a triangle, then each dot does too, in turn. The triangles fly in to form a "
                 "compass."},
        {"id": "path", "trail": True, "start": 178.0, "end": 182.0, "fps": 6,
         "title": "The compass draws its own path",
         "tags": ["shrink", "trail", "tracking"],
         "text": "The compass shrinks to a small marker and travels, drawing the white line behind it: flat, up a gentle rise, "
                 "over the peak and down. The camera follows, so the line scrolls while the marker stays near the same spot."},
        {"id": "trap", "start": 182.0, "end": 186.5, "fps": 5,
         "title": "The trap, then a glitch",
         "tags": ["iris-in", "hinge", "glitch", "color shift"],
         "text": "A big red disc closes down to a dot on a purple tightrope. The line hinges open beneath it like a trapdoor "
                 "and the dot drops; vertical streaks tear across the frame while the color shifts from salmon through brown "
                 "to green."},
        {"id": "gift", "start": 186.25, "end": 195.25, "fps": 2.5,
         "title": "A gift for the audience",
         "tags": ["pop", "morph", "grow", "assemble"],
         "text": "A crosshair dot becomes a light-blue circle with an ellipsis. The dots turn into faces one by one and the last "
                 "swells into a glossy red ball that pushes out of the circle. White listener dots assemble around it into the "
                 "amphitheater, then scatter."},
        {"id": "reel", "start": 197.75, "end": 205.75, "fps": 3,
         "title": "A reel of takeaways",
         "tags": ["drop-through", "reel", "stop"],
         "text": "Light-blue circles drop through the frame like a slot reel and one stops at center as an eye. The reel spins "
                 "on to a play button, a stack of circles, then a dove: understanding, information, context, hope."},
        {"id": "ramble", "start": 205.5, "end": 209.75, "fps": 5,
         "title": "Rambling",
         "tags": ["shrink", "iris-out", "rays", "spin-out"],
         "text": "The dove shrinks to a sad red face; a dot grows and wipes the frame to lime. An ellipsis dot sits in a sun of "
                 "rays that turn and fade, then shrinks to nothing."},
        {"id": "meaning", "start": 210.5, "end": 217.5, "fps": 3,
         "title": "'meaning' in one stroke",
         "tags": ["draw-on", "handwriting", "disintegrate"],
         "text": "Out of drifting confetti, 'meaning' is written in one continuous red line with the pen tip leading. A moment "
                 "after it finishes, the word breaks up from the left into the same confetti."},
        {"id": "virtues", "trail": True, "start": 222.0, "end": 235.5, "fps": 1.5,
         "title": "The compass points at its virtues",
         "tags": ["grow", "pop", "needle swing"],
         "text": "The compass grows from a speck. Each value pops in at a different corner (a fist for powerful, a calm face for "
                 "humility, a halo for honesty, a pulsing heart for vulnerability) and the needle swings to point at it. Then "
                 "green dots gather around the compass and it shrinks away to a red dot."},
        {"id": "inflate", "start": 248.5, "end": 255.5, "fps": 3,
         "title": "Exaggeration inflates",
         "tags": ["scale-up", "hollow", "spread", "slam"],
         "text": "The three dots swell and grow orange halos while their red cores shrink to nothing, leaving empty shells. They "
                 "drift apart, slam back together, and the merged circle fills the frame with red."},
        {"id": "spotlight", "start": 255.5, "end": 261.5, "fps": 4,
         "title": "Spotlight",
         "tags": ["wipe-up", "light sweep", "scale"],
         "text": "A navy stage with a green floor wipes up from below. A yellow spotlight swings in from the left; when it "
                 "lands on the dot, the dot grows several times its size, and as the beam moves on to the right and out of "
                 "frame, the dot shrinks back. The floor drops out and purple rises in its place."},
        {"id": "star", "trail": True, "start": 261.25, "end": 266.25, "fps": 4,
         "title": "A star cracks and falls",
         "tags": ["morph", "crack", "shatter", "fall"],
         "text": "The red X shrinks to a speck and returns as a star. Hairline cracks spread across it, it breaks apart at 265, and the pieces fall "
                 "out of the bottom of the frame."},
        {"id": "waves", "start": 269.25, "end": 276.0, "fps": 3,
         "title": "A gift, then sound waves",
         "tags": ["spiral", "orbit", "morph", "ripple"],
         "text": "Dots spiral out of the ellipsis into a ring around it, and the center becomes a white gift icon. The gift "
                 "splits back into three dots and arcs ripple out on both sides, closing into a speech bubble."},
        {"id": "callback", "start": 276.0, "end": 282.0, "fps": 4,
         "title": "Every motif in reverse",
         "tags": ["callback", "zoom-through", "morph"],
         "text": "Speech bubble, amphitheater, campfire, and finally the red network from the opening, each turning into the "
                 "next. The ending runs the film's motifs backwards to where it began."},
        {"id": "let-it", "start": 282.0, "end": 285.0, "fps": 6,
         "title": "Let it mean something",
         "tags": ["type", "slide", "stagger"],
         "text": "'Let' appears, then 'it' and 'mean' rise in while 'something' slides in from the right and docks beside "
                 "'mean'. Three red dots tick in one at a time as the ellipsis."},
    ],
    54: [
        {"id": "map-dive", "start": 9.75, "end": 11.75, "fps": 8,
         "title": "From the map to the street",
         "tags": ["push-in", "zoom-through", "scale jump", "top-down"],
         "text": "The map of Japan holds under drifting pink clouds, then the camera dives at the coast: in a quarter second the "
                 "island fills the frame, then patchwork fields appear from overhead, then a single street with a crowd and two "
                 "wrestlers seen from straight above. Three scales in under a second, all top-down."},
        {"id": "crash", "start": 14.75, "end": 16.0, "fps": 8,
         "title": "The pros crash the event",
         "tags": ["smash cut", "angle change", "pop-in"],
         "text": "Four shots in one second. The overhead crowd widens, cuts low to two officials over a sprawled wrestler, then two "
                 "wrestlers in dark jackets pop in small on a gradient sky and cut straight to a medium of them. The speed of the "
                 "cutting is the intrusion."},
        {"id": "turn", "start": 19.25, "end": 21.0, "fps": 8,
         "title": "The jackets turn to show their guild",
         "tags": ["turn", "stagger", "reveal"],
         "text": "Arms folded, the two pros turn their backs to us one after the other, about three quarters of a second apart. "
                 "Each turn takes a single drawing: the faces are gone and 東京 and 相撲, Tokyo and sumo, are printed across "
                 "their backs."},
        {"id": "escape", "start": 26.75, "end": 31.75, "fps": 6,
         "title": "A slash, then the escape",
         "tags": ["pull-back", "frame inside frame", "slash wipe", "anticipation"],
         "text": "The backs shrink into a small panel that opens out into a road to the horizon, the pair walking off with the "
                 "money bags. Dark figures slide in at the frame edges and a yellow diagonal slashes across: the killing is "
                 "never drawn. After the slash one pro lies flat; the other clutches his head, crouches, and launches into a run."},
        {"id": "run", "trail": True, "start": 31.75, "end": 39.25, "fps": 4,
         "title": "Running in place",
         "tags": ["run cycle", "locked-off", "loop", "away from camera"],
         "text": "Locked-off, one-point road. He runs away from camera but never gets smaller: the same run cycle loops in place "
                 "for seven seconds, arms flailing, while nothing else in the frame moves. The distance is covered in the next shot."},
        {"id": "gates", "start": 39.0, "end": 43.5, "fps": 6,
         "title": "The world slides past him",
         "tags": ["background slide", "parallax", "rise-up", "scale"],
         "text": "The runner stays center while the scenery does the travelling: the Tokyo skyline pops up at the horizon, a "
                 "torii gate grows over him and slides out of frame, then the ground turns to an empty coral plain. A small "
                 "magistrate's house rises at the horizon and grows to fill the frame as he reaches its door."},
        {"id": "decree", "start": 49.5, "end": 53.75, "fps": 4,
         "title": "The magistrate rules",
         "tags": ["gesture", "hold", "tilt up"],
         "text": "Symmetrical front view of the magistrate at his desk. One gesture carries the verdict: he lifts a paper "
                 "decree overhead and holds it for two seconds. The camera then tilts up to the roof ornament as a transition."},
        {"id": "ritual", "trail": True, "start": 54.0, "end": 60.0, "fps": 4,
         "title": "The ring-entering ritual",
         "tags": ["pose to pose", "holds", "clap", "character"],
         "text": "A lone wrestler drops onto blank ground and runs the ceremony as poses with holds between them: arms out, "
                 "arms high, a clap at the chest, arms high again. Each pose is held for a quarter to half a second, so the ritual "
                 "reads as a sequence of positions rather than a flow. The same animation returns at 3:52."},
        {"id": "shiko", "trail": True, "start": 60.0, "end": 64.0, "fps": 6,
         "title": "The stomp",
         "tags": ["arc", "anticipation", "squash", "settle"],
         "text": "Arm swept up and across, then the leg goes high in a sideways lift with the body tilted to balance, and it "
                 "drops into a wide squat. The squat lands with a little settle, and the arm then extends low and holds."},
        {"id": "petals", "start": 66.0, "end": 72.0, "fps": 4,
         "title": "Petals carry us to the court",
         "tags": ["particle dissolve", "fade", "rise-up", "color shift"],
         "text": "Pink petals blow in around the squatting wrestler, thicken, and dissolve him away. The sky warms from teal to "
                 "coral as an emperor rises up from the bottom edge on a red-railed platform, petals still falling. The particles "
                 "are the bridge between centuries."},
        {"id": "court-bout", "start": 83.5, "end": 90.5, "fps": 4,
         "title": "A throw at court",
         "tags": ["clash", "arc", "flip", "hold"],
         "text": "The two wrestlers bow, lunge, and grapple in front of the emperor. At 1:27 one heaves the other up in a high arc, "
                 "legs to the sky, and he lands flat on his back. The winner stays crouched over him and everything holds, petals "
                 "still drifting."},
        {"id": "close-grapple", "start": 90.75, "end": 95.0, "fps": 6,
         "title": "Close, then wide for the trip",
         "tags": ["close-up", "pull-back", "trip"],
         "text": "Hard cut to a tight two-shot: a glance, a shove, the clinch. The camera pulls back as they shift, and in the "
                 "wide one hooks a leg and trips the other to the ground. The style turns from striking to grappling and tripping "
                 "in one move."},
        {"id": "corridor", "start": 96.25, "end": 100.0, "fps": 8,
         "title": "A tunnel of flat planes",
         "tags": ["fly-through", "perspective", "tunnel", "flat shapes"],
         "text": "Pink and teal trapezoids slide in at the horizon behind the wrestler, and the camera rushes forward into a "
                 "corridor built from flat colored planes: floors, walls and ceilings flip past every few frames. A samurai helmet "
                 "waits at the end of the tunnel."},
        {"id": "helmet", "start": 100.0, "end": 107.75, "fps": 4,
         "title": "The helmet looks around",
         "tags": ["turnaround", "head turn", "push-in"],
         "text": "The samurai helmet turns its head left, to the back, right and front again, a full turnaround drawn as about "
                 "eight angles. It looks around a second time and then the camera pushes into its black crown, which becomes the "
                 "next transition."},
        {"id": "hill", "start": 108.0, "end": 114.0, "fps": 4,
         "title": "A bout on the hill, then up into the sky",
         "tags": ["loop", "silhouette", "tilt up"],
         "text": "Two wrestlers grapple on a black hill silhouette while the sky cools from cream to teal. Around 1:53 the hill "
                 "sinks out of frame as the camera tilts up into pink cloud bands."},
        {"id": "collage", "start": 114.0, "end": 126.0, "fps": 2,
         "title": "A tilt through the collage",
         "tags": ["tilt", "parallax", "layering"],
         "text": "A slow vertical move through a dense ukiyo-e collage of a boat, a Buddha, cranes, wrestlers, Mount Fuji and a "
                 "temple, every layer drifting at its own speed so the flat drawings gain depth. It climbs past the clouds to a "
                 "torii with an offering box."},
        {"id": "sunburst", "start": 134.5, "end": 137.0, "fps": 8,
         "title": "Sunburst wipe",
         "tags": ["radial wipe", "rotate", "reveal"],
         "text": "A thin line drops into the offering box, and a radial burst of wedges in coral, teal, cream and sage opens from "
                 "it and covers the frame in about half a second. It keeps turning as a wrestler steps into the middle of it."},
        {"id": "rays", "start": 137.0, "end": 142.0, "fps": 4,
         "title": "The rays spin away",
         "tags": ["rotate", "loop", "reverse wipe"],
         "text": "The wedges rotate steadily behind the wrestler as he loosens his shoulders. At 2:21 they collapse back into a "
                 "point and reveal the sumo guild's hall on a pink-to-lime gradient."},
        {"id": "queue", "start": 148.0, "end": 154.0, "fps": 3,
         "title": "A queue forms",
         "tags": ["pop-in", "stagger", "pan"],
         "text": "People pop out of the hall's door one at a time and line up to its right. The camera pans with the line until the "
                 "hall is gone and only the queue is left, then a row of shopfronts drops in from the top."},
        {"id": "street", "start": 154.0, "end": 161.75, "fps": 3,
         "title": "Street-corner sumo",
         "tags": ["loop", "background characters", "locked-off"],
         "text": "Locked-off in front of the shops: two wrestlers circle and shove while spectators at either side bob in short "
                 "loops. The bout never resolves; it is a loop that stands for many bouts."},
        {"id": "cloud", "start": 164.5, "end": 171.75, "fps": 4,
         "title": "A brawl cloud",
         "tags": ["cartoon cloud", "stars", "pop", "dissolve to map"],
         "text": "The grapple tips over and becomes a cartoon dust cloud with stars, the dark sky behind it. A head, a fist and a "
                 "foot poke out and vanish in turn while the cloud boils. Then a hole opens in the middle, the cloud breaks into "
                 "puffs, and the map of Japan is underneath."},
        {"id": "bans", "start": 172.0, "end": 180.0, "fps": 3,
         "title": "Bans spread across the map",
         "tags": ["pop-in", "stagger", "tilt away"],
         "text": "Red crosses appear on city after city, a beat apart, until the map is dotted with them. Then the whole map tips "
                 "flat away from camera like a lid closing, and the next scene is behind it."},
        {"id": "ring", "trail": True, "start": 184.5, "end": 187.0, "fps": 8,
         "title": "The boundary draws itself",
         "tags": ["draw-on", "ellipse", "line"],
         "text": "Two wrestlers crouch face to face, still. A short line appears under them and opens out into an ellipse that "
                 "draws itself around both, closing in about three quarters of a second. The rule arrives as a line."},
        {"id": "shapes", "start": 189.5, "end": 194.25, "fps": 4,
         "title": "The ring tries on shapes",
         "tags": ["morph", "top-down", "shape cycle"],
         "text": "Top-down, the two wrestlers locked in the middle. The boundary around them morphs: diamond, square, octagon, "
                 "diamond, hexagon, a bow-tie, a barrel, and finally the circle. Each shape holds about a "
                 "quarter second before morphing, then the circle holds."},
        {"id": "dohyo", "start": 194.5, "end": 196.25, "fps": 8,
         "title": "土俵 slams in",
         "tags": ["type", "scale-down", "white wipe"],
         "text": "A white panel slides across, and 土俵 arrives far too big for the frame, then scales down to center in about a "
                 "quarter second with 'DOHYO' set in spaced capitals beneath. It is the only full-screen title in the film."},
        {"id": "push-out", "start": 200.5, "end": 206.0, "fps": 6,
         "title": "Pushed out",
         "tags": ["shrink", "pull-back", "push", "fall"],
         "text": "The title shrinks to a speck, then a huge close-up of the wrestlers pulls back to a wide of the ring. One drives "
                 "the other to the edge and over the line; a cut to a low angle shows him falling backwards out of the ring, and "
                 "the background drains to grey."},
        {"id": "fall", "trail": True, "start": 205.75, "end": 210.0, "fps": 4,
         "title": "Falling, and gaining weight",
         "tags": ["free fall", "tumble", "speed lines", "morph"],
         "text": "In a grey void he tumbles head over heels, speed lines streaking upward behind him. As he turns, his body "
                 "grows heavier and his belt changes from red to gold: weight becoming an advantage, drawn mid-fall."},
        {"id": "rain", "start": 210.0, "end": 216.0, "fps": 4,
         "title": "It rains wrestlers",
         "tags": ["fall", "crowd", "color bars", "rise-up"],
         "text": "More wrestlers float down around him in mawashi of every color while flat colored bars flash across. Then torii "
                 "gates, lanterns and fox statues rise from the bottom of the frame and fill it."},
        {"id": "torii", "start": 216.0, "end": 221.75, "fps": 4,
         "title": "Through the torii",
         "tags": ["fly-through", "nested frames", "tunnel"],
         "text": "The shrine slides past and the camera flies through a torii, then another and another, each gate framing the "
                 "next, until they become a green box corridor. Wrestlers are waiting at the far end."},
        {"id": "dance", "start": 221.75, "end": 224.75, "fps": 4,
         "title": "A ring of wrestlers",
         "tags": ["rotation", "loop", "floating"],
         "text": "Five wrestlers float in a ring holding hands and turn slowly on a dark ground, like figures in a dance. The ring "
                 "rotates by about a quarter turn in three seconds, then one figure swings toward the camera and fills the frame."},
        {"id": "back-out", "start": 224.75, "end": 227.0, "fps": 8,
         "title": "Back out of the tunnel",
         "tags": ["pull-back", "tunnel", "reveal"],
         "text": "A hand sweeps past the lens and the camera pulls back out through the green corridor to a single wrestler "
                 "standing at its end, then cuts to him alone on the cream ground."},
        {"id": "rinse", "trail": True, "start": 227.75, "end": 231.25, "fps": 4,
         "title": "Rinsing with water",
         "tags": ["gesture", "hold"],
         "text": "He lifts a small yellow ladle to his mouth, rinses, and holds the pose while the head bobs slightly. The ritual "
                 "is shown as one gesture held long enough to read."},
        {"id": "yokozuna", "start": 249.75, "end": 256.0, "fps": 6,
         "title": "The rope ties itself",
         "tags": ["spotlights", "snake", "knot", "flash"],
         "text": "Pale spotlight bars sweep across as the wrestler turns. A thick white rope snakes in, wraps his waist and ties "
                 "itself into the big loop at the back. Two helpers haul the ends in a glowing pull, and at 4:15.75 he stands in "
                 "the finished yokozuna rope with zigzag paper streamers."},
        {"id": "dolls", "start": 256.0, "end": 266.0, "fps": 2,
         "title": "Wrestlers become dolls",
         "tags": ["morph", "drop-in", "stagger", "grid floor"],
         "text": "On a perspective grid floor he shrinks into a round, doll-like figure. The shōgun appears on a dais, and more "
                 "dolls drop in at left and right with a small bounce, until a full row flanks him."},
        {"id": "overthrow", "start": 269.25, "end": 274.0, "fps": 4,
         "title": "A hand lifts the shōgun away",
         "tags": ["hand of god", "lift", "flash", "tumble"],
         "text": "A giant hand reaches in from the top, pinches the shōgun off his dais and lifts him out of frame. A pale yellow "
                 "flash, then the dolls tumble loose in a grey void."},
        {"id": "arena", "start": 276.75, "end": 283.0, "fps": 3,
         "title": "The arena rises",
         "tags": ["rise-up", "push-in", "particles"],
         "text": "Wrestlers pop up on a small ring and the stands of a modern arena rise up around them, the camera pushing in as "
                 "the roof canopy drops into place. Confetti dots drift through."},
        {"id": "tv", "start": 286.75, "end": 288.0, "fps": 8,
         "title": "The arena is on TV",
         "tags": ["pull-back", "frame inside frame", "reveal"],
         "text": "The whole arena shrinks into a TV screen held up by a gloved hand with a remote. The scale jump reveals the "
                 "broadcast in a quarter second."},
        {"id": "replay", "start": 290.75, "end": 297.0, "fps": 4,
         "title": "Instant replay",
         "tags": ["loop", "rewind", "prop swap"],
         "text": "The remote becomes a referee's gunbai fan in the hand. On the screen the same throw plays, rewinds and plays "
                 "again: a kick, a fall, back to standing, a kick, a fall."},
        {"id": "weight", "start": 297.25, "end": 303.0, "fps": 4,
         "title": "Sixty kilograms heavier",
         "tags": ["inflate", "pose", "squash"],
         "text": "A thin wrestler stands on a ring that rises under him. As he runs through the ritual poses his body balloons "
                 "between drawings, belly swelling sideways, until he settles twice his width."},
        {"id": "unroll", "start": 320.75, "end": 322.0, "fps": 8,
         "title": "A scroll unrolls into the end card",
         "tags": ["unroll", "wipe", "map"],
         "text": "A white sheet covers the arena, its rolled edge unrolls, and a red-and-white illustrated map of castles and "
                 "roads on a grid pops on piece by piece in under half a second."},
        {"id": "castles", "start": 327.5, "end": 330.0, "fps": 6,
         "title": "Castles become a city",
         "tags": ["morph", "pop", "time passing"],
         "text": "As the credits slide up, the castles on the map flicker and rebuild as modern blocks and towers, and the "
                 "smoking steam engine on the road turns into a car. Even the credit card shows history changing."},
    ],
    55: [
        {"id": "book", "start": 5.75, "end": 7.25, "fps": 8,
         "title": "A book opens onto the city",
         "tags": ["fade-in", "page turn", "reveal"],
         "text": "A cream book shape fades up on lavender, and its two pages swing open outward in about half a second. A "
                 "top-down plan of a walled city is printed inside, already full of tiny figures."},
        {"id": "raid", "start": 9.5, "end": 16.5, "fps": 3,
         "title": "Raiders fill the plan",
         "tags": ["pop-in", "stagger", "fire", "iris"],
         "text": "Figures in green pop in along the streets a few at a time, then small flames flicker on across the plan. A "
                 "blue dot appears at its center and grows into a circle that carries us out to the sea."},
        {"id": "flight", "start": 16.25, "end": 21.75, "fps": 4,
         "title": "Boats flee, riders arrive",
         "tags": ["slide-in", "stagger", "parallax", "wipe"],
         "text": "On banded blue sea, small boats slide in from the right one after another. Pink horsemen ride up from the "
                 "bottom edge on a gallop loop, filling the foreground. A horizontal band then wipes the frame to a top-down "
                 "view of boats among islands."},
        {"id": "lagoon", "trail": True, "start": 26.0, "end": 31.0, "fps": 4,
         "title": "The lagoon fills with islands",
         "tags": ["grow", "draw-on", "arrows", "labels"],
         "text": "On a flat map, island shapes grow out of the lagoon one by one. Yellow arrows draw on from the river mouths and "
                 "point into it, and the labels Po and Piave type on beside them."},
        {"id": "currents", "trail": True, "start": 32.5, "end": 40.25, "fps": 3,
         "title": "Currents push back",
         "tags": ["loop", "arrows", "morph"],
         "text": "An Adriatic arrow pushes in from the sea against the river arrows, and all three pulse on loops. Between them "
                 "the islands keep changing shape, shrinking and splitting: a maze that will not hold still."},
        {"id": "pile-driving", "trail": True, "start": 74.5, "end": 79.75, "fps": 6,
         "title": "Piles driven by hand",
         "tags": ["loop", "push", "splash", "stagger"],
         "text": "A cross-section of water and banded mud. A pile drops in from the top with a splash, and a pair of giant "
                 "fingers presses it down into the mud. Each new pile goes in at the left end of the row, so the same "
                 "two-second loop, repeated, builds the foundation."},
        {"id": "insects", "start": 87.25, "end": 93.75, "fps": 4,
         "title": "Insects shut out",
         "tags": ["iris", "flick", "pop-out"],
         "text": "A circle grows from one pile into a close-up of the wood in the mud, insects crawling around a clump of fungus. "
                 "A hand flicks them away one by one, then sweeps the fungus off. The sealed wood stays clean."},
        {"id": "sparkle", "trail": True, "start": 97.5, "end": 101.75, "fps": 4,
         "title": "Sparkle, then back out",
         "tags": ["sparkle", "twinkle", "iris"],
         "text": "Four-point stars twinkle on and off across the bare wood, each one scaling up and vanishing in a few frames. "
                 "Then a small round window opens on the right showing the piles from outside, and it grows to fill the frame."},
        {"id": "foundation", "start": 112.75, "end": 120.0, "fps": 3,
         "title": "The foundation stacks up",
         "tags": ["drop-in", "stack", "tilt", "push-in"],
         "text": "A wooden platform drops onto the piles at a slight tilt and settles level. A stone block lands on top of it the "
                 "same way. The view then wipes up to a white palace standing on a blue band of water."},
        {"id": "fires", "start": 128.0, "end": 136.5, "fps": 3,
         "title": "The bridges burn",
         "tags": ["parallax", "flicker", "collapse"],
         "text": "A view between pink buildings with wooden footbridges crossing the canal behind. One bridge sags, and small "
                 "flames flicker along the others. The foreground buildings hold still while the bridges move."},
        {"id": "rialto", "start": 136.25, "end": 145.0, "fps": 3,
         "title": "The Rialto rebuilds itself",
         "tags": ["morph", "replace", "label"],
         "text": "On lavender, a grey wooden arch appears with the label 'Rialto Bridge' typing on above it. At 2:21 it is "
                 "replaced by a white stone bridge with arches, and at 2:24 by the final covered bridge. Three versions on one "
                 "spot, each swap a cut."},
        {"id": "canals", "trail": True, "start": 147.0, "end": 155.0, "fps": 2,
         "title": "Gondolas on the canals",
         "tags": ["top-down", "loop", "path"],
         "text": "A top-down map of blue canals through sand-colored land. Black gondolas glide along the channels at a steady "
                 "pace on loops, each following its canal's curve."},
        {"id": "gondola", "start": 157.75, "end": 167.75, "fps": 2,
         "title": "Everyone goes by boat",
         "tags": ["slide", "pick up", "exit"],
         "text": "A side view of the quay. A gondola slides in from the left, two people step aboard, and it glides off right "
                 "out of frame. A small white dot then appears beside the quay and grows into the next circle."},
        {"id": "seed", "start": 168.0, "end": 173.75, "fps": 4,
         "title": "No land to farm",
         "tags": ["pinch", "drop", "fall"],
         "text": "Giant fingers rise into an empty cream frame holding one seed, then let go. The seed falls through the frame "
                 "and lands on the floor of a colonnade whose arch looks out to sea."},
        {"id": "trade-map", "start": 176.75, "end": 186.0, "fps": 2,
         "title": "Routes, then the city plan",
         "tags": ["pop-in", "draw-on", "card swap"],
         "text": "An oval map of the Mediterranean pops onto lavender, sea routes drawn as thin lines from Venice. At 3:05 the "
                 "card slides down out of frame and a map of the city's canals rises in its place."},
        {"id": "treaty", "start": 207.75, "end": 216.5, "fps": 2,
         "title": "The treaty writes itself",
         "tags": ["rise-up", "write-on", "title"],
         "text": "A cream document with a scalloped border rises up from the bottom edge. Lines of text draw on one at a time "
                 "from the top down, and at 3:36 'The Fourth Crusade Agreement' sets as its title."},
        {"id": "handshake", "start": 221.0, "end": 229.0, "fps": 3,
         "title": "Handshake, then the fleet",
         "tags": ["slide-up", "shake", "iris", "slide-in"],
         "text": "A coral panel slides up with two hands clasping, rings on the fingers. A circle opens from the clasp into the "
                 "Basilica di San Marco, and a fleet of galleys slides in across the water beneath it."},
        {"id": "coin", "start": 233.75, "end": 241.0, "fps": 4,
         "title": "A coin, then the route",
         "tags": ["pop", "shrink", "iris", "draw-on"],
         "text": "A hand rises holding a large gold coin, which shrinks to its final size. A dark dot then grows from the hand to "
                 "fill the frame, and the map behind it has a red route drawing itself from Venice down around Greece toward "
                 "Constantinople."},
        {"id": "route", "trail": True, "start": 240.5, "end": 244.5, "fps": 4,
         "title": "The route arrives",
         "tags": ["draw-on", "arrowhead", "ease-out"],
         "text": "The red line keeps drawing, slows as it curls up through the Aegean, and lands at Constantinople as an "
                 "arrowhead."},
        {"id": "sail", "start": 252.0, "end": 260.5, "fps": 2,
         "title": "Sail out, then the Silk Road",
         "tags": ["slide out", "pan", "draw-on"],
         "text": "A merchant ship bobs in profile, then slides out of frame right. The sea wipes down to a map of Asia and a thin "
                 "white route traces east toward Yuan China."},
        {"id": "gallery", "start": 260.5, "end": 266.75, "fps": 4,
         "title": "A colonnade of crafts",
         "tags": ["iris", "pop-in", "stagger"],
         "text": "A white dot on the route grows into a cream circle. A colonnade fades up inside, and icons pop into its "
                 "arches one after another: a palette, then a book and quill."},
        {"id": "tiles", "start": 266.75, "end": 285.0, "fps": 2,
         "title": "Panels tile across",
         "tags": ["slide", "grid", "stack"],
         "text": "Panels slide in from the right on lavender: a loom, a printing press, then glassware. The row keeps scrolling "
                 "left on a loop, the three crafts repeating like a conveyor belt, until the panels slide away and 'ART', 'SILK' "
                 "and 'SPICES' type on in a column."},
        {"id": "people-grid", "start": 288.75, "end": 296.0, "fps": 4,
         "title": "Words replaced by people",
         "tags": ["replace", "stagger", "grid", "wipe up"],
         "text": "Figures pop in one at a time across the top row, pushing 'ART' out. The next row replaces 'SILK', the next "
                 "'SPICES', until the frame is a grid of people. The grid then wipes up to the Grand Canal, where a gondola slides "
                 "in."},
        {"id": "book-flip", "start": 301.5, "end": 313.0, "fps": 2,
         "title": "A guidebook flips through history",
         "tags": ["iris", "pop", "page flip"],
         "text": "A coral circle grows from a lit window into a 'Venice' guidebook. Its cover flips open to an Ottoman army "
                 "before the Hagia Sophia, then flips again to a fleet of ships, which grows to fill the frame as the ships "
                 "sail on."},
        {"id": "flags", "start": 318.0, "end": 341.75, "fps": 1,
         "title": "Flags change over the city",
         "tags": ["shrink", "flag swap", "slow color shift"],
         "text": "A coral circle clears the fleet and the Venetian flag grows from a speck. A hand reaches in and takes it, and a "
                 "circle from the flag opens on Venice by the sea. The flag on the spire swaps from French to Austrian to French to Austrian to Italian, each change a quick flicker, while red "
                 "shapes fade in across the façade."},
        {"id": "souvenir", "start": 341.5, "end": 349.0, "fps": 3,
         "title": "Venice becomes a souvenir",
         "tags": ["iris", "slide-in", "iris"],
         "text": "A lavender circle grows from the spire into an open hand. A postcard slides in from the left and settles in "
                 "the palm. A hole opens in the card and grows into the lagoon, a souvenir-shop picture of the city."},
        {"id": "flood", "start": 356.0, "end": 368.5, "fps": 2,
         "title": "The water rises and falls",
         "tags": ["rise", "fall", "loop", "tide"],
         "text": "San Marco on coral, the blue band of water at its base. The water rises up the façade and falls away again, "
                 "over and over, a little higher each time: 250 floods a year as a tide."},
        {"id": "traffic", "start": 368.75, "end": 373.0, "fps": 4,
         "title": "One boat becomes traffic",
         "tags": ["iris", "slide-in", "multiply", "loop"],
         "text": "A blue circle from the church door opens on a single motorboat sliding in from the left, seen from above. At "
                 "6:12.75 the frame cuts to dozens of boats in lanes, all moving at once."},
        {"id": "balcony", "start": 381.0, "end": 384.0, "fps": 4,
         "title": "Tourists fill the view",
         "tags": ["slide-in", "stagger", "foreground"],
         "text": "A loggia looking out to the church. Two tourists slide in from the right one after the other, their backs "
                 "filling the foreground and blocking the view."},
        {"id": "scroll", "start": 390.5, "end": 392.0, "fps": 8,
         "title": "A scroll unrolls into the end card",
         "tags": ["unroll", "pop-in"],
         "text": "A white sheet's rolled edge unrolls left to right, and the red map of castles pops on behind it in under half a "
                 "second. It is the TED-Ed end card shared with other lessons."},
    ],
    56: [
        {"id": "hands", "start": 5.75, "end": 8.0, "fps": 8,
         "title": "Two hands meet",
         "tags": ["fade-in", "reach", "grip", "pull-back"],
         "text": "Out of white, a pink hand and a blue hand reach in from opposite corners, meet in the middle and grip. The "
                 "camera pulls back past their legs to the two of them standing hand in hand on yellow. The film's relationship "
                 "is set before anyone is named."},
        {"id": "bloom-castle", "start": 11.0, "end": 14.5, "fps": 8,
         "title": "A whisper blooms into a kingdom",
         "tags": ["bloom", "soft edge", "line art", "color wash"],
         "text": "Amia leans in to whisper, and a soft orange glow blooms out of the space between them. It grows into a "
                 "cloud with blurred, grainy edges and swallows the frame; inside, the scene is only thin orange line art. A "
                 "second bloom in turquoise opens on a line-drawn castle where both of them rule. Every memory scene arrives "
                 "this way."},
        {"id": "faces", "start": 16.75, "end": 22.75, "fps": 4,
         "title": "Line-drawn faces trade places",
         "tags": ["line art", "drift", "swap", "color wipe"],
         "text": "On yellow, Amia's face in thin orange line talks while doodles (stars, hearts, a fish) drift across. Zelba's "
                 "face slides in from the right and fills with orange color as he listens. A dark red glow then spreads from the "
                 "left edge and turns the whole frame red, with the faces still in place."},
        {"id": "spaghetti", "start": 24.5, "end": 31.0, "fps": 4,
         "title": "A bad idea fills with color",
         "tags": ["line art", "squash", "color fill", "bloom"],
         "text": "Line art on dark red: Amia and Zelba at the table with spaghetti. Amia dumps the bowl on her own head. Then "
                 "color blooms out from her, orange cloud edges spreading across the frame, and the scene is suddenly full color "
                 "with the spaghetti on her head."},
        {"id": "reveal", "start": 34.0, "end": 37.75, "fps": 6,
         "title": "Zelba appears beside her",
         "tags": ["fade-in", "glow", "hug"],
         "text": "Over the parents' shocked dinner table, Zelba fades into the empty chair as a soft glowing blue shape. He "
                 "leans over and wraps Amia in a hug, the spaghetti still dripping. The glow is the film's rule for anything "
                 "imaginary."},
        {"id": "thought", "start": 39.5, "end": 44.0, "fps": 6,
         "title": "A thought cloud grows",
         "tags": ["grow", "sparkle", "push-in"],
         "text": "The two sit cross-legged on yellow. A pink frame cuts in with them inside a yellow thought cloud trailing an "
                 "orange wisp, sparkles twinkling around it. The cloud swells until its edges leave the frame and the yellow is "
                 "the background again."},
        {"id": "crowd", "start": 44.25, "end": 48.0, "fps": 6,
         "title": "Other kids crowd in, then vanish",
         "tags": ["pop-in", "stagger", "puff"],
         "text": "Kids pop up from the bottom edge one at a time, waving and reaching in, until they fill the frame around the "
                 "pair. Then each one pops into a cloud puff and disappears, and Amia and Zelba are alone again."},
        {"id": "melt", "start": 48.25, "end": 50.0, "fps": 12,
         "title": "The pair melts into a family",
         "tags": ["morph", "squash", "stretch", "split"],
         "text": "Amia and Zelba squeeze together into one blue blob, shrink to a dot, stretch into a flat line with bumps, and "
                 "the bumps grow up into a family of four. One shape becomes many in under two seconds."},
        {"id": "playground", "start": 55.0, "end": 60.25, "fps": 4,
         "title": "The playground",
         "tags": ["bloom", "loop", "background action"],
         "text": "A blue cloud bloom opens on a top-down playground in orange. Kids loop on the swings, slide and seesaw while "
                 "a yellow imaginary friend appears beside a girl and rides the slide down after her."},
        {"id": "party", "start": 63.75, "end": 74.0, "fps": 3,
         "title": "A birthday table fills with friends",
         "tags": ["pop-in", "stagger", "crowd", "color wipe"],
         "text": "At an empty birthday table the girl blows out the candles and invites someone in. Imaginary guests pop up "
                 "behind her one after another, every shape and color, until they pack the frame. A dark red wipe then sweeps up "
                 "from the corner."},
        {"id": "lineup", "start": 74.0, "end": 80.5, "fps": 3,
         "title": "A line of storytellers",
         "tags": ["line art", "color in", "slide", "bloom"],
         "text": "Line-drawn kids on pink act out their stories in place: a sword, a guitar, a dog on a leash. The row slides "
                 "left, and as each kid reaches center their imaginary friend colors in beside them. The last one grows into a "
                 "blue heart around Amia."},
        {"id": "classroom", "start": 80.5, "end": 85.5, "fps": 4,
         "title": "Story time takes over the classroom",
         "tags": ["drop", "bloom", "fly-in"],
         "text": "Amia drops into a desk on yellow, the class around her. As she talks, a story cloud blooms in front of the "
                 "teacher, a pink sea serpent swims through blue waves inside it, and a ship sails by."},
        {"id": "words", "start": 85.5, "end": 90.0, "fps": 6,
         "title": "Words stream out",
         "tags": ["close-up", "stream", "arc"],
         "text": "Close on Amia with Zelba sitting on her head. Big words and equations ('loquacious', 'e=mc²', "
                 "'idiosyncratic', 'ubiquitous') stream out of her mouth in blue script and arc off to the right."},
        {"id": "pointing", "trail": True, "start": 92.0, "end": 101.5, "fps": 4,
         "title": "The teacher points at everyone",
         "tags": ["loop", "arm swing", "comic timing"],
         "text": "Back of the teacher's head in the foreground. Her arm swings out from her side to point at each kid in turn, "
                 "the same move over and over, while the kids squirm."},
        {"id": "fall-blob", "start": 101.75, "end": 108.5, "fps": 4,
         "title": "Zelba falls and shapeshifts",
         "tags": ["wipe", "fall", "morph", "pile up"],
         "text": "A dark red wave wipes up over the classroom and Zelba drops in. He flattens into a puddle, a crowd of small "
                 "creatures piles onto him, then they're gone and he becomes a cat, a long weasel, and a pink curled ball."},
        {"id": "characters", "start": 108.0, "end": 114.0, "fps": 4,
         "title": "A parade of imaginary friends",
         "tags": ["morph", "swap", "trios"],
         "text": "The ball pops into a lineup of three characters that swaps every second: an old woman, a girl and a dancer; a "
                 "baby, a woman and a giant; a king, a hooded figure and a grump; a princess, a witch and a long-nosed puppet."},
        {"id": "family", "trail": True, "start": 115.25, "end": 119.0, "fps": 6,
         "title": "One friend becomes a family",
         "tags": ["morph", "bounce", "loop"],
         "text": "A blue figure lies back, turns green and flattens, then splits into a row of yellow creatures of all sizes. "
                 "They bounce in place out of step with each other, each one on its own loop."},
        {"id": "toybox", "start": 119.5, "end": 128.0, "fps": 4,
         "title": "A toybox comes alive",
         "tags": ["bloom", "morph", "pop-out", "wobble"],
         "text": "A blue bloom opens and the yellow creatures run together into a cube: a toybox. It wobbles, the lid springs "
                 "open, and toys climb out: a bear, a ringed stacker, a car. The box shuts and rounds into a spotted ball."},
        {"id": "globe", "start": 128.75, "end": 132.75, "fps": 4,
         "title": "The box becomes a globe",
         "tags": ["morph", "pop-on", "stagger"],
         "text": "The box rounds off into a yellow globe with orange continents, and small companions pop onto its surface one "
                 "after another: a dark star, a pink cloud, a pair of lips."},
        {"id": "screen", "start": 132.5, "end": 143.75, "fps": 2,
         "title": "The film within the film",
         "tags": ["drop-in", "projector", "slide change"],
         "text": "A dark rectangle drops into frame and an audience appears in front of it with a projector. The screen lights "
                 "up with a flag and Amia and Zelba, then changes slide by slide: a kid on a cat, a girl hugging a squirrel, a "
                 "cartoon car with a face. The bloom from the last slide opens into pink."},
        {"id": "roles", "start": 144.0, "end": 149.75, "fps": 4,
         "title": "Companions change roles",
         "tags": ["morph", "stagger", "shape"],
         "text": "Four companions in a row on pink: a dice, a blue figure, a bag, a dog. They melt one at a time, left to right, "
                 "into simple shapes with faces (a heart, a rectangle, a triangle, a star). The heart then tips over into the next "
                 "scene."},
        {"id": "companions", "start": 157.25, "end": 166.5, "fps": 3,
         "title": "COMPANIONS writes itself",
         "tags": ["swirl", "write-on", "orbit"],
         "text": "Small colored companions swirl around a blue frame in a loose ring. 'COMPANIONS' writes on letter by letter "
                 "in hand-drawn caps in the middle while the ring keeps turning around it."},
        {"id": "fight", "start": 166.5, "end": 171.0, "fps": 6,
         "title": "A fight cloud",
         "tags": ["slide-in", "echo", "cartoon cloud", "squash"],
         "text": "Amia slides in on a dark ground trailed by colored echoes of herself, and a row of Zelbas slides in with "
                 "echoes from the other side. They collide in a burst of speed lines and become a yellow fight cloud with arms, "
                 "legs and stars poking out."},
        {"id": "monster", "start": 171.0, "end": 180.0, "fps": 4,
         "title": "A monster, then a friend",
         "tags": ["loom", "warm wipe", "reach"],
         "text": "Zelba looms over a crouching Amia as a spiky, toothy monster, reaching for her twice. Giant faces of her parents "
                 "watch from the edges. A warm orange glow spreads in and the monster softens back into smiling Zelba, who helps "
                 "her up into a hug."},
        {"id": "serpent", "start": 188.0, "end": 196.25, "fps": 4,
         "title": "The sea serpent",
         "tags": ["slither", "wrap", "spiral", "shrink"],
         "text": "A line of blue drops from the top and becomes a toothy sea serpent that slithers across the floor, wraps "
                 "around Amia in a spiral and squeezes. Then it unwinds, shrinks to a small tail, and is gone."},
        {"id": "argue", "start": 196.25, "end": 203.75, "fps": 4,
         "title": "An argument in shapes",
         "tags": ["close-up", "jagged shapes", "alternating"],
         "text": "Close profiles face off from opposite edges: Amia and a blue face, then a real girl. Jagged speech shapes in "
                 "orange, blue and yellow shoot back and forth between them, swapping every quarter second, until both glare."},
        {"id": "make-up", "start": 203.75, "end": 210.0, "fps": 4,
         "title": "Making up",
         "tags": ["pull-back", "hug", "tilt up"],
         "text": "The two girls on a playground mark, arms folded, then reach out, shake hands and hug. The camera tilts up the "
                 "building to its rooftop at night."},
        {"id": "rooftop", "start": 210.0, "end": 228.0, "fps": 2,
         "title": "Stars drawn on the rooftop",
         "tags": ["dotted line", "draw-on", "twinkle", "fade"],
         "text": "On a rooftop at night, Zelba and Amia watch dotted-line drawings sparkle on and off in the sky: hearts, "
                 "faces, stars, people. Zelba moves to sit away from her, then back. At 3:40 he flickers out and she stands alone, "
                 "then walks through the door."},
        {"id": "photos", "start": 228.25, "end": 234.75, "fps": 4,
         "title": "A life in photos",
         "tags": ["drop-in", "stack", "swipe away"],
         "text": "Polaroids drop in and pile up on dark red, each labelled with her age: Amia 2 yrs, 7 yrs, 14 yrs, 18, 25, "
                 "36, 53, 87. A hand sweeps them off the table and the next scene is under them."},
        {"id": "lift", "start": 243.0, "end": 249.0, "fps": 4,
         "title": "Pretend weights",
         "tags": ["bloom", "lift", "grow"],
         "text": "An orange bloom washes over the table into yellow, where Zelba cheers in the foreground. A small Amia strains "
                 "at a barbell, then in one cut she has grown into a strong woman hoisting a huge one overhead."},
        {"id": "theory", "start": 249.0, "end": 262.0, "fps": 2,
         "title": "Theory of mind",
         "tags": ["arc type", "pop-in", "embrace"],
         "text": "Amia with Zelba behind her. 'THEORY OF MIND' arcs in over their heads word by word. A friend leans in and a "
                 "crying girl appears, and Amia's face reads each of them. Zelba's arms stretch out and gather the whole group into "
                 "one hug."},
        {"id": "mirror", "start": 263.25, "end": 270.0, "fps": 3,
         "title": "Zelba leaves through the mirror",
         "tags": ["melt", "pour", "reflection"],
         "text": "Zelba sits on the bathroom counter by the sink. He melts down into the basin and drains away, and when the "
                 "mirror clears, the reflection is of grown-up Amia brushing her teeth."},
        {"id": "dollhouse", "start": 275.75, "end": 279.0, "fps": 6,
         "title": "The room pulls back to a dollhouse",
         "tags": ["pull-back", "reveal", "scale"],
         "text": "Grown-up Amia on her sofa talking to her cat. The camera pulls back fast: the room is a yellow dollhouse box, "
                 "and Zelba is leaning over it, looking in."},
        {"id": "together", "start": 278.5, "end": 290.0, "fps": 2,
         "title": "Grown up, side by side",
         "tags": ["reach", "pull", "bloom", "walk-by"],
         "text": "Zelba appears beside the grown-up Amia. She talks, he listens, reaches over her head and pulls her into a "
                 "hug, then hands her a drink. A yellow cloud bloom drops in around them as a sofa, and a girl walks past with her "
                 "own pink imaginary friend."},
        {"id": "end", "start": 293.0, "end": 304.0, "fps": 2,
         "title": "Back to the family",
         "tags": ["wipe", "morph", "bounce", "end card"],
         "text": "The sofa scene slides away into dark red. On near-black, Zelba lies back and melts into the bouncing family "
                 "of yellow creatures from 1:56, the same loop, now with 'TED.COM/PLAY' above."},
    ],
}


def clock(seconds):
    return f"{int(seconds) // 60:02d}:{seconds % 60:05.2f}"


def frame_times(seq):
    n = int(round((seq["end"] - seq["start"]) * seq["fps"])) + 1
    return [seq["start"] + k / seq["fps"] for k in range(n)]


def extract(source, base, seqs, run_ffmpeg):
    for seq in seqs:
        folder = base / "motion" / seq["id"]
        key = f'{seq["start"]}-{seq["end"]}-{seq["fps"]}-{seq.get("trail", False)}'
        done = folder / ".done"
        if done.exists() and done.read_text() == key:
            continue
        shutil.rmtree(folder, ignore_errors=True)
        folder.mkdir(parents=True)
        count = len(frame_times(seq))
        run_ffmpeg(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", f'{seq["start"]:.3f}', "-i", str(source),
                    "-vf", f'fps={seq["fps"]:g},scale=\'min(1280,iw)\':-2', "-frames:v", str(count), "-q:v", "3",
                    str(folder / "f-%03d.jpg")])
        if seq.get("trail", False):
            trail(folder)
        done.write_text(key)


def trail(folder):
    """Onion skin: moving pixels from each frame over the static background, older frames fainter."""
    frames = [np.asarray(Image.open(p).convert("RGB").resize((640, 360)), dtype=np.float32)
              for p in sorted(folder.glob("f-*.jpg"))]
    stack = np.stack(frames)
    background = np.median(stack, axis=0)
    canvas = background.copy()
    last = len(frames) - 1
    for i, frame in enumerate(frames):
        mask = np.abs(frame - background).max(axis=2) > 28
        alpha = 0.22 + 0.78 * (i / last) ** 1.6 if last else 1.0
        canvas[mask] = canvas[mask] * (1 - alpha) + frame[mask] * alpha
    Image.fromarray(canvas.clip(0, 255).astype(np.uint8)).save(folder / "trail.jpg", quality=88)


def energy(source, base, fps):
    """Mean RGB change between consecutive frames at the source rate, cached in energy.json."""
    out = base / "energy.json"
    if out.exists():
        return json.loads(out.read_text())
    w, h = 96, 54
    size = w * h * 3
    process = subprocess.Popen(["ffmpeg", "-v", "error", "-i", str(source), "-vf", f"scale={w}:{h}:flags=area",
                                "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    diffs, previous = [], None
    while True:
        chunk = process.stdout.read(size)
        if len(chunk) < size:
            break
        current = np.frombuffer(chunk, np.uint8).astype(np.int16)
        diffs.append(0.0 if previous is None else round(float(np.abs(current - previous).mean()), 2))
        previous = current
    process.wait()
    data = {"fps": float(Fraction(fps)), "diff": diffs}
    out.write_text(json.dumps(data, separators=(",", ":")))
    return data


def levels(data, edges):
    """Energy for each [edges[i], edges[i+1]) window on 0..1.

    The scale is logarithmic between the film's noise floor and its 99th percentile. A linear scale
    lets full-frame wipes flatten everything else, and a small dot crossing a flat field matters.
    """
    diff = np.asarray(data["diff"])
    floor = max(0.05, float(np.percentile(diff, 25)))
    top = np.log1p(float(np.percentile(diff, 99)) / floor) or 1.0
    out = []
    for a, b in zip(edges, edges[1:]):
        window = diff[int(a * data["fps"]):max(int(a * data["fps"]) + 1, int(b * data["fps"]))]
        out.append(min(1.0, float(np.log1p(window.mean() / floor) / top)) if len(window) else 0.0)
    return out


def spark(values):
    return "".join(SPARK[min(len(SPARK) - 1, int(v * len(SPARK)))] for v in values)


def seq_levels(data, seq):
    times = frame_times(seq)
    step = 1 / seq["fps"]
    return levels(data, [t for t in times] + [times[-1] + step])


def bars_svg(values, width, height, label, bands=(), ticks=()):
    n = len(values)
    bar = width / n
    parts = [f'<svg class="energy-svg" viewBox="0 0 {width} {height + (16 if ticks else 0)}" role="img" aria-label="{html.escape(label)}">']
    for x0, x1, href, title in bands:
        parts.append(f'<a href="{href}"><rect class="energy-band" x="{x0:.1f}" y="0" width="{max(1.5, x1 - x0):.1f}" '
                     f'height="{height}"><title>{html.escape(title)}</title></rect></a>')
    for i, v in enumerate(values):
        h = max(0.6, v * (height - 2))
        parts.append(f'<rect class="energy-bar" x="{i * bar:.2f}" y="{height - h:.2f}" width="{max(0.6, bar * 0.8):.2f}" height="{h:.2f}"/>')
    for x, text in ticks:
        parts.append(f'<text x="{x:.1f}" y="{height + 13}" class="energy-tick">{text}</text>')
    parts.append("</svg>")
    return "".join(parts)


def section(number, name, item, seqs, data, frame_card):
    duration = item["duration"]
    width = 1000
    bucket = 0.5 if duration > 90 else 0.25
    edges = list(np.arange(0, duration, bucket)) + [duration]
    tick_every = 30 if duration > 90 else 10
    ticks = [(t / duration * width, f"{int(t) // 60}:{int(t) % 60:02d}") for t in range(0, int(duration), tick_every)]
    bands = [(s["start"] / duration * width, s["end"] / duration * width, f'#m-{s["id"]}', s["title"]) for s in seqs]
    timeline = bars_svg(levels(data, edges), width, 64, "Motion energy across the film", bands, ticks)
    out = ['<section class="study-section motion-section" id="motion" aria-labelledby="motion-title">',
           '<h2 id="motion-title">Motion</h2>',
           f'<p>{html.escape(MOTION_INTRO[number])}</p>',
           f'<p>Each sequence below is sampled at a fixed rate so its frames read as a flip book. Bars show how much the '
           f'picture changes from one source frame to the next: tall bars are fast moves, flat stretches are holds. '
           f'The same notes are in <a href="frames/{name}/motion.md">motion.md</a> for reading as text.</p>',
           f'<figure class="energy-timeline">{timeline}<figcaption>Motion energy across the film, '
           f'{bucket:g} s per bar. Shaded spans are the {len(seqs)} sequences below; select one to jump to it.</figcaption></figure>',
           '<ol class="motion-list">']
    for i, seq in enumerate(seqs, 1):
        times = frame_times(seq)
        folder = f'frames/{name}/motion/{seq["id"]}'
        span = seq["end"] - seq["start"]
        tags = "".join(f"<li>{html.escape(t)}</li>" for t in seq["tags"])
        strip = "".join(frame_card(f"{folder}/f-{k:03d}.jpg", t, step=0.01) for k, t in enumerate(times, 1))
        energy_svg = bars_svg(seq_levels(data, seq), 400, 40, f'Motion energy per frame step for {seq["title"]}')
        trail_html = (f'<figure class="motion-trail"><a href="{folder}/trail.jpg" target="_blank" rel="noopener">'
                      f'<img loading="lazy" src="{folder}/trail.jpg" alt="Onion skin of {html.escape(seq["title"])}"></a>'
                      '<figcaption>Onion skin: earlier positions faded, last frame solid.</figcaption></figure>'
                      if seq.get("trail", False) else '')
        out.append(
            f'<li class="motion-seq" id="m-{seq["id"]}"><div class="motion-head"><h3><span>{i:02d}</span>{html.escape(seq["title"])}</h3>'
            f'<button class="motion-time" type="button" data-seek="{seq["start"]:.3f}" aria-label="Play from {clock(seq["start"])}">'
            f'{clock(seq["start"])}–{clock(seq["end"])} · {span:.2f} s</button></div>'
            f'<ul class="motion-tags">{tags}</ul><p class="motion-text">{html.escape(seq["text"])}</p>'
            f'<p class="motion-rate">{len(times)} frames, {seq["fps"]:g} per second ({1 / seq["fps"]:.3f} s apart)</p>'
            f'<div class="motion-strip">{strip}</div>'
            f'<div class="motion-extra">{trail_html}<figure class="motion-energy">{energy_svg}'
            '<figcaption>Motion per frame step</figcaption></figure></div></li>')
    out.append('</ol></section>')
    return "".join(out)


def markdown(number, name, item, seqs, data, key_frames):
    duration = item["duration"]
    per_second = levels(data, list(range(0, int(duration) + 1)) + [duration])
    rows = [f"{s // 60:02d}:{s % 60:02d}  {spark(per_second[s:s + 60])}" for s in range(0, len(per_second), 60)]
    lines = [f"# Motion notes: {item['title']}", "",
             f"{item['author']} · {clock(duration)} · {item['url']}", "",
             MOTION_INTRO[number], "",
             "## How to read this", "",
             "Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping "
             "through the files is a flip book of the move. The bar after each frame is the motion energy from it to the "
             "next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log "
             "scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the "
             "fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is "
             "an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.jpg`, where present, is an onion skin of "
             "the sequence: moving shapes from every frame over the static background, earlier positions fainter.", "",
             "## Film timeline", "", "One character per second.", "", "```", *rows, "```", "",
             "## Sequences", ""]
    for i, seq in enumerate(seqs, 1):
        times = frame_times(seq)
        energies = seq_levels(data, seq)
        lines += [f"### {i:02d}. {seq['title']}", "",
                  f"{clock(seq['start'])}–{clock(seq['end'])} ({seq['end'] - seq['start']:.2f} s) · {len(times)} frames at "
                  f"{seq['fps']:g} fps, {1 / seq['fps']:.3f} s apart · {', '.join(seq['tags'])}", "",
                  seq["text"], "",
                  f"Motion: `{spark(energies)}`", ""]
        if seq.get("trail", False):
            lines += [f"Onion skin: `motion/{seq['id']}/trail.jpg`", ""]
        lines += [f"- {clock(t)} `motion/{seq['id']}/f-{k:03d}.jpg` {spark([e])}" for k, (t, e) in enumerate(zip(times, energies), 1)]
        lines.append("")
    if key_frames:
        lines += ["## Key frames", "", "One frame per visual idea, from the one-per-second set.", ""]
        lines += [f"- {clock(t)} `seconds/second-{int(t) + 1:05d}.jpg` {note}" for t, note in key_frames]
        lines.append("")
    return "\n".join(lines)
