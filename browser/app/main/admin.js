const { BrowserWindow } = require("electron");
const path = require('path');

function CreateAdminWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    const view = path.join(__dirname, '../admin/index.html');
    mainWindow.loadFile(view);
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    return mainWindow;
}

module.exports = {
    CreateAdminWindow,
}
