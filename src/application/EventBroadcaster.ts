import { DomainEvent } from './../domain/DomainEvent'

export interface EventBroadcaster {
  dispatch: (event: DomainEvent) => Promise<void>
}
