import { StyleSheet, View, Image, Pressable, FlatList, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  setCategorieSelected,
  setSubCategorySelected,
  setParentCategorySlug
} from '../../features/shop/shopSlice'
import { colors } from '../../global/colors'
import { Ionicons } from '@expo/vector-icons'

const SubCategoriesScreen = ({ route, navigation }) => {
  const { category } = route.params
  const parentSlug = category.slug
  const subcats = category?.subcategories ? Object.values(category.subcategories) : []
  const dispatch = useDispatch()

  const onPressSubcat = (sub) => {
    const hasChildren = sub.subcategories && Object.keys(sub.subcategories).length > 0
    if (hasChildren) {
      navigation.push('Sub Categorías', { category: sub })
      return
    }

    dispatch(setSubCategorySelected(sub.slug))    
    dispatch(setCategorieSelected(sub.slug))      
    dispatch(setParentCategorySlug(parentSlug))   

    navigation.navigate('Productos')
  }

  const RenderItem = ({ item }) => (
    <Pressable 
      onPress={() => onPressSubcat(item)}
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

  const RenderNoSubCategories = () => (
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

  if (subcats.length === 0) return <RenderNoSubCategories />

  return (
    <>
    <FlatList
      data={subcats}
      renderItem={RenderItem}
      keyExtractor={it => String(it.id ?? it.slug)}
    />
    </>
  )
}

export default SubCategoriesScreen

const styles = StyleSheet.create({
  categoryButton: {
    width: '90%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
  wrapper: {
    flex: 1,
  },
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
    textAlign: 'center',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.remGreenLight,
    padding: 12,
    borderRadius: 5,
  },
  goBackText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    marginRight: 8,
  },
    categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  }
})
