import path from 'path'
import fs from 'fs'
import { EventEmitter } from 'events'
import { Inject, Injectable } from '@nestjs/common'
import { ICreateOptions } from './interfaces/models'
import { IMdGenerator } from './interfaces/mdGenerator.interface'

const event = new EventEmitter()
let organizedArray: string[] = []

async function eventHandler() {
  event.on('receiveData', function pushToIndex(receivedData) {
    const indexOfParent = organizedArray.findIndex((element: any) => {
      return element === receivedData.parent
    })
    if (indexOfParent !== -1) {
      organizedArray.splice(indexOfParent + 1, 0, receivedData.data)
    } else {
      organizedArray = [receivedData.data, ...organizedArray]
    }
  })
}

eventHandler()

@Injectable()
export class MdGenerator implements IMdGenerator {
  private readonly filePath: string

  constructor(@Inject('FILE_PATH') filePath: string) {
    this.filePath = filePath
  }
  /**
   * Create the markdown content
   * Params:
   *   - Options:
   *        - Repeat: A property in options param called repeat, which is a boolean and you can tell if you want to repeat that content in the MD file
   */

  async create(data: string, parent?: string, options?: ICreateOptions): Promise<{ created: boolean }> {
    event.emit('receiveData', { data, parent })
    if (options?.repeat) {
      this.fsCreateFunction()
      return { created: true }
    }

    const { dataExist } = this.verifyIfAlreadyExist(data)

    if (dataExist) {
      return { created: true }
    }
    this.fsCreateFunction()
    return { created: true }
  }

  private async fsCreateFunction() {
    fs.writeFileSync(path.resolve(__dirname, this.filePath), organizedArray.join('\n'))
  }

  /**
   * Verify if some markdown content already exists
   * Params:
   *   - Options:
   *        - None at the moment
   */

  verifyIfAlreadyExist(data: any): { dataExist: boolean } {
    const fileContent = fs.readFileSync(path.resolve(__dirname, this.filePath), 'utf-8')
    const dataExist = fileContent.includes(data)

    return { dataExist }
  }
}
