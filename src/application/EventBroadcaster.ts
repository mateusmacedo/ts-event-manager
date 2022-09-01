import { DomainEvent } from '@lib/domain/DomainEvent'

export interface EventBroadcaster {
  dispatch: (event: DomainEvent) => Promise<void>
}
