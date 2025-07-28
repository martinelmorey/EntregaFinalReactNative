import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useGetOrdersQuery } from '../../services/orders/ordersApi'
import { useSelector } from 'react-redux'

const OrdersScreen = () => {

   const localId = useSelector(state => state.userReducer.localId)
   const { data: ordersItems = [], isLoading, error } = useGetOrdersQuery(localId)
   if (isLoading) return <Text>Cargando tu lista...</Text>
   if (error) return <Text>Error al cargar tu lista</Text>

  const renderOrdersItems = ({ item }) => (
    <FlatCard style={styles.ordersContainer}>
      <View>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.ordersImage}
          resizeMode='cover'
        />
      </View>
      <View style={styles.ordersDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.price}>Precio: $ {item.price}</Text>
      </View>
    </FlatCard>
  )

  return (
    <>
      {
        ordersItems.length>0
          ?
          <>
            <FlatList
                data={ordersItems}
                keyExtractor={item => item.id}
                renderItem={renderOrdersItems}
                ListHeaderComponent={<Text style={styles.ordersScreenTitle}>Aqui está tu lista de favoritos</Text>}
            />
            <Pressable onPress={() => clearLista(localId)} style={styles.clearListButton}>
                <Text style={styles.clearListButtonText}>Limpiar lista</Text>
                <Icon name="delete" size={24} style={styles.trashIconButton} />
            </Pressable>
          </>
          :
          <Text>Aún no hay productos en la lista</Text>
      }
    </> 
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  clearListButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    backgroundColor: colors.black,
    borderRadius: 5,
    margin: 16,
  },
  clearListButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8
  },
  ordersContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10
  },
  ordersImage: {
    width: 80,
    height: 80
  },
  ordersDescription: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 16,
  },
  ordersScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8
  },
  trashIcon: {
    alignSelf: 'flex-end',
    marginRight: 16,
    color: colors.black,
  },
  trashIconButton: {
    color: colors.white,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '700'
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.remGreenLight,
    borderRadius: 16,
    marginBottom: 24,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700'
  },
})