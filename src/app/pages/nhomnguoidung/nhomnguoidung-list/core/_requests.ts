import React, {useState} from 'react'
import axios, {AxiosResponse} from 'axios'
import { Query } from 'react-query'
import {ID, QueryState, Response} from '../../../../../_metronic/helpers'
import {UserGroup, UserGroupsQueryResponse} from './_models'
import { UserModel } from '../../../../modules/auth'

const API_URL = process.env.REACT_APP_API_URL
const USER_URL = `${API_URL}/userGroups`

const getUserGroups = (state: QueryState, currentUser?: UserModel): Promise<UserGroupsQueryResponse> => {
  return axios
    .post(`${USER_URL}/get-userGroupByGroupId`, currentUser?.UserGroupIds, {
      headers: state
    })
    .then((d: AxiosResponse<UserGroupsQueryResponse>) => d.data)
}

// const getUserGroupById = (id: string): Promise<UserGroup | undefined> => {
//   return axios
//     .post(`${USER_URL}/get-userGroupByGroupId`, [id])
//     .then((response: AxiosResponse<Response<UserGroup>>) => response.data)
//     .then((response: Response<UserGroup>) => response.Data)
// }
const getUserGroupById = (id: string): Promise<UserGroupsQueryResponse> => {
  return axios
    .post(`${USER_URL}/get-userGroupByGroupId`, [id])
    .then((d: AxiosResponse<UserGroupsQueryResponse>) => d.data)
}

const createUserGroup = (userGroup: UserGroup): Promise<UserGroup | undefined> => {
  return axios
    .post(`${USER_URL}/create-userGroup`, userGroup)
    .then((response: AxiosResponse<Response<UserGroup>>) => response.data)
    .then((response: Response<UserGroup>) => response.data)
}

const updateUserGroup = (userGroup: UserGroup): Promise<UserGroup | undefined> => {
  console.log('userGroupE', userGroup)
  return axios
    .put(`${USER_URL}/update-userGroup`, userGroup)
    .then((response: AxiosResponse<Response<UserGroup>>) => response.data)
    .then((response: Response<UserGroup>) => response.data)
}

const deleteUserGroup = (userGroupId: string): Promise<void> => {
  return axios.put(`${USER_URL}/delete-userGroup`, userGroupId, {
    headers: {
      id: userGroupId
    }
  }).then(() => {})
  
}

const deleteSelectedUserGroups = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUserGroups, getUserGroupById, deleteUserGroup, deleteSelectedUserGroups, createUserGroup, updateUserGroup}
