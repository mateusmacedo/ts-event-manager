import { DomainEvent } from '../../src/domain/DomainEvent'

export class FooEvent implements DomainEvent {
  readonly eventName = 'FooEvent'
  constructor(readonly data: Record<string, any>, readonly metadata: Record<string, any>) {}
}
