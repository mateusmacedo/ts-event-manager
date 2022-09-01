import { Handler } from './../application/Handler'
import { DomainEvent } from './../domain/DomainEvent'

export interface EventManager {
  register: (handler: Handler) => void

  unRegister: (handler: Handler) => void
  publish: (event: DomainEvent) => Promise<void>
}
