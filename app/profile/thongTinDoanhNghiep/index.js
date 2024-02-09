import { useState, useLayoutEffect } from 'react'

import { ScrollView, View } from 'react-native'
import { useRouter, useNavigation } from 'expo-router'
import { StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import PageHeader from '@components/View/PageHeader'
import { defaultStyles } from '@constants/Styles'
import { SettingSection, SettingSectionItem } from '@components/View/Section'

const ThongTinDoanhNghiep = () => {
    const router = useRouter()
    const navigation = useNavigation()
    const [status, setStatus] = useState('idle')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
            presentation: 'modal',
        })
    }, [navigation])
    return (
        <View style={{ backgroundColor: Colors.background.default }}>
            <PageHeader title={'Thông tin doanh nghiệp'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <SettingSection containerStyles={{ paddingTop: 0 }}>
                    <SettingSectionItem
                        onPress={() => router.push('profile/thongTinDoanhNghiep/doanhNghiep')}
                        title={'Doanh nghiệp'}
                    />
                    <SettingSectionItem
                        onPress={() => router.push('profile/thongTinDoanhNghiep/nguoiDaiDien')}
                        title={'Người đại diện'}
                    />
                </SettingSection>
            </ScrollView>
        </View>
    )
}

export default ThongTinDoanhNghiep

const styles = StyleSheet.create({})
