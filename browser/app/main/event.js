
/**
 * @typedef {import('./service/app').App} App
 */

const { ipcMain } = require("electron");
const AppService = require('./service/app');
const ViewService = require('./service/view');

ipcMain.handle('/app/start', async (event, app_id) => {
    const app = await AppService.Get(app_id);
    if (app) {
        ViewService.OpenApp(app);
        return 1;
    }
    return 0;
});

ipcMain.handle('/app/stop', async (event, app_id) => {
    const app = await AppService.Get(app_id);
    if (app) {
        ViewService.CloseApp(app.id);
        return 1;
    }
    return 0;
});

// Main process
ipcMain.handle('/app/list', async (event) => {
    const apps = await AppService.List();
    for (const a of apps) {
        const isOpen = ViewService.IsOpen(a.id);
        a.status = isOpen ? 'running' : 'stopped';
    }
    return apps;
});

ipcMain.handle('/app/create', async (event) => {
    const app = await AppService.Create();
    return app;
});

ipcMain.handle('/app/get', async (event, id) => {
    const app = await AppService.Get(id);
    if (!app) {
        return null;
    }
    const isOpen = ViewService.IsOpen(id);
    app.status = isOpen ? 'running' : 'stopped';
    return app;
});

ipcMain.handle('/app/delete', async (event, id) => {
    if (ViewService.IsOpen(id)) {
        ViewService.CloseApp(id);
    }
    await AppService.Delete(id);
    return 1;
});

ipcMain.handle('/app/update', async (event, id, value) => {
    await AppService.Update(id, value);
    return 1;
});
