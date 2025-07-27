import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Image } from 'react-native'
import { colors } from '../../global/colors'
import { useEffect, useState } from 'react';
import { useSignupMutation } from '../../services/auth/authApi';
import { signupSchema } from '../../validations/yupSchema';
import {LinearGradient} from 'expo-linear-gradient'
import AnimatedError from '../../components/AnimatedError';



const textInputWidth = Dimensions.get('window').width * 0.7


const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [triggerSignup, result] = useSignupMutation()

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (result.status === "fulfilled") {
            console.log("Usuario creado exitosamente")
            navigation.navigate("Login", { message: "Usuario creado con éxito" })
        } else if(result.status === "rejected") {
            setError("Hubo un error al crear el usuario")
        }
        //console.log(result)
    }, [result])

    const onSubmit = () => {
        try {
            signupSchema.validateSync({ email, password, confirmPassword })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            triggerSignup({ email, password })
        } catch (error) {
            switch (error.path) {
                case "email":
                    setErrorEmail(error.message)
                    break
                case "password":
                    setErrorPassword(error.message)
                    break
                case "confirmPassword":
                    setErrorConfirmPassword(error.message)
                    break
                default:
                    break
            }
        }
    }

    return (
        <LinearGradient
        colors={[colors.black, colors.remGreenLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
        >
            <AnimatedError message={error} />

            <Image 
                source={require('../../../assets/logo_rem.png')} 
                style={styles.logo} 
                resizeMode="contain"
            />
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>

                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.darkGray}
                    placeholder="Email"
                    style={styles.textInput}
                />
                {(errorEmail && !errorPassword) && <AnimatedError message={errorEmail} />}

                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.darkGray}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorPassword && <AnimatedError message={errorPassword} />}

                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor={colors.darkGray}
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorConfirmPassword && <AnimatedError message={errorConfirmPassword} />}

            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>

        </LinearGradient>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 18,
        color: colors.white,
        fontWeight: '700',
        letterSpacing: 3
    },
    logo:{
        width:150,
        height:150
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
        borderRadius: 5,
        backgroundColor: colors.white,
        width: textInputWidth,
        color: colors.black,
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
        borderRadius: 5,
        marginTop: 32
    },
    btnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '500'
    }
})