import React, { memo } from 'react'

import { Text, View, Image, StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
//@ts-ignore
import no_image from '@assets/images/survey_bg.jpg'
import { MoHinh as MoHinhType } from '@constants/KhaoSat/MoHinhType'
import { textStyles } from '@constants/Styles'
import { khaoSatStyles } from './khaoSatStyles'
type MoHinhProps = {
    data: MoHinhType
}

const MoHinh = ({ data }: MoHinhProps) => {
    return (
        <>
            <Text style={khaoSatStyles.title}>Mô hình đề xuất</Text>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={
                            data?.hinhAnh
                                ? {
                                      uri: data.hinhAnh,
                                  }
                                : no_image
                        }
                        style={styles.image}
                    />
                    <View style={styles.imageOverlay}>
                        <Text style={styles.title}>{data.tenMoHinh}</Text>
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={textStyles.longText}>{data.noiDung}</Text>
                </View>
            </View>
        </>
    )
}

export default memo(MoHinh)

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 8,
        backgroundColor: Colors.white,
        elevation: 6,
        marginHorizontal: 16,
        marginBottom: 12,
    },
    imageContainer: {},
    imageOverlay: {
        backgroundColor: '#000000aa',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 12,
    },
    title: {
        color: Colors.white,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    detailContainer: {
        backgroundColor: Colors.white,
        padding: 12,
    },
})
