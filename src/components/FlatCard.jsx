import { StyleSheet, Text, View } from 'react-native'

const FlatCard = ({ children,style }) => {
    return (
        <View style={{...styles.container,...style}}>
            {children}
        </View>
    )
}

export default FlatCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 8,
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#eee',
    }
})