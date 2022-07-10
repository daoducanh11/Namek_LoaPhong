import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {NhomNguoiDungListWrapper} from './nhomnguoidung-list/NhomNguoiDungList' 
const NhomNguoiDungBreadcrumbs: Array<PageLink> = [
  {
    title: 'Nhóm người dùng',
    path: '/nhomnguoidung/danhsach',
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

const NhomNguoiDungPage = () => {   
  return (
     
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='danhsach'
          element={
            <>
              <PageTitle breadcrumbs={NhomNguoiDungBreadcrumbs}>Nhóm người dùng</PageTitle>
              <NhomNguoiDungListWrapper />
            </>
          }
        />
      </Route>

      <Route index element={<Navigate to='/nhomnguoidung/danhsach' />} />
    </Routes>
  )
}

export default NhomNguoiDungPage
