import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
}

const electronCustomAPIs = {
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  sendZipFolder: (sourceFolder) => ipcRenderer.invoke('dialog:zipFolder', sourceFolder),
  onKafkaConsume: (callback) => ipcRenderer.on('add-album', (_event, value) => callback(value)),
  getCloudUrl: () => ipcRenderer.invoke('getCloudUrl'),
  setCloudUrl: (url) => ipcRenderer.invoke('setCloudUrl', url),
  reloadApp: () => ipcRenderer.invoke('reloadApp'),
  scanServer: () => ipcRenderer.invoke('scanServer'),
  onServerDiscovered: (callback) => ipcRenderer.on('serverDiscovered', (_event, value) => callback(value)),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    // This exposes the whole electronAPI object
    // Can expose only specific methods too

    // contextBridge.exposeInMainWorld('electron', {
    //   ping: () => ipcRenderer.invoke('ping'),
    //   getCloudUrl: () => ipcRenderer.invoke('getCloudUrl'),
    //   setCloudUrl: (url) => ipcRenderer.invoke('setCloudUrl', url)
    //   // openDeviceFolderDialog: () => ipcRenderer.invoke('openDeviceFolderDialog')
    // }) // This exposes only the ping method to the renderer
    // TODO: Expose only the required native methods to the renderer

    contextBridge.exposeInMainWorld('api', api) // Advantage: Expose only the required methods to the renderer
    // TODO: Expose all server API calls through this object

    contextBridge.exposeInMainWorld('electronAPI', electronCustomAPIs)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window.electronAPI = electronCustomAPIs
}
