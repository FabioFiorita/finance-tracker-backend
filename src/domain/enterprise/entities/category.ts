import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CategoryProps {
  name: string
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name
  }

  public static create(props: CategoryProps, id?: UniqueEntityID) {
    return new Category(props, id)
  }
}
