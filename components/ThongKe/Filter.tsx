import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import { LoaiHinh } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getLoaiHinhDN } from '@services/doanhNghiepServices'
import { getLinhVucs } from '@services/tinTucServices'
import { HUYENS } from '@constants/Constants'
import { Dropdown } from 'react-native-element-dropdown'
import { Ionicons } from '@expo/vector-icons'
import RowComponent from '@components/View/RowComponent'

interface FilterProps {
    onChange: (loaiHinh?: number, huyen?: number) => void
}

const dropdownConfig: any = {
    style: { width: '100%', height: 20 },
    selectedTextProps: {
        numberOfLines: 1,
    },
    containerStyle: { width: 300 },
    search: false,
    placeholderStyle: { color: '#636363', fontSize: 14 },
    itemTextStyle: { color: '#636363', fontSize: 14 },
    selectedTextStyle: { fontSize: 14 },
    renderRightIcon: () => <Ionicons name='chevron-down-sharp' size={20} color={'#626262'} />,
    mode: 'modal',
}

const Filter = (props: FilterProps) => {
    const { onChange } = props
    const [loaiHinhs, setLoaiHinhs] = useState<LoaiHinh[]>([])
    const [loaiHinh, setLoaiHinh] = useState<LoaiHinh | undefined>()
    const [huyen, setHuyen] = useState<{ id: number; name: string }>()
    const [huyens, setHuyens] = useState<{ id?: number; name: string }[]>([])

    useEffect(() => {
        ;(async () => {
            const loahinhdata = await getLoaiHinhDN()
            setLoaiHinhs([{ id: undefined, tenLoaiHinh: 'Loại hình' }, ...loahinhdata])
            setHuyens([{ id: undefined, name: 'Huyện' }, ...HUYENS])
        })()
    }, [])

    useEffect(() => {
        onChange(loaiHinh?.id, huyen?.id)
    }, [loaiHinh, huyen])

    return (
        <RowComponent styles={styles.container} align='center' gap={10}>
            <View style={styles.item}>
                <Dropdown
                    data={loaiHinhs || []}
                    labelField={'tenLoaiHinh'}
                    valueField={'id'}
                    placeholder={'Loại hình'}
                    onChange={(item: LoaiHinh) => {
                        setLoaiHinh(item)
                    }}
                    {...dropdownConfig}
                />
            </View>
            <View style={styles.item}>
                <Dropdown
                    data={huyens || []}
                    labelField={'name'}
                    valueField={'id'}
                    placeholder={'Huyện'}
                    onChange={(item: { id: number; name: string }) => {
                        setHuyen(item)
                    }}
                    {...dropdownConfig}
                />
            </View>
        </RowComponent>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        paddingHorizontal: 12,
    },
    contentContainer: {
        alignItems: 'center',
        gap: 10,
        marginTop: 6,
        flexGrow: 0,
        paddingHorizontal: 8,
    },
    item: {
        flex: 1,
        borderRadius: 6,
        backgroundColor: '#77f2703d',
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 20,
        gap: 6,
        borderColor: '#29ff1eff',
        borderWidth: 1,
    },
})

export default Filter
