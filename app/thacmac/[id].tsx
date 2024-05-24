import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import PageHeader from '@components/View/PageHeader'
import { appImages } from '@constants/Images'
import BackgroundImage from '@components/View/BackgroundImage'
import { useAppSelector } from '@redux/store'

const ChiTietThacMac = () => {
    const { thacMac } = useAppSelector(state => state.thacMac)
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar backgroundColor='transparent' />
            {/* Top */}
            <View>
                <BackgroundImage blurRadius={7} source={appImages.thacmac_bg} />
                <PageHeader title='' tintColor='white' />
                <View style={topStyles.titleContainer}>
                    <Text style={topStyles.title}>Giải đáp thắc mắc</Text>
                </View>
            </View>

            <ScrollView>
                <Text style={styles.title}>Câu hỏi:</Text>
                <Text style={styles.description}>{thacMac?.noiDung}</Text>

                <Text style={styles.title}>Trả lời:</Text>
                {thacMac?.ngayTraLoi ? (
                    <Text style={styles.description}>{thacMac?.traLoi}</Text>
                ) : (
                    <Text style={styles.description}>Đang chờ trả lời</Text>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        margin: 16,
    },
    description: {
        marginHorizontal: 16,
        marginBottom: 16,
        lineHeight: 20,
    },
})

const topStyles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 16,
        gap: 10,
        paddingVertical: 24,
    },
    title: {
        color: 'white',
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: 24,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 4 },
    },
})

export default ChiTietThacMac
