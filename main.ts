import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as os from 'os';
import * as fs from 'fs-extra';
import {IConfig} from "./src/app/models/IConfig";

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

const getConfigContents = async () => {
  // This is the main config file path
  const configPath = path.join(os.homedir(), ".timetracker/config.json");

  let settings: IConfig;
  try {
    // FYI: The <AppSettings><unknown> allows the cast to AppSettings
    settings = await ((fs.readJson(configPath) as unknown) as IConfig);
  } catch (e) {
    console.debug(e);
    // Check if the file isn't found.
    if (e.code !== "ENOENT") {
      // Rethrow
      throw e;
    }
    // The file doesn't exist... create one.
    console.warn("Generating new config file...");
    // Default settings
    settings = {
      apiEndpoint: "127.0.0.1:8080/api/v1/"
    };

    await fs.outputJson(configPath, settings);
  }
  return settings;
};

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: __dirname + "./src/assets/favicon.ico"
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Register IPC for config
  ipcMain.on("getConfig", event => {
    getConfigContents().then(config => {
      event.sender.send("gotConfig", config);
    });
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
