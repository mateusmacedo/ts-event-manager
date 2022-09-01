export interface DomainEvent {
  eventName: string
  readonly data: Record<string, any>

  readonly metadata: Record<string, any>
}
