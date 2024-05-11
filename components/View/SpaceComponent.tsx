import { View } from 'react-native'
import React from 'react'

interface Props {
    width?: number
    height?: number
}

const SpaceComponent = (props: Props) => {
    const { width = 6, height = 6 } = props

    return (
        <View
            style={{
                width,
                height,
            }}
        />
    )
}

export default SpaceComponent
