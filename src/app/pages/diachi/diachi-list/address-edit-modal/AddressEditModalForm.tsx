import { FC, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isNotEmpty, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { initialAddress, Address } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { AddressListLoading } from '../components/loading/AddressListLoading'
import { createAddress, updateAddress } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'
// import Swal from 'sweetalert2'

type Props = {
      isAddressLoading: boolean
      address: Address
}

const editAddressSchema = Yup.object().shape({
      // email: Yup.string()
      //   .email('Wrong email format')
      //   .min(3, 'Minimum 3 symbols')
      //   .max(50, 'Maximum 50 symbols')
      //   .required('Email is required'),
      Name: Yup.string()
            .required('Tên địa chỉ không được để trống'),
})

const AddressEditModalForm: FC<Props> = ({ address, isAddressLoading }) => {
      const { setItemIdForUpdate } = useListView()
      const { refetch } = useQueryResponse()

      const [addressForEdit] = useState<Address>({
            ...address,
            Name: address.Name || '',
            CityId: address.CityId || '',
            Id: address.Id || '',
      })

      const cancel = (withRefresh?: boolean) => {
            if (withRefresh) {
                  refetch()
            }
            setItemIdForUpdate("")
      }

      const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

      const formik = useFormik({
            initialValues: addressForEdit,
            validationSchema: editAddressSchema,
            onSubmit: async (values, { setSubmitting }) => {
                  setSubmitting(true)
                  try {
                        if (values.Id !== "0") {
                              // await updateAddress(values).then(() =>
                              //       Swal.fire(
                              //             "Cập nhật thông tin thành công",
                              //             " ",
                              //             "success"
                              //       )
                              // )
                        } else {
                              await createAddress(values)
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
                  <form id='kt_modal_add_address_form' className='form' onSubmit={formik.handleSubmit} noValidate>
                        {/* begin::Scroll */}
                        <div
                              className='d-flex flex-column scroll-y me-n7 pe-7'
                              id='kt_modal_add_address_scroll'
                              data-kt-scroll='true'
                              data-kt-scroll-activate='{default: false, lg: true}'
                              data-kt-scroll-max-height='auto'
                              data-kt-scroll-dependencies='#kt_modal_add_address_header'
                              data-kt-scroll-wrappers='#kt_modal_add_address_scroll'
                              data-kt-scroll-offset='300px'
                        >
                              {/* begin::Input group */}
                              <div className='row'>
                                    <div className='col-6'>
                                          {/* begin::Label */}
                                          <label className='required fw-bold fs-6 mb-2'>Tên</label>
                                          {/* end::Label */}

                                          {/* begin::Input */}
                                          <input
                                                placeholder='Tên'
                                                {...formik.getFieldProps('Name')}
                                                type='text'
                                                name='Name'
                                                className={clsx(
                                                      'form-control form-control-solid mb-3 mb-lg-0',
                                                      { 'is-invalid': formik.touched.Name && formik.errors.Name },
                                                      {
                                                            'is-valid': formik.touched.Name && !formik.errors.Name,
                                                      }
                                                )}
                                                autoComplete='off'
                                                disabled={formik.isSubmitting || isAddressLoading}
                                          />
                                          {formik.touched.Name && formik.errors.Name && (
                                                <div className='fv-plugins-message-container'>
                                                      <div className='fv-help-block'>
                                                            <span className='text-danger' role='alert'>{formik.errors.Name}</span>
                                                      </div>
                                                </div>
                                          )}
                                          {/* end::Input */}
                                    </div>
                                    <div className='col-6'>
                                          {/* begin::Label */}
                                          <label className='required fw-bold fs-6 mb-2'>Mã</label>
                                          {/* end::Label */}

                                          {/* begin::Input */}
                                          <input
                                                placeholder='Mã'
                                                {...formik.getFieldProps('Id')}
                                                type='text'
                                                name='Id'
                                                className={clsx(
                                                      'form-control form-control-solid mb-3 mb-lg-0',
                                                      { 'is-invalid': formik.touched.Id && formik.errors.Id },
                                                      {
                                                            'is-valid': formik.touched.Id && !formik.errors.Id,
                                                      }
                                                )}
                                                autoComplete='off'
                                                disabled={formik.isSubmitting || isAddressLoading}
                                          />
                                          {formik.touched.Id && formik.errors.Id && (
                                                <div className='fv-plugins-message-container'>
                                                      <div className='fv-help-block'>
                                                            <span className='text-danger' role='alert'>{formik.errors.Id}</span>
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
                                    <label className='required fw-bold fs-6 mb-2'>Mã cha</label>
                                    {/* end::Label */}

                                    {/* begin::Input */}
                                    <input
                                          placeholder='Mã cha'
                                          {...formik.getFieldProps('Info')}
                                          className={clsx(
                                                'form-control form-control-solid mb-3 mb-lg-0',
                                                { 'is-invalid': formik.touched.CityId && formik.errors.CityId },
                                                {
                                                      'is-valid': formik.touched.CityId && !formik.errors.CityId,
                                                }
                                          )}
                                          type='text'
                                          name='CityId'
                                          autoComplete='off'
                                          disabled={formik.isSubmitting || isAddressLoading}
                                    />
                                    {/* end::Input */}
                                    {formik.touched.CityId && formik.errors.CityId && (
                                          <div className='fv-plugins-message-container'>
                                                <span role='alert'>{formik.errors.CityId}</span>
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
                                    disabled={formik.isSubmitting || isAddressLoading}
                              >
                                    Hủy
                              </button>

                              <button
                                    type='submit'
                                    className='btn btn-primary'
                                    data-kt-users-modal-action='submit'
                                    disabled={isAddressLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
                              >
                                    <span className='indicator-label'>Lưu</span>
                                    {(formik.isSubmitting || isAddressLoading) && (
                                          <span className='indicator-progress'>
                                                Vui lòng đợi...{' '}
                                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                          </span>
                                    )}
                              </button>
                        </div>
                        {/* end::Actions */}
                  </form>
                  {(formik.isSubmitting || isAddressLoading) && <AddressListLoading />}
            </>
      )
}

export { AddressEditModalForm }
