import ContainerCollection from './ContainerCollection'
import ElementCollection from './ElementCollection'


class Container {

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
  }

  focus() {
    ContainerCollection.setFocusedContainer(this)
  }
}

export default Container
