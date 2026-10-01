# Wedding site system

New client:
1. `cp -r clients/priya-arjun clients/<new-client>`
2. Edit `clients/<new-client>/weddingData.js`
3. Replace files in `clients/<new-client>/media/` (names must match weddingData.js)
4. `node build.js <new-client>`
5. Preview: `npx serve dist/<new-client>`
6. Deploy: `npx vercel dist/<new-client> --prod` (or drag `dist/<new-client>` into Netlify), then point the client's domain at it.

Never edit `/template` per client. Improve it once and rebuild every client.
