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

  const RenderCategoryItem = ({ item }) => (
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

  const RenderNoCategories = () => (
    <View style={styles.wrapper}>  
      <View style={styles.emptyContainer}>
        <Ionicons name="storefront-outline" size={80} color={colors.mediumGray} />
        <Text style={styles.emptyTitle}>No hay productos disponibles</Text>
        <Text style={styles.emptySubtitle}>
          Esta categoría no tiene productos en este momento
        </Text>
        <Pressable 
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.goBackText}>Volver atrás</Text>
        </Pressable>
      </View>
    </View>
  )

  if (categories.length === 0) return <RenderNoCategories />

  return (
    <>
    <FlatList
      data={categories}
      renderItem={RenderCategoryItem}
      keyExtractor={item => String(item.id ?? item.slug)}
    />
    </>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
