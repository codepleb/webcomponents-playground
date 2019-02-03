class HelloWorld extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `
        <div id="header">
          <slot name="headerLine"></slot>
        </div>
        <div id="body">
          <slot name="contentLine"></slot>
        </div>`;
    }

}
customElements.define('hello-world-slot-demo', HelloWorld);