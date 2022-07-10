import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UserGroupsListHeader} from './components/header/UserGroupsListHeader'
import {NhomNguoiDungTable} from './table/NhomNguoiDungTable'
import {UserEditModal} from './user-edit-modal/UserEditModal'
import {KTCard} from '../../../../_metronic/helpers'

const NhomNguoiDungList = () => {
  const {itemIdForUpdate} = useListView() 
  return (
    
    <>
      <KTCard>
        <UserGroupsListHeader />
        <NhomNguoiDungTable />
      </KTCard>
      {itemIdForUpdate !== "" && <UserEditModal />}
    </>
  )
}

const NhomNguoiDungListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <NhomNguoiDungList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {NhomNguoiDungListWrapper}
