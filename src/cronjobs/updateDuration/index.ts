/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import { UpdateDurationTypeCron } from './updateDurationType'
import console from '../../common/utils/console.utils'

export async function start() {
  console.success(`>>> starting cronjob updateDurationType - ${new Date().toLocaleTimeString('pt-BR')} <<<`)

  try {
    await new UpdateDurationTypeCron(new PrismaClient()).updateDurationType()
  } catch (error) {
    console.error(`error while run cronjob - ${error}`)

    throw new Error(error)
  }
}

start()
