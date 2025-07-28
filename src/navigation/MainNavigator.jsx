import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import TabNavigator from "./TabNavigator";
import { useSelector,useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/user/userApi";
import { setProfilePicture } from "../features/user/userSlice";
import { useEffect } from "react";

export default function MainNavigator() {
    const userEmail = useSelector(state=>state.userReducer.userEmail)
    const localId = useSelector(state=>state.userReducer.localId)
    const dispatch = useDispatch()
    const {data:profilePicture,isLoading,error} = useGetProfilePictureQuery(localId)

    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
        }
    },[profilePicture])

    return (
        <NavigationContainer>
            {
                userEmail ? <TabNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}