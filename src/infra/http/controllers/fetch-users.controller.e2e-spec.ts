import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch Users (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[GET] /users', async () => {
    await Promise.all([
      userFactory.makePrismaUser({
        name: 'John Doe',
      }),
      userFactory.makePrismaUser({
        name: 'Jane Doe',
      }),
      userFactory.makePrismaUser({
        name: 'Foo Bar',
      }),
    ])

    const response = await request(app.getHttpServer()).get('/users').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      users: expect.arrayContaining([
        expect.objectContaining({ name: 'John Doe' }),
        expect.objectContaining({ name: 'Jane Doe' }),
        expect.objectContaining({ name: 'Foo Bar' }),
      ]),
    })
  })
})
