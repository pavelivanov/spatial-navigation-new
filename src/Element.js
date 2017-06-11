import ElementCollection from './ElementCollection'
import ElementNavigation from './ElementNavigation'


class Element {

  constructor(domEl, options) {
    this.domEl = null
    this.collection = new ElementCollection(this)

    if (domEl) {
      this.connectDomEl(domEl)
    }
  }

  connectDomEl(domEl) {
    this.domEl = domEl
    this.designDomEl()
    this.bindListeners()
  }

  designDomEl() {
    this.domEl.setAttribute('tabindex', '-1')
    this.domEl.style.outline = 'none'
  }

  bindListeners() {
    this.domEl.addEventListener('click', this.focus.bind(this))
  }

  focus() {
    this.domEl.focus()
    ElementNavigation.setFocusedElement(this)
  }
}

export default Element
