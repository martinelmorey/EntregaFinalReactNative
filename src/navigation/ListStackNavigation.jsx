import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListScreen } from '../screens'
import Header from '../components/Header';

const Stack = createNativeStackNavigator();


export default function ListStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Lista'
            screenOptions={{
                header: ({ route }) => <Header title="Rem Ecommerce" subtitle={route.name} />
            }}
        >
            <Stack.Screen name="Lista" component={ListScreen} />
        </Stack.Navigator>
    );
}