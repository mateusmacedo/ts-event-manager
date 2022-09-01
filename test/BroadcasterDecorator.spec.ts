import * as dotenv from 'dotenv'
import { BroadcastDecorator } from '../src/infra/BroadcasterDecorator'
import { EventManagerFactory } from '../src/main/factory/EventManagerFactory'
import { EventBroadcasterFactory } from '../src/main/factory/EventBroadcasterFactory'
import { FooEvent } from '../test/mocks/FooEvent'
import { FooHandler } from '../test/mocks/FooHandler'
jest.mock('@aws-sdk/client-eventbridge', () => {
  const original = jest.requireActual('@aws-sdk/client-eventbridge')
  return {
    ...original,
    PutEventsCommand: jest.fn(),
    EventBridgeClient: jest.fn().mockImplementationOnce(() => ({
      send: jest.fn().mockImplementationOnce(async () => ({
        Entries: [
          {
            EventId: '1',
            ErrorCode: '1',
            ErrorMessage: '1',
            StatusCode: 200
          }
        ]
      }))
    }))
  }
})
dotenv.config()

describe('BroadcasterDecorator', () => {
  const broadcaster = EventBroadcasterFactory.createEventBridgeAdapter()
  const manager = EventManagerFactory.createEventMediator()
  const decorated = new BroadcastDecorator(manager, broadcaster)
  beforeEach(() => {
    jest.clearAllMocks()
    manager['_handlers'] = []
  })
  it('should be defined', () => {
    expect(decorated).toBeInstanceOf(BroadcastDecorator)
  })
  it('should register a handler', () => {
    const handler = new FooHandler()
    const registerSpy = jest.spyOn(manager, 'register')
    decorated.register(handler)
    expect(registerSpy).toBeCalledWith(handler)
    expect(registerSpy).toBeCalledTimes(1)
  })
  it('should unregister a handler', () => {
    const handler = new FooHandler()
    const unregisterSpy = jest.spyOn(manager, 'unRegister')
    decorated.register(handler)
    decorated.unRegister(handler)
    expect(unregisterSpy).toBeCalledWith(handler)
    expect(unregisterSpy).toBeCalledTimes(1)
  })
  it('should publish an event', async () => {
    const handler = new FooHandler()
    const event = new FooEvent({ foo: 'bar' }, { id: '1' })
    const publishSpy = jest.spyOn(manager, 'publish')
    const dispatchSpy = jest.spyOn(broadcaster, 'dispatch')
    decorated.register(handler)
    await decorated.publish(event)
    expect(publishSpy).toBeCalledTimes(1)
    expect(dispatchSpy).toBeCalledTimes(1)
  })
})
