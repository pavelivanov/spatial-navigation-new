import Collection from './Collection'


class ContainerCollection extends Collection {

  constructor() {
    super()
  }

  addContainer(container) {
    super.append(container)
  }
}

export default new ContainerCollection
