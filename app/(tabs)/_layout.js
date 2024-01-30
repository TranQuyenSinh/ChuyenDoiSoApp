import Colors from '@constants/Colors'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: {
                    fontFamily: 'mon',
                    fontSize: 12,
                },
                tabBarStyle: {
                    height: 55,
                },
                headerTitleAlign: 'center',
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tin tức',
                    tabBarIcon: ({ color, size }) => <Ionicons name='newspaper-outline' color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name='survey'
                options={{
                    headerShown: false,
                    tabBarLabel: 'Đánh giá',
                    tabBarIcon: ({ color, size }) => <Ionicons name='reader-outline' color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name='inbox'
                options={{
                    tabBarLabel: 'Thông báo',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='notifications-outline' color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    tabBarLabel: 'Cài đặt',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Ionicons name='ios-settings-outline' color={color} size={size} />,
                }}
            />
        </Tabs>
    )
}
