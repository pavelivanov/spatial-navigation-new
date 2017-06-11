import EA, { EVENT_PREFIX, EVENT_THRESHOLD } from './EventAggregator'


class Keyboard {

  constructor() {
    this.keyMap = {}

    this.bindListeners()
  }

  setup(keyMap) {
    keyMap.forEach(({ name, keyCode }) => {
      if (keyCode in this.keyMap) {
        console.warn(`Keymap "${name}" already exists`)
      }
      this.keyMap[keyCode] = { name, keyCode }
    })
  }

  static throttle = (func, threshold) => {
    let timer

    const wrapper = (event) => {
      func(event)
      timer = setTimeout(() => func(event), threshold)
    }

    wrapper.__proto__.finish = () => {
      clearTimeout(timer)
    }

    return wrapper
  }

  bindListeners() {
    const thr = Keyboard.throttle(this.handleKeyPress.bind(this), EVENT_THRESHOLD)

    document.addEventListener('keydown', thr)
    document.addEventListener('keyup', thr.finish)
  }

  handleKeyPress(event) {
    const eventKey = this.keyMap[event.keyCode]

    if (!eventKey) {
      return
    }

    event.preventDefault()

    EA.dispatchEvent(`${EVENT_PREFIX}keypress`, eventKey)
    EA.dispatchEvent(`${EVENT_PREFIX}navigate`, eventKey.name)
  }
}

export default new Keyboard
