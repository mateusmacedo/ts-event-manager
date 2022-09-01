import EventMediator from '@lib/infra/EventMediator'
import EventManagerFactory from '@lib/main/factory/EventManagerFactory'

describe('EventManagerFactory', () => {
  it('should create a event mediator', () => {
    const eventManager = EventManagerFactory.createEventMediator()
    expect(eventManager).toBeInstanceOf(EventMediator)
  })
})
