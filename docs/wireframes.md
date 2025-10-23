Site wireframes and implementation plan — Ubuhle Busanda

Goal
- Provide a concise sitemap, page-by-page content outlines, component mapping, data shapes, accessibility notes, and implementation tasks so dev + designer can implement consistently.

Sitemap (high level)
- / (Home)
  - Hero (logo, nav)
  - Services (cards)
  - Work / Portfolio gallery (hero + modular collage)
  - Projects / Case studies (grid)
  - Testimonials
  - About
  - Contact / CTA

Page-by-page

Home (/)
- Purpose: Introduce brand, highlight services and latest work, invite contact.
- High-level blocks (top-to-bottom):
  1. Header / Navbar (logo, nav links, CTA)
  2. Hero (large visual, headline, brief subhead, primary CTA)
  3. Services (three image cards with short descriptors)
  4. WorkGallery (Hero + Modular Collage)
  5. Testimonials (carousel or stacked cards)
  6. CTA banner (contact prompt)
  7. Footer (links, copyright)

Work / Portfolio (component used on Home as WorkGallery)
- Purpose: Show portfolio items with hero and modular collage, inline video playback, and lightbox.
- Wireframe notes:
  - Hero: full-bleed image/video with title and location badge; Play & Open buttons.
  - Collage: left column two accent tiles (one larger) with SVG frames and poster->video crossfade; right column stacked tiles.
  - Small tiles have subtle stroke outlines and play overlay.

Projects (/projects)
- Purpose: Browse more work with filters (optional).
- Layout: responsive grid of mixed images/videos; clicking image opens lightbox; clicking play overlay plays inline.

Services (/ or /services)
- Purpose: Describe services (supply, install, maintenance).
- Layout: full-width image cards with decorative backgrounds and short text.

About
- Purpose: Who we are, credentials, short team note.
- Layout: image + mission statement + small timeline or bullets.

Contact
- Purpose: lead capture and contact info.
- Layout: contact form, phone, email, map (optional), operating areas.

Component mapping
- Header / Navbar: `components/Navbar.tsx`
  - Props: current route highlight
- Hero: used within `WorkGallery` and homepage
  - Props: item: {title, city, img, poster, videoSrc, type}
- WorkGallery: `components/WorkGallery.tsx`
  - Props: items: MediaItem[]
  - MediaItem shape: {id, title, type:'image'|'video', img?, poster?, videoSrc?, city?}
  - Behavior: inline-play (muted autoplay), pause-other logic, poster->video crossfade, Open lightbox
- Lightbox: `components/Lightbox.tsx`
  - Props: open:boolean, index:number, items:{src,type,alt}[]
  - Behavior: keyboard nav, close on Esc, prev/next
- Projects: `components/Projects.tsx` (grid)
- Services: `components/Services.tsx`
- Footer, CTA, About, Contact: existing components

Data shapes and contracts
- MediaItem
  - id: string
  - title: string
  - type: 'image' | 'video'
  - img?: string (lead image / next/image src)
  - poster?: string (video poster)
  - videoSrc?: string (public/video path)
  - city?: string

Accessibility checklist
- All interactive controls have aria-labels
- Keyboard focus states for cards and buttons
- Lightbox traps focus while open; Escape closes it
- Video playback buttons reachable by keyboard
- Images include alt text

Design tokens / Tailwind recommendations
- Use centered container widths: max-w-7xl for wide content, max-w-3xl for text blocks
- Spacing scale: use py-8 / py-16 consistently between sections
- Colors: use high-contrast for text and subtle white overlays for play affordances

Implementation tasks
- [In-progress] Polish `WorkGallery` with SVG frames & crossfade (complete)
- Add blurDataURL placeholders and optimize `next/image` usage (optional)
- Add a filter bar to `Projects` (optional)
- Add small unit tests for Lightbox keyboard behavior (jest + react-testing-library)

How to run locally (smoke test)
1. Install deps: `npm install`
2. Start dev server: `npm run dev`
3. Visit `http://localhost:3000`
4. Verify:
   - Navbar and logo render correctly
   - Services cards visible
   - WorkGallery hero renders; play a video, observe poster->video fade
   - Click Open to open lightbox; navigate with keyboard

Notes & follow-ups
- Consider adding a small prefetch or lazy-load for videos to reduce initial network usage.
- Decide if videos should auto-unmute on expansion in lightbox (UX decision).
- If adding animations, keep them subtle (duration <= 300-500ms) for perceived performance.

Contact me with which follow-up you want implemented next (SVG frame refinements, blur placeholders, or Projects filters).