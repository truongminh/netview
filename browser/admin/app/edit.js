/**
 * @typedef {import('../../share/model').App} App
 */

import AppService from '../service/app.js';

export class AppEditElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 'edit';
        this.refresh();
    }

    async refresh() {
        this.app = await AppService.Get(this.id);
        if (!this.app) {
            this.innerHTML = `app ${this.id} not found`;
            return;
        }
        this.innerHTML = `
            APP ID: ${this.id}
            <wl-textfield name="name" value="${this.app.name}" label="Name"></wl-textfield>
            <wl-textfield name="url" value="${this.app.url}" label="URL"></wl-textfield>
            <br>
            <wl-label>
                <wl-switch name="enabled" ${this.app.enabled ? 'checked' : ''}></wl-switch>
                Auto start
            </wl-label>
            <br>
            <wl-select label="Screen" name="screen" value="${this.app.screen}">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
            </wl-select>
            <br>
            <br>
            <wl-button action="save" style="padding: 6px; margin: 10px;"><wl-icon>done</wl-icon>Save&nbsp;</wl-button>
            <wl-button action="cancel" style="padding: 6px; margin: 10px; --primary-hue:50"><wl-icon>cancel</wl-icon>Cancel</wl-button>
            <wl-button action="delete" style="padding: 6px; margin: 10px; --primary-hue: 10"><wl-icon>delete</wl-icon>Delete</wl-button>
        `;
        this.querySelector('[action=save]').addEventListener('click', async e => {
            e.preventDefault();
            const name = this.querySelector('[name=name]').value;
            const url = this.querySelector('[name=url]').value;
            const enabled = this.querySelector('[name=enabled]').checked;
            const screen = this.querySelector('[name=screen]').value;
            await AppService.Update(this.app, { name, url, enabled, screen });
            location.href = '#';
        });
        this.querySelector('[action=cancel]').addEventListener('click', async e => {
            e.preventDefault();
            location.href = '#';
        });
        this.querySelector('[action=delete]').addEventListener('click', async e => {
            e.preventDefault();
            const message = `Are you sure to delete [${this.app.name || this.app.id}]?`;
            if (confirm(message)) {
                await AppService.Delete(this.app);
                location.href = '#';
            }
        });
    }
}

customElements.define('admin-app-edit', AppEditElement);
