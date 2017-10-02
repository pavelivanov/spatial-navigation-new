import EA, { EVENT_PREFIX } from './EventAggregator'
import ElementNavigation from './ElementNavigation'
import ContainerNavigation from './ContainerNavigation'
import Element from './Element'
import Container from './Container'


class Navigation {

  constructor() {
    this.bindListeners()
  }

  bindListeners() {
    EA.subscribe(`${EVENT_PREFIX}navigate`, this.navigate.bind(this))
  }

  navigate(keyName) {
    if (!~[ 'up', 'down', 'left', 'right' ].indexOf(keyName)) {
      return
    }

    const instanceToFocus = this.getInstanceToFocus(keyName)

    if (!instanceToFocus) {
      return
    }

    this.focusInstance(instanceToFocus)
  }

  getInstanceToFocus(direction, instance = ContainerNavigation.focusedContainer.focusedElement) {
    let instanceToFocus

    if (!instance) {
      return null
    }

    if (instance instanceof Element) {
      instanceToFocus = ElementNavigation.getElementToFocus(instance, direction)
    }

    // if there is no Element to navigate in passed direction
    if (!instanceToFocus) {
      // if parent of Element is Container
      if (instance.parent instanceof Container) {
        instanceToFocus = ContainerNavigation.getContainerToFocus(instance.parent, direction)
      }
      // if parent of Element is Element
      else {
        return this.getInstanceToFocus(direction, instance.parent)
      }
    }

    return instanceToFocus
  }

  focusInstance(instance) {
    instance.focus()
  }
}

export default new Navigation
