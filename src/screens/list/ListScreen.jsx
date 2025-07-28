import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useGetListaQuery, useRemoveFromListaMutation, useClearListaMutation } from '../../services/lista/listaApi'
import { useSelector } from 'react-redux'

const ListScreen = () => {

   const localId = useSelector(state => state.userReducer.localId)
   const { data: listItems = [], isLoading, error } = useGetListaQuery(localId)
   const [removeFromLista] = useRemoveFromListaMutation()
   const [clearLista] = useClearListaMutation()
   if (isLoading) return <Text>Cargando tu lista...</Text>
   if (error) return <Text>Error al cargar tu lista</Text>

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
        <Text style={styles.description}>{item.shortDescription}</Text>
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

export default ListScreen

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
  listContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10
  },
  listImage: {
    width: 80,
    height: 80
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