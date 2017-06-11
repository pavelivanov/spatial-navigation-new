import ContainerCollection from './ContainerCollection'


class ContainerNavigation {

  constructor() {
    this.focusedContainer = null
  }

  setFocusedContainer(container) {
    if (container instanceof Container) {
      this.focusedContainer = container
    }
  }

  getContainerToFocus(possibleContainerToFocus, direction) {
    const containerName = possibleContainerToFocus.leaveTo[direction]
    const containerToFocus = ContainerCollection.getByName(containerName)
    
    // TODO remove `container.collection.length` from here. Add `active` param to parent
    if (containerToFocus && (containerToFocus.disabled || !containerToFocus.collection.length)) {
      return this.getContainerToFocus(containerToFocus, direction)
    }

    return containerToFocus
  }
}

export default new ContainerNavigation
