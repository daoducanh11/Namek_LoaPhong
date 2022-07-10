import {FC, useMemo} from 'react'
import {useListView} from '../../core/ListViewProvider'

type Props = {
  number: Number
}

const NhomNguoiDungNumericalOrder: FC<Props> = ({number}) => {
  return (
    <div className='form-check form-check-sm form-check-custom form-check-solid'>
      {number}
    </div>
  )
}

export {NhomNguoiDungNumericalOrder}
