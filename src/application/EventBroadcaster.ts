import DomainEvent from '@lib/domain/DomainEvent'

export default interface EventBroadcaster {
  dispatch: (event: DomainEvent) => Promise<void>
}
