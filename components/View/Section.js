import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export const SettingSection = ({ title, children, contentStyles, containerStyles }) => {
    return (
        <View style={[containerStyles]}>
            <Text
                style={{
                    marginBottom: 12,
                    marginTop: 16,
                    marginLeft: 16,
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'white',
                }}>
                {title}
            </Text>
            <View
                style={[
                    {
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 6,
                    },
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
                    <Text style={{ fontSize: 18, color: 'white' }}>{title}</Text>
                    {subTitle && <Text style={{ fontSize: 14, color: Colors.white }}>{subTitle}</Text>}
                </View>
            </View>
            <View>
                <Ionicons name='chevron-forward-outline' size={24} color={'white'} />
            </View>
        </TouchableOpacity>
    )
}

export const SettingSectionItemSeperator = () => {
    return <View style={{ height: 1, backgroundColor: 'grey' }} />
}
