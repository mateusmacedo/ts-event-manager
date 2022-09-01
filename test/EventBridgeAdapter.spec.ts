import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge'
import EventBridgeAdapter from '@lib/infra/aws/EventBridgeAdapter'
import FooEvent from '@test/mocks/FooEvent'

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
describe('EventBridgeAdapter', () => {
  const client = new EventBridgeClient({})
  const adapter = new EventBridgeAdapter(client)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should be defined', () => {
    expect(adapter).toBeInstanceOf(EventBridgeAdapter)
  })
  it('should dispatch a event', async () => {
    const event = new FooEvent({ foo: 'bar' }, { id: '1' })
    const expectedCommand = new PutEventsCommand({
      Entries: [
        {
          Detail: JSON.stringify(event)
        }
      ]
    })
    await adapter.dispatch(event)
    expect(client.send).toBeCalledTimes(1)
    expect(client.send).toBeCalledWith(expectedCommand)
  })
})
