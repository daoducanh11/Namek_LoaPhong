import { FC, useMemo } from 'react'
import { useListView } from '../../core/ListViewProvider'
import { useQueryRequest } from '../../core/QueryRequestProvider'

type Props = {
  number: number
}

const DiaChiNumericalOrder: FC<Props> = ({ number }) => {
  const { state } = useQueryRequest()
  return (
    <div className='form-check form-check-sm form-check-custom form-check-solid'>
      {number + (state.currentPage - 1) * state.pageSize}
    </div>
  )
}

export { DiaChiNumericalOrder }
