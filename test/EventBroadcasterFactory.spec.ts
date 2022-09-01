import EventBridgeAdapter from '@lib/infra/aws/EventBridgeAdapter'
import MissingConfigurationError from '@lib/infra/error/MissingConfiguration'
import EventBroadcasterFactory from '@lib/main/factory/EventBroadcasterFactory'
import * as dotenv from 'dotenv'

describe('EventBroadcasterFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    dotenv.config()
  })
  it('should create a event bridge adapter instance', () => {
    const instance = EventBroadcasterFactory.createEventBridgeAdapter()
    expect(instance).toBeInstanceOf(EventBridgeAdapter)
  })
  it('should throw a exception when require aws region setting is not present', () => {
    delete process.env.AWS_REGION
    try {
      EventBroadcasterFactory.createEventBridgeAdapter()
    } catch (e) {
      expect(e).toEqual(new MissingConfigurationError('AWS_REGION'))
    }
  })
  it('should throw a exception when require aws access key id setting is not present', () => {
    delete process.env.AWS_ACCESS_KEY_ID
    try {
      EventBroadcasterFactory.createEventBridgeAdapter()
    } catch (e) {
      expect(e).toEqual(new MissingConfigurationError('AWS_ACCESS_KEY_ID'))
    }
  })
  it('should throw a exception when require aws secret access key setting is not present', () => {
    delete process.env.AWS_SECRET_ACCESS_KEY
    try {
      EventBroadcasterFactory.createEventBridgeAdapter()
    } catch (e) {
      expect(e).toEqual(new MissingConfigurationError('AWS_SECRET_ACCESS_KEY'))
    }
  })
})
