import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { removeItems, clearCart } from '../../features/cart/cartSlice'
import { useAddOrderMutation } from '../../services/orders/ordersApi'

const CartScreen = () => {

  const localId = useSelector(state => state.userReducer.localId)
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const total = useSelector(state => state.cartReducer.total)
  const dispatch = useDispatch()

  const [addOrder] = useAddOrderMutation()
  
  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) return
    
    try {
      await addOrder({localId, cartItems})
      dispatch(clearCart())
      alert('¡Pedido confirmado con éxito!')
    } catch (error) {
      console.error('Error al confirmar el pedido:', error)
      alert('Hubo un error al confirmar tu pedido. Intenta nuevamente.')
    }
  }

  const handleClearCart = () => {
    try {
      dispatch(clearCart())
      alert('Carrito limpiado con éxito!')
    } catch (error) {
      console.error('Error al limpiar el carrito:', error)
      alert('Hubo un error al limpiar el carrito. Intenta nuevamente.')
    }
  }

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total} </Text>
      <View style={styles.footerButtonsContainer}>
      <Pressable onPress={handleClearCart} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Limpiar carrito <Icon name="delete" size={24} style={styles.trashIcon} /></Text>
      </Pressable>
      <Pressable onPress={handleConfirmOrder} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirmar <Icon name="check" size={24} style={styles.checkIcon} /></Text>
      </Pressable>
      </View>
    </View>
  )

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.cartImage}
          resizeMode='cover'
        />
      </View>
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
        <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
        <Pressable onPress={() => dispatch(removeItems(item.id))}>
          <Icon name="delete" size={24} style={styles.trashIcon} />
        </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <>
      {
        cartItems.length>0
          ?
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
          />

          :
          <Text>Aún no hay productos en el carrito</Text>
      }
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  checkIcon: {
    marginRight: 16,
    color: colors.white,
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
    borderRadius: 5,
    width: 170,
    textAlign: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  clearButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }, 
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.remGreenLight,
    borderRadius: 5,
    width: 170,
    textAlign: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  cartContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5
  },
  cartImage: {
    width: 100,
    height:120,
    marginVertical: 20
  },
  cartDescription: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700'
  },
  trashIcon: {
    marginRight: 16,
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
  cartScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 10
  }

})