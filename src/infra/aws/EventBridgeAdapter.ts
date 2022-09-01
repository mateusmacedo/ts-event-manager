import { EventBroadcaster } from '@lib/application/EventBroadcaster'
import { DomainEvent } from '@lib/domain/DomainEvent'
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge'
export class EventBridgeAdapter implements EventBroadcaster {
  constructor(private readonly client: EventBridgeClient) {}
  async dispatch(event: DomainEvent): Promise<void> {
    const command = new PutEventsCommand({
      Entries: [
        {
          Detail: JSON.stringify(event)
        }
      ]
    })
    await this.client.send(command)
  }
}
