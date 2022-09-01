import DomainEvent from '@lib/domain/DomainEvent'

export default class FooEvent implements DomainEvent {
  readonly name = 'FooEvent'
  constructor(readonly data: Record<string, any>, readonly metadata: Record<string, any>) {}
}
