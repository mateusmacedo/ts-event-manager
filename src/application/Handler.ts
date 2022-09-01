import { DomainEvent } from './../domain/DomainEvent'

export interface Handler {
  eventName: string
  handle: (event: DomainEvent) => Promise<void>
}
