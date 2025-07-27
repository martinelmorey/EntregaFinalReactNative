// screens/CategoriesScreen.tsx
import { StyleSheet, View, Image, Pressable, FlatList } from 'react-native'
import FlatCard from '../../components/FlatCard'
import TextUbuntuTitle from '../../components/TextUbuntuTitle'
import { useDispatch } from 'react-redux'
import { setCategorieSelected } from '../../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../../services/shop/shopApi'

const CategoriesScreen = ({ navigation }) => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery()
  const dispatch = useDispatch()

  const onPressCategory = (item) => {
    dispatch(setCategorieSelected(item.slug))
    navigation.navigate("Sub Categorías", { category: item }) // ← pantalla intermedia
  }

  const renderCategoryItem = ({ item }) => (
    <Pressable onPress={() => onPressCategory(item)}>
      <FlatCard>
        <View style={styles.categoryContainer}>
          <TextUbuntuTitle>{item.title}</TextUbuntuTitle>
          {!!item.image && <Image width={80} height={40} source={{ uri: item.image }} />}
        </View>
      </FlatCard>
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
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  }
})
