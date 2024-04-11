import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { pagerStyles } from './pagerStyles'
//@ts-ignore
import logo1 from '@assets/images/trungtam/chuongtrinhdaotao/1.jpg'
//@ts-ignore

import logo2 from '@assets/images/trungtam/chuongtrinhdaotao/2.jpg'
//@ts-ignore

import logo3 from '@assets/images/trungtam/chuongtrinhdaotao/3.jpg'
//@ts-ignore

import logo4 from '@assets/images/trungtam/chuongtrinhdaotao/4.jpg'
//@ts-ignore

import logo5 from '@assets/images/trungtam/chuongtrinhdaotao/5.jpg'
//@ts-ignore

import logo6 from '@assets/images/trungtam/chuongtrinhdaotao/6.jpg'
//@ts-ignore

import logo7 from '@assets/images/trungtam/chuongtrinhdaotao/7.jpg'
//@ts-ignore

import logo8 from '@assets/images/trungtam/chuongtrinhdaotao/8.jpg'
//@ts-ignore

import logo9 from '@assets/images/trungtam/chuongtrinhdaotao/9.jpg'
//@ts-ignore

import logo10 from '@assets/images/trungtam/chuongtrinhdaotao/10.jpg'
//@ts-ignore

import logo11 from '@assets/images/trungtam/chuongtrinhdaotao/11.jpg'
//@ts-ignore

import logo12 from '@assets/images/trungtam/chuongtrinhdaotao/12.jpg'
//@ts-ignore

import logo13 from '@assets/images/trungtam/chuongtrinhdaotao/13.jpg'
//@ts-ignore

import logo14 from '@assets/images/trungtam/chuongtrinhdaotao/14.jpg'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store'
import trungTamSlice from '@redux/trungtamSlice'
import { router } from 'expo-router'
//@ts-ignore

const ChuongTrinhDaoTao = () => {
    const data = [
        {
            image: logo1,
            name: 'Lập trình sáng tạo với Tynker cơ bản',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/lap-trinh-sang-taobr-voi-tynker-co-ban',
        },
        {
            image: logo2,
            name: 'LẬP TRÌNH SÁNG TẠO TYNKER NÂNG CAO VỚI ROBOMASTER S1',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/lap-trinh-sang-tao-tynker-br-nang-cao-voi-robomaster-s1',
        },
        {
            image: logo3,
            name: 'TIN HỌC ỨNG DỤNG THEO CHUẨN QUỐC TẾ IC3 SPARK',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/tin-hoc-ung-dungbr-theo-chuan-quoc-te-ic3-spark',
        },
        {
            image: logo4,
            name: 'ÔN LUYỆN CHUẨN KỸ NĂNG CÔNG NGHỆ THÔNG TIN CƠ BẢN',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/on-luyen-chuan-ky-nangbr-cong-nghe-thong-tin-co-ban',
        },
        {
            image: logo5,
            name: 'CHUẨN KỸ NĂNG SỬ DỤNG CNTT CƠ BẢN',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/chuan-ky-nangbr-su-dung-cntt-co-ban',
        },
        {
            image: logo6,
            name: 'CHUẨN KỸ NĂNG SỬ DỤNG CNTT NÂNG CAO',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/chuan-ky-nang-su-dungbr-cntt-nang-cao',
        },
        {
            image: logo7,
            name: 'PHOTOSHOP CƠ BẢN',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/photoshop-co-ban',
        },
        {
            image: logo8,
            name: 'COREL DRAW CƠ BẢN',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/corel-draw-co-ban',
        },
        {
            image: logo9,
            name: 'CHUYÊN ĐỀ: LẬP TRÌNH WEB CHUYÊN ĐỀ: LẬP TRÌNH WEB',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/chuyen-de-lap-trinh-web',
        },
        {
            image: logo10,
            name: 'LỚP QUẢN TRỊ MẠNG DOANH NGHIỆP',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/lop-quan-tri-mang-doanh-nghiep',
        },
        {
            image: logo11,
            name: 'CHUYÊN ĐỀ THIẾT KẾ WEB CĂN BẢN',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/chuyen-debr-thiet-ke-web-can-ban',
        },
        {
            image: logo12,
            name: 'CHUYÊN ĐỀ CÀI ĐẶT MÁY TÍNH',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/chuyen-debr-cai-dat-may-tinh',
        },
        {
            image: logo13,
            name: 'CHUYÊN ĐỀ LẮP RÁP MÁY VI TÍNH',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/chuyen-debr-lap-rap-may-vi-tinh',
        },
        {
            image: logo14,
            name: 'SỬ DỤNG MÁY TÍNH VÀ INTERNET',
            link: 'https://cict.agu.edu.vn/chuong-trinh-dao-tao/su-dungbr-may-tinh-va-internet',
        },
    ]
    const dispatch = useDispatch<AppDispatch>()

    const onSelect = async (item: any) => {
        dispatch(trungTamSlice.actions.selectChuongTrinh(item))
        router.push('/web')
    }
    return (
        <View collapsable={false} style={pagerStyles.pageContainer}>
            <Text style={pagerStyles.pageTitle}>Chương trình đào tạo</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.name}
                numColumns={3}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            android_ripple={{ color: 'white' }}
                            onPress={() => onSelect(item)}
                            style={styles.item}>
                            <Image source={item.image} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

export default ChuongTrinhDaoTao

const styles = StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        gap: 6,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 25,
    },
    name: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
})
