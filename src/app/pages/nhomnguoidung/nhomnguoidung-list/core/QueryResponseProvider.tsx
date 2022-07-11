/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {Query, useQuery} from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
} from '../../../../../_metronic/helpers'
import {getUserGroups} from './_requests'
import {UserGroup} from './_models'
import {useQueryRequest} from './QueryRequestProvider'

const QueryResponseContext = createResponseContext<UserGroup>(initialQueryResponse)
const QueryResponseProvider: FC = ({children}) => {
  const {state} = useQueryRequest()
  console.log('state', state)
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  //const [query, setQuery] = useState<object>(state)
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    console.log('updatedQuery', updatedQuery)

    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      // return getUserGroups(query)
      return getUserGroups(state)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }
  return response.Data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  console.log('response', response)
  if (!response) {
    return defaultPaginationState
  }

  response.Pagination = {
    currentPage: response.CurrentPage || 1,
    pageSize: response.PageSize || 10,
    totalPages : response.TotalPages || 1,
    totalItems: response.TotalItems || 0
  }
  return response.Pagination

  // if (!response) {
  //   return null
  // }
  // return response
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
