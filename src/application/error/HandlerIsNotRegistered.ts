import Handler from '@lib/application/Handler'

export default class HandlerIsNotRegisteredError extends Error {
  constructor(readonly handler: Handler) {
    super(`Handler ${handler.constructor.name} is not registered`)
  }
}
