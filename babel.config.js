module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // Required for expo-router
            'expo-router/babel',
            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './components',
                        '@constants': './constants',
                        '@context': './context',
                        '@hooks': './hooks',
                        '@services': './services',
                        '@styles': './styles',
                        '@utils': './utils',
                        '@assets': './assets',
                        '@redux': './redux',
                        '@validateSchemas': './validateSchemas',
                        '@configs': './configs',
                    },
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            ],
        ],
    }
}
