import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Image } from 'react-native'
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/auth/authApi';
import { setUser } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { loginSchema } from '../../validations/yupSchema';
import {useSQLiteContext} from 'expo-sqlite';
import {LinearGradient} from 'expo-linear-gradient'
import AnimatedError from '../../components/AnimatedError';


const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation, route }) => {
    const db = useSQLiteContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [triggerLogin, result] = useLoginMutation()
    const { message } = route.params || ""
    const dispatch = useDispatch()

    useEffect(()=>{
        async function setup(){
            const sessions = await db.getAllSync('SELECT * FROM sessions LIMIT 1')
            const session = sessions[0]
            if(session.email){
                dispatch(setUser({email: session.email, localId: session.localId}))
            }
        }
        setup()
    },[])

    const saveUserInDB = async (email, localId) => {
        try {
            if (!db) {
                //console.log("Base de datos no inicializada")
                return
            }
            
            if (!db.runAsync) {
                if (db.exec) {
                    await db.exec(`INSERT INTO sessions (email, localId) VALUES ('${email}', '${localId}')`)
                    return
                }
            } else {
                const result = await db.runAsync('INSERT INTO sessions (email, localId) VALUES (?, ?)', email, localId)
                //console.log("Usuario guardado en DB", result)
            }
        } catch (error) {
            //console.log("Error guardando usuario en DB", error)
        }
    }

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
        async function saveUser(){
            if(result.status==="fulfilled"){
                dispatch(setUser({email: result.data.email, localId: result.data.localId}))
                saveUserInDB(result.data.email, result.data.localId)
            }else if(result.status==="rejected"){
                setError("Hubo un error al iniciar sesión")
            }
        }
        saveUser()
    },[result])


    return (
        <LinearGradient
        colors={[colors.black, colors.remGreenLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
        >
            <Image 
                source={require('../../../assets/logo_rem.png')} 
                style={styles.logo} 
                resizeMode="contain"
            />
            <Text style={styles.subTitle}>Inicia sesión</Text>

            {message && <Text style={styles.message}>{message}</Text>}

            <View style={styles.inputContainer}>

                <AnimatedError message={error} />

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
        </LinearGradient>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width:150,
        height:150
    },
    subTitle: {
        fontSize: 18,
        color: colors.white,
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
        borderRadius: 5,
        backgroundColor: colors.white,
        width: textInputWidth,
        color: colors.darkGray,
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
    },
    message: {
        padding: 16,
        backgroundColor: colors.success,
        borderRadius: 8,
        color: colors.white
    }
})