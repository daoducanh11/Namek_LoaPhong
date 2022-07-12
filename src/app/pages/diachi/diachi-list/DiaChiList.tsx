import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { AddressListHeader } from './components/header/AddressListHeader'
import { DiaChiTable } from './table/DiaChiTable'
import { AddressEditModal } from './address-edit-modal/AddressEditModal'
import { KTCard } from '../../../../_metronic/helpers'

const DiaChiList = () => {
  const { itemIdForUpdate } = useListView()
  return (

    <>
      <KTCard>
        <AddressListHeader />
        <DiaChiTable />
      </KTCard>
      {itemIdForUpdate !== "" && <AddressEditModal />}
    </>
  )
}

const DiaChiListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <DiaChiList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { DiaChiListWrapper }
