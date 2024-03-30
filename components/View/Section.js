import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export const SettingSection = ({ title, children, contentStyles, containerStyles }) => {
    return (
        <View style={[{ padding: 16 }, containerStyles]}>
            <Text style={{ marginBottom: 12, fontSize: 15, fontWeight: '500' }}>{title}</Text>
            <View
                style={[
                    { backgroundColor: Colors.white, borderRadius: 6, elevation: 10, shadowColor: 'lightblue' },
                    contentStyles,
                ]}>
                {children}
            </View>
        </View>
    )
}

export const SettingSectionItem = ({ title, subTitle, onPress = () => {}, renderIcon }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {renderIcon && renderIcon()}
                <View>
                    <Text style={{ fontSize: 18 }}>{title}</Text>
                    {subTitle && <Text style={{ fontSize: 14, color: Colors.textGray }}>{subTitle}</Text>}
                </View>
            </View>
            <View>
                <Ionicons name='chevron-forward-outline' size={24} color={Colors.bodyText} />
            </View>
        </TouchableOpacity>
    )
}

export const SettingSectionItemSeperator = () => {
    return <View style={{ height: 1, backgroundColor: '#eeeeee' }} />
}
