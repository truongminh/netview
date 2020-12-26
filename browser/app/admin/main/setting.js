
export class AdminSetting extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <wl-switch></wl-switch>
    `;

  }
}

customElements.define('admin-setting', AdminSetting);
