import { HandlerAlreadyRegisteredError } from './../application/error/HandlerAlreadyRegistered'
import { HandlerIsNotRegisteredError } from './../application/error/HandlerIsNotRegistered'
import { EventManager } from './../application/EventManager'
import { Handler } from './../application/Handler'
import { DomainEvent } from './../domain/DomainEvent'

export class EventMediator implements EventManager {
  constructor(private _handlers: Handler[] = []) {}

  private handlerIsRegistered(handler: Handler): boolean {
    const index = this._handlers.indexOf(handler)
    if (index > -1) {
      return true
    }
    return false
  }
  register(handler: Handler): void {
    if (this.handlerIsRegistered(handler)) {
      throw new HandlerAlreadyRegisteredError(handler)
    }
    this._handlers.push(handler)
  }

  unRegister(handler: Handler): void {
    if (this.handlerIsRegistered(handler)) {
      this._handlers.splice(this._handlers.indexOf(handler), 1)
      return
    }
    throw new HandlerIsNotRegisteredError(handler)
  }

  async publish(event: DomainEvent): Promise<void> {
    const handlers = this._handlers.filter((handler) => handler.eventName === event.eventName)
    if (handlers.length) {
      const promises = handlers.map((handler) => handler.handle(event))
      await Promise.all(promises)
    }
  }
}
