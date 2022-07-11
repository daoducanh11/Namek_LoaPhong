/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import Swal from 'sweetalert2'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUserGroup} from '../../core/_requests'

type Props = {
  id: string
}

const ActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    alert(id)
    setItemIdForUpdate(id)
  }

  const Fdelete = () => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: ' ',
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
      confirmButtonColor: "red",
    }).then(function(result) {
        if (result.value) {
          async () => await deleteItem.mutateAsync()
            Swal.fire(
                "Xóa thành công",
                " ",
                "success"
            )
        }
    });
  }

  const deleteItem = useMutation(() => deleteUserGroup(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <div className="text-center">
        <i className="bi bi-pencil-square fs-1" onClick={openEditModal} style={{cursor: 'pointer', margin: '0 5px 0 0'}}></i>
        <i className="bi bi-trash text-danger fs-1" onClick={Fdelete} style={{cursor: 'pointer'}}></i>
      </div>
      
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={openEditModal}>
            Edit
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          {/* <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete
          </a> */}
          <a
            className='menu-link px-3'
            //data-kt-users-table-filter='delete_row'
            onClick={Fdelete}
          >
            Delete
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {ActionsCell}
