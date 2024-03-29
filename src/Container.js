import ContainerCollection from './ContainerCollection'
import ContainerNavigation from './ContainerNavigation'
import ElementCollection from './ElementCollection'
import Element from './Element'


class Container {

  instance = 'Container'

  /**
   *
   * @param name
   * @param {Object} options
   * @property {Object} options.leaveTo
   */
  constructor(name, options) {
    const { leaveTo } = options || {}

    this.name             = name
    this.leaveTo          = leaveTo || {}
    this.collection       = new ElementCollection(this)
    this.focusedElement   = null

    ContainerCollection.addContainer(this)
  }

  setFocusedElement(element) {
    if (element instanceof Element) {
      this.focusedElement = element
    }
  }

  focus() {
    // TODO ductape
    if (this.focusedElement) {
      this.focusedElement.focus()
    } else {
      this.collection.getByIndex(0).focus()
    }

    ContainerNavigation.setFocusedContainer(this)
  }
}

export default Container
