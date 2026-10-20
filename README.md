# Portfolio — Shams Tabraze Uddin Ahmed

Next.js 16 · React Three Fiber · Motion · Lenis · MongoDB · Vercel Blob

## Edit content (no code)

Go to **/admin** on the live site → sign in with `ADMIN_PASSWORD`.

- **Works**: add, edit, reorder, feature, hide, delete projects. Upload covers, icons, section images, gallery images/videos.
- **Profile**: name, roles, bio, stats, experience, education, publications, socials, photo, logo, resume PDF.
- **Inbox**: messages from the contact form.
- **Setup**: connection status + one-click "Import starter content".

Saving updates the live site immediately.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Key | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string (or add the MongoDB Atlas integration from the Vercel Marketplace — it sets this for you) |
| `MONGODB_DB` | Optional, defaults to `portfolio` |
| `ADMIN_PASSWORD` | Password for /admin |
| `SESSION_SECRET` | Any long random string |
| `BLOB_READ_WRITE_TOKEN` | Set automatically when you connect a Vercel Blob store |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://shamstabraze.vercel.app` |

Without `MONGODB_URI` the site still works and shows the built-in content from `src/data/seed.ts`.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```
