import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Colors from '@constants/Colors'
import { router, useNavigation } from 'expo-router'
//@ts-ignore
import background from '@assets/backgrounds/nhucau.jpg'
//@ts-ignore
import complete from '@assets/images/complete.jpg'
import BackgroundImage from '@components/View/BackgroundImage'
import CheckBox from 'react-native-check-box'
import Button from '@components/View/Button'
import { toast } from '@utils/toast'
import IconButton from '@components/View/IconButton'
import { AntDesign } from '@expo/vector-icons'
import { createNhuCau } from '@services/doanhNghiepServices'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import RequireLogin from '@components/StatusPage/RequireLogin'
import { useDangNhap } from '@hooks/useDangNhap'
import { ROLES } from '@constants/Constants'
import NotFound from '@components/StatusPage/NotFound'

const GIAI_PHAPS = [
    { id: 1, name: 'Ứng dụng quản lý kho bãi' },
    { id: 2, name: 'Ứng dụng quản lý sản xuất' },
    { id: 3, name: 'Ứng dụng quản lý khách hàng CRM' },
    { id: 4, name: 'Ứng dụng quản lý bán hàng' },
    { id: 5, name: 'Ứng dụng quản lý nhân viên kinh doanh (Sale)' },
    { id: 6, name: 'Ứng dụng quản lý giao nhận, vận chuyến' },
    { id: 7, name: 'Ứng dụng kế toán tài chính, thu chi, công nợ' },
    { id: 8, name: 'Ứng dụng quản lý nhân sự' },
    { id: 9, name: 'Ứng dụng quản lý tài sản' },
    { id: 10, name: 'Ứng dụng quản lý văn bản' },
    { id: 11, name: 'Ứng dụng quản lý dự án' },
    { id: 12, name: 'Khác' },
]

const CAI_THIENS = [
    { id: 1, name: 'Tăng doanh thu' },
    { id: 2, name: 'Giảm chi phí sản xuất, giảm chi phí quản lý, giải chi phí marketing tìm kiếm khách hàng' },
    { id: 3, name: 'Tăng khách hàng mới, chăm sóc và khai thác tốt hơn đối với khách hàng cũ' },
    { id: 4, name: 'Hỗ trợ quản lý trong doanh nghiệp chặt chẽ, báo cáo số liệu tức thời, chính xác' },
    { id: 5, name: 'Tăng năng suất và hiệu làm việc của nhân viên' },
    { id: 6, name: 'Tăng khả năng tương tác trong nội bộ' },
    { id: 7, name: 'Khác' },
]

const NhuCau = () => {
    const navigation = useNavigation()
    const [giaiPhap, setGiaiPhap] = useState<typeof GIAI_PHAPS>([])
    const [caiThien, setCaiThien] = useState<typeof CAI_THIENS>([])
    const [giaiPhapText, setGiaiPhapText] = useState('')
    const [caiThienText, setCaiThienText] = useState('')
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const { isInRole } = useDangNhap()
    const [isComplete, setIsComplete] = useState(false)
    const onClickQuestion = () => {
        Alert.alert(
            'Hướng dẫn',
            `Chọn các giải pháp CNTT mà bạn quan tâm, nếu không có trong danh sách, vui lòng chọn 'Khác' và điền vào ô bên dưới.
            \nSau khi gửi nhu cầu của bạn, chuyên gia sẽ xem xét và liên hệ với bạn sớm nhất.`,
            [{ text: 'Đóng', onPress: () => {} }],
            { cancelable: true }
        )
    }
    const onClickGiaiPhap = (item: any) => {
        const index = giaiPhap?.findIndex(x => x.id === item.id)
        if (index !== -1) {
            setGiaiPhap(giaiPhap?.filter(x => x.id !== item.id))
        } else {
            setGiaiPhap([...(giaiPhap || []), item])
        }
    }
    const onClickCaiThien = (item: any) => {
        const index = caiThien?.findIndex(x => x.id === item.id)
        if (index !== -1) {
            setCaiThien(caiThien?.filter(x => x.id !== item.id))
        } else {
            setCaiThien([...(caiThien || []), item])
        }
    }
    const validate = () => {
        if (giaiPhap.length === 0) {
            toast('Vui lòng chọn ít nhất 1 giải pháp bạn quan tâm')
            return false
        }
        if (caiThien.length === 0) {
            toast('Vui lòng chọn ít nhất 1 mặt bạn muốn cải thiện')
            return false
        }
        return true
    }
    const handleSubmit = async () => {
        if (!validate()) return
        const data = {
            giaiPhap:
                giaiPhap
                    .filter(x => x.name !== 'Khác')
                    .map(x => x.name)
                    .join('; ') + (giaiPhap.some(x => x.name === 'Khác') ? `; ${giaiPhapText}` : ''),
            caiThien:
                caiThien
                    .filter(x => x.name !== 'Khác')
                    .map(x => x.name)
                    .join('; ') + (caiThien.some(x => x.name === 'Khác') ? `; ${caiThienText}` : ''),
        }
        const result = await createNhuCau(data.giaiPhap, data.caiThien)
        if (result) {
            setIsComplete(true)
        } else {
            toast('Gửi nhu cầu thất bại')
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Nhu cầu của bạn',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerTintColor: 'white',
            headerRight: () => (
                <IconButton>
                    <AntDesign onPress={onClickQuestion} name='questioncircleo' color={'white'} size={24} />
                </IconButton>
            ),
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <BackgroundImage source={background} />
            {!isLoggedIn && <RequireLogin tintColor='white' />}
            {isLoggedIn && !isInRole(ROLES.DOANH_NGHIEP) && <NotFound message='Bạn không phải doanh nghiệp' />}

            {isLoggedIn && isInRole(ROLES.DOANH_NGHIEP) && !isComplete && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.form}
                    contentContainerStyle={{ paddingBottom: 30 }}>
                    <Text style={styles.label}>Bạn quan tâm đến giải pháp CNTT nào dưới đây:</Text>
                    <View style={{ paddingHorizontal: 6, gap: 8, marginBottom: 24 }}>
                        {GIAI_PHAPS.map(item => (
                            <CheckBox
                                key={item.id}
                                leftTextStyle={{ color: '#333333' }}
                                isChecked={giaiPhap?.some(x => x.id === item.id) || false}
                                onClick={() => onClickGiaiPhap(item)}
                                checkBoxColor={Colors.default}
                                leftText={item.name}
                            />
                        ))}
                        <TextInput
                            value={giaiPhapText}
                            onChangeText={t => setGiaiPhapText(t)}
                            editable={giaiPhap.some(x => x.name === 'Khác')}
                            placeholder='Giải pháp bạn quan tâm...'
                            style={styles.input}
                        />
                    </View>
                    <Text style={styles.label}>Bạn mong muốn Chuyển đổi số sẽ cải thiện mặt nào của Doanh nghiệp:</Text>
                    <View style={{ paddingHorizontal: 6, gap: 8, marginBottom: 24 }}>
                        {CAI_THIENS.map(item => (
                            <CheckBox
                                key={item.id}
                                leftTextStyle={{ color: '#333333' }}
                                isChecked={caiThien?.some(x => x.id === item.id) || false}
                                onClick={() => onClickCaiThien(item)}
                                checkBoxColor={Colors.default}
                                leftText={item.name}
                            />
                        ))}
                        <TextInput
                            value={caiThienText}
                            onChangeText={t => setCaiThienText(t)}
                            editable={caiThien.some(x => x.name === 'Khác')}
                            placeholder='Hoạt động bạn muốn cải thiện...'
                            style={styles.input}
                        />
                    </View>
                    <Button btnStyles={{ borderRadius: 30 }} text='Gửi nhu cầu' onPress={handleSubmit} />
                </ScrollView>
            )}

            {isComplete && (
                <View style={[styles.form, styles.completeContainer]}>
                    <Image source={complete} style={styles.image} />
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
                        Gửi nhu cầu thành công
                    </Text>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                        Chuyên gia sẽ liên hệ với bạn trong thời gian sớm nhất
                    </Text>
                    <Button text='Về màn hình chính' onPress={() => router.back()} btnStyles={{ borderRadius: 30 }} />
                </View>
            )}
        </View>
    )
}

export default NhuCau

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        backgroundColor: 'rgba(255,255,255,1)',
        marginHorizontal: 24,
        marginVertical: 12,
        padding: 16,
        borderRadius: 12,
        elevation: 10,
    },
    label: {
        fontStyle: 'italic',
        marginBottom: 6,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    completeContainer: {
        alignItems: 'center',
        gap: 6,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
})
