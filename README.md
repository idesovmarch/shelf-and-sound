# Shelf & Sound

![Shelf & Sound logo](public/logo.png)

Shelf & Sound is a personal desktop library for organizing books and music albums into collections. Search public catalogs, save the titles you care about, and organize everything with covers, notes, genres, and custom tags.

[Download Shelf & Sound for Windows](../../releases/latest/download/Shelf-and-Sound-Setup-1.1.2.exe)

> **Windows notice:** The installer is not currently code-signed, so Microsoft Defender SmartScreen may display an “Unknown publisher” warning. Choose **More info** and then **Run anyway** if you trust this download.

## Features

- Create, name, copy, and delete collections.
- Add custom cover images, notes, and tags to collections.
- Search for books by title, author, or ISBN.
- Search for music albums and browse additional result pages.
- Add multiple books or albums without leaving the search results.
- Tag individual items by genre, style, mood, or any custom label.
- Filter a collection by books or albums.
- Keep the library stored locally on your computer.

## Catalog data

- Book search and cover artwork are provided by [Open Library](https://openlibrary.org/developers/api).
- Album metadata is provided by [MusicBrainz](https://musicbrainz.org/doc/MusicBrainz_API).
- Album artwork is provided by the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive/API).

Shelf & Sound is not affiliated with Open Library, MusicBrainz, the Cover Art Archive, or the Internet Archive.

## Installation

1. Download the latest Windows installer using the button above.
2. Run `Shelf-and-Sound-Setup-1.1.2.exe`.
3. Select an installation folder.
4. Launch Shelf & Sound from the desktop or Start menu shortcut.

The current installer supports 64-bit Windows.

## Development

Requirements:

- Node.js
- npm
- Windows for producing the NSIS installer

Install dependencies and start the development app:

```powershell
npm install
npm run dev
```

Create a production build:

```powershell
npm run build
```

Create the Windows installer:

```powershell
npm run package:win
```

The packaged installer is written to the configured release output directory.

## Privacy

Collections, notes, tags, and saved-item metadata are stored locally by the Electron application. Search terms are sent only to the relevant public catalog service when you perform a search.

## Technology

Shelf & Sound is built with Electron, React, TypeScript, and Vite. Windows installers are generated with Electron Builder and NSIS.
