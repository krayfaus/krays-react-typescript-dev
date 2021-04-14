import * as path from 'path';
import { BrowserWindow, app } from 'electron';

let mainWindow: BrowserWindow | null;

function create_window(): void
{
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 540,
    width: 960,
    show: false,
    minHeight: 480,
    minWidth: 640,
    webPreferences: {
      contextIsolation: true,
      devTools: process.env.NODE_ENV !== 'production',
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.bundle.js"),
      webSecurity: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    new URL(
       /*filepath: */ path.join(__dirname, './index.html'),
       /*base: */ 'file:').toString()
  ).finally(() =>
  {
    /* no action. */
  });

  // Show the app once ready.
  mainWindow.once('ready-to-show', () =>
  {
    mainWindow?.show();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () =>
  {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () =>
{
  create_window();
});

// Quit when all windows are closed.
app.on('window-all-closed', () =>
{
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () =>
{
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    create_window();
  }
});

// In this file you can include the rest of your main process code. 
/* eslint-disable sort-imports*/
import "_main/context-menu";
 /* eslint-enable sort-imports*/