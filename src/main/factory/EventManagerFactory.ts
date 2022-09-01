import EventManager from '@lib/application/EventManager'
import Handler from '@lib/application/Handler'
import EventMediator from '@lib/infra/EventMediator'

export default class EventManagerFactory {
  private static instance: EventManager
  static createEventMediator(handlers: Handler[] = []) {
    if (!EventManagerFactory.instance) {
      EventManagerFactory.instance = new EventMediator(handlers)
    }
    return EventManagerFactory.instance
  }
}
