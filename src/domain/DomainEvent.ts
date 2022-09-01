export interface DomainEvent {
  readonly name: string
  readonly data: Record<string, any>

  readonly metadata: Record<string, any>
}
