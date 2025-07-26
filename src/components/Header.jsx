import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'



const Header = ({subtitle}) => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo_rem.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>{subtitle}</Text>
      {
        canGoBack &&
        <Pressable style={styles.goBack} onPress={()=>navigation.goBack()}>
          <Icon name="chevron-left" size={32} color={colors.white} />
        </Pressable>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        height:200,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.black
    },
    logo:{
        width:150,
        height:150
    },
    subtitle:{
      fontSize:16,
      color:colors.white,
    },
    goBack:{
      position:"absolute",
      bottom:100,
      left:16
    }
})