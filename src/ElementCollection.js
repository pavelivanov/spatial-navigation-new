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
    /**
     * Current focused Element in current collection
     *
     * @type {null|Element}
     */
    this.focusedElement = null
  }

  // TODO where to move this?
  setFocusedElement(element) {
    if (element instanceof Element) {
      this.focusedElement = element
    }
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
