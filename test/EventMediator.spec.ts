import { HandlerAlreadyRegisteredError } from '@lib/application/error/HandlerAlreadyRegistered'
import { HandlerIsNotRegisteredError } from '@lib/application/error/HandlerIsNotRegistered'
import { EventMediator } from '@lib/infra/EventMediator'
import { EventManagerFactory } from '@lib/main/factory/EventManagerFactory'
import { FooEvent } from '@test/mocks/FooEvent'
import { FooHandler } from '@test/mocks/FooHandler'

describe('EventMediator', () => {
  const handler = new FooHandler()
  const mediator = EventManagerFactory.createEventMediator()
  beforeEach(() => {
    jest.clearAllMocks()
    mediator['_handlers'] = []
  })
  it('should create a instance', () => {
    const freshInstance = new EventMediator()
    expect(freshInstance).toBeInstanceOf(EventMediator)
  })
  it('should register a handler', () => {
    mediator.register(handler)
    expect(mediator['_handlers']).toContain(handler)
  })
  it('should throw an error if handler is already registered', () => {
    try {
      mediator.register(handler)
      mediator.register(handler)
    } catch (e) {
      expect(e).toEqual(new HandlerAlreadyRegisteredError(handler))
    }
  })
  it('should unregister a handler', () => {
    mediator.register(handler)
    mediator.unRegister(handler)
    expect(mediator['_handlers']).not.toContain(handler)
  })
  it('should throw an error if handler is already registered', () => {
    try {
      mediator.unRegister(handler)
    } catch (e) {
      expect(e).toEqual(new HandlerIsNotRegisteredError(handler))
    }
  })
  it('should publish an event', async () => {
    const event = new FooEvent({ foo: 'bar' }, { id: '1' })
    const handlerSpy = jest.spyOn(handler, 'handle')
    mediator.register(handler)
    await mediator.publish(event)
    expect(handlerSpy).toHaveBeenCalledTimes(1)
    expect(handlerSpy).toHaveBeenCalledWith(event)
  })
})
