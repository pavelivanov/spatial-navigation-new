import EA, { EVENT_PREFIX, EVENT_THRESHOLD } from './EventAggregator'


class Keyboard {

  constructor() {
    this.keyMap = {}

    this.bindListeners()
  }

  setup(keyMap) {
    keyMap.forEach((keyData) => {
      const { keyCode, modifier } = keyData
      const eventKey = Keyboard.getEventKey(keyCode, modifier)

      if (eventKey in this.keyMap) {
        console.warn(`Keymap "${eventKey}" already exists`)
      }

      this.keyMap[eventKey] = keyData
    })
  }

  /**
   *
   * @param keyCode
   * @param modifier* {string|KeyboardEvent} - cmdKey, ctrlKey
   * @returns {string}
   */
  static getEventKey(keyCode, modifier) {
    const key = [ keyCode ]

    if (modifier) {
      if (modifier instanceof KeyboardEvent) {
        if (modifier.metaKey) {
          key.push('meta')
        }
        else if (modifier.ctrlKey) {
          key.push('ctrl')
        }
        else if (modifier.shiftKey) {
          key.push('shift')
        }
        else if (modifier.altKey) {
          key.push('alt')
        }
      }
      if (typeof modifier === 'string') {
        key.push(modifier)
      }
    }

    return key.join('|')
  }

  /**
   *
   * @param event {KeyboardEvent}
   * @param modifier {string}
   */
  static getModifier(event, modifier) {
    switch (modifier) {
      case 'meta':
        return event.metaKey
      case 'ctrl':
        return event.ctrlKey
      case 'shift':
        return event.shiftKey
      case 'alt':
        return event.altKey
      default:
        return true
    }
  }

  static throttle = (func, threshold) => {
    let id = null
    let isThrottled = false
    let callTimer

    const clearVariables = () => {
      id = null
      isThrottled = false
    }

    /**
     * @param event {KeyboardEvent}
     */
    const wrapper = function (event) {
      const eventKey = Keyboard.getEventKey(event.keyCode, event)

      // why we need check for modifier?
      // if (id !== eventKey || eventKey.match(/\|/)) {
      if (id !== eventKey) {
        func.call(this, event)
        id = eventKey
      }

      if (!isThrottled) {
        isThrottled = true

        callTimer = setTimeout(() => {
          isThrottled = !func.call(this, event)
        }, threshold)
      }
    }

    wrapper.__proto__.finish = () => {
      clearVariables()
      clearTimeout(callTimer)
    }

    return wrapper
  }

  bindListeners() {
    const thr = Keyboard.throttle(this.handleKeyPress.bind(this), EVENT_THRESHOLD)

    document.addEventListener('keydown', thr)
    document.addEventListener('keyup', thr.finish)
  }

  /**
   *
   * @param event {KeyboardEvent}
   */
  handleKeyPress(event) {
    let eventKey = Keyboard.getEventKey(event.keyCode, event)

    // TODO check for modifier
    // if there is no combination of key + modifier in keyMap then look for key w/o modifier
    if (/\|/.test(eventKey) && !(eventKey in this.keyMap)) {
      eventKey = Keyboard.getEventKey(event.keyCode)
    }

    const key = this.keyMap[eventKey]

    if (
      !key
      // this condition need for `throttle` method. If press `ctrl + F`, key up `F` throttling continue
      || !Boolean(Keyboard.getModifier(event, key.modifier))
    ) {
      return true
    }

    event.preventDefault()

    EA.dispatchEvent(`${EVENT_PREFIX}keypress`, key.name)
    EA.dispatchEvent(`${EVENT_PREFIX}navigate`, key.name)

    return true
  }
}

export default new Keyboard
