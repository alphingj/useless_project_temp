# KudumbaSree AI

**KudumbaSree AI** is a maximalist, comedic Kerala neighborhood-gossip meeting simulator. Enter one name and watch five fictional Malayali aunties roast an ordinary harmless incident until it becomes a full committee investigation.

Live demo: **https://uselessai-dusky.vercel.app**

## The Experience

- Enter one person’s name.
- Start a fictional Kudumbashree-style gossip meeting.
- Watch five aunties build a connected roast around one harmless everyday incident.
- See the conversation in two synchronized panels:
  - Malayalam script with casual English code-switching.
  - English-letter Manglish.
- Read the final **Kudumbashree Verdict** with an unnecessary conclusion, three absurd advice items, and a dramatic final roast.

The roast is intentionally brutal about harmless habits, weak decisions, snack opinions, delayed replies, awkward timing, and overconfidence. It does not attack protected traits or invent realistic wrongdoing.

## The Aunties

- **Lissy Aunty, Gossip Queen**: claims she noticed everything, despite having no evidence.
- **Mini Aunty, Overconfident**: turns a tiny action into a grand theory and calls it calculation.
- **Bindhu Aunty, Ente Friend Paranju**: cites an unnamed friend, then that friend’s neighbour, then “same pattern.”
- **Sujatha Aunty, Dramatic**: treats a chair, cup, or late reply as breaking news.
- **Remya Aunty, Practical**: gives strict advice, homework, and snack requirements nobody asked for.

## Roast Style

The dialogue uses Malayalam written in Malayalam script with natural English code-switching and a parallel Manglish translation. Typical energy includes:

- “Ayyo!”
- “Enikku appozhe thonni!”
- “Ente ponno!”
- “Sherikkum?”
- “Alla mole…”
- “Njan parayunnath kettal mathi.”
- “Ente oru friend paranjatha…”
- “Ee generation…”
- “Daivame!”

The humor targets behavior and absurd conclusions, not a person’s identity or real life.

## Safety And Parody

Every claim is fictional parody. The generator is designed around harmless observations such as:

- A delayed WhatsApp reply.
- A tea cup being studied too seriously.
- An umbrella opened without rain.
- A plastic chair being chosen after overthinking.
- A plant receiving motivational advice.
- A coriander search becoming a household investigation.
- An argument about whether banana chips are crispy or soft.

It must not create realistic allegations involving crime, cheating, abuse, violence, serious misconduct, medical conditions, hate, or harassment. “Brutal roast” means theatrical teasing about silly behavior, not harmful abuse.

## Maximalist UI Direction

The interface uses a Kerala-pop maximalist visual language:

- Hot pink, mango yellow, sky blue, coral, and cream color blocks.
- Offset hard-edge shadows and thick poster-like borders.
- Tilted chat panels and verdict cards.
- Halftone texture in the hero scene.
- Sticker-like labels and loud headline treatment.
- Dense visual hierarchy without hiding the input or transcript.
- Responsive single-column collapse on mobile.

## Tech Stack

- React 19
- Vite
- Plain CSS
- Local client-side random dialogue engine
- No backend or API key
- Vercel deployment

## Project Structure

```text
.
├── index.html
├── package.json
├── package-lock.json
└── src/
    ├── main.jsx        # App, connected case generator, bilingual dialogue, verdicts
    └── styles.css      # Maximalist visual system, responsive layout, animations
```

## Run Locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local Vite URL, usually `http://localhost:5173`.

Build for production:

```bash
npm run build
```

Preview the production bundle:

```bash
npm run preview
```

## Deploy To Vercel

This is a standard Vite project. Vercel detects:

- Build command: `vite build`
- Output directory: `dist`

Deploy with:

```bash
npx vercel --prod
```

## How The Conversation Engine Works

Each meeting creates one shared `caseFile` containing the name, incident, object, location, theory, advice, and Malayalam translations. All aunties react to that same case, which keeps the roast connected instead of generating unrelated one-liners.

The meeting also randomly chooses from multiple conversation arcs. This changes the order of reactions, advice, disagreements, and derailment while preserving the story thread. The Malayalam-script panel and Manglish panel use the same selected arc and reveal messages at the same time.

## Judging Flow

1. Open the live demo.
2. Enter a name such as `Anu`, `Rahul`, or `Meera`.
3. Compare the synchronized Malayalam and Manglish chat panels.
4. Watch the aunties escalate one tiny observation into a full roast.
5. Start another meeting with the same name to see a different incident and conversation rhythm.
6. Read the final verdict and its three completely unnecessary advice items.

## Accessibility And Responsive Behavior

- The name input has a visible label and focus state.
- `prefers-reduced-motion` disables intense animation.
- Transcript panels stack on smaller screens.
- Speaker names and roles remain visible for every message.
- The meeting status indicates whether the aunties are still talking.

## License

Prototype parody experience for TinkerHub Useless Projects and demonstration purposes.
