import Collection from './Collection'
import Element from './Element'


class ElementCollection extends Collection {

  /**
   *
   * @param parent {Element}
   */
  constructor(parent) {
    super()

    this.parent = parent
  }

  append(element) {
    element.parent = this.parent
    super.append(element)
  }

  prepend(element) {
    element.parent = this.parent
    super.prepend(element)
  }

  getCountInRow() {
    let count = 1
    let offsetLeft = this.items[0].domEl.offsetLeft

    for (let i=1;;i++) {
      const element = this.items[i]

      if (element && element.domEl.offsetLeft > offsetLeft) {
        offsetLeft = element.domEl.offsetLeft
        count++
      }
      else {
        return count
      }
    }
  }
}

export default ElementCollection
