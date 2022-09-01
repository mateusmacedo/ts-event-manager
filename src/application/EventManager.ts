import Handler from '@lib/application/Handler'
import DomainEvent from '@lib/domain/DomainEvent'

export default interface EventManager {
  register: (handler: Handler) => void

  unRegister: (handler: Handler) => void
  publish: (event: DomainEvent) => Promise<void>
}
