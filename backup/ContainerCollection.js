import Container from './Container'
import Collection from './Collection'
import { forEach } from 'lodash'


class ContainerCollection extends Collection {

  constructor() {
    super()

    this.focusedContainer = null
    // navigation links
    this.links = {}
  }

  setFocusedContainer(container) {
    if (container instanceof Container) {
      this.focusedContainer = container
    }
  }

  add(container) {
    super.append(container)
    this.createLinks(container)
  }

  hash() {

  }

  /**
   * Take all container names by leaveTo of current addable container
   * Find these containers in collection
   * Check if searchable container exist and if this container has current container in leaveTo
   *
   * @param newContainer
   */
  createLinks(newContainer /* C */) {
    forEach(newContainer.comeFrom /* DirectionCollection */, (comeFromInstanceOfDirection /* A<Direction> */) => {
      forEach(newContainer.leaveTo, (leaveToContainerName /* B, E */, leaveToDirection) => {
        const hash = this.hash(comeFromContainerName, leaveToContainerName)

        if (hash in this.links) {
          const [ fromContainer, toContainer ] = this.links[hash]

          // fromContainer's direction to toContainer
          const fromContainerDirection = fromContainer.directions.leaveTo.findDirectionByContainerName(toContainer.name)
          fromContainer.directions.leaveTo.removeDirection(fromContainerDirection)

          // newContainer's direction from fromContainer
          const newContainerComeFromDirection = newContainer.directions.comeFrom.findDirectionByContainerName(fromContainer.name)
          // Add new direction in fromContainer to newContainer
          fromContainer.directions.leaveTo.createDirection(newContainerComeFromDirection, newContainer.name)

          // toContainer's direction from fromContainer
          const toContainerDirection = toContainer.directions.comeFrom.findDirectionByContainerName(fromContainer.name)
          toContainer.directions.comeFrom.removeDirection(toContainerDirection)

          // newContainer's direction to toContainer
          const newContainerLeaveToDirection = newContainer.directions.leaveTo.findDirectionByContainerName(toContainer.name)
          // Add new direction in toContainer from newContainer
          toContainer.directions.comeFrom.createDirection(newContainerLeaveToDirection, newContainer.name)
        }
        else {
          const toContainer = this.getByName(leaveToContainerName)

          if (toContainer) {
            const hash = this.hash(newContainer.name, toContainer.name)

            toContainer.directions.comeFrom.createDirection(leaveToDirection, newContainer.name)
            //this.links[hash] =
          }
        }
      })
    })
  }
}

export default new ContainerCollection
