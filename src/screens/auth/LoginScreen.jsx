import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/auth/authApi';
import { setUser } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { loginSchema } from '../../validations/yupSchema';


const textInputWidth = Dimensions.get('window').width * 0.7



const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [triggerLogin, result] = useLoginMutation()
    const { message } = route.params || ""

    const dispatch = useDispatch()

    const onSubmit = () => {
        try {
            loginSchema.validateSync({ email, password })
            setErrorEmail("")
            setErrorPassword("")
            triggerLogin({ email, password })
        } catch (error) {
            switch (error.path) {
                case "email":
                    setErrorEmail(error.message)
                    break
                case "password":
                    setErrorPassword(error.message)
                    break
                default:
                    break
            }
        }
    }
    
    
    useEffect(()=>{
        if(result.status==="fulfilled"){
            dispatch(setUser({email: result.data.email, localId: result.data.localId}))
        }else if(result.status==="rejected"){
            setError("Hubo un error al iniciar sesión")
        }
    },[result])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rem Ecommerce</Text>
            <Text style={styles.subTitle}>Inicia sesión</Text>

            {message && <Text style={styles.message}>{message}</Text>}

            <View style={styles.inputContainer}>

                {error && <Text style={styles.error}>{error}</Text>}

                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.white}
                    placeholder="Email"
                    style={styles.textInput}
                />
                {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}

                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.white}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}

            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.remGreenLight
    },
    title: {
        color: colors.black,
        fontFamily: "PressStart2P",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.black,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.darkGray,
        width: textInputWidth,
        color: colors.white,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.white
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.black,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700'
    },
    error: {
        padding: 16,
        backgroundColor: colors.error,
        borderRadius: 8,
        color: colors.white
    },
    message: {
        padding: 16,
        backgroundColor: colors.success,
        borderRadius: 8,
        color: colors.white
    }
})