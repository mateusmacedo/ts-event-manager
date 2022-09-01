import Handler from '@lib/application/Handler'

export default class HandlerAlreadyRegisteredError extends Error {
  constructor(readonly handler: Handler) {
    super(`Handler ${handler.constructor.name} already registered`)
  }
}
