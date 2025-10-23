<<<<<<< HEAD
# Ubuhlebusanda - Next.js Homepage Scaffold

This workspace contains a starter Next.js 14 (App Router) homepage scaffold implementing the wireframe for Ubuhlebusanda Pty Ltd using Tailwind CSS classes and simple components.

Files added/edited
- `app/layout.tsx` — Root layout and metadata
- `app/page.tsx` — Homepage composition (Hero, About, Services, WhyChooseUs, Projects, Testimonials, CTA, Contact)
- `app/globals.css` — Tailwind directives and base styles (requires Tailwind setup to function)
- `components/*` — Navbar, Hero, About, Services, WhyChooseUs, Projects, Testimonials, CTA, Contact, Footer

Next steps (run locally)

1. Install dependencies (if not already installed):

```powershell
npm install
```

2. Install Tailwind and Framer Motion (if not present):

```powershell
npx tailwindcss init -p; npm install framer-motion
```

3. Ensure `tailwind.config.js` includes the `app` and `components` folders in content, then run the dev server:

```powershell
npm run dev
```

Notes
- This scaffold uses placeholder images (`/hero.jpg`, `/about.jpg`, `/why.jpg`, and `/projects/p1.jpg`..). Replace them in the `public/` folder with real photos.
- Tailwind CSS directives in `app/globals.css` require Tailwind PostCSS setup. If Tailwind isn't configured yet, follow the official Tailwind + Next.js setup guide.

If you want, I can run the dev server now and fix any TypeScript or build issues live.
=======
# Ubuhlebusanda - Next.js Homepage Scaffold

This workspace contains a starter Next.js 14 (App Router) homepage scaffold implementing the wireframe for Ubuhlebusanda Pty Ltd using Tailwind CSS classes and simple components.

Files added/edited
- `app/layout.tsx` — Root layout and metadata
- `app/page.tsx` — Homepage composition (Hero, About, Services, WhyChooseUs, Projects, Testimonials, CTA, Contact)
- `app/globals.css` — Tailwind directives and base styles (requires Tailwind setup to function)
- `components/*` — Navbar, Hero, About, Services, WhyChooseUs, Projects, Testimonials, CTA, Contact, Footer

Next steps (run locally)

1. Install dependencies (if not already installed):

```powershell
npm install
```

2. Install Tailwind and Framer Motion (if not present):

```powershell
npx tailwindcss init -p; npm install framer-motion
```

3. Ensure `tailwind.config.js` includes the `app` and `components` folders in content, then run the dev server:

```powershell
npm run dev
```

Notes
- This scaffold uses placeholder images (`/hero.jpg`, `/about.jpg`, `/why.jpg`, and `/projects/p1.jpg`..). Replace them in the `public/` folder with real photos.
- Tailwind CSS directives in `app/globals.css` require Tailwind PostCSS setup. If Tailwind isn't configured yet, follow the official Tailwind + Next.js setup guide.

If you want, I can run the dev server now and fix any TypeScript or build issues live.
>>>>>>> 139fe18 (Initial commit with pages folder)
