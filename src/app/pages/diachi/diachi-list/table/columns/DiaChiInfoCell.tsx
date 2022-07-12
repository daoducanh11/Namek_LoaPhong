/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { Address } from '../../core/_models'

type Props = {
      Address: Address
}

const DiaChiInfoCell: FC<Props> = ({ Address }) => (
      <div className='d-flex align-items-center'>
            {/* begin:: Avatar */}
            <div className='d-flex flex-column'>
                  <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                        {Address.Districts}
                  </a>
            </div>
      </div>
)

export { DiaChiInfoCell }
