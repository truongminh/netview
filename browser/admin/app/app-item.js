/**
 * @typedef {import('../../share/model').App} App
 */


export class AppItem extends HTMLElement {
  constructor(app) {
    super();
    /** @type {App} */
    this.app = app;
  }

  connectedCallback() {
    const action = this.app.status === 'running' ?
      `<a class="stop-app" href="javascript: void(0)">stop</a>` :
      `<a class="start-app" href="javascript: void(0)">start</a>`;

    this.innerHTML = `
        <wl-card clickable>
          <div>ID: ${this.app.id}</div> 
          <div>NAME: ${this.app.name}</div>
          <div>URL: ${this.app.url}</div>
          <div>AUTOSTART: ${this.app.enabled || false}</div>
          <div>STATUS: ${this.app.status}</div>
          <div>
            ${action}
            <a class="edit-app" style="padding-left:20px" href="#/app/edit/${this.app.id}">edit</a>  
          </div>
        </wl-card>
        `;
    this.querySelector('.start-app')?.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.dispatchEvent(new CustomEvent('start-app', {
        detail: this.app,
        bubbles: true
      }));
    });
    this.querySelector('.stop-app')?.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.dispatchEvent(new CustomEvent('stop-app', {
        detail: this.app,
        bubbles: true
      }));
    });
  }
}

customElements.define('admin-app-item', AppItem);
