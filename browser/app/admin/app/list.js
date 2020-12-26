/**
 * @typedef {import('../../share/model').App} App
 */

import { AppItem } from './app-item.js';
import AppService from '../service/app.js';

export class AppList extends HTMLElement {
  connectedCallback() {
    this.addEventListener('start-app', async (e) => {
      await AppService.Start(e.detail);
      this.refresh();
    });
    this.addEventListener('stop-app', async (e) => {
      await AppService.Stop(e.detail);
      this.refresh();
    });
    this.refresh();
  }

  async refresh() {
    try {
      this.innerHTML = '';
      this.apps = await AppService.List();
      const app_items = this.apps.map(a => new AppItem(a));
      this.append(...app_items);
      const add = document.createElement('div');
      add.innerHTML = `
      <wl-card clickable>
        <wl-button flat inverted outlined>New App</wl-button>
      </wl-card>`;
      add.querySelector('wl-button').onclick = async (e) => {
        const app = await AppService.Create();
        location.href = `#/app/edit/${app.id}`;
      };
      this.append(add);
    } catch (e) {
      this.innerHTML = e.message;
    }
  }
}

customElements.define('admin-app-list', AppList);
