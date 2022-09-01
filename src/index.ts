if (!process.env.IS_TS_NODE) {
  require('module-alias/register')
}

export * from '@lib/main/factory/EventBroadcasterFactory'
export * from '@lib/main/factory/EventManagerFactory'
export * from '@lib/infra/BroadcasterDecorator'
