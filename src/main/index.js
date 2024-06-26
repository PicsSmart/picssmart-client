import { app, shell, dialog, BrowserWindow, ipcMain } from 'electron'
import { join, basename } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'

const fs = require('fs')
const archiver = require('archiver')
const FormData = require('form-data')

import { startKafkaConsume, stopKafkaConsume } from './kafka'

// Electron-store for persistent user data
const Store = require('electron-store')
const store = new Store()

const dgram = require('dgram');


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
    `${store.get('cloudUrl')}/mount_album`,
    data,
    {
      headers: {
        ...data.getHeaders()
      }
    }
  )


  return response.data
}


let mainWindow
function createWindow() {
  // Create the browser window.
    mainWindow = new BrowserWindow({
    width: 2000,
    height: 980,
    show: false,
    autoHideMenuBar: true,
    // set the icon for the app window (TODO: check if this works on all platforms)
    ...(process.platform === 'linux' ? { icon } : {}),

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
      // webSecurity: false // enable this to disable CORS (TODO: check and remove if not needed)
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // ipcHandles for the methods exposed to renderer by preload/index.js
  // ipcMain.handle('ping', () => {
  //   console.log('pong')
  // })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('dialog:openFolder', handleFolderSelect);

  // Handle getCloudUrl and setCloudUrl
  ipcMain.handle('getCloudUrl', () => {
    return store.get('cloudUrl')
  })

  ipcMain.handle('setCloudUrl', (_, url) => {
    console.log(url)
    store.set('cloudUrl', url)
  })

  ipcMain.handle('dialog:zipFolder', async (_, sourceFolder) => {
    console.log('Zipping folder:', sourceFolder)
    const zipFilePath = 'output.zip';
    const folderName = basename(sourceFolder);
    const archive = await zipFolder(sourceFolder, zipFilePath, folderName)

    if (!archive) {
      console.error('Error zipping folder:', archive);
      return;
    } else {
      const data = await sendZipFile(zipFilePath);
      // delete the zip file
      fs.unlinkSync(zipFilePath);
      return data;
    }

  });

  ipcMain.handle('reloadApp', () => {
    mainWindow.webContents.reloadIgnoringCache();
  });

  ipcMain.handle('stopKafkaConsume', async () => {
    await stopKafkaConsume();
  });

  ipcMain.handle('startKafkaConsume', async (_, serverIp) => {
    await startKafkaConsume(mainWindow, serverIp);
  });

  ipcMain.handle('scanServer', async () => {
    const socket = dgram.createSocket('udp4');
    const BROADCAST_ADDR = '255.255.255.255';
    const BROADCAST_PORT = 5005;
    let serverFound = false;

    const message = Buffer.from('scan PicsSmart server');
    socket.bind(0, () => {
      socket.setBroadcast(true);
      socket.send(message, BROADCAST_PORT, BROADCAST_ADDR, (err) => {
        if (err) {
          console.error('Error sending message:', err);
        }
      });

      socket.on('message', (msg, rinfo) => {
        if (msg.toString() == message.toString()) {
          mainWindow.webContents.send('serverDiscovered', null);
        }
        // extract the port number
        const port = parseInt(msg.toString().split(' ')[2]);
        serverFound = true;
        mainWindow.webContents.send('serverDiscovered', `http://${rinfo.address}:${port}`);
      });

      // remove the listener after 5 seconds
      setTimeout(() => {
        socket.close();
        if (!serverFound) {
          mainWindow.webContents.send('serverDiscovered', null);
        }
      }, 5000);
    });
  });

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // Start Kafka consumer
  // await startKafkaConsume(mainWindow);
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
