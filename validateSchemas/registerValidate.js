import * as yup from 'yup'

export const dangKyTaiKhoanValidate = yup.object().shape({
    name: yup.string().required('Họ tên không được để trống'),
    email: yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
    password: yup
        .string()
        .min(8, ({ min }) => `Mật khẩu tối thiểu ${min} kí tự`)
        .required('Mật khẩu không được để trống'),
    rePassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không chính xác')
        .min(8, ({ min }) => `Mật khẩu tối thiểu ${min} kí tự`)
        .required('Xác nhận mật khẩu không được để trống'),
})

export const daiDienDoanhNghiepValidate = yup.object().shape({
    tenNguoiDaiDien: yup.string().required('Không được để trống'),
    dienThoai: yup.string().required('Không được để trống'),
    email: yup.string().email('Email không đúng định dạng').required('Không được để trống'),
    cccd: yup.string().required('Không được để trống'),
    imgMatTruoc: yup.string().required('Không được để trống'),
    imgMatSau: yup.string().required('Không được để trống'),

    // dropdown
    tinh: yup.string().required('Không được để trống'),
    thanhPho: yup.string().required('Không được để trống'),
    diaChi: yup.string().required('Không được để trống'),
    chucVu: yup.string().required('Không được để trống'),
})

export const dangKyDoanhNghiepValidate = yup.object().shape({
    tenTiengViet: yup.string().required('Không được để trống'),
    tenTiengAnh: yup.string().required('Không được để trống'),
    tenVietTat: yup.string().required('Không được để trống'),
    maSoThue: yup.string().required('Không được để trống'),
    soLuongNhanSu: yup.string().required('Không được để trống'),
    loaiHinhId: yup.string().required('Không được để trống'),

    // address
    tinh: yup.string().required('Không được để trống'),
    thanhPho: yup.string().required('Không được để trống'),
    diaChi: yup.string().required('Không được để trống'),
})

// test
export const loginValidationSchema = yup.object().shape({
    linhVuc: yup.string().required('Yêu cầu chọn lĩnh vực'),
})
