import {useQuery} from 'react-query'
import {UserEditModalForm} from './UserEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getUserGroupById} from '../core/_requests'

const UserEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = itemIdForUpdate !== "0"
  const {
    isLoading,
    data: userGroup,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getUserGroupById(itemIdForUpdate || "")
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
    return <UserEditModalForm isUserLoading={isLoading} userGroup={{Id: "0"}} />
  }

  if (!isLoading && !error && userGroup && userGroup.Data) {
    console.log('userGroup', userGroup)
    return <UserEditModalForm isUserLoading={isLoading} userGroup={userGroup.Data[0] || {Id: "0"}} />
  }

  return null
}

export {UserEditModalFormWrapper}
