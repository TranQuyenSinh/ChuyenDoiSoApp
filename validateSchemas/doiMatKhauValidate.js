import * as yup from 'yup'

export const doiMatKhauValidate = yup.object().shape({
    currentPassword: yup
        .string()
        .min(3, ({ min }) => `Tối thiểu ${min} kí tự`)
        .required('Không được bỏ trống'),
    newPassword: yup
        .string()
        .min(3, ({ min }) => `Tối thiểu ${min} kí tự`)
        .required('Không được bỏ trống'),
    rePassword: yup
        .string()
        .min(3, ({ min }) => `Tối thiểu ${min} kí tự`)
        .required('Không được bỏ trống')
        .oneOf([yup.ref('newPassword')], 'Mật khẩu nhập lại không khớp'),
})
