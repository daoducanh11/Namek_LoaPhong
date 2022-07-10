import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {UserGroup, UserGroupsQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const USER_URL = `${API_URL}/userGroups`

const getUserGroups = (query: string): Promise<UserGroupsQueryResponse> => {
  return axios
    .get(`${USER_URL}/get-userGroups?${query}`)
    .then((d: AxiosResponse<UserGroupsQueryResponse>) => d.data)
}

const getUserGroupById = (id: string): Promise<UserGroup | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<UserGroup>>) => response.data)
    .then((response: Response<UserGroup>) => response.data)
}

const createUserGroup = (userGroup: UserGroup): Promise<UserGroup | undefined> => {
  return axios
    .post(`${USER_URL}/create-userGroup`, userGroup)
    .then((response: AxiosResponse<Response<UserGroup>>) => response.data)
    .then((response: Response<UserGroup>) => response.data)
}

const updateUserGroup = (userGroup: UserGroup): Promise<UserGroup | undefined> => {
  return axios
    .post(`${USER_URL}/${userGroup.Id}`, userGroup)
    .then((response: AxiosResponse<Response<UserGroup>>) => response.data)
    .then((response: Response<UserGroup>) => response.data)
}

const deleteUserGroup = (userGroupId: string): Promise<void> => {
  return axios.delete(`${USER_URL}/${userGroupId}`).then(() => {})
}

const deleteSelectedUserGroups = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUserGroups, getUserGroupById, deleteUserGroup, deleteSelectedUserGroups, createUserGroup, updateUserGroup}
