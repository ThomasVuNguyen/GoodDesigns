// Seed workspace for the clone. The Health Science Lab page reproduces the reference page's
// title, icon and links. Everything else is invented sample content; no private workspace data is included.

let n = 0;
const id = () => 'b' + (++n).toString(36);
const t = (text = '', extra = {}) => ({ id: id(), type: 'text', text, ...extra });
const b = (type, text = '', extra = {}) => ({ id: id(), type, text, ...extra });
const link = (pageId) => ({ id: id(), type: 'page', pageId });

export const WORKSPACE = { name: 'Fernhill', icon: '🍯' };
export const TEAMSPACE = { id: 'team', name: 'Fernhill Lab', tile: 'F' };
export const AI_NAME = 'Stardust Dragon';

export function seed() {
  n = 0;
  const pages = {};
  const add = (pid, title, icon, parent, blocks = [], extra = {}) => {
    pages[pid] = { id: pid, title, icon, parent, blocks, cover: null, edited: 'Oct 17', ...extra };
  };

  add('health-science-lab', 'Health Science Lab', '🦠', 'team', [
    t(''),
    link('build-diary'),
    link('cilantro-diary'),
    link('tool-diary'),
    t(''),
    link('hardware-layground'),
    t(''),
  ], { edited: 'Nov 8' });

  add('build-diary', 'Build diary', '🪂', 'health-science-lab', [
    b('callout', 'One entry per build session. Write what changed, what broke, and what to try next.', { emoji: '📓' }),
    b('h2', 'Nov 6 · Grow shelf v2'),
    b('bullet', 'Swapped the 6000K strip for a full-spectrum bar, 24 W at 30 cm'),
    b('bullet', 'Re-routed the fan cable behind the back panel'),
    b('bullet', 'Timer set to 16 h on / 8 h off'),
    b('todo', 'Print a second shelf bracket', { checked: true }),
    b('todo', 'Measure light at the tray corners', { checked: false }),
    b('h2', 'Oct 29 · Humidity dome'),
    t('The dome holds 80% humidity with the vent closed. Opening one vent drops it to about 65% in an hour, which is where the seedlings stopped damping off.'),
    b('quote', 'Ventilate before you water, not after.'),
  ]);

  add('cilantro-diary', 'Cilantro diary', '🪴', 'health-science-lab', [
    t('Slow-bolt variety, sown in two trays to compare soaking against dry sowing.'),
    b('h3', 'Germination log'),
    b('number', 'Day 0: Cracked the seed husks and soaked half for 12 hours'),
    b('number', 'Day 6: First sprouts in the soaked tray'),
    b('number', 'Day 9: Dry tray catches up; soaked tray is about 30% taller'),
    b('number', 'Day 14: Thinned both trays to 3 cm spacing'),
    b('toggle', 'Watering schedule', { open: false, children: [
      b('bullet', 'Bottom-water every second day'),
      b('bullet', 'Let the top 1 cm dry out between waterings'),
    ] }),
    b('todo', 'Move tray A under the new light', { checked: false }),
    b('todo', 'Start a third tray for a staggered harvest', { checked: false }),
  ]);

  add('tool-diary', 'Tool Diary', '🔧', 'health-science-lab', [
    t('Tools on the bench and the setting each one needs.'),
    b('bullet', 'Soldering iron: 330 °C for leaded solder, 360 °C for lead-free'),
    b('bullet', 'pH meter: two-point calibration at 4.0 and 7.0 every two weeks'),
    b('bullet', 'Hygrometer: checked against the salt test, reads 2% high'),
    b('toggle', 'Calibration notes', { open: true, children: [
      t('Rinse the probe with distilled water between buffers and blot it dry. Never wipe it.'),
    ] }),
    b('divider'),
    b('h3', 'Wishlist'),
    b('todo', 'Bench power supply with current limiting', { checked: false }),
    b('todo', 'Helping hands with magnifier', { checked: true }),
  ]);

  add('hardware-layground', 'Hardware layground', '🎢', 'health-science-lab', [
    t('Small experiments that might end up in the lab.'),
    b('h2', 'Running'),
    b('bullet', 'Soil-moisture sensor on an ESP32, logging every 10 minutes'),
    b('bullet', 'Peristaltic pump test for automatic bottom watering'),
    b('h2', 'Snippet'),
    b('code', 'const dry = reading < 420;\nif (dry) pump.run({ seconds: 4 });', { lang: 'JavaScript' }),
    b('callout', 'Keep the pump on a separate supply. Running it from the board browns out the sensor.', { emoji: '⚡', color: 'bg-yellow' }),
  ]);

  // Teamspace siblings
  add('bloom-journal', 'Bloom Journal', '🌸', 'team', [t('Flowering dates and photos for every plant on the balcony.')]);
  add('star-notes', 'Star Notes', '💫', 'team', [t('Night-sky log: what was visible, the seeing conditions and the gear used.')]);
  add('back-office', 'Back Office', '🦖', 'team', [b('bullet', 'Receipts'), b('bullet', 'Subscriptions'), b('bullet', 'Warranties')]);
  add('parts-database', 'Parts database', '💽', 'team', [t('Every resistor, sensor and screw in the drawers, with the bin each one lives in.')]);
  add('filming-diary', 'Filming diary', '💳', 'team', [t('Shot lists and B-roll ideas for build videos.')]);
  add('projects', 'Projects', '📂', 'team', [t('')]);

  // Private
  add('seed-tracker', 'Seed Starting Tracker', null, 'private', [t('Sow dates, germination rates and transplant days.')], { db: true });
  add('grow-light-specs', 'Grow Light Specs', null, 'private', [t('PPFD at 20, 30 and 40 cm for every light on the shelf.')]);
  add('new-page', '', null, 'private', [t('')]);
  add('supplier-shortlist', 'Supplier Shortlist', null, 'private', [b('bullet', 'Seeds'), b('bullet', 'Substrate'), b('bullet', 'Electronics')]);
  add('workbench', 'Workbench', '🛠️', 'private', [t('What is on the bench this week.')]);
  add('reading-list', 'Reading List', null, 'private', [b('todo', 'The Hidden Half of Nature', { checked: false })]);
  add('vision-board', 'Vision board', '💫', 'private', [t('')]);
  add('weekend-plan', 'Weekend Plan', '🎰', 'private', [b('todo', 'Repot the basil', { checked: false }), b('todo', 'Clean the grow tent', { checked: false })]);
  add('place-to-think', 'Just a place to think', '💭', 'private', [t('')]);

  const chats = {
    'move-diary-pages': {
      id: 'move-diary-pages',
      title: 'Move diary pages',
      turns: [
        {
          time: 'October 17 at 12:08 AM',
          user: ['i want u to move ', { m: 'build-diary' }, ' and ', { m: 'cilantro-diary' }, ' and ', { m: 'tool-diary' }, ' into this page'],
          ai: [
            { tool: 'Updated 3 pages' },
            { p: ['Moved all three diaries into ', { m: 'health-science-lab' }, ' as subpages.'] },
            { card: { title: 'Moved all three diaries', pages: ['build-diary', 'cilantro-diary', 'tool-diary'] } },
          ],
        },
      ],
      artifacts: ['cilantro-diary', 'build-diary', 'tool-diary'],
    },
  };
  const chatTitles = [
    ['Summarize cilantro germination notes', 'cilantro-diary'],
    ['Grow light wattage math', 'grow-light-specs'],
    ['Draft tool inventory table', 'tool-diary'],
    'Move diary pages',
    ['Seedling transplant schedule', 'seed-tracker'],
    ['Compare soil pH test kits', 'tool-diary'],
    ['Rename build diary entries', 'build-diary'],
    ['Weekly lab recap', 'health-science-lab'],
    ['Microscope buying guide', null],
    ['Track humidity readings', 'build-diary'],
    ['Organize hardware playground', 'hardware-layground'],
    ['Bloom dates by plant', 'bloom-journal'],
    ['Star party checklist', 'star-notes'],
    ['Parts drawer labels', 'parts-database'],
    ['Pump wiring sanity check', 'hardware-layground'],
    ['Filming shot list ideas', 'filming-diary'],
  ];
  const chatOrder = [];
  chatTitles.forEach((entry, i) => {
    if (entry === 'Move diary pages') { chatOrder.push('move-diary-pages'); return; }
    const [title, ref] = entry;
    const cid = 'c' + i;
    chatOrder.push(cid);
    chats[cid] = {
      id: cid, title, unread: i === 8 || i === 12,
      turns: [{
        time: 'October ' + (16 - (i % 9)) + ' at ' + (9 + (i % 3)) + ':' + String(10 + i * 3).padStart(2, '0') + ' AM',
        user: [title.charAt(0).toUpperCase() + title.slice(1).toLowerCase() + (ref ? ' — use ' : ''), ...(ref ? [{ m: ref }] : [])],
        ai: [
          ...(ref ? [{ tool: 'Read 1 page' }] : [{ tool: 'Searched workspace' }]),
          { p: ref
            ? ['Here is a short take based on ', { m: ref }, '. This clone keeps chat layouts and history, but it does not run a model, so answers are placeholders.']
            : ['This clone keeps chat layouts and history, but it does not run a model, so answers are placeholders.'] },
        ],
      }],
      artifacts: ref ? [ref] : [],
    };
  });

  return {
    v: 3,
    pages,
    order: {
      favorites: ['health-science-lab', 'hardware-layground'],
      private: ['seed-tracker', 'grow-light-specs', 'new-page', 'supplier-shortlist', 'workbench', 'reading-list', 'vision-board', 'weekend-plan', 'place-to-think'],
      team: ['health-science-lab', 'bloom-journal', 'star-notes', 'back-office', 'parts-database', 'filming-diary', 'projects'],
    },
    chats,
    chatOrder,
    recent: ['health-science-lab', 'build-diary', 'cilantro-diary', 'tool-diary', 'hardware-layground', 'grow-light-specs', 'seed-tracker'],
    ui: { sbOpen: true, sbw: 270, tab: 'home', collapsed: {}, expanded: {}, ctx: true, apps: true, theme: null },
  };
}

export const EMOJIS = '🦠🪂🪴🔧🎢🌸💫🦖💽💳📂🛠️💭🎰🍯🧪🔬🧬🌱🌿🍀🌵🌻🍅🥕🫑🧄🧅🍋📓📒📕📘📗📙📝✏️📌📎🔭🔋💡⚡🔌🧲⚙️🧰🪛🔨🪚📷🎥🎧🎹🚀✨🔥💧🌊⭐️🌙☀️🌈❄️🧭🗺️🏡🧵🧶🪡🎨🖌️📦🗂️🗓️⏰✅❌❓❗️💬'.match(/\p{Extended_Pictographic}️?/gu);

export const COVERS = [
  'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'radial-gradient(circle at 20% 30%, #4b6cb7 0%, #182848 70%)',
];
