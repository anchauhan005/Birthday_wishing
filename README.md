# Birthday Surprise Website

Static birthday website built with HTML, CSS and Vanilla JavaScript. Deploy this folder to Vercel as a static project; `index.html` is the entry point and no build command is needed.

## Add your music
Put your own MP3 files in `assets/music/` using these exact filenames:

- `friendship-music.mp3` — shared background song for Bouquet, Teddy, Open When and A Sky Full of Wishes.
- `happy-birthday.mp3` — separate song for the Birthday Cake page.
- `firecracker.mp3` — separate firecracker sound for A Sky Full of Wishes (Gift 05).

On Gift 05, the song and firecracker sound have independent controls. Firecracker volume can be adjusted separately, and the firecracker sound can be paused without pausing the background song. Browsers require a user gesture before audio can play, so tap the relevant controls. The firecracker sound is intentionally opt-in rather than unexpectedly loud.

## Pages
`index.html`, `cake.html`, `bouquet.html`, `teddy.html`, `open-when.html`, `wishes.html`. All asset and navigation paths are relative.

## Gift 02 bouquet
The bouquet is recreated from the supplied `surprise.html` reference: six pink, purple and white flowers, green stems and leaves, translucent wrapper, pink ribbon, floating motion and bloom-on-tap interactions. It is styled to retain the website's existing pastel pink/lavender theme.

## Gift 05 night sky
The sky includes a moon, moving clouds, twinkling clickable stars, shooting star, wishes popup and animated fireworks. Use “Launch fireworks” for an immediate burst. The separate firecracker audio control plays `assets/music/firecracker.mp3` alongside the shared background song.

## Microphone
On `cake.html`, choose “Use microphone” and grant permission. Blow gently; the sound level is analyzed locally in the browser. If permission is denied or unavailable, use “Blow Out Candles”. Tracks are stopped when leaving the page. Microphone access requires HTTPS (Vercel provides HTTPS).


## Latest mobile and fireworks update

- Gift 02 bouquet scales down at mobile breakpoints so the complete bouquet stays inside the bouquet panel.
- Gift 05 now uses a lightweight canvas firework system with rising rocket trails and expanding sparkling bursts, inspired by the celebratory firework feel of the earlier Diwali/Bhai Dooj pages while retaining this birthday site's night-sky palette.
- On Gift 05, pressing the shared music button starts/stops both tracks together: `friendship-music.mp3` at 60% and `firecracker.mp3` at 40%. The firecracker button and volume slider can still control the effect sound independently.
- Add `friendship-music.mp3`, `happy-birthday.mp3`, and `firecracker.mp3` to `assets/music/`.
