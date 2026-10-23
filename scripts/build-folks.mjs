// Assembles gallery/folks.json with profiles, talks, and transcripts for Good Folks.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function formatTime(seconds) {
  const s = Math.floor(seconds);
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function decodeHtml(html) {
  return html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseVttToParagraphs(content) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const cues = [];
  let curTime = null;
  const hasWordTags = content.includes('<c>') || /<\d{2}:\d{2}/.test(content);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(\d{2}:)?(\d{2}):(\d{2})\.(\d{3})\s+-->\s+(\d{2}:)?(\d{2}):(\d{2})\.(\d{3})/);
    if (match) {
      const startSec = (match[1] ? parseInt(match[1]) * 3600 : 0) + parseInt(match[2]) * 60 + parseInt(match[3]) + parseInt(match[4]) / 1000;
      curTime = Math.round(startSec * 10) / 10;
      continue;
    }
    if (curTime === null) continue;

    if (hasWordTags) {
      if (line.includes('<') && (line.includes('>') || line.includes('<c>'))) {
        const clean = decodeHtml(line.replace(/<[^>]+>/g, '').trim());
        if (clean) cues.push({ start: curTime, text: clean });
      }
    } else {
      const clean = decodeHtml(line.replace(/<[^>]+>/g, '').trim());
      if (clean && !line.includes('WEBVTT') && !line.startsWith('Kind:') && !line.startsWith('Language:')) {
        cues.push({ start: curTime, text: clean });
      }
    }
  }

  // Deduplicate consecutive identical words/phrases
  const cleanCues = [];
  for (const cue of cues) {
    if (!cleanCues.length) {
      cleanCues.push(cue);
      continue;
    }
    const prev = cleanCues[cleanCues.length - 1];
    if (prev.text === cue.text) continue;
    cleanCues.push(cue);
  }

  // Group cues into natural paragraph-sized reading blocks (~300-450 characters or natural pause > 15s)
  const paragraphs = [];
  let cur = null;
  for (const c of cleanCues) {
    if (!cur) {
      cur = { start: c.start, time: formatTime(c.start), text: c.text };
    } else if (cur.text.length < 380 && (c.start - cur.start < 25)) {
      cur.text += (cur.text.endsWith('-') ? '' : ' ') + c.text;
    } else {
      paragraphs.push(cur);
      cur = { start: c.start, time: formatTime(c.start), text: c.text };
    }
  }
  if (cur) paragraphs.push(cur);
  return paragraphs;
}

// 1. Josh Miller Talks
const joshVtts = [
  {
    id: 'npYk9iarhRU',
    slug: 'software-as-art',
    title: 'Software as Art, Hiring Misfits, and Optimizing for Feelings',
    event: 'Dialectic with Jackson Dahl',
    duration: 6925,
    durationFormatted: '1:55:25',
    startSeconds: 2298,
    url: 'https://www.youtube.com/watch?v=npYk9iarhRU&t=2298s',
    thumb: 'thumbs/folks/videos/npYk9iarhRU.jpg',
    note: 'In-depth discussion on founding The Browser Company, building Arc, and leading with taste and vulnerability.',
    vttFile: 'temp_subs/npYk9iarhRU.en-US.vtt'
  },
  {
    id: 'lvw-85-6-4s',
    slug: 'why-every-ai-company-builds-a-browser',
    title: 'Why Every AI Company Will Try to Build a Browser',
    event: 'The Browser Company · Ep 1',
    duration: 529,
    durationFormatted: '8:49',
    startSeconds: 4,
    url: 'https://www.youtube.com/watch?v=lvw-85-6-4s&t=4s',
    thumb: 'thumbs/folks/videos/lvw-85-6-4s.jpg',
    note: 'Josh breaks down the competitive landscape of AI and why the browser interface remains the ultimate prize.',
    vttFile: 'temp_subs/lvw-85-6-4s.en-orig.vtt'
  },
  {
    id: 'v0160IirdL4',
    slug: 'videofile-the-internet-computer',
    title: 'videofile_ : The Internet Computer',
    event: 'The Browser Company',
    duration: 840,
    durationFormatted: '14:00',
    startSeconds: 0,
    url: 'https://www.youtube.com/watch?v=v0160IirdL4',
    thumb: 'thumbs/folks/videos/v0160IirdL4.jpg',
    note: 'A deep walk through the philosophy of turning web browsing into a seamless personal computer experience.',
    vttFile: 'temp_subs/v0160IirdL4.en-orig.vtt'
  },
  {
    id: 'u2-d5Sty-K0',
    slug: 'not-building-a-web-browser',
    title: 'We’re Not Building a Web Browser',
    event: 'The Browser Company',
    duration: 228,
    durationFormatted: '3:48',
    startSeconds: 0,
    url: 'https://www.youtube.com/watch?v=u2-d5Sty-K0',
    thumb: 'thumbs/folks/videos/u2-d5Sty-K0.jpg',
    note: 'Clarifying the vision: why organizing ideas, tabs, and focus is bigger than rendering HTML pages.',
    vttFile: 'temp_subs/u2-d5Sty-K0.en-en.vtt'
  },
  {
    id: 'foisAkpaCGo',
    slug: 'why-we-raised-new-funding',
    title: 'Why We Just Raised a New Round of Funding',
    event: 'The Browser Company · Ep 0',
    duration: 152,
    durationFormatted: '2:32',
    startSeconds: 0,
    url: 'https://www.youtube.com/watch?v=foisAkpaCGo',
    thumb: 'thumbs/folks/videos/foisAkpaCGo.jpg',
    note: 'A short, transparent announcement detailing the company\'s funding round and future roadmap.',
    vttFile: 'temp_subs/foisAkpaCGo.en-orig.vtt'
  },
  {
    id: 'E9yZ0JusME4',
    slug: 'ceo-update-what-we-been-up-to',
    title: 'What Have We Been Up To? (CEO Update)',
    event: 'The Browser Company',
    duration: 410,
    durationFormatted: '6:50',
    startSeconds: 0,
    url: 'https://www.youtube.com/watch?v=E9yZ0JusME4',
    thumb: 'thumbs/folks/videos/E9yZ0JusME4.jpg',
    note: 'Josh shares unvarnished reflections on product cycles, user feedback, and team focus.',
    vttFile: 'temp_subs/E9yZ0JusME4.en-orig.vtt'
  },
  {
    id: 'izZqmklAOiY',
    slug: '10-key-moments-to-arc-1-0',
    title: 'The 10 Key Moments That Led Us to Arc 1.0 (Internal Footage)',
    event: 'The Browser Company',
    duration: 507,
    durationFormatted: '8:27',
    startSeconds: 0,
    url: 'https://www.youtube.com/watch?v=izZqmklAOiY',
    thumb: 'thumbs/folks/videos/izZqmklAOiY.jpg',
    note: 'Behind-the-scenes archive of early prototypes, mistakes, and breakthrough decisions on the road to Arc 1.0.',
    vttFile: 'temp_subs/izZqmklAOiY.en-orig.vtt'
  },
  {
    id: 'V_VfRHS_K0o',
    slug: 'whats-new-in-arc-back-to-school',
    title: 'What’s New in Arc: Back to School, Our Competitors, Arc 101 & More',
    event: 'The Browser Company',
    duration: 263,
    durationFormatted: '4:23',
    startSeconds: 0,
    url: 'https://www.youtube.com/watch?v=V_VfRHS_K0o',
    thumb: 'thumbs/folks/videos/V_VfRHS_K0o.jpg',
    note: 'A charismatic walkthrough of feature additions and how Arc differentiates from traditional browsers.',
    vttFile: 'temp_subs/V_VfRHS_K0o.en-orig.vtt'
  }
];

const joshTalks = [];
for (const t of joshVtts) {
  const raw = await readFile(path.join(root, t.vttFile), 'utf8');
  const paragraphs = parseVttToParagraphs(raw);
  joshTalks.push({
    id: t.id,
    slug: t.slug,
    title: t.title,
    event: t.event,
    duration: t.duration,
    durationFormatted: t.durationFormatted,
    startSeconds: t.startSeconds,
    url: t.url,
    thumb: t.thumb,
    note: t.note,
    paragraphsCount: paragraphs.length,
    paragraphs
  });
}

// 2. Nashilu Mouen-Makoua Talk (from Whisper transcription)
const nashiluWhisper = JSON.parse(await readFile(path.join(root, 'temp_nashilu.json'), 'utf8'));

// Group whisper segments into coherent paragraphs
const nashiluParagraphs = [];
let nashCur = null;
for (const seg of nashiluWhisper.segments) {
  const text = seg.text.trim();
  if (!text) continue;
  if (!nashCur) {
    nashCur = { start: Math.round(seg.start * 10) / 10, time: formatTime(seg.start), text };
  } else if (nashCur.text.length < 320 && (seg.start - nashCur.start < 20)) {
    nashCur.text += ' ' + text;
  } else {
    nashiluParagraphs.push(nashCur);
    nashCur = { start: Math.round(seg.start * 10) / 10, time: formatTime(seg.start), text };
  }
}
if (nashCur) nashiluParagraphs.push(nashCur);

const nashiluTalks = [
  {
    id: 'k8gbDNGpv-I',
    slug: 'secret-world-of-nyc-internet-cafes',
    title: 'Inside the Secret World of NYC’s Last Internet Cafes',
    event: 'The Browser Company',
    duration: 330,
    durationFormatted: '5:30',
    startSeconds: 0,
    url: 'https://www.youtube.com/watch?v=k8gbDNGpv-I',
    thumb: 'thumbs/folks/videos/k8gbDNGpv-I.jpg',
    note: 'A lyrical, observational documentary exploring physical internet cafes in Brooklyn and Manhattan as community third spaces.',
    paragraphsCount: nashiluParagraphs.length,
    paragraphs: nashiluParagraphs
  }
];

const folks = [
  {
    slug: 'josh-miller',
    name: 'Josh Miller',
    role: 'CEO & Co-founder, The Browser Company (Arc, Dia)',
    location: 'Brooklyn, New York',
    avatar: 'thumbs/folks/josh-miller.jpg',
    quote: '“We were a web browser company that pretended it was a consumer company... Software as art, hiring misfits, and optimizing for feelings.”',
    bio: 'Josh Miller is the CEO of The Browser Company and creator of Arc and Dia. As a speaker and writer, he has reshaped modern startup storytelling by trading corporate jargon for disarming honesty, vulnerability, and an obsession with software craft.',
    social: [
      {
        platform: 'x',
        label: '@joshm on X',
        url: 'https://x.com/joshm?lang=en'
      }
    ],
    talksCount: joshTalks.length,
    talks: joshTalks
  },
  {
    slug: 'nashilu-mouen-makoua',
    name: 'Nashilu Mouen-Makoua',
    role: 'Storyteller & Investor · The Browser Company alumna',
    location: 'Brooklyn, New York',
    avatar: 'thumbs/folks/nashilu-mouen-makoua.jpg',
    quote: '“When the internet is anywhere and everywhere, why do you go to one place? These are hyper-local spaces designed to serve specific people in specific neighborhoods.”',
    bio: 'South London-born, Brooklyn-based storyteller and investor with a gift for exploring internet culture through a deeply human, observational lens. Her work examines the intersection of technology, physical space, and belonging.',
    social: [
      {
        platform: 'linkedin',
        label: 'LinkedIn Profile',
        url: 'https://www.linkedin.com/in/nashilu/?isSelfProfile=false'
      }
    ],
    talksCount: nashiluTalks.length,
    talks: nashiluTalks
  }
];

const outPath = path.join(root, 'gallery/folks.json');
await writeFile(outPath, JSON.stringify({ folks }, null, 2) + '\n');
console.log(`Saved gallery/folks.json with ${folks.length} folks and ${joshTalks.length + nashiluTalks.length} total talks/transcripts.`);
