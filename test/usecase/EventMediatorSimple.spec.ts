import { Handler } from '../../src/application/Handler'
import { DomainEvent } from '../../src/domain/DomainEvent'
import { EventMediator } from '../../src/infra/EventMediator'

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
  let mediator: EventMediator
  let event: DomainEvent
  let handler: Handler
  let handlerTwo: Handler
  let handlerThree: Handler
  let anotherHandler: Handler

  beforeEach(() => {
    mediator = new EventMediator()
    event = new MySimpleEvent({ foo: 'bar' }, { id: '1' })
    handler = new MySimpleHandler()
    handlerTwo = new MySimpleHandlerTwo()
    handlerThree = new MySimpleHandlerThree()
    anotherHandler = new MySimpleAnotherHandler()
    mediator.register(handler)
    mediator.register(handlerTwo)
    mediator.register(handlerThree)
    mediator.register(anotherHandler)
  })
  it('should handler a simple event handle stack', async () => {
    const handlerSpy = jest.spyOn(handler, 'handle')
    const handlerSpyTwo = jest.spyOn(handlerTwo, 'handle')
    const handlerSpyThree = jest.spyOn(handlerThree, 'handle')
    await mediator.publish(event)
    const anotherEvent = new MySimpleAnotherEvent({ foo: 'bar' }, { id: '1' })
    await mediator.publish(anotherEvent)
    expect(handlerSpy).toHaveBeenCalledTimes(1)
    expect(handlerSpy).toHaveBeenCalledWith(event)
    expect(handlerSpyTwo).toHaveBeenCalledTimes(1)
    expect(handlerSpyTwo).toHaveBeenCalledWith(event)
    expect(handlerSpyThree).toHaveBeenCalledTimes(1)
    expect(handlerSpyThree).toHaveBeenCalledWith(event)
  })
})
