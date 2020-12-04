/**
 * @typedef {import('../../share/model').App} App
 */

const { BrowserWindow, screen: ElectronScreen } = require('electron');

/** @type {Map<string, BrowserWindow>} */
const app_browsers = new Map();

/**
 * 
 * @param {App} app 
 */
function OpenApp(app) {
    console.log('open', app);
    /** @type {import('electron').BrowserWindowConstructorOptions} */
    const options = {
        width: 800,
        height: 600,
    };
    const win = new BrowserWindow(options);
    win.loadURL(app.url);
    app_browsers.set(app.id, win);
    win.once('close', () => {
        app_browsers.delete(app.id);
    });
}
/**
 * 
 * @param {string} app_id 
 */
function CloseApp(app_id) {
    const bw = app_browsers.get(app_id);
    if (bw) {
        console.log('close', app_id);
        bw.close();
    }
}

function IsOpen(app_id) {
    return app_browsers.has(app_id);
}

module.exports = {
    OpenApp,
    CloseApp,
    IsOpen,
}
