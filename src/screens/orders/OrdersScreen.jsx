import React from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../../services/orders/ordersApi'
import Loader from '../../components/Loader'

const OrdersScreen = () => {
  const localId = useSelector(state => state.userReducer.localId)
  const { data: ordersItems = [], isLoading, error } = useGetOrdersQuery(localId)
  
  if (isLoading) return <Loader text="Cargando tus pedidos..." />
  if (error) return <Text style={styles.message}>Error al cargar tus pedidos</Text>

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>Fecha: {item.date || 'No disponible'}</Text>
        <Text style={styles.orderStatus}>Estado: <Text style={styles.statusText}>{item.status || 'Pendiente'}</Text></Text>
        <Text style={styles.orderTotal}>Total: <Text style={styles.totalText}>${item.total || 0}</Text></Text>
      </View>
      
      <Text style={styles.productsTitle}>Productos:</Text>
      
      {item.items && Array.isArray(item.items) && item.items.length > 0 ? (
        item.items.map(product => (
          <View key={product.id} style={styles.productItem}>
            {product.mainImage ? (
              <Image
                source={{ uri: product.mainImage }}
                style={styles.productImage}
                resizeMode='cover'
              />
            ) : (
              <View style={[styles.productImage, styles.noImage]} />
            )}
            <View style={styles.productDetails}>
              <Text style={styles.productTitle} numberOfLines={1}>{product.title || 'Producto'}</Text>
              <Text style={styles.productInfo}>Precio: ${product.price || 0}</Text>
              <Text style={styles.productInfo}>Cantidad: {product.quantity || 1}</Text>
              <Text style={styles.productSubtotal}>Subtotal: ${(product.price || 0) * (product.quantity || 1)}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noProducts}>No hay productos en esta orden</Text>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      {ordersItems.length > 0 ? (
        <FlatList
          data={ordersItems}
          keyExtractor={item => item.id || String(Math.random())}
          renderItem={renderOrderItem}
          ListHeaderComponent={<Text style={styles.screenTitle}>Mis Pedidos</Text>}
        />
      ) : (
        <Text style={styles.message}>No tienes pedidos</Text>
      )}
    </View>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  screenTitle: {
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  orderContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
  },
  orderStatus: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    marginTop: 4,
  },
  statusText: {
    color: '#4CAF50',
    fontFamily: 'Ubuntu-Medium',
  },
  orderTotal: {
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    marginTop: 4,
  },
  totalText: {
    fontFamily: 'Ubuntu-Bold',
  },
  productsTitle: {
    fontSize: 15,
    fontFamily: 'Ubuntu-Medium',
    marginBottom: 8,
  },
  productItem: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  noImage: {
    backgroundColor: '#f0f0f0',
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
    marginBottom: 2,
  },
  productInfo: {
    fontSize: 13,
    fontFamily: 'Ubuntu-Regular',
  },
  productSubtotal: {
    fontSize: 13,
    fontFamily: 'Ubuntu-Medium',
    color: '#4CAF50',
  },
  noProducts: {
    textAlign: 'center',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#888',
    marginVertical: 10,
  }
})