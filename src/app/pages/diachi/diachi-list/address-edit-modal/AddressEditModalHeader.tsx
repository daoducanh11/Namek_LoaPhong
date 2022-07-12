import { KTSVG } from '../../../../../_metronic/helpers'
import { useListView } from '../core/ListViewProvider'

const AddressEditModalHeader = () => {
  const { setItemIdForUpdate } = useListView()

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>Thông tin địa chỉ</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => setItemIdForUpdate('')}
        style={{ cursor: 'pointer' }}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export { AddressEditModalHeader }
