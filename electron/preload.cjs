const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('libraryAPI', {
  read: () => ipcRenderer.invoke('library:read'),
  write: data => ipcRenderer.invoke('library:write', data),
  openExternal: url => ipcRenderer.invoke('open:external', url)
})
