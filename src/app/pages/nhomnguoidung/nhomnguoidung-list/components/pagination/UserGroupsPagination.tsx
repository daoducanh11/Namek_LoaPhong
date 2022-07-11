/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const UserGroupsPagination = () => {
  const pagination = useQueryResponsePagination()
  console.log('pagination', pagination)
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  const updatePage = (currentPage: number | null) => {
    if (!currentPage || isLoading || pagination.currentPage === currentPage) {
      return
    }

    updateState({currentPage, pageSize: pagination.pageSize || 5})
  }

  return (
    <div className="commentBox">
        {/* Here the pagination component is styled thanks to Bootstrap
        classes. See https://getbootstrap.com/docs/5.1/components/pagination */}
        <nav aria-label="Page navigation comments" className="mt-4">
          <ReactPaginate
            previousLabel="Trước"
            nextLabel="Sau"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pagination.totalPages}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            // eslint-disable-next-line no-unused-vars
            hrefBuilder={(page, pageCount, selected) =>
              page >= 1 && page <= pageCount ? `/page/${page}` : '#'
            }
            hrefAllControls
            forcePage={pagination.currentPage - 1}
            onClick={(clickEvent) => {
              console.log('onClick', clickEvent);

              if(clickEvent.nextSelectedPage !== undefined)
                updatePage(clickEvent.nextSelectedPage + 1 || 1)
              // Return false to prevent standard page change,
              // return false; // --> Will do nothing.
              // return a number to choose the next page,
              // return 4; --> Will go to page 5 (index 4)
              // return nothing (undefined) to let standard behavior take place.
            }}
          />
        </nav>
      </div>
  )
}

export {UserGroupsPagination}
