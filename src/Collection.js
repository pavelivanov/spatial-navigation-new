class Collection {

  constructor() {
    this.items = []
    this.itemIds = {}
  }

  /**
   * @param item {Container|Element}
   * @returns {*}
   */
  _add(item) {
    if (item.constructor.name !== 'Container' && item.constructor.name !== 'Element') {
      throw new Error('Wrong item instance class')
    }

    if (item.constructor.name === 'Container') {
      if (item.name in this.itemIds) {
        console.warn(`Item with name "${item.name}" already exists in Collection`)
      }

      this.itemIds[item.name] = this.items.length - 1
    }
  }

  /**
   * Add item at the start of current collection
   * @param item
   * @returns {*}
   */
  prepend(item) {
    this.items.unshift(item)
    this._add(item)
    return item
  }

  /**
   * Add item at the end of current collection
   * @param item
   * @returns {*}
   */
  append(item) {
    this.items.push(item)
    this._add(item)
    return item
  }

  /**
   * Get index of item in current collection
   * @param item
   * @returns {number}
   */
  indexOf(item) {
    return this.items.indexOf(item)
  }

  /**
   * Get Element by index from current collection
   * @param index
   * @returns {*}
   */
  getByIndex(index) {
    return this.items[index]
  }

  /**
   * Get Container by name from current collection
   * @param name
   * @returns {*}
   */
  getByName(name) {
    return this.items[this.itemIds[name]]
  }

  /**
   * Check if Container with such name exists in current collection
   * @param name
   * @returns {boolean}
   */
  isExists(name) {
    return Boolean(this.getByName(name))
  }

  /**
   * Get length of current collection
   * @returns {Number}
   */
  get length() {
    return this.items.length
  }
}

export default Collection
