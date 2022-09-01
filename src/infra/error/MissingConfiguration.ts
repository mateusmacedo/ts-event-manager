export class MissingConfigurationError extends Error {
  constructor(readonly key: string) {
    super(`Missing configuration for ${key}`)
  }
}
