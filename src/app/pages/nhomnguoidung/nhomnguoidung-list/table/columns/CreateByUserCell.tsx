import {FC} from 'react'

type Props = {
  CreateByUser?: string
}

const CreateByUserCell: FC<Props> = ({CreateByUser}) => (
  <div className='text-center'>
    {CreateByUser}
  </div>
)

export {CreateByUserCell}
