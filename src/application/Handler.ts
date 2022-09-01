import DomainEvent from '@lib/domain/DomainEvent'

export default interface Handler {
  eventName: string
  handle: (event: DomainEvent) => Promise<void>
}
