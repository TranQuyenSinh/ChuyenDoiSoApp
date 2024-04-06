import Colors from '@constants/Colors'
import Constants from '@constants/Constants'
import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
    const { userProfile } = useSelector(state => state.user)
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors.primary,
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 10,
                    },
                    tabBarStyle: {
                        height: 60,
                    },
                    headerTitleAlign: 'center',
                }}>
                <Tabs.Screen
                    name='index'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Trang chủ',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <Ionicons name='home-sharp' color={color} size={size} />
                                    ) : (
                                        <Ionicons name='home-outline' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
                <Tabs.Screen
                    name='social'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Diễn đàn',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <Entypo name='network' color={color} size={size} />
                                    ) : (
                                        <Entypo name='network' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
                <Tabs.Screen
                    name='survey'
                    redirect={userProfile?.vaitro?.[0]?.id !== Constants.Role.DoanhNghiep}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Đánh giá',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <Ionicons name='reader-sharp' color={color} size={size} />
                                    ) : (
                                        <Ionicons name='reader-outline' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
                <Tabs.Screen
                    name='doanhnghiep'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Doanh nghiệp',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <FontAwesome name='building' size={size} color={color} />
                                    ) : (
                                        <FontAwesome name='building-o' size={size} color={color} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
                <Tabs.Screen
                    name='expert'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Chuyên gia',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <Ionicons name='people-sharp' color={color} size={size} />
                                    ) : (
                                        <Ionicons name='people-outline' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
                <Tabs.Screen
                    name='inbox'
                    redirect={userProfile?.vaitro?.[0]?.id !== Constants.Role.ChuyenGia}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Hỏi đáp',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <Ionicons name='chatbox-ellipses-sharp' color={color} size={size} />
                                    ) : (
                                        <Ionicons name='chatbox-ellipses-outline' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        tabBarLabel: 'Cá nhân',
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {userProfile?.image ? (
                                        <Image
                                            source={{ uri: userProfile?.image }}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 50,
                                            }}
                                        />
                                    ) : (
                                        <Ionicons name='settings-outline' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
            </Tabs>
        </>
    )
}
