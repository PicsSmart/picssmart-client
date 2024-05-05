"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  "openFolder": () => electron.ipcRenderer.invoke("dialog:openFolder"),
  "sendZipFolder": (sourceFolder) => electron.ipcRenderer.invoke("dialog:zipFolder", sourceFolder)
  // 'getKafkaMessage': () => ipcRenderer.invoke('kafka:consume')
});
