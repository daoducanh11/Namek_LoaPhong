import { ID, Response } from '../../../../../_metronic/helpers'
export type Address = {
  Id?: string
  CityId?: string
  Name?: string
  Districts?: []
  CreateTime?: Date
  UpdateTime?: Date
  CreateByUser?: string
}

export type AddressQueryResponse = Response<Array<Address>>

export const initialAddress: Address = {
  CreateTime: new Date(),
  UpdateTime: new Date(),
}
