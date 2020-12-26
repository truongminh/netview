
class TopNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<wl-nav>
   <div slot="left">
      <wl-button slot="left" fab flat inverted>
         <a href="#"><wl-icon alt="menu">menu</wl-icon></a>
      </wl-button>
   </div>
   <h1 slot="title">Quản lý ứng dụng</h1>
   <div slot="right">
      <a href="#/setting">Setting</a>
   </div>
</wl-nav>
`;
    }
}

customElements.define('top-nav', TopNav);
export default class Main extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <top-nav></top-nav>
        <div class="container"></div>
        `;
        this.container = this.querySelector('.container');
        window.addEventListener('popstate', () => this.showPage());
        this.showPage();
    }

    async showPage() {
        const hash = location.hash.substr(1);
        if (hash.startsWith('/app/edit')) {
            await import('../app/edit.js');
            const id = hash.substr('/app/edit/'.length) || '';
            this.container.innerHTML = `<admin-app-edit id=${id}></admin-app-edit>`;
        } else if (hash.startsWith('/setting')) {
            await import('./setting.js');
            this.container.innerHTML = `<admin-setting></admin-setting>`;
        } else {
            await import('../app/list.js');
            this.container.innerHTML = `<admin-app-list></admin-app-list>`;
        }
    }
}
