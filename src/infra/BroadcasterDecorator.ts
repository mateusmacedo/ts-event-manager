import { EventBroadcaster } from '@lib/application/EventBroadcaster'
import { EventManager } from '@lib/application/EventManager'
import { Handler } from '@lib/application/Handler'
import { DomainEvent } from '@lib/domain/DomainEvent'

export class BroadcastDecorator implements EventManager {
  constructor(private _eventManager: EventManager, private readonly broadcaster: EventBroadcaster) {}
  register(handler: Handler): void {
    this._eventManager.register(handler)
  }
  unRegister(handler: Handler): void {
    this._eventManager.unRegister(handler)
  }
  async publish(event: DomainEvent): Promise<void> {
    await Promise.all([this._eventManager.publish(event), this.broadcaster.dispatch(event)])
  }
}
