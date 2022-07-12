import { useListView } from '../../core/ListViewProvider'
import { AddressListToolbar } from './AddressListToolbar'
import { AddressListGrouping } from './AddressListGrouping'
import { AddressListSearchComponent } from './AddressListSearchComponent'

const AddressListHeader = () => {
  const { selected } = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <AddressListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <AddressListGrouping /> : <AddressListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export { AddressListHeader }
