import Handler from '@lib/application/Handler'
import DomainEvent from '@lib/domain/DomainEvent'

export default class FooHandler implements Handler {
  eventName = 'FooEvent'

  async handle(event: DomainEvent): Promise<void> {
    console.log(
      `FooHandler Handling ${event.name} event with data: ${JSON.stringify(event.data)} and metadata: ${JSON.stringify(
        event.metadata
      )}`
    )
  }
}
