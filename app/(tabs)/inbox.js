import { ValidateDropdownComponent } from '@components/Input/Dropdown'
import TextInputBox, { ValidateInputBox } from '@components/Input/InputBox'
import { loginValidationSchema } from '@validateSchemas/registerValidate'
import { Field, Formik } from 'formik'
import { Button } from 'react-native'
import { StyleSheet, TextInput } from 'react-native'

import { Text, View } from 'react-native'
const data = [
    { label: '', value: '' },
    { label: 'An Giang', value: 'An Giang' },
    { label: 'Vĩnh Long', value: 'Vĩnh Long' },
]
const Page = () => {
    return (
        <View style={styles.container}>
            <Formik
                onSubmit={values => console.log(values)}
                initialValues={{ linhVuc: '' }}
                validationSchema={loginValidationSchema}>
                {({ handleSubmit, isValid, values }) => (
                    <>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Field
                                containerStyles={{ width: 300 }}
                                data={data}
                                component={ValidateDropdownComponent}
                                name='linhVuc'
                                placeholder='Aa'
                                label={'Lĩnh vực'}
                            />
                        </View>
                        <Button onPress={handleSubmit} title='LOGIN' disabled={!isValid} />
                    </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {},
    errorText: {
        fontSize: 10,
        color: 'red',
    },
})

export default Page
