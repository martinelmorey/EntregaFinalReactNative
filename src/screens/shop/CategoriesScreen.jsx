import { StyleSheet, View, Image, Pressable, FlatList, Text } from 'react-native'
import { colors } from '../../global/colors'
import { useDispatch } from 'react-redux'
import { setCategorieSelected } from '../../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../../services/shop/shopApi'
import Loader from '../../components/Loader'

const CategoriesScreen = ({ navigation }) => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery()
  const dispatch = useDispatch()

  if (isLoading) return <Loader text="Cargando categorías..." />
  if (error) return <Text style={styles.message}>Error al cargar categorías</Text>

  const onPressCategory = (item) => {
    dispatch(setCategorieSelected(item.slug))
    navigation.navigate("Sub Categorías", { category: item }) 
  }

  const renderCategoryItem = ({ item }) => (
    <Pressable 
      onPress={() => onPressCategory(item)}
      style={styles.categoryButton}
    >
      {!!item.image && (
        <Image 
          style={styles.backgroundImage} 
          source={{ uri: item.image }} 
          resizeMode="cover"
        />
      )}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </View>
    </Pressable>
  )

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={item => String(item.id ?? item.slug)}
    />
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  categoryButton: {
    width: '90%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    color: colors.white,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  }
})
