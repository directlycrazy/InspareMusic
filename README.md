# Inspare Music

Your free, personal, self-hosted music streaming service with Deezer and YouTube support.

## Features
* Access to the entire Deezer library of music up to 1411kbps (FLAC)
* Sleek interface made in React and Next.js
* Playlist creation
* YouTube Music support inside playlists
* Discovery page
* Artist pages
* Album pages
* Track sharing
* Discord Rich Presence (with desktop app)
* Safari Add to Home Screen support
* User management
* No tracking
* And much more!

## Getting Started

### PocketBase

You will need a PocketBase server for this project. You can create one for free at [pockethost.io](https://pockethost.io), or self host it from [pocketbase.io](https://pocketbase.io).

You will also need to import the required collections from the [provided JSON file](./pocketbase/collections.json).

### Server

You will need to fill out a few environment variables before getting started. **The PocketBase credentials are only for admin accounts, not for user accounts.**

Create a .env file in the `server` folder.

```env
PB_EMAIL=POCKETBASE_EMAIL
PB_PASSWORD=POCKETBASE_PASSWORD
PB_URL=POCKETBASE_URL
ARL=DEEZER_ARL
```

This README does not cover how to obtain your Deezer ARL. Please do not ask for any in issues or discussions.

Run the server:

```bash
cd server
npm install
npm start
```

### Client

Similarly, you will need to fill out a few environment variables first, to set your PocketBase instance URL and your server URL.

Create a .env file in the `client` folder.

```env
NEXT_PUBLIC_PB=YOUR_POCKETBASE_URL
NEXT_PUBLIC_API_URL=YOUR_API_URL
```

```bash
cd client
npm install
# (production, recommended)
npm run build
npm run start
# (development)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Success, you should now be able to use Inspare Music.

## DISCLAIMER
THIS REPOSITORY IS PROVIDED FOR ONLY EDUCATIONAL PURPOSES. THE OWNER(S) OF THIS PROJECT DO NOT CONDONE PIRACY OR ASSUME ANY LIABILITY FOR DAMAGES CAUSED. NO DEEZER ARLS ARE PROVIDED.