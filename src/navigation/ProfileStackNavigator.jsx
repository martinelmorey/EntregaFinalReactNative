import ProfileScreen from '../screens/user/ProfileScreen';
import Header from '../components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Perfil'
            screenOptions={{
                header: ({route})=><Header title="Rem Ecommerce" subtitle={route.name}  />
            }}
        >
            <Stack.Screen name="Perfil" component={ProfileScreen} />
        </Stack.Navigator>
    );
}