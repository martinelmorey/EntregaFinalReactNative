import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useGetListaQuery, useRemoveFromListaMutation, useClearListaMutation } from '../../services/lista/listaApi'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Toast from 'react-native-toast-message'

const ListScreen = ({navigation}) => {

  const localId = useSelector(state => state.userReducer.localId)
  const { data: listItems = [], isLoading, error } = useGetListaQuery(localId)
  const [removeFromLista] = useRemoveFromListaMutation()
  const [clearLista] = useClearListaMutation()

  if (isLoading) return <Loader text="Cargando tu lista..." />
  if (error) return <Text style={styles.message}>Error al cargar tu lista</Text>
   

  const hanleClearList = async () => {
    try {
      await clearLista(localId)
      Toast.show({
        type: 'success',
        text1: '¡Lista eliminada!',
        position: 'top',
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al eliminar la lista. Intenta nuevamente.',
        position: 'top',
      })
    }
  }

  const renderListItems = ({ item }) => (
    <FlatCard style={styles.listContainer}>
      <View>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.listImage}
          resizeMode='cover'
        />
      </View>
      <View style={styles.listDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>Precio: $ {item.price}</Text>
        <Pressable onPress={() => removeFromLista({localId, productId: item.id})}>
          <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon} />
        </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <>
      {
        listItems.length>0
          ?
          <>
            <FlatList
                data={listItems}
                keyExtractor={item => item.id}
                renderItem={renderListItems}
                ListHeaderComponent={<Text style={styles.listScreenTitle}>Aqui está tu lista de favoritos</Text>}
            />
            <Pressable onPress={hanleClearList} style={styles.clearListButton}>
                <Text style={styles.clearListButtonText}>Limpiar lista</Text>
                <Icon name="delete" size={24} style={styles.trashIconButton} />
            </Pressable>
          </>
          :
          <View style={styles.emptyContainer}>
            <Icon name="list" size={80} color={colors.mediumGray} />
            <Text style={styles.emptyTitle}>Tu lista está vacía</Text>
            <Text style={styles.emptySubtitle}>¿Querés agregar productos a tu lista?</Text>
            <Pressable
              style={styles.goToShopButton}
              onPress={() => navigation.navigate('Shop', { screen: 'Categorías' })}
            >
              <Text style={styles.goToShopButtonText}>Ir a la tienda</Text>
              <Icon name="store" size={20} color={colors.white} />
            </Pressable>
          </View>
      }
    </> 
  )
}

export default ListScreen

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  goToShopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.remGreenLight,
    padding: 12,
    borderRadius: 5,
  },
  goToShopButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
    marginRight: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
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
  listContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5
  },
  listImage: {
    width: 100,
    height:120,
    marginVertical: 20
  },
  listDescription: {
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
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700'
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
  listScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8
  }

})