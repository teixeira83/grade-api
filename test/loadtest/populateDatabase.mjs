/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from '@prisma/client'
import { uuid } from 'uuidv4'
import createOneBank from './sqlQueries/bank.mjs'
import createOneUser from './sqlQueries/user.mjs'
import createOneIcon from './sqlQueries/icon.mjs'
import createMultimpleDurationsScheduled, {
  createMultimpleDurationsActive,
  createMultimpleDurationsInactive
} from './sqlQueries/duration.mjs'

// Generate a random UUID

const prisma = new PrismaClient()
await prisma.$connect()
const iconUuid = uuid()
const createIconQuery = createOneIcon(iconUuid)
const bankUuid = uuid()
const createBankQuery = createOneBank(bankUuid, iconUuid)
const userUuid = uuid()
const createUserQuery = createOneUser(userUuid, bankUuid)
const createDurarionScheduledQuery = createMultimpleDurationsScheduled(2, bankUuid, userUuid)
const createDurarionActiveInactiveQuery = createMultimpleDurationsActive(2, bankUuid, userUuid)
const createDurarionInactiveQuery = createMultimpleDurationsInactive(10000, bankUuid, userUuid)
await prisma.$executeRawUnsafe(createIconQuery)
await prisma.$executeRawUnsafe(createBankQuery)
await prisma.$executeRawUnsafe(createUserQuery)
await prisma.$executeRawUnsafe(createDurarionScheduledQuery)
await prisma.$executeRawUnsafe(createDurarionActiveInactiveQuery)
await prisma.$executeRawUnsafe(createDurarionInactiveQuery)
