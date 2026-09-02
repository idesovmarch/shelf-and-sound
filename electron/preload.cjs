const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('libraryAPI', {
  read: () => ipcRenderer.invoke('library:read'),
  write: data => ipcRenderer.invoke('library:write', data),
  searchBooks: (query, page, size) => ipcRenderer.invoke('books:search', query, page, size),
  searchMusic: (query, page, size) => ipcRenderer.invoke('music:search', query, page, size),
  openExternal: url => ipcRenderer.invoke('open:external', url)
})
