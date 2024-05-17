import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { useNavigation } from 'expo-router'
import DoanhNghiepCard from '@components/TuVan/DoanhNghiepCard'
import TopFilter, { TopFilterSortType } from '@components/TuVan/TopFilter'
import { LinhVuc } from '@constants/CommonTypes/LinhVucType'
import { DoanhNghiep, LoaiHinh } from '@constants/DoanhNghiep/DoanhNghiepTypes'
import { timKiemDNTuVan } from '@services/hoiDapServices'
import Loading from '@components/StatusPage/Loading'
import { getDoanhNghieps } from '@services/doanhNghiepServices'

const TuVanDoanhNghiep = () => {
    const navigation = useNavigation()
    const [selectedLinhVuc, setSelectedLinhVuc] = useState<LinhVuc>()
    const [selectedLoaiHinh, setSelectedLoaiHinh] = useState<LoaiHinh>()
    const [search, setSearch] = useState('')
    const [data, setData] = useState<DoanhNghiep[]>([])
    const [loading, setLoading] = useState(false)
    const [filterData, setFilterData] = useState<DoanhNghiep[]>([])
    const [selectedSortType, setSelectedSortType] = useState<TopFilterSortType>()
    const scrollRef = useRef<FlatList>(null)
    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const result = await getDoanhNghieps()
            setData(result)
            setLoading(false)
        })()
    }, [])

    useLayoutEffect(() => {
        let filter = data?.slice?.() || []
        if (selectedLinhVuc?.id) {
            filter = filter.filter(item => item.linhVuc?.id === selectedLinhVuc.id)
        }
        if (selectedLoaiHinh?.id) {
            filter = filter.filter(item => item.loaiHinh?.id === selectedLoaiHinh.id)
        }
        if (search) {
            filter = filter.filter(
                item =>
                    item.tenTiengViet?.toLowerCase().includes(search.toLowerCase()) ||
                    item.daiDien?.tenDaiDien?.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (selectedSortType === 'MUCDO') {
            filter = filter
                .filter(x => x.khaoSat?.[0]?.mucDo)
                .sort((a, b) => (a?.khaoSat?.[0]?.mucDo?.id || 1) - (b?.khaoSat?.[0]?.mucDo?.id || 0))
        } else if (selectedSortType === 'NHUCAU') {
            filter = filter.filter(x => x.nhuCau?.length !== 0)
        }

        setFilterData(filter)
        scrollRef.current?.scrollToOffset({ animated: false, offset: 0 })
    }, [data, search, selectedLinhVuc, selectedLoaiHinh, selectedSortType])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Tư vấn doanh nghiệp',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: 'white',
            },
            headerShadowVisible: false,
            headerTintColor: '#323b43',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <TopFilter
                onChangeLinhVuc={setSelectedLinhVuc}
                onChangeSearch={setSearch}
                onChangeLoaiHinh={setSelectedLoaiHinh}
                onChangeSort={setSelectedSortType}
            />
            {loading && <Loading />}
            <FlatList
                ref={scrollRef}
                data={filterData}
                initialNumToRender={7}
                contentContainerStyle={{ marginTop: 12, paddingBottom: 12 }}
                renderItem={({ item }) => <DoanhNghiepCard data={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default TuVanDoanhNghiep

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
