/**
 * @typedef {import('../../share/model').App} App
 */

/** @type {import('electron').IpcRenderer} */
const ipcRenderer = window.ipcRenderer;

/** @returns {Promise<App[]>} */
function List() {
    return ipcRenderer.invoke('/app/list');
}

/** @returns {Promise<App>} */
function Create() {
    return ipcRenderer.invoke('/app/create');
}

/** @returns {Promise<App>} */
function Get(app_id) {
    return ipcRenderer.invoke('/app/get', app_id);
}

/** @returns {Promise<App>} */
function Update(app, value) {
    return ipcRenderer.invoke('/app/update', app.id, value);
}

/** @returns {Promise<App>} */
function Delete(app) {
    return ipcRenderer.invoke('/app/delete', app.id);
}

/** @returns {Promise<number>} */
function Start(app) {
    return ipcRenderer.invoke('/app/start', app.id);
}

/** @returns {Promise<number>} */
function Stop(app) {
    return ipcRenderer.invoke('/app/stop', app.id);
}

export default {
    List,
    Get,
    Create,
    Update,
    Delete,
    Start,
    Stop,
};
