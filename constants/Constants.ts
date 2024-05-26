export default {
    Strategy: {
        Google: 'oauth_google',
        Facebook: 'oauth_facebook',
    },
    SecureStore: {
        SavedAuth: 'saved_auth',
        BioAuth: 'bio_auth',
    },
}

export enum ROLES {
    ADMIN = 'ad',
    DOANH_NGHIEP = 'dn',
    CHUYEN_GIA = 'cg',
    CONG_TAC_VIEN = 'ctv',
    HIEP_HOI = 'hhdn',
}

export type ROLE = ROLES.ADMIN | ROLES.DOANH_NGHIEP | ROLES.CHUYEN_GIA | ROLES.CONG_TAC_VIEN | ROLES.HIEP_HOI

export const HUYENS = [
    {
        id: 883,
        name: 'Long Xuyên',
    },
    {
        id: 884,
        name: 'Châu Đốc',
    },
    {
        id: 886,
        name: 'An Phú',
    },
    {
        id: 887,
        name: 'Tân Châu',
    },
    {
        id: 888,
        name: 'Phú Tân',
    },
    {
        id: 889,
        name: 'Châu Phú',
    },
    {
        id: 890,
        name: 'Tịnh Biên',
    },
    {
        id: 891,
        name: 'Tri Tôn',
    },
    {
        id: 892,
        name: 'Châu Thành',
    },
    {
        id: 893,
        name: 'Chợ Mới',
    },
    {
        id: 894,
        name: 'Thoại Sơn',
    },
]