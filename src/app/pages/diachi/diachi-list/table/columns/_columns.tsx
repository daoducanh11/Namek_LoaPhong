import { Column } from 'react-table'
import { DiaChiNumericalOrder } from './DiaChiNumericalOrder'
// import { DiaChiInfoCell } from './DiaChiInfoCell'
import { CreateByUserCell } from './CreateByUserCell'
// import { DiaChiTwoStepsCell } from './DiaChiTwoStepsCell'
import { ActionsCell } from './ActionsCell'
// import { DiaChiSelectionCell } from './DiaChiSelectionCell'
import { DiaChiCustomHeader } from './DiaChiCustomHeader'
//  import { DiaChiSelectionHeader } from './DiaChiSelectionHeader'
import { UpdateTimeCell } from './UpdateTimeCell'

import { Address } from '../../core/_models'

const AddressColumns: ReadonlyArray<Column<Address>> = [
  {
    Header: (props) => <DiaChiCustomHeader tableProps={props} title='STT' />,
    id: 'numericalOrder',
    Cell: ({ ...props }) => <DiaChiNumericalOrder number={props.row.index + 1} />,
  },
  {
    Header: (props) => <DiaChiCustomHeader tableProps={props} title='Tên' className='min-w-125px' />,
    accessor: 'Name',
  },
  {
    Header: (props) => <DiaChiCustomHeader tableProps={props} title='Id' className='min-w-125px' />,
    accessor: 'CityId',
  },
  {
    Header: (props) => (
      <DiaChiCustomHeader tableProps={props} title='Người cập nhật' className='min-w-125px text-center' />
    ),
    accessor: 'CreateByUser',
    Cell: ({ ...props }) => <CreateByUserCell CreateByUser={props.data[props.row.index].CreateByUser} />,
  },
  {
    Header: (props) => (
      <DiaChiCustomHeader tableProps={props} title='Thời gian cập nhật' className='min-w-125px text-center' />
    ),
    id: 'UpdateTime',
    Cell: ({ ...props }) => <UpdateTimeCell Address={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <DiaChiCustomHeader tableProps={props} title='Hành động' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <ActionsCell id={props.data[props.row.index].Id} />,
  },
]

export { AddressColumns }
