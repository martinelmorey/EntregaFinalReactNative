import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator, ScrollView } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { usePutProfilePictureMutation } from '../../services/user/userApi';
import { userApi } from '../../services/user/userApi';
import { setProfilePicture } from '../../features/user/userSlice';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSQLiteContext } from 'expo-sqlite';
import { clearUser } from '../../features/user/userSlice';
import { Ionicons } from 'react-native-vector-icons';
import Toast from 'react-native-toast-message';



const ProfileScreen = () => {
    const db = useSQLiteContext()
    const user = useSelector(state => state.userReducer.userEmail)
    const localId = useSelector(state => state.userReducer.localId)
    const image = useSelector(state => state.userReducer.profilePicture)
    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()
    const [location, setLocation] = useState(null)
    const [locationLoaded, setLocationLoaded] = useState(false)
    const [address, setAddress] = useState("")

    const dispatch = useDispatch()

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        });


        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            dispatch(setProfilePicture(imgBase64))
            triggerPutProfilePicture({ localId: localId, image: imgBase64 })
        }
    };

    const logout = async () => {
        try {
            const result = await db.runAsync('DELETE FROM sessions WHERE localId = $localId', {$localId: localId})
            dispatch(userApi.util.resetApiState())
            dispatch(clearUser())
        } catch (error) {
            //console.log("Error cerrando sesion", error)
            Toast.show({
                type: 'error',
                text1: 'Hubo un error cerrando sesion',
                position: 'top',
            })
        }
    }

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setLocationLoaded(true);
                    return;
                }


                let location = await Location.getCurrentPositionAsync({});
                if (location) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_GMAPS_API_KEY}`
                    );
                    const data = await response.json()
                    setAddress(data.results[0].formatted_address)
                    setLocation(location);
                }
            } catch (error) {
                //console.log("Error al obtener la ubicación:", error);
                Toast.show({
                    type: 'error',
                    text1: 'Hubo un error obteniendo la ubicación',
                    position: 'top',
                })
            } finally {
                setLocationLoaded(true);
            }
        }

        getCurrentLocation();
    }, []);

    return (
            <ScrollView contentContainerStyle={styles.profileContainer}>
                <View style={styles.imageProfileContainer}>
                    {
                        image
                            ?
                            <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                            :
                            <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                    }
                    <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                        <CameraIcon />
                    </Pressable>
                </View>
                <Text style={styles.profileData}>Email: {user}</Text>
                <View style={styles.titleContainer}>
                    <Text>Mi ubicación:</Text>
                </View>
                <View style={styles.mapContainer}>
                    {
                        location
                            ?
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker coordinate={{ "latitude": location.coords.latitude, "longitude": location.coords.longitude }} title={"Usuario"} />
                            </MapView>
                            :
                            (
                                locationLoaded
                                    ?
                                    <Text>Hubo un problema al obtener la ubicación</Text>
                                    :
                                    <ActivityIndicator />
                            )

                    }

                </View>
                <View style={styles.placeDescriptionContainer}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.address}>{address || ""}</Text>
                    </View>
                </View>
                <Pressable onPress={logout} style={({pressed}) => [{opacity: pressed ? 0.9 : 1}, styles.logoutButton]}>
                    <Ionicons name="log-out-outline" size={24} color={styles.logoutText.color || "white"} />
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </Pressable>
            </ScrollView>
        )
}

export default ProfileScreen

const styles = StyleSheet.create({
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        padding: 12,
        borderRadius: 10,
        marginTop: 30,
        width: '80%',
        alignSelf: 'center'
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8
    },
    profileContainer: {
        flexGrow: 1,        // Permite que el contenido se estire si no hay mucho texto
        paddingTop: 50,
        paddingBottom: 100,
        alignItems: 'center',
        width: '100%',
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.remGreenLight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.white,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    mapContainer: {
        width: '80%',
        height: 240,
        overflow: "hidden",
        elevation: 5,
        marginBottom: 16
    },
    map: {
        height: 240,
    },
    mapTitle: {
        fontWeight: '700'
    },
    placeDescriptionContainer: {
        flexDirection: 'row',
        gap: 16
    },
    addressContainer: {
        width: '80%',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    address: {
        fontSize: 12,
        fontWeight: 'bold'
    }   
})