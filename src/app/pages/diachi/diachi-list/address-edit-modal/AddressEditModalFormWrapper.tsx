import { useQuery } from 'react-query'
import { AddressEditModalForm } from './AddressEditModalForm'
import { isNotEmpty, QUERIES } from '../../../../../_metronic/helpers'
import { useListView } from '../core/ListViewProvider'
import { getAddressById } from '../core/_requests'

const AddressEditModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView()
  const enabledQuery: boolean = itemIdForUpdate !== "0"
  const {
    isLoading,
    data: Address,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getAddressById(itemIdForUpdate || "")
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate("0")
        console.error(err)
      },
    }
  )

  if (itemIdForUpdate === "0") {
    return <AddressEditModalForm isAddressLoading={isLoading} address={{ Id: "0" }} />
  }

  // if (!isLoading && !error && Address && Address.Data) {
  //   console.log('Address', Address)
  //   return <AddressEditModalForm isAddressLoading={isLoading} address={Address.Data[0] || { Id: "0" }} />
  // }

  return null
}

export { AddressEditModalFormWrapper }
