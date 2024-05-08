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
