
import { useMemo } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomHeaderColumn } from './columns/CustomHeaderColumn'
import { CustomRow } from './columns/CustomRow'
import { useQueryResponseData, useQueryResponseLoading } from '../core/QueryResponseProvider'
import { AddressColumns } from './columns/_columns'
import { Address } from '../core/_models'
import { AddressListLoading } from '../components/loading/AddressListLoading'
import { AddressListPagination } from '../components/pagination/AddressListPagination'
import { KTCardBody } from '../../../../../_metronic/helpers'
import { AddressPagination } from '../components/pagination/AddressPagination'

const DiaChiTable = () => {
  const Address = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => Address, [Address])
  const columns = useMemo(() => AddressColumns, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })



  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Address>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Address>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    Không có dữ liệu
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddressPagination />
      {isLoading && <AddressListLoading />}
    </KTCardBody>
  )
}

export { DiaChiTable }



