const path = require('path');
const fs = require('fs');
const { CONFIG_DIR } = require('../../share/setting');

function Dir() {
    return CONFIG_DIR;
}

fs.mkdirSync(Dir(), { recursive: true });

function getPath(key) {
    return path.join(Dir(), key);
}

function GetItem(key) {
    const filepath = getPath(key);
    if (!fs.existsSync(filepath)) {
        return undefined;
    }
    return fs.readFileSync(filepath).toString('utf-8');
}

function SetItem(key, value) {
    return fs.writeFileSync(getPath(key), value);
}

module.exports = {
    Dir,
    GetItem,
    SetItem,
}
