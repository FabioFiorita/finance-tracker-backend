import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { FetchUsersUseCase } from './fetch-users'

describe('Fetch User Users', () => {
  let inMemoryRepository: InMemoryUsersRepository
  let sut: FetchUsersUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    sut = new FetchUsersUseCase(inMemoryRepository)
  })

  it('should fetch a user users', async () => {
    inMemoryRepository.items.push(makeUser(), makeUser())

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.users.length).toBe(2)
  })
})
