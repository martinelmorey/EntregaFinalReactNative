import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrdersScreen } from '../screens'
import Header from '../components/Header';

const Stack = createNativeStackNavigator();


export default function OrdersStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Pedidos'
            screenOptions={{
                header: ({ route }) => <Header title="Rem Ecommerce" subtitle={route.name} />
            }}
        >
            <Stack.Screen name="Pedidos" component={OrdersScreen} />
        </Stack.Navigator>
    );
}