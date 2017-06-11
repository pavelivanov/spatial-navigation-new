import ContainerCollection from './ContainerCollection'
import ContainerNavigation from './ContainerNavigation'
import ElementCollection from './ElementCollection'


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

    this.name         = name
    this.leaveTo      = leaveTo || {}
    this.collection   = new ElementCollection(this)

    ContainerCollection.addContainer(this)
  }

  focus() {
    // TODO ductape
    if (this.collection.focusedElement) {
      this.collection.focusedElement.focus()
    } else {
      this.collection.getByIndex(0).focus()
    }

    ContainerNavigation.setFocusedContainer(this)
  }
}

export default Container
