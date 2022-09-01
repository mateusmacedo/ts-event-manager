import { DomainEvent } from '@lib/domain/DomainEvent'

export class FooEvent implements DomainEvent {
  readonly name = 'FooEvent'
  constructor(readonly data: Record<string, any>, readonly metadata: Record<string, any>) {}
}
