import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { DiaChiListWrapper } from './diachi-list/DiaChiList'
const DiaChiBreadcrumbs: Array<PageLink> = [
  {
    title: 'Địa chỉ',
    path: '/diachi/danhsach',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const DiaChiPage = () => {
  return (

    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='danhsach'
          element={
            <>
              <PageTitle breadcrumbs={DiaChiBreadcrumbs}>Địa chỉ</PageTitle>
              <DiaChiListWrapper />
            </>
          }
        />
      </Route>

      <Route index element={<Navigate to='/diachi/danhsach' />} />
    </Routes>
  )
}

export default DiaChiPage
