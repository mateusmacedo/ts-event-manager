import { EventBridgeClient } from '@aws-sdk/client-eventbridge'
import { EventBroadcaster } from '@lib/application/EventBroadcaster'
import { EventBridgeAdapter } from '@lib/infra/aws/EventBridgeAdapter'
import { MissingConfigurationError } from '@lib/infra/error/MissingConfiguration'

export class EventBroadcasterFactory {
  private static instance: EventBroadcaster
  private static checkEnvironmentVariables(): void {
    if (!process.env.AWS_REGION) {
      throw new MissingConfigurationError('AWS_REGION')
    }
    if (!process.env.AWS_ACCESS_KEY_ID) {
      throw new MissingConfigurationError('AWS_ACCESS_KEY_ID')
    }
    if (!process.env.AWS_SECRET_ACCESS_KEY) {
      throw new MissingConfigurationError('AWS_SECRET_ACCESS_KEY')
    }
  }
  public static createEventBridgeAdapter(): EventBroadcaster {
    if (!EventBroadcasterFactory.instance) {
      EventBroadcasterFactory.checkEnvironmentVariables()
      EventBroadcasterFactory.instance = new EventBridgeAdapter(
        new EventBridgeClient({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
          }
        })
      )
    }
    return EventBroadcasterFactory.instance
  }
}
