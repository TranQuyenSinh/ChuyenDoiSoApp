import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ConversationItemProps {
    propName: string
}

const ConversationItem = (props: ConversationItemProps) => {
    const { propName } = props
    return (
        <View style={styles.container}>
            <Text>ConversationItem</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default ConversationItem
