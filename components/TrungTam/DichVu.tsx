import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { pagerStyles } from './pagerStyles'
import Colors from '@constants/Colors'
//@ts-ignore
import tuvan from '@assets/images/trungtam/tuvan.jpg'
//@ts-ignore
//@ts-ignore
import website1 from '@assets/images/trungtam/website1.jpg'
//@ts-ignore
import website2 from '@assets/images/trungtam/website2.jpg'
//@ts-ignore
import software from '@assets/images/trungtam/software.jpg'
//@ts-ignore
import phongmay1 from '@assets/images/trungtam/phongmay1.jpg'
//@ts-ignore
import phongmay2 from '@assets/images/trungtam/phongmay2.jpg'
import { screenHeight } from '@utils/window'
import PagerView from 'react-native-pager-view'

const DichVu = () => {
    return (
        <View collapsable={false} style={pagerStyles.pageContainer}>
            <Text style={pagerStyles.pageTitle}>Dịch vụ của chúng tôi</Text>
            <PagerView
                orientation={'horizontal'}
                style={{ flex: 1, height: screenHeight }}
                initialPage={0}
                keyboardDismissMode={'on-drag'}
                scrollEnabled={true}
                pageMargin={32}>
                <TuVan />
                <Website />
                <UngDung />
                <PhongMay />
            </PagerView>
        </View>
    )
}

const TuVan = () => {
    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.content}>
                <Text style={cardStyles.listTitle}>Tư vấn chuyển đổi số miễn phí</Text>
                <Text style={cardStyles.listItem}>- Kinh nghiệm thực tế trong lĩnh vực CNTT và chuyển đổi số</Text>
                <Text style={cardStyles.listItem}>
                    - Đội ngũ chuyên gia giàu kinh nghiệm trong các lĩnh vục Nông nghiệp, Công nghiệp - Xây dựng, Dịch
                    vụ
                </Text>
                <View style={cardStyles.divider} />
                <Text style={cardStyles.listTitle}>Các chuyên gia</Text>
                <View style={cardStyles.chuyenGiaRow}>
                    <Image
                        source={{ uri: 'https://thongtin.cdsdnag.com/assets/backend/img/hoso/cg-22.jpg' }}
                        style={cardStyles.chuyenGiaAvatar}
                    />
                    <Text style={{ color: 'white', flexShrink: 1 }}>
                        Phó giáo sư Tiến sĩ: Đoàn Thanh nghị - Chuyên ngành: Tin học
                    </Text>
                </View>
                <View style={cardStyles.chuyenGiaRow}>
                    <Image
                        source={{ uri: 'https://thongtin.cdsdnag.com/assets/backend/img/hoso/nvhoa.jpg' }}
                        style={cardStyles.chuyenGiaAvatar}
                    />
                    <Text style={{ color: 'white', flexShrink: 1 }}>
                        Tiến sĩ: Nguyễn Văn Hòa - Chuyên ngành: Tin học
                    </Text>
                </View>
            </View>
            <Image source={tuvan} style={cardStyles.image} />
        </View>
    )
}
const Website = () => {
    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.content}>
                <Text style={cardStyles.listTitle}>Phát triển website</Text>
                <Text style={cardStyles.listItem}>- Bảo trì & nâng cấp website</Text>
                <Text style={cardStyles.listItem}>- Quản trị & và cập nhật website</Text>
                <Text style={cardStyles.listItem}>- Tư vấn giải pháp quảng bá bằng website</Text>
                <View style={cardStyles.divider} />
                <Text style={cardStyles.listTitle}>Công nghệ</Text>
                <Text style={cardStyles.listItem}>- Dot NET (C# & SQL sevrer)</Text>
                <Text style={cardStyles.listItem}>
                    - Mã nguồn mở (PHP&MySQL, CMS Joomla, CMS Drupal, OS-Commerce, PrestaShop, Open Cart, Ajax,
                    Javascript, Jquery, Java JSP&Servlet).
                </Text>
            </View>
            <Image source={website1} style={cardStyles.image} />
            <Image source={website2} style={cardStyles.image} />
        </View>
    )
}

const UngDung = () => {
    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.content}>
                <Text style={cardStyles.listTitle}>Phát triển phần mềm (software)</Text>
                <Text style={cardStyles.listItem}>- Phần mềm quản lý hồ sơ trực tuyến</Text>
                <Text style={cardStyles.listItem}>- Phần mềm quản lý nhân sự, bán hàng</Text>
                <Text style={cardStyles.listItem}>
                    - Tư vấn giải pháp và phát triển các hệ thống quản trị doanh nghiệp theo yêu cầu
                </Text>
                <View style={cardStyles.divider} />
                <Text style={cardStyles.listTitle}>Công nghệ</Text>
                <Text style={cardStyles.listItem}>- Dot NET (C# & SQL sevrer)</Text>
                <Text style={cardStyles.listItem}>- Java & MySQL</Text>
            </View>
            <Image source={software} style={cardStyles.image} />
        </View>
    )
}

const PhongMay = () => {
    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.content}>
                <Text style={cardStyles.listTitle}>Cho thuê phòng máy</Text>
                <Text style={cardStyles.listItem}>
                    - Trung tâm có 8 phòng thực hành được trang bị 320 máy tính cấu hình mạnh.
                </Text>
                <Text style={cardStyles.listItem}>
                    - Các phòng máy được kết nối Intenet tốc độ cao đảm bảo cho việc giảng dạy, tổ chức kiểm tra và cho
                    thuê khi có yêu cầu.
                </Text>
            </View>
            <Image source={phongmay1} style={cardStyles.image} />
            <Image source={phongmay2} style={cardStyles.image} />
        </View>
    )
}

export default DichVu

const cardStyles = StyleSheet.create({
    container: {
        gap: 6,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: 'white',
        // backgroundColor: '#ffffff4f',
    },
    chuyenGiaRow: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 12,
    },
    chuyenGiaAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    content: {
        marginBottom: 12,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
        color: 'white',
    },
    divider: {
        width: '80%',
        borderTopColor: 'white',
        borderTopWidth: 1,
        alignSelf: 'center',
        marginVertical: 12,
    },
    listItem: {
        color: 'white',
        marginBottom: 4,
        textAlign: 'justify',
        lineHeight: 20,
    },
    image: {
        alignSelf: 'center',
        width: '90%',
        borderRadius: 20,
        height: 150,
        resizeMode: 'cover',
    },
})
