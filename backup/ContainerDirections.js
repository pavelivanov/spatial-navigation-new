class DirectionCollection {

  constructor() {
    /**
     *
     * @type {Array.<Direction>}
     */
    this.collection = []
  }


}

class Direction {

  constructor(dirObj) {
    this.byDirections = dirObj
    this.byContainerNames = this.invert(dirObj)
  }

  // TODO move to utils
  invert(obj) {
    const newObj = {}
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        newObj[obj[prop]] = prop
      }
    }
    return newObj
  }

  findDirectionByContainerName(containerName) {
    return this.byContainerNames[containerName]
  }

  findContainerNameByDirection(direction) {
    return this.byDirections[direction]
  }

  createDirection(direction, containerName) {

  }

  removeDirection(direction) {

  }
}

class ContainerDirections {

  constructor(comeFrom /* left: 'Sidebar' */, leaveTo /* left: 'Sidebar' */) {
    this.comeFrom = new DirectionCollection()
    this.leaveTo = new Direction(leaveTo)
  }
}

export default ContainerDirections
