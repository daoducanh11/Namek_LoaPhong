/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {UserGroup} from '../../core/_models'

type Props = {
  userGroup: UserGroup
}

const UpdateTimeCell: FC<Props> = function(userGroup) {
  var d = new Date()
  if(userGroup.userGroup.UpdateTime)
    d = new Date(userGroup.userGroup.UpdateTime);  
  return (
    <div className='d-flex flex-column text-center'>
      {d.getUTCDate()}/{d.getUTCMonth() + 1}/{d.getUTCFullYear()}<br/>
      {d.getUTCHours()}:{d.getUTCMinutes()}
    </div>
  )
}

export {UpdateTimeCell}
