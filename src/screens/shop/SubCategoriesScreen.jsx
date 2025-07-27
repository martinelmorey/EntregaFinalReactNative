import { StyleSheet, View, Image, Pressable, FlatList } from 'react-native'
import FlatCard from '../../components/FlatCard'
import TextUbuntuRegular from '../../components/TextUbuntuRegular'
import { useDispatch } from 'react-redux'
import {
  setCategorieSelected,
  setSubCategorySelected,
  setParentCategorySlug
} from '../../features/shop/shopSlice'

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


  const renderItem = ({ item }) => (
    <Pressable onPress={() => onPressSubcat(item)}>
      <FlatCard>
        <View style={styles.row}>
          <TextUbuntuRegular>{item.title}</TextUbuntuRegular>
          {!!item.image && <Image width={80} height={40} source={{ uri: item.image }} />}
        </View>
      </FlatCard>
    </Pressable>
  )

  return (
    <FlatList
      data={subcats}
      renderItem={renderItem}
      keyExtractor={it => String(it.id ?? it.slug)}
    />
  )
}

export default SubCategoriesScreen

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  }
})
