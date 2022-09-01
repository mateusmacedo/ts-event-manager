import { Handler } from '@lib/application/Handler'

export class HandlerIsNotRegisteredError extends Error {
  constructor(readonly handler: Handler) {
    super(`Handler ${handler.constructor.name} is not registered`)
  }
}
