import { EventManager } from './../../application/EventManager'
import { Handler } from './../../application/Handler'
import { EventMediator } from './../../infra/EventMediator'

export class EventManagerFactory {
  private static instance: EventManager
  static createEventMediator(handlers: Handler[] = []) {
    if (!EventManagerFactory.instance) {
      EventManagerFactory.instance = new EventMediator(handlers)
    }
    return EventManagerFactory.instance
  }
}
