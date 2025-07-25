import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../global/colors'
import { useEffect, useState } from 'react';
import { useSignupMutation } from '../../services/auth/authApi';

const textInputWidth = Dimensions.get('window').width * 0.7

const errorMessages = {
    "EMAIL_EXISTS": "El correo electrónico ya se encuentra registrado.",
    "WEAK_PASSWORD" : "La contraseña debe tener al menos 6 caracteres.",
    "MISSING_EMAIL": "Debes ingresar un correo electrónico.",
    "MISSING_PASSWORD" : "Debes ingresar una contraseña.",
    "PASSWORD_MISMATCH" : "Las contraseñas no coinciden",
    "INVALID_EMAIL": "El formato del correo electrónico no es válido.",
}

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const [triggerSignup, result] = useSignupMutation()

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!email) return errorMessages.MISSING_EMAIL;
        if (!emailRegex.test(email)) return errorMessages.INVALID_EMAIL;
        if (!password) return errorMessages.MISSING_PASSWORD;
        if (password.length < 6) return errorMessages.WEAK_PASSWORD;
        if (password !== confirmPassword) return errorMessages.PASSWORD_MISMATCH;
    
        return null; 
    }

    const onSubmit = ()=>{
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return; 
        }
        setError("");
        triggerSignup({email,password})
    }

    useEffect(()=>{
        if(result.status==="fulfilled"){
            navigation.navigate('Login')
        }else if(result.status==="rejected"){
            const errorCode = result.error.data.error.message
            const errorToShowMessage = errorMessages[errorCode] || "Ocurrió un error inesperado al registrarte."
            setError(errorToShowMessage)
        }
    },[result])

    return (
        <View style={styles.gradient}>
            <Text style={styles.title}>Rem Ecommerce</Text>
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.white}
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.white}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor={colors.white}
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
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

            {error ? <Text style={styles.error}>{error}</Text> : null}        

            <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>

        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.remGreenLight
    },
    title: {
        color: colors.remGreenLight,
        fontFamily: "PressStart2P",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.warning,
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
        padding:16,
        backgroundColor:colors.error,
        borderRadius:8,
        color: colors.white
    }
})