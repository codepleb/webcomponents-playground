const tagName = 'lazy-image';
const template = document.createElement('template');
template.innerHTML = `<img id="image"/>`;
 
class LazyImage extends HTMLElement {
  /**
   * Guards against loops when reflecting observed attributes.
   * @param  {String} name Attribute name
   * @param  {any} value
   * @protected
   */
  safeSetAttribute(name, value) {
    if (this.getAttribute(name) !== value) this.setAttribute(name, value);
  }

  set src(value) {
    this.safeSetAttribute('src', value);
    // Set image src
    if (this.shadowImage) this.shadowImage.src = value;
  }

  get src() {
    return this.getAttribute('src');
  }

  set alt(value) {
    this.safeSetAttribute('alt', value);
    // Set image alt
    if (this.shadowImage) this.shadowImage.alt = value;
  }

  get alt() {
    return this.getAttribute('alt')
  }

  static get observedAttributes() {
    return ['src', 'alt'];
  }

  constructor() {
    super();
    this.shadowImage = null;
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowImage = this.shadowRoot.getElementById('image')
      this.src = this.getAttribute('src');
      this.alt = this.getAttribute('alt');
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
  }
}


const register = () => customElements.define(tagName, LazyImage)
window.WebComponents ? window.WebComponents.waitFor(register) : register();
