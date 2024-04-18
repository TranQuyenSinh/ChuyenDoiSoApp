import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export const SettingSection = ({ title, children, contentStyles, containerStyles }) => {
    return (
        <View style={[containerStyles, { marginHorizontal: 16, elevation: 20 }]}>
            <Text
                style={{
                    marginBottom: 10,
                    marginTop: 16,
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'white',
                }}>
                {title}
            </Text>
            <View
                style={[
                    {
                        backgroundColor: 'rgba(255,255,255,1)',
                        borderRadius: 6,
                    },
                    contentStyles,
                ]}>
                {children}
            </View>
        </View>
    )
}

export const SettingSectionItem = ({ title, subTitle, onPress = () => { }, renderIcon }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {renderIcon && renderIcon()}
                <View>
                    <Text style={{ fontSize: 18, color: Colors.bodyText }}>{title}</Text>
                    {subTitle && <Text style={{ fontSize: 14, color: Colors.bodyText }}>{subTitle}</Text>}
                </View>
            </View>
            <View>
                <Ionicons name='chevron-forward-outline' size={20} color={'grey'} />
            </View>
        </TouchableOpacity>
    )
}

export const SettingSectionItemSeperator = () => {
    return <View style={{ height: 1, backgroundColor: 'lightgrey', width: '90%', alignSelf: 'center' }} />
}
