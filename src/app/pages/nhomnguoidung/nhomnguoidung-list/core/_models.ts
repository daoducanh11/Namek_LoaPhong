import {ID, Response} from '../../../../../_metronic/helpers'
export type UserGroup = {
  Id?: string
  UserGroupName?: string
  Info?: string
  Permissions?: number[]
  CreateTime?: Date
  UpdateTime?: Date
  Address?: string
  CreateByUser?: string
  IsActive?: boolean
}

export type UserGroupsQueryResponse = Response<Array<UserGroup>>

export const initialUserGroup: UserGroup = {
  UserGroupName: 'Administrator',
  CreateTime: new Date(), 
  UpdateTime: new Date(), 
  IsActive: true
}
