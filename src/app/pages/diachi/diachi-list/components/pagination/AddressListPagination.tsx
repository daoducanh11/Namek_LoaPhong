/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useQueryResponseLoading, useQueryResponsePagination } from '../../core/QueryResponseProvider'
import { useQueryRequest } from '../../core/QueryRequestProvider'
const AddressListPagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const { updateState } = useQueryRequest()
  const updatePage = (currentPage: number | null) => {
    if (!currentPage || isLoading || pagination.currentPage === currentPage) {
      return
    }

    updateState({ currentPage, pageSize: pagination.pageSize || 5 })
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {pagination.links?.map((link) => (
              <li
                key={link.label}
                className={clsx('page-item', {
                  active: pagination.currentPage === link.page,
                  disabled: isLoading,
                  previous: link.label === '&laquo; Trước',
                  next: link.label === 'Sau &raquo;',
                })}
              >
                <a
                  className='page-link'
                  onClick={() => updatePage(link.page)}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  style={{ cursor: 'pointer' }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export { AddressListPagination }
