
async function init() {
    const main = await import('./main/main.js');
    customElements.define('app-main', main.default);
}

init().catch(e => console.log(e));
