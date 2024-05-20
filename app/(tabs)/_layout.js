import { Tabs } from 'expo-router'

import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import Colors from '@constants/Colors'


export default function TabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors.default,
                    tabBarInactiveTintColor: '#aaa',
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                    tabBarStyle: {
                        height: 60,
                        backgroundColor: 'white',
                        elevation: 0,
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        right: 10,
                        borderRadius: 30,
                        elevation: 20,
                        padding: 10,
                        paddingBottom: 6
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
                                        <Ionicons name='home-sharp' color={color} size={20} />
                                    ) : (
                                        <Ionicons name='home-outline' color={color} size={20} />
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
                        tabBarLabel: 'Thành viên',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <Ionicons name='grid-sharp' size={20} color={color} />
                                    ) : (
                                        <Ionicons name='grid-outline' size={20} color={color} />
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
                                        <Entypo name='network' color={color} size={20} />
                                    ) : (
                                        <Entypo name='network' color={color} size={20} />
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
                                    {focused ? (
                                        <FontAwesome5 name='user-alt' size={20} color={color} />
                                    ) : (
                                        <FontAwesome5 name='user' size={20} color={color} />
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
