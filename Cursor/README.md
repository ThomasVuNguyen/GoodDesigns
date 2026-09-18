# Cursor Agents Clone

A pixel-perfect static clone of the Cursor AI Agents interface (`cursor.com/agents`).

## Reference

- **URL**: https://cursor.com/agents
- **Capture date**: September 17, 2026
- **Page title**: AI Coding Agent for Building Ambitious Software | Cursor

## Run Locally

```bash
cd dist
python3 -m http.server 8091
# Open http://localhost:8091
```

Or use any static file server:

```bash
npx -y serve dist
```

## Folder Structure

```
Cursor/
├── README.md              ← You are here
└── dist/
    ├── index.html         ← Main page
    ├── styles.css         ← Complete stylesheet with design tokens
    ├── script.js          ← Interactive behaviors
    └── assets/
        └── avatar.jpg     ← User profile avatar
```

## Implemented Sections

1. **Sidebar** — Logo, layout/search icons, navigation (New Chat, Automations, Codebase), Chats section with filter, Try Grok Bot button, user profile with avatar
2. **Main header** — "Start from scratch" dropdown with cloud icon and chevron
3. **Chat input** — Textarea with placeholder, add-context button, model selector dropdown, microphone button
4. **Suggestion chips** — "Run security audit" and "Explore Marketplace" pill buttons
5. **Conversation cards** — 6 cards with:
   - Preview thumbnails (with file stats, PR status badges, branch badges, code preview images)
   - Card titles with optional unread indicators
   - Meta row with model icons, model names, sources, and timestamps

## Implemented Interactions

- Chat input auto-resize on typing
- Navigation item active state toggle
- Suggestion chips populate the chat input on click
- Conversation card selection highlighting
- Microphone button recording toggle (turns red)
- Hover states on all interactive elements
- Keyboard shortcut: Cmd/Ctrl+K focuses the chat input
- Mobile responsive sidebar (slides in/out)

## Responsive Breakpoints

- **Desktop**: 1280×900 (primary viewport)
- **Mobile**: 768px and below (sidebar collapses)

## Design Tokens & Reusable Components

### Tokens (in `styles.css` `:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#c8d1e0` | Page background |
| `--bg-sidebar` | `rgba(215, 220, 232, 0.6)` | Sidebar with blur |
| `--bg-input` | `#edeef0` | Chat input background |
| `--bg-mic` | `#3c3c3c` | Microphone button |
| `--text-primary` | `#1a1a1a` | Primary text |
| `--text-secondary` | `#6b6b6b` | Secondary text |
| `--text-addition` | `#2e7d32` | Git additions (+) |
| `--text-deletion` | `#c62828` | Git deletions (-) |
| `--text-open` | `#2e7d32` | Open PR badge |
| `--text-merged` | `#7b1fa2` | Merged PR badge |
| `--font-family` | Inter, system stack | Typography |
| `--radius-lg` | `12px` | Card/container corners |
| `--radius-xl` | `16px` | Chat input corners |

### Reusable Components

- `.nav-item` — Sidebar navigation item with icon + label + optional badge
- `.chip` — Pill-shaped suggestion button with optional trailing icon
- `.conversation-card` — Horizontal card with preview thumbnail + info section
- `.card-pr-badge` / `.card-branch-badge` — Status badges for git state
- `.try-grok-btn` — Outlined action button
- `.user-profile` — User info row with avatar
- `.chat-input-wrapper` — Input container with model selector and mic

## Known Intentional Differences

- **Avatar image**: Generated placeholder instead of actual user photo
- **Font**: Uses Google Fonts Inter (the reference may use a custom/local build)
- **SVG icons**: Approximated from visual inspection; actual Cursor uses custom icon set
- **Suggestion chip text**: May differ slightly from dynamic reference content

## Licensing Notes

- This clone is for personal reference and learning purposes
- The Cursor brand, logo, and product design are owned by Anysphere Inc.
- Replace all brand assets before any public use
- The avatar image is AI-generated and can be freely replaced
