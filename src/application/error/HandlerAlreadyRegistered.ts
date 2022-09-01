import { Handler } from '@lib/application/Handler'

export class HandlerAlreadyRegisteredError extends Error {
  constructor(readonly handler: Handler) {
    super(`Handler ${handler.constructor.name} already registered`)
  }
}
