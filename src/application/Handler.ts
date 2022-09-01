import { DomainEvent } from '@lib/domain/DomainEvent'

export interface Handler {
  eventName: string
  handle: (event: DomainEvent) => Promise<void>
}
