export interface IMdGenerator {
  create(data: any, options?: any): Promise<{ created: boolean }>
  verifyIfAlreadyExist(data: any, options?: any): { dataExist: boolean }
}
