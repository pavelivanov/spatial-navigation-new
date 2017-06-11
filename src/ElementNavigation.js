class ElementNavigation {

  getElementToFocus(possibleElementToFocus, direction) {
    let elementToFocus
    let currIndex = possibleElementToFocus.parent.collection.indexOf(possibleElementToFocus)
    const countInRow = possibleElementToFocus.parent.collection.getCountInRow()

    switch (direction) {
      case 'up':
        elementToFocus = possibleElementToFocus.parent.collection.getByIndex(currIndex - countInRow)
        break

      case 'down':
        // MAGIC!
        let nextIndex = currIndex + countInRow
        const maxCountInCollection = Math.ceil(possibleElementToFocus.parent.collection.length / countInRow) * countInRow
        const lastElementIndex = possibleElementToFocus.parent.collection.length - 1

        if (nextIndex > lastElementIndex && nextIndex < maxCountInCollection) {
          nextIndex = lastElementIndex
        }

        elementToFocus = possibleElementToFocus.parent.collection.getByIndex(nextIndex)
        break

      case 'left':
        if (currIndex % countInRow) {
          elementToFocus = possibleElementToFocus.parent.collection.getByIndex(--currIndex)
        }
        break

      case 'right':
        if ((currIndex + 1) % countInRow) {
          elementToFocus = possibleElementToFocus.parent.collection.getByIndex(++currIndex)
        }
        break
    }

    if (elementToFocus && elementToFocus.disabled) {
      return this.getElementToFocus(elementToFocus, direction)
    }

    return elementToFocus
  }
}

export default new ElementNavigation
