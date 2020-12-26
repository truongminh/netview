// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require("electron");
const { CreateAdminWindow } = require("./admin");
const path = require("path");

const AppService = require("./service/app");
const ViewService = require("./service/view");

let mainWindow;
function mustShowAdminWindow() {
  if (mainWindow) {
    return;
  }
  mainWindow = CreateAdminWindow();
  mainWindow.on("close", () => {
    mainWindow = null;
  });
}

async function startAllApps() {
  const apps = await AppService.List();
  for (const app of apps) {
    if (app.enabled) {
      ViewService.OpenApp(app);
    }
  }
  if (BrowserWindow.getAllWindows().length === 0) {
    mustShowAdminWindow();
  }
}

async function addTrayIcon() {
  const icon = path.join(app.getAppPath(), "../../resources/icon.ico");
  const tray = new Tray(icon);
  tray.addListener("click", () => {
    mustShowAdminWindow();
  });
  app.tray = tray;
}

startAllApps().catch((e) => console.log(e));
addTrayIcon();
