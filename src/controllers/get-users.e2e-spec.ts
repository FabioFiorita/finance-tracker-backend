import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'

describe('Get Users (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  beforeEach(async () => {
    await prisma.user.create({
      data: {
        name: 'Izadora',
      },
    })
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  test('[GET] /users', async () => {
    const response = await request(app.getHttpServer()).get('/users').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      users: [expect.objectContaining({ name: 'Izadora' })],
    })
  })
})
