import { Handler } from '../../src/application/Handler'
import { DomainEvent } from '../../src/domain/DomainEvent'

export class FooHandler implements Handler {
  eventName = 'FooEvent'

  async handle(event: DomainEvent): Promise<void> {
    console.log(
      `FooHandler Handling ${event.eventName} event with data: ${JSON.stringify(
        event.data
      )} and metadata: ${JSON.stringify(event.metadata)}`
    )
  }
}
