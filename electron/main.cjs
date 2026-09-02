const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')
const fs = require('fs/promises')

const dataFile = () => path.join(app.getPath('userData'), 'library.json')
const empty = { collections: [], items: [] }

async function readLibrary() {
  try { return JSON.parse(await fs.readFile(dataFile(), 'utf8')) } catch { return empty }
}

async function writeLibrary(data) {
  await fs.mkdir(path.dirname(dataFile()), { recursive: true })
  await fs.writeFile(dataFile(), JSON.stringify(data, null, 2), 'utf8')
  return data
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 920, minWidth: 980, minHeight: 680,
    backgroundColor: '#f4f1ea', titleBarStyle: 'hiddenInset',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false }
  })
  if (process.argv.includes('--dev')) win.loadURL('http://localhost:5173')
  else win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
}

app.whenReady().then(() => {
  ipcMain.handle('library:read', readLibrary)
  ipcMain.handle('library:write', (_, data) => writeLibrary(data))
  ipcMain.handle('books:search', async (_, query, page = 1, size = 12) => {
    const fields = 'key,title,author_name,first_publish_year,cover_i,subject,isbn,edition_count'
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(String(query))}&page=${page}&limit=${size}&fields=${fields}`
    const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'ShelfAndSound/1.1.2 (personal desktop library)' } })
    if (!response.ok) throw new Error(`Open Library returned ${response.status}`)
    return response.json()
  })
  ipcMain.handle('music:search', async (_, query, page = 1, size = 12) => {
    const offset = Math.max(0, (page - 1) * size)
    const term = String(query).replaceAll('"', '')
    const search = `primarytype:album AND (artist:"${term}" OR releasegroup:"${term}")`
    const url = `https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(search)}&fmt=json&limit=${size}&offset=${offset}`
    const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'ShelfAndSound/1.1.2 (personal desktop library)' } })
    if (!response.ok) throw new Error(`MusicBrainz returned ${response.status}`)
    return response.json()
  })
  ipcMain.handle('open:external', (_, url) => shell.openExternal(url))
  createWindow()
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
})
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
