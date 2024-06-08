export class UniqueEntityID {
  private value: number

  toValue() {
    return this.value
  }

  constructor(value?: number) {
    this.value = value ?? Math.floor(Math.random() * 1000000000)
  }

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
