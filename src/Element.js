import ElementCollection from './ElementCollection'
import ContainerNavigation from './ContainerNavigation'
import Container from './Container'


class Element {

  instance = 'Element'

  constructor(domEl, options) {
    this.domEl = null
    this.parent = null
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
    if (Boolean(this.collection.length)) {
      this.collection.getByIndex(0).focus()
    }
    else {
      this.domEl.focus()
      ContainerNavigation.setFocusedContainer(this.getContainer())
      this.getContainer().setFocusedElement(this)
    }
  }

  /**
   * Get Container which contains current Element
   *
   */
  getContainer(parent = this.parent) {
    if (!parent || !(parent instanceof Container)) {
      return this.getContainer(parent.parent)
    }
    return parent
  }
}

export default Element
