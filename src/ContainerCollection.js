import Collection from './Collection'


class ContainerCollection extends Collection {

  constructor() {
    super()
  }

  addContainer(container) {
    super.append(container, container.name)
  }
}

export default new ContainerCollection
