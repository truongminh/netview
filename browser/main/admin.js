const { BrowserWindow } = require("electron")
const path = require('path')

function CreateAdminWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('../admin/index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

module.exports = {
    CreateAdminWindow,
}
