import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CategoryFactory } from 'test/factories/make-category'
import { MethodFactory } from 'test/factories/make-method'
import { TransactionFactory } from 'test/factories/make-transaction'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch Users Transactions (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let transactionFactory: TransactionFactory
  let categoryFactory: CategoryFactory
  let methodFactory: MethodFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UserFactory,
        TransactionFactory,
        CategoryFactory,
        MethodFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)
    transactionFactory = moduleRef.get(TransactionFactory)
    categoryFactory = moduleRef.get(CategoryFactory)
    methodFactory = moduleRef.get(MethodFactory)

    await app.init()
  })

  test('[GET] /users/:id/transactions', async () => {
    const user = await userFactory.makePrismaUser()

    const transaction = await transactionFactory.makePrismaTransaction({
      user,
      category: await categoryFactory.makePrismaCategory(),
      method: await methodFactory.makePrismaMethod({
        userId: user.id,
      }),
    })

    const id = user.id.toValue()

    const response = await request(app.getHttpServer())
      .get(`/users/${id}/transactions`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      transactions: expect.arrayContaining([
        expect.objectContaining({
          id: transaction.id,
        }),
      ]),
    })
  })
})
