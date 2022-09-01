import { EventBroadcaster } from '../../src/application/EventBroadcaster'
import { Handler } from '../../src/application/Handler'
import { DomainEvent } from '../../src/domain/DomainEvent'
import { EventMediator } from '../../src/infra/EventMediator'
import * as dotenv from 'dotenv'
import { EventManager } from '../../src/application/EventManager'
import { EventBroadcasterFactory } from '../../src/main/factory/EventBroadcasterFactory'
import { EventManagerFactory } from '../../src/main/factory/EventManagerFactory'
import { BroadcastDecorator } from '../../src/infra/BroadcasterDecorator'

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

class MySimpleEvent implements DomainEvent {
  eventName = 'MySimpleEvent'
  constructor(readonly data: Record<string, any>, readonly metadata: Record<string, any>) {}
}

class MySimpleAnotherEvent implements DomainEvent {
  eventName = 'MySimpleAnotherEvent'
  constructor(readonly data: Record<string, any>, readonly metadata: Record<string, any>) {}
}

class MySimpleHandler implements Handler {
  eventName = 'MySimpleEvent'
  async handle(event: DomainEvent): Promise<void> {
    console.log(`MySimpleHandler: ${event.eventName} with ${event.data.foo}`)
  }
}

class MySimpleHandlerTwo implements Handler {
  eventName = 'MySimpleEvent'
  async handle(event: DomainEvent): Promise<void> {
    console.log(`MySimpleHandlerTwo: ${event.eventName} with ${event.data.foo}`)
  }
}

class MySimpleHandlerThree implements Handler {
  eventName = 'MySimpleEvent'
  async handle(event: DomainEvent): Promise<void> {
    console.log(`MySimpleHandlerThree: ${event.eventName} with ${event.data.foo}`)
  }
}

class MySimpleAnotherHandler implements Handler {
  eventName = 'MySimpleAnotherEvent'
  async handle(event: DomainEvent): Promise<void> {
    console.log(`MySimpleAnotherHandler: ${event.eventName} with ${event.data.foo}`)
  }
}

describe('EventMediatorSimple.spec', () => {
  let broadcaster: EventBroadcaster
  let manager: EventManager
  let decorated: EventManager
  let event: DomainEvent
  let handler: Handler
  let handlerTwo: Handler
  let handlerThree: Handler
  let anotherHandler: Handler

  beforeEach(() => {
    broadcaster = EventBroadcasterFactory.createEventBridgeAdapter()
    manager = EventManagerFactory.createEventMediator()
    decorated = new BroadcastDecorator(manager, broadcaster)
    manager = new EventMediator()
    event = new MySimpleEvent({ foo: 'bar' }, { id: '1' })
    handler = new MySimpleHandler()
    handlerTwo = new MySimpleHandlerTwo()
    handlerThree = new MySimpleHandlerThree()
    anotherHandler = new MySimpleAnotherHandler()
    decorated.register(handler)
    decorated.register(handlerTwo)
    decorated.register(handlerThree)
    decorated.register(anotherHandler)
  })
  it('should handler a simple event handle stack and broadcast to event bus', async () => {
    const handlerSpy = jest.spyOn(handler, 'handle')
    const handlerSpyTwo = jest.spyOn(handlerTwo, 'handle')
    const handlerSpyThree = jest.spyOn(handlerThree, 'handle')
    await decorated.publish(event)
    const anotherEvent = new MySimpleAnotherEvent({ foo: 'bar' }, { id: '1' })
    await decorated.publish(anotherEvent)
    expect(handlerSpy).toHaveBeenCalledTimes(1)
    expect(handlerSpy).toHaveBeenCalledWith(event)
    expect(handlerSpyTwo).toHaveBeenCalledTimes(1)
    expect(handlerSpyTwo).toHaveBeenCalledWith(event)
    expect(handlerSpyThree).toHaveBeenCalledTimes(1)
    expect(handlerSpyThree).toHaveBeenCalledWith(event)
  })
})
