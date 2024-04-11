import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { pagerStyles } from './pagerStyles'

const NhiemVu = () => {
    return (
        <View collapsable={false} style={pagerStyles.pageContainer}>
            <Text style={pagerStyles.pageTitle}>Về Trung tâm Tin học ICT</Text>
            <Text style={pagerStyles.text}>
                Trung tâm Tin học là đơn vị chuyên trách quản lý và cung cấp các dịch vụ về công nghệ thông tin của
                Trường Đại học An Giang.
            </Text>
            <Text style={pagerStyles.text}>
                Trung tâm có chức năng nghiên cứu, tư vấn và triển khai các giải pháp công nghệ thông tin cho các đơn vị
                trong và ngoài Trường.
            </Text>
            <Text style={pagerStyles.text}>
                Với một tập thể có trình độ chuyên môn cao, giàu năng lực và kinh nghiệm, Trung tâm đã giúp Nhà trường
                xây dựng hệ thống mạng thông tin với băng thông tối thiểu là 1 Gigabit và hệ thống Data Center hiện đại
                được vận hành ổn định 24/24.
            </Text>
            <Text style={pagerStyles.pageTitle}>Nhiệm vụ</Text>
            <Text style={pagerStyles.text}>
                Về hoạt động dịch vụ, Trung tâm Tin học thường xuyên tổ chức đào tạo và kiểm tra cấp chứng chỉ Ứng dụng
                Công nghệ Thông tin Cơ bản, Chứng chỉ Ứng dụng Công nghệ Thông tin Nâng cao, và các lớp chuyên đề (Quản
                trị mạng, Thiết kế & Lập trình web, Lắp ráp & Cài đặt máy tính). Ngoài ra, Trung tâm còn mở các lớp đào
                tạo tin học theo yêu cầu và thực hiện các hợp đồng: bảo trì, sửa chữa, phục hồi dữ liệu máy tính; tư
                vấn, thiết kế, triển khai và bảo trì hệ thống mạng; thiết kế website, phát triển phần mềm; tư vấn về
                lĩnh vực dự án đầu tư, ...
            </Text>
        </View>
    )
}

export default NhiemVu
