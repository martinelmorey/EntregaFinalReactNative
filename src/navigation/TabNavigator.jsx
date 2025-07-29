import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNavigator from './ShopStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import ListStackNavigator from './ListStackNavigation';
import OrdersStackNavigator from './OrdersStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
//Puedo utilizar acá también el barrel (index.js)
import Icon from 'react-native-vector-icons/Feather'
import { colors } from '../global/colors';
import { useWindowDimensions } from 'react-native';
import { useEffect,useState } from 'react';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const [isLargeScreeen,setIsLargeScreen] = useState(null)

    const {width,height} = useWindowDimensions()
    //console.log(isLargeScreeen)

    useEffect(()=>{
        if(width>height){
            setIsLargeScreen(true)
        }else{
            setIsLargeScreen(false)
        }
    },[width])

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle:styles.tabBar
            }}
        >
            <Tab.Screen
                name="Shop"
                component={ShopStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => <Icon name="shopping-bag" size={22} color={focused?colors.white:colors.mediumGray} />
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => <Icon name="shopping-cart" size={22} color={focused?colors.white:colors.mediumGray} />
                }}
            />
            <Tab.Screen
                name="List"
                component={ListStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => <Icon name="heart" size={22} color={focused?colors.white:colors.mediumGray} />
                }}
                />
            <Tab.Screen
                name="Orders"
                component={OrdersStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => <Icon name="tablet" size={22} color={focused?colors.white:colors.mediumGray} />
                }}
                />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => <Icon name="user" size={22} color={focused?colors.white:colors.mediumGray} />
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar:{
        backgroundColor:colors.black,
        height:80
    }
})