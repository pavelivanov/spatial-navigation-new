import Event from './Event'
import { EVENT_PREFIX, EVENT_THRESHOLD } from './util/constants'


class EventAggregator {

  constructor() {
    this.events = []
  }

  /**
   * Get Event by name
   *
   * @param eventName
   * @returns {*}
   */
  getEvent(eventName) {
    let event = this.events.find(({ name }) => name === eventName)

    if (!event) {
      event = new Event(eventName)
      this.events.push(event)
    }

    return event
  }

  /**
   *
   * @param eventName {string}
   * @param eventArgs {...array}
   */
  dispatchEvent(eventName, ...eventArgs) {
    const event = this.getEvent(eventName)

    if (event) {
      event.call(...eventArgs)
    }
  }

  /**
   *
   * @param eventName {string}
   * @param handler {function}
   * @param priority* {string|number}
   * @returns {{ event: *, handler: * }}
   */
  subscribe(eventName, handler, priority) {
    const event = this.getEvent(eventName)

    event.addHandler(handler, priority)

    return { event, handler }
  }

  /**
   * Subscribe to Event and unsubscribe after call
   *
   * @param eventName {string}
   * @param handler {function}
   * @param priority {string|number}
   * @returns {{ event: *, handlerWrapper: (function(...[*])) }}
   */
  once(eventName, handler, priority) {
    const event = this.getEvent(eventName)

    const handlerWrapper = (...args) => {
      const result = handler(...args)
      if (result) {
        event.removeHandler(handlerWrapper, priority)
      }
    }

    event.addHandler(handlerWrapper, priority)

    return { event, handlerWrapper }
  }
}

export default new EventAggregator

export {
  EVENT_PREFIX,
  EVENT_THRESHOLD,
}
