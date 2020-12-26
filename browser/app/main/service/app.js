/**
 * @typedef {import('../../share/model').App} App
 */


const rand = require('./lib/rand');
const config = require('./config');
const { APPS_FILE } = require('../../share/setting');

/** @type {App[]} */
const apps = [];

(function () {
    const str = config.GetItem(APPS_FILE);
    if (str) {
        try {
            const value = JSON.parse(str);
            for (const a of value) {
                apps.push(a);
            }
        } catch (e) {
            console.log(e);
            // storage corrupt
        }
    }
})();

function save() {
    const str = JSON.stringify(apps, null, '  ');
    config.SetItem(APPS_FILE, str);
}

function List() {
    return apps;
}

const newAppId = () => rand.uppercase(4);

function Create() {
    const id = newAppId();
    /** @type {App} */
    const app = { id, name: '', url: '' };
    apps.push(app);
    return app;
}

function Get(id) {
    return apps.find(app => app.id === id);
}

/** 
 * @param {string} app_id
 * @param {Partial<App>} value
 */
function Update(app_id, value) {
    const app = Get(app_id);
    if (!app) {
        return 0;
    }
    app.name = value.name;
    app.url = value.url;
    app.enabled = value.enabled;
    app.screen = value.screen;
    app.fullscreen = value.fullscreen;
    save();
    return 1;
}

function Delete(id) {
    for (let i = 0; i < apps.length; i++) {
        if (apps[i].id === id) {
            apps.splice(i, 1);
            save();
            return 1;
        }
    }
    return 0;
}


module.exports = {
    List,
    Get,
    Create,
    Update,
    Delete,
};
