import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron';
import * as path from 'path';
import 'dotenv/config'
import axios from 'axios';

const fs = require('fs');
const archiver = require('archiver');
const FormData = require('form-data');

import { kafkaConsume } from './kafka';

let mainWindow;

async function handleFolderSelect() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (!canceled) {
    return filePaths[0];
  }
  return undefined;
}

// Create a zip file
function zipFolder(sourceFolder, zipFilePath, folderName) {
    console.log('Inside zipFolder function')
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip');

        
        archive.pipe(output);
        archive.directory(sourceFolder, folderName);
        archive.finalize();

        output.on('close', function () {
          console.log('Zip file created successfully.');
          resolve(archive);
        });
    
        archive.on('error', function (err) {
            reject(err);
        });
      });
    }

const sendZipFile = async (zipFilePath) => {
  let data = new FormData();
  data.append('folder', fs.createReadStream(zipFilePath));
  const response = await axios.post(
    `http://127.0.0.1:8000/mount_album`,
    data,
    {
      headers: {
        ...data.getHeaders()
      }
    }
  )


  return response.data
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 2000,
    height: 980,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      webSecurity: false
    }
  });

  // Vite dev server URL
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(async () => {
  ipcMain.handle('dialog:openFolder', handleFolderSelect);

  // ipcMain.handle('kafka:consume', async () => {
  //   console.log('Consuming messages from Kafka')
  //   const data = await getMsgFromQueue();
  //   return data;
  // });

  ipcMain.handle('dialog:zipFolder', async (_, sourceFolder) => {
    console.log('Zipping folder:', sourceFolder)
    const zipFilePath = 'output.zip';
    const folderName = path.basename(sourceFolder);
    const archive = await zipFolder(sourceFolder, zipFilePath, folderName)

    if (!archive) {
      console.error('Error zipping folder:', archive);
      return;
    } else{
      const data = await sendZipFile(zipFilePath);
      // delete the zip file
      fs.unlinkSync(zipFilePath);
      return data;
    }

  });

  createWindow();
  await kafkaConsume(mainWindow);

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});


