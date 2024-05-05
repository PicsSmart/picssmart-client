import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI',{
  'openFolder': () => ipcRenderer.invoke('dialog:openFolder'),
  'sendZipFolder': (sourceFolder) => ipcRenderer.invoke('dialog:zipFolder', sourceFolder),
  // 'getKafkaMessage': () => ipcRenderer.invoke('kafka:consume')
});
