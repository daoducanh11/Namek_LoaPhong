import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {initialUserGroup, UserGroup} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUserGroup, updateUserGroup} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  userGroup: UserGroup
}

const editUserSchema = Yup.object().shape({
  // email: Yup.string()
  //   .email('Wrong email format')
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Email is required'),
  UserGroupName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Tên nhóm không được để trống'),
})

const UserEditModalForm: FC<Props> = ({userGroup, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userGroupForEdit] = useState<UserGroup>({
    ...userGroup,
    UserGroupName: userGroup.UserGroupName,
    Address: userGroup.Address,
    Info: userGroup.Info,
    IsActive: userGroup.IsActive || initialUserGroup.IsActive
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate("")
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const formik = useFormik({
    initialValues: userGroupForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (values.Id !== "0") {
          await updateUserGroup(values)
        } else {
          await createUserGroup(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          {/* begin::Input group */}
          <div className='row'>
            <div className='col-6'>
              {/* begin::Label */}
              <label className='required fw-bold fs-6 mb-2'>Tên nhóm</label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                placeholder='Tên nhóm'
                {...formik.getFieldProps('UserGroupName')}
                type='text'
                name='UserGroupName'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.UserGroupName && formik.errors.UserGroupName},
                  {
                    'is-valid': formik.touched.UserGroupName && !formik.errors.UserGroupName,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.UserGroupName && formik.errors.UserGroupName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span className='text-danger' role='alert'>{formik.errors.UserGroupName}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
            <div className='col-6'>
              {/* begin::Label */}
              <label className='required fw-bold fs-6 mb-2'>IMEI bộ phát</label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                placeholder='IMEI bộ phát'
                {...formik.getFieldProps('Address')}
                type='text'
                name='Address'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.Address && formik.errors.Address},
                  {
                    'is-valid': formik.touched.Address && !formik.errors.Address,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.Address && formik.errors.Address && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span className='text-danger' role='alert'>{formik.errors.Address}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
          </div>
          
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Thông tin nhóm</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Thông tin nhóm'
              {...formik.getFieldProps('Info')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.Info && formik.errors.Info},
                {
                  'is-valid': formik.touched.Info && !formik.errors.Info,
                }
              )}
              type='text'
              name='Info'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.Info && formik.errors.Info && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.Info}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}

        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Hủy
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Lưu</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Vui lòng đợi...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
