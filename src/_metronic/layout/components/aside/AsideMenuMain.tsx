/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl' 
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
    


       <AsideMenuItemWithSub
        to='/quantrihethong'
        title='Quản trị hệ thống'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      > 
           <AsideMenuItem
            to='/nhomnguoidung/danhsach'
            icon='/media/icons/duotune/general/gen051.svg'
            title='Nhóm người dùng'
            fontIcon='bi-layers'
          />

          <AsideMenuItem
            to='/apps/user-management/users'
            icon='/media/icons/duotune/general/gen051.svg'
            title='Người dùng'
            fontIcon='bi-layers'
          />

             <AsideMenuItem
            to='/apps/user-management/users'
            icon='/media/icons/duotune/general/gen051.svg'
            title='Phân quyền'
            fontIcon='bi-layers'
          />
      </AsideMenuItemWithSub>
    </>
  )
}
