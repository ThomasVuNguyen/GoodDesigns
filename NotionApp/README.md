# Notion app clone

A working, self-contained clone of the signed-in Notion web app: the workspace sidebar, the block editor on the **Health Science Lab** page, ⌘K search, and the Notion AI chat. It runs on plain HTML, CSS and ES modules with no build step and no requests to Notion.

- Reference: `https://app.notion.com` (signed in), page **Health Science Lab**, the **Chat** sidebar tab, a new Notion AI chat and the **Move diary pages** chat
- Captured: November 17, 2026, desktop at 1440×900

## Run locally

```bash
python3 -m http.server 4391 --bind 127.0.0.1 --directory NotionApp/dist
```

Open `http://127.0.0.1:4391/`. Routes are hash-based, so the app works from any folder:

| Route | View |
| --- | --- |
| `#/p/health-science-lab` | The reference page (default) |
| `#/p/<page-id>` | Any page in the sidebar |
| `#/ai` | New Notion AI chat |
| `#/chat/move-diary-pages` | The reference chat thread |

`?theme=dark` or `?theme=light` forces a theme. Edits are saved in `localStorage` under `notion-clone-state`. **Library, Trash, more… → Reset demo content** restores the sample workspace.

## Structure

- `dist/index.html`: the document shell. It sets the theme before first paint.
- `dist/styles.css`: design tokens, then the sidebar, topbar, page, blocks, popups, search, chat and responsive rules.
- `dist/app.js`: state, routing, the sidebar, the editor, menus, search and chat.
- `dist/data.js`: the seed workspace (pages, chats, emoji set, cover gradients).
- `dist/icons.js`: the reference app's SVG icons as `[viewBox, inner markup]`.
- `dist/assets/`: tab mask icons, the Notion AI face and crown, and the favicon. `assets/manifest.json` lists their sources.

## What works

- **Sidebar.** Home, Chat and Meetings tabs with the animated label. Favorites, Agents, Private and Teamspaces sections collapse. Rows show a chevron and **…**/**+** on hover, expand into subpages, and have a page menu (favorite, duplicate, rename, open in new tab, Move to Trash). Inbox shows a badge. The workspace switcher and the Library menu (appearance, Trash restore, reset) work. The sidebar closes with ⌘\\ to a hamburger that shows the floating sidebar on hover, and you can drag to resize it (220–480px, double-click resets).
- **Topbar.** Breadcrumbs, "Edited …", a Share popover, Copy link, Favorite, and the **…** menu (font Default/Serif/Mono, Small text, Full width, Duplicate, Move to Trash, dark mode).
- **Page.** Editable title and icon (emoji picker), Add cover with change and remove, and hover page controls.
- **Blocks.** Text, Heading 1–3, bulleted, numbered, to-do, toggle (nested children), page link, callout, quote, divider and code. Editing keys:
  - Enter splits a block. Enter on an empty list item ends the list.
  - Backspace merges with the previous block or turns a block back into text.
  - Tab and Shift+Tab nest and un-nest blocks.
  - Arrow keys move between blocks.
  - ⌘D duplicates the current block.
  - Markdown shortcuts: `#`, `##`, `###`, `-`, `1.`, `[]`, `>`, `"`, `---` and ```` ``` ````.
- **Slash menu.** Filtering, keyboard navigation, and inserting a new block or converting the current one.
- **Block handles.** Hovering a block shows the **+** and **⋮⋮** handles at the reference's exact offsets (−52px and −28px). **+** adds a block below, Option-click adds one above. You can drag a block to reorder it. Clicking the handle opens the block menu (Turn into, Color, Copy link, Duplicate, Move to, Delete, Ask AI).
- **Search (⌘K).** Pages and Chats scopes, recent groups, breadcrumb paths, a live preview card, arrow keys, Enter, and ⌘Enter for a new tab.
- **Notion AI.** The new-chat hero, a composer that grows as you type, the approval-mode and model pickers, the "Get better answers from your apps" banner and the suggestion chips. Sending a message creates a chat in the sidebar and shows the thinking state and a streamed reply. Page names you mention become mention chips and appear in the Artifacts panel. The thread view has message actions, the edit card with Show changes, the context panel toggle and Scroll to bottom.
- **Themes.** Light and dark use the reference's own `--c-*` token values. The app follows the system setting; ⌘⇧L toggles it.

## Measurements

Taken from the live app with computed styles at 1440×900:

- Sidebar 270px, `#f9f8f7`, inset right border `#f0efed`. Rows are 30px with 1px gaps. Section headers are 12px/16px `#a19e99`, and each section has 12px bottom margin plus a 4px gap.
- Topbar 44px. Page column 720px. The icon is 78px with a 96px top margin. The title is 40/48 bold.
- Blocks have 6px padding, collapsing to 1px between neighbors of the same kind. Leaves have 2px padding and a 28px line box.
- Popups use a 10px radius and `--c-shaOutLg`. Menu items are 28px with a 6px radius. Tooltips are `#2c2c2b` with a 6px radius and 5px×8px padding.
- Chat: the message column is 712px and bubbles are 20px-radius pills. The composer has a 16px radius and `--c-shaOutMd`. The Artifacts panel is 300px.

Checked at 1440×900: block, title, icon, handle, sidebar row and chat element positions match the reference to the pixel, and a pixel diff of the page leaves only the emoji anti-aliasing and the (renamed) breadcrumb.

## Responsive behavior

- **Above 860px:** desktop layout.
- **640–860px:** narrower page gutters (48px). The chat context panel and the search preview pane are hidden.
- **Up to 640px:** the sidebar becomes an off-canvas drawer behind a scrim, opened from the hamburger. Pages use 24px gutters and a 32px title. Hover-only controls are hidden.

The reference desktop web app does not adapt below about 700px (it squeezes the page column to a few pixels), so the phone layout follows Notion's collapsed-sidebar pattern instead of a measured reference.

## Intentional differences

- **Privacy.** Everything except the Health Science Lab page is sample content. The sidebar, chats, workspace (`Fernhill`) and teamspace (`Fernhill Lab`, shown as a letter tile) are invented. The reference workspace's names and teamspace logo are not included.
- **Subpages.** The bodies of Build diary, Cilantro diary, Tool Diary and Hardware layground are written for this clone. Only their titles and icons come from the reference.
- **Notion AI** does not call a model. Replies are placeholders that say so.
- **Not built.** Inbox, comments, verification, sharing, page history, Meetings and calendars, Trash browsing beyond restore, rich text formatting inside a block, and databases. These buttons show a short notice.
- **The slash menu** was not opened on the reference, because opening it requires typing into a real page. It uses the same measured popup and menu-item styles as the block menu and draws its own block-type glyphs.

## Reuse and licensing

Notion's name, the Notion AI face and crown artwork, product icons, and third-party brand marks (Slack, Gmail, Google, Microsoft, Asana, Box, GitHub, Jira, Linear, Salesforce) belong to their owners. They are here only as a design reference. Replace them before any public or commercial reuse. The code, layout and sample content are free to adapt.
