import { uuid } from 'uuidv4'

export default function createMultimpleDurationsScheduled(quantity, bankId, userId) {
  const today = new Date()
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1))
  const insertStatment = `INSERT INTO public."Duration" (id,"bankId","durationStart","durationEnd","userCreatorId","userUpdaterId","durationType")`
  let valuesStatement = `VALUES`
  for (let i = 0; i < quantity; i++) {
    valuesStatement += `('${uuid()}', '${bankId}', '${today.toISOString()}','${tomorrow.toISOString()}','${userId}','${userId}','SCHEDULED')`
    valuesStatement += i === quantity - 1 ? ';' : ',\n'
  }
  return insertStatment + valuesStatement
}
export function createMultimpleDurationsActive(quantity, bankId, userId) {
  const today = new Date()
  const insertStatment = `INSERT INTO public."Duration" (id,"bankId","durationStart","durationEnd","userCreatorId","userUpdaterId","durationType")`
  let valuesStatement = `VALUES`
  for (let i = 0; i < quantity; i++) {
    valuesStatement += `('${uuid()}', '${bankId}', '${today.toISOString()}','${today.toISOString()}','${userId}','${userId}','ACTIVE')`
    valuesStatement += i === quantity - 1 ? ';' : ',\n'
  }
  return insertStatment + valuesStatement
}

export function createMultimpleDurationsInactive(quantity, bankId, userId) {
  const today = new Date()
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1))
  const insertStatment = `INSERT INTO public."Duration" (id,"bankId","durationStart","durationEnd","userCreatorId","userUpdaterId","durationType")`
  let valuesStatement = `VALUES`
  for (let i = 0; i < quantity; i++) {
    valuesStatement += `('${uuid()}', '${bankId}', '${tomorrow.toISOString()}','${tomorrow.toISOString()}','${userId}','${userId}','INACTIVE')`
    valuesStatement += i === quantity - 1 ? ';' : ',\n'
  }
  return insertStatment + valuesStatement
}
