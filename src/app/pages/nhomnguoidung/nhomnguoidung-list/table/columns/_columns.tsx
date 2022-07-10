import {Column} from 'react-table'
import {NhomNguoiDungNumericalOrder} from './NhomNguoiDungNumericalOrder'
import {NhomNguoiDungInfoCell} from './NhomNguoiDungInfoCell'
import {CreateByUserCell} from './CreateByUserCell'
import {NhomNguoiDungTwoStepsCell} from './NhomNguoiDungTwoStepsCell'
import {ActionsCell} from './ActionsCell'
import {NhomNguoiDungSelectionCell} from './NhomNguoiDungSelectionCell'
import {NhomNguoiDungCustomHeader} from './NhomNguoiDungCustomHeader'
import {NhomNguoiDungSelectionHeader} from './NhomNguoiDungSelectionHeader'
import {UserGroupNameCell} from './UserGroupNameCell'
import {UpdateTimeCell} from './UpdateTimeCell'

import {UserGroup} from '../../core/_models'

const userGroupsColumns: ReadonlyArray<Column<UserGroup>> = [
  {
    Header: (props) => <NhomNguoiDungCustomHeader tableProps={props} title='STT' />,
    id: 'numericalOrder',
    Cell: ({...props}) => <NhomNguoiDungNumericalOrder number={props.row.index + 1} />,
  },
  {
    Header: (props) => <NhomNguoiDungCustomHeader tableProps={props} title='Tên nhóm' className='min-w-125px' />,
    accessor: 'UserGroupName',
  },
  {
    Header: (props) => <NhomNguoiDungCustomHeader tableProps={props} title='IMEI bộ phát' className='min-w-125px' />,
    accessor: 'Address',
  },
  {
    Header: (props) => (
      <NhomNguoiDungCustomHeader tableProps={props} title='Thông tin nhóm' className='min-w-125px' />
    ),
    accessor: 'Info',
  },
  {
    Header: (props) => (
      <NhomNguoiDungCustomHeader tableProps={props} title='Người cập nhật' className='min-w-125px text-center' />
    ),
    accessor: 'CreateByUser',
    Cell: ({...props}) => <CreateByUserCell CreateByUser={props.data[props.row.index].CreateByUser} />,
  },
  {
    Header: (props) => (
      <NhomNguoiDungCustomHeader tableProps={props} title='Thời gian cập nhật' className='min-w-125px text-center' />
    ),
    id: 'UpdateTime',
    Cell: ({...props}) => <UpdateTimeCell userGroup={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <NhomNguoiDungCustomHeader tableProps={props} title='Hành động' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].Id} />,
  },
]

export {userGroupsColumns}
