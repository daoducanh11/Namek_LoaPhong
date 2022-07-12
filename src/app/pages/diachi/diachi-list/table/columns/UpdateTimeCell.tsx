/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { Address } from '../../core/_models'

type Props = {
  Address: Address
}

const UpdateTimeCell: FC<Props> = function (Address) {
  var d = new Date()
  if (Address.Address.UpdateTime)
    d = new Date(Address.Address.UpdateTime);
  return (
    <div className='d-flex flex-column text-center'>
      {d.getUTCDate()}/{d.getUTCMonth() + 1}/{d.getUTCFullYear()}<br />
      {d.getUTCHours()}:{d.getUTCMinutes()}
    </div>
  )
}

export { UpdateTimeCell }
