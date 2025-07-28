import { StyleSheet, Text, Pressable, FlatList, Image, useWindowDimensions } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import FlatCard from '../../components/FlatCard'
import Search from '../../components/Search'
import { useGetProductsByCategoryQuery, useGetProductsBySubcategoryQuery } from '../../services/shop/shopApi'


const ProductsScreen = ({ navigation }) => {
  
  const { width } = useWindowDimensions()
  const [keyword, setKeyword] = useState('')
  const [productsFiltered, setProductsFiltered] = useState([])

  const categorySlug = useSelector(s => s.shopReducer.categorySelected)
  const subcategorySlug = useSelector(s => s.shopReducer.subcategorySelected)
  const parentCategorySlug = useSelector(s => s.shopReducer.parentCategorySlug)

  const { data: bySub = [], isLoading: lSub } =
    useGetProductsBySubcategoryQuery(subcategorySlug || '', {
      skip: !subcategorySlug,
    })

  const { data: byCatLeaf = [], isLoading: lCatLeaf } =
    useGetProductsByCategoryQuery(categorySlug || '', {
      skip: !categorySlug,
    })

  const { data: byCatParent = [], isLoading: lCatParent } =
    useGetProductsByCategoryQuery(parentCategorySlug || '', {
      skip: !parentCategorySlug,
    })

  const baseList = useMemo(() => {
    if (subcategorySlug && bySub.length) return bySub
    if (byCatLeaf.length) return byCatLeaf
    if (byCatParent.length) return byCatParent
    return []
  }, [subcategorySlug, bySub, byCatLeaf, byCatParent])

  useEffect(() => {
    if (keyword) {
      const k = keyword.toLowerCase()
      setProductsFiltered(baseList.filter(p => p.title?.toLowerCase().includes(k)))
    } else {
      setProductsFiltered(baseList)
    }
  }, [keyword, baseList])

  const renderProductItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('Producto', { product: item })}>
      <FlatCard>
        <Image
            source={{ uri: item.mainImage }}
            alt={item.title}
            width='100%'
            height={width * 1}
            resizeMode='contain'
        />
        <Text>{item.title}</Text>
      </FlatCard>
    </Pressable>
  )

  return (
    <>
      <Search keyword={keyword} setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered}
        renderItem={renderProductItem}
        keyExtractor={item => String(item.id)}
      />
    </>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({})
