import {Text, StyleSheet} from 'react-native'


const TextUbuntuTitle = ({children,style}) => {
  return (
      <Text style={styles.title}>{children}</Text>
  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily:'Ubuntu-Regular',
        fontWeight:'bold',
        fontSize:22,
        textAlign:'center'
    }
})

export default TextUbuntuTitle
