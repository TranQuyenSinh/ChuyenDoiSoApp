import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import { getLinhVucs } from '@services/tinTucServices'
import { Dropdown } from 'react-native-element-dropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { ROLES } from '@constants/Constants'
import IconButton from '@components/View/IconButton'
import { LoaiHinh } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { getLoaiHinhDN } from '@services/doanhNghiepServices'

export enum TopFilterSortTypes {
    DEFAULT = 'Không thứ tự',
    MUCDO = 'Mức độ sẵn sàng',
    NHUCAU = 'Có nhu cầu',
}

export type TopFilterSortType = keyof typeof TopFilterSortTypes

const SortData = [
    { id: 'DEFAULT', name: TopFilterSortTypes.DEFAULT },
    { id: 'MUCDO', name: TopFilterSortTypes.MUCDO },
    { id: 'NHUCAU', name: TopFilterSortTypes.NHUCAU },
]

interface TopFilterProps {
    onChangeLinhVuc?: (linhVuc: LinhVuc) => void
    onChangeLoaiHinh?: (loaiHinh: LoaiHinh) => void
    onChangeSearch?: (search: string) => void
    onChangeSort?: (sortType: TopFilterSortType) => void
}

const TopFilter = (props: TopFilterProps) => {
    const { onChangeLinhVuc, onChangeSearch, onChangeLoaiHinh, onChangeSort } = props
    const [search, setSearch] = useState('')
    const [linhVucs, setLinhVucs] = useState<LinhVuc[]>([])
    const [loaiHinhs, setLoaiHinhs] = useState<LoaiHinh[]>([])

    useEffect(() => {
        ;(async () => {
            const data = await getLinhVucs()
            setLinhVucs([{ id: '', tenLinhVuc: 'Tất cả lĩnh vực' }, ...data])
            const loahinhdata = await getLoaiHinhDN()
            setLoaiHinhs([{ id: 0, tenLoaiHinh: 'Tất cả ngành nghề' }, ...loahinhdata])
        })()
    }, [])

    const handleResetSearch = () => {
        setSearch('')
        onChangeSearch?.('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <FontAwesome5 name='filter' size={16} color={'#333b42'} />
                <ScrollView
                    style={{ flexGrow: 0 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.item}>
                        <Dropdown
                            style={{ width: '100%', height: 20 }}
                            selectedTextProps={{
                                numberOfLines: 1,
                            }}
                            containerStyle={{ width: 200 }}
                            data={linhVucs || []}
                            search={false}
                            placeholderStyle={{ color: '#636363', fontSize: 14 }}
                            itemTextStyle={{ color: '#636363', fontSize: 14 }}
                            selectedTextStyle={{ fontSize: 14 }}
                            maxHeight={300}
                            labelField={'tenLinhVuc'}
                            valueField={'id'}
                            placeholder={'Lĩnh vực'}
                            renderRightIcon={() => <Ionicons name='chevron-down-sharp' size={20} color={'#626262'} />}
                            onChange={(item: LinhVuc) => {
                                onChangeLinhVuc?.(item)
                            }}
                            mode={'modal'}
                        />
                    </View>
                    <View style={styles.item}>
                        <Dropdown
                            style={{ width: '100%', height: 20 }}
                            selectedTextProps={{
                                numberOfLines: 1,
                            }}
                            containerStyle={{ width: 300 }}
                            data={loaiHinhs || []}
                            search={false}
                            placeholderStyle={{ color: '#636363', fontSize: 14 }}
                            itemTextStyle={{ color: '#636363', fontSize: 14 }}
                            selectedTextStyle={{ fontSize: 14 }}
                            maxHeight={300}
                            labelField={'tenLoaiHinh'}
                            valueField={'id'}
                            placeholder={'Ngành nghề'}
                            renderRightIcon={() => <Ionicons name='chevron-down-sharp' size={20} color={'#626262'} />}
                            onChange={(item: LoaiHinh) => {
                                onChangeLoaiHinh?.(item)
                            }}
                            mode={'modal'}
                        />
                    </View>
                    <View style={styles.item}>
                        <Dropdown
                            style={{ width: '100%', height: 20 }}
                            selectedTextProps={{
                                numberOfLines: 1,
                            }}
                            containerStyle={{ width: 200 }}
                            data={SortData || []}
                            search={false}
                            placeholderStyle={{ color: '#636363', fontSize: 14 }}
                            itemTextStyle={{ color: '#636363', fontSize: 14 }}
                            selectedTextStyle={{ fontSize: 14 }}
                            maxHeight={300}
                            labelField={'name'}
                            valueField={'id'}
                            placeholder={'Sắp xếp'}
                            renderRightIcon={() => <Ionicons name='chevron-down-sharp' size={20} color={'#626262'} />}
                            onChange={(item: any) => {
                                console.log('🚀 ~ item: ', item)
                                onChangeSort?.(item?.id)
                            }}
                            mode={'modal'}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name='search-sharp' size={20} color={'#626262'} />
                <TextInput
                    style={styles.input}
                    value={search}
                    onChangeText={t => {
                        setSearch(t)
                        onChangeSearch?.(t)
                    }}
                    placeholder='Tên doanh nghiệp, đại diện'
                    clearButtonMode='while-editing'
                    cursorColor={'#626262'}
                />
                {search && (
                    <IconButton onPress={handleResetSearch}>
                        <Ionicons name='close-circle-sharp' size={16} color={'#626262'} />
                    </IconButton>
                )}
            </View>
        </View>
    )
}

export default TopFilter

const styles = StyleSheet.create({
    container: {
        flexGrow: 0,
        backgroundColor: 'white',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
    },
    contentContainer: {
        alignItems: 'center',
        gap: 6,
        marginTop: 6,
        flexGrow: 0,
    },
    item: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        paddingVertical: 3,
        paddingHorizontal: 12,
        gap: 6,
    },
    text: {
        color: '#787c7e',
    },
    searchContainer: {
        paddingVertical: 3,
        paddingHorizontal: 12,
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#f8f8f8',
        overflow: 'hidden',
        marginHorizontal: 12,
        marginVertical: 6,
    },
    input: {
        flex: 1,
    },
})
