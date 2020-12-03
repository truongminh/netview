/**
 * @typedef {import('../../share/model').App} App
 */


/** @type {App[]} */
const apps = [{
    id: '0',
    name: 'Google',
    url: 'https://google.com'
}, {
    id: '1',
    name: 'Google',
    url: 'https://google.com'
}];

const rand = require('./lib/rand');

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

function Update(app_id, value) {
    const app = Get(app_id);
    if (!app) {
        return 0;
    }
    app.name = value.name;
    app.url = value.url;
    app.enabled = value.enabled;
    return 1;
}

function Delete(id) {
    for (let i = 0; i < apps.length; i++) {
        if (apps[i].id === id) {
            apps.splice(i, 1);
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
