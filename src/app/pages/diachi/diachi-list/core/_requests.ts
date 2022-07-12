import axios, { AxiosResponse } from 'axios'
import { Query } from 'react-query'
import { ID, QueryState, Response } from '../../../../../_metronic/helpers'
import { Address, AddressQueryResponse } from './_models'

const API_URL = process.env.REACT_APP_API_URL
const ADDRESS_URL = `${API_URL}/location`

const getAddress = (state: QueryState): Promise<AddressQueryResponse> => {
  return axios
    .get(`${ADDRESS_URL}/get-location`, { headers: state })
    .then((d: AxiosResponse<AddressQueryResponse>) => d.data)
}


const createAddress = (Address: Address): Promise<Address | undefined> => {
  return axios
    .post(`${ADDRESS_URL}/create-location`, Address)
    .then((response: AxiosResponse<Response<Address>>) => response.data)
    .then((response: Response<Address>) => response.data)
}

const updateAddress = (Address: Address): Promise<Address | undefined> => {
  return axios
    .post(`${ADDRESS_URL}/update-location/${Address.Id}`, Address)
    .then((response: AxiosResponse<Response<Address>>) => response.data)
    .then((response: Response<Address>) => response.data)
}

const deleteAddress = (AddressId: string): Promise<void> => {
  return axios.post(`${ADDRESS_URL}/delete-location/`, AddressId).then(() => { })
}

const getAddressById = (id: string): Promise<Address | undefined> => {
  return axios
    .get(`${ADDRESS_URL}/get-locationById/${id}`)
    .then((response: AxiosResponse<Response<Address>>) => response.data)
    .then((response: Response<Address>) => response.data)
}




const deleteSelectedAddresss = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${ADDRESS_URL}/${id}`))
  return axios.all(requests).then(() => { })
}

export { getAddress, getAddressById, deleteAddress, deleteSelectedAddresss, createAddress, updateAddress }
