/* eslint-disable @typescript-eslint/naming-convention */
import { ICreateOptions } from '../../utils/interfaces/models'
import { MdGenerator } from '../../utils/mdGenerator'

export function executeMdClass(data: string, parent?: { parent: string }, options?: ICreateOptions) {
  if (process.env.NODE_ENV !== ('production' || 'build')) {
    const parentToSend = parent || null
    const mdFilePath = '../../documents/docs/index.md'
    const mdClass = new MdGenerator(mdFilePath)
    mdClass.create(data, parentToSend?.parent, options)
  }
}

export function MarkDown(data: string, parent?: { parent: string }, options?: ICreateOptions): any {
  return () => {
    executeMdClass(data, parent || null, options || null)
  }
}
