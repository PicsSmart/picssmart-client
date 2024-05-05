import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI',{
  'openFolder': () => ipcRenderer.invoke('dialog:openFolder'),
  'sendZipFolder': (sourceFolder) => ipcRenderer.invoke('dialog:zipFolder', sourceFolder),
  'onKafkaConsume': (callback) => ipcRenderer.on('add-album', (_event, value) => callback(value)),
});
