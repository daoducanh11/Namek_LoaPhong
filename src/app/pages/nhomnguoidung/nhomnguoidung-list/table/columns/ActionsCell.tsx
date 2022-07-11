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
    }).then(async function(result) {
        if (result.value) {
          await deleteItem.mutateAsync()
        }
    });
  }

  const deleteItem = useMutation(() => deleteUserGroup(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      Swal.fire(
        "Xóa thành công",
        " ",
        "success"
      )
    },
    onError: () => {
      Swal.fire(
        "Xóa thất bại",
        " ",
        "error"
      )
    }
  })

  return (
    <>
      <div className="text-center">
        <i className="bi bi-pencil-square fs-1" onClick={openEditModal} style={{cursor: 'pointer', margin: '0 5px 0 0'}}></i>
        <i className="bi bi-trash text-danger fs-1" onClick={Fdelete} style={{cursor: 'pointer'}}></i>
      </div>
    </>
  )
}

export {ActionsCell}
