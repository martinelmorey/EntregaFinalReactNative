import { StyleSheet, Text, Pressable, FlatList, Image, useWindowDimensions, View } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import FlatCard from '../../components/FlatCard'
import Search from '../../components/Search'
import Loader from '../../components/Loader'
import { colors } from '../../global/colors'
import { Ionicons } from '@expo/vector-icons'
import { useGetProductsByCategoryQuery, useGetProductsBySubcategoryQuery } from '../../services/shop/shopApi'
import ProductButtons from '../../components/ProductButtons'


const ProductsScreen = ({ navigation }) => {
  const { width } = useWindowDimensions()
  const [keyword, setKeyword] = useState('')
  const [productsFiltered, setProductsFiltered] = useState([])
  const categorySlug = useSelector(state => state.shopReducer.categorySelected)
  const subcategorySlug = useSelector(state => state.shopReducer.subcategorySelected)
  const parentCategorySlug = useSelector(state => state.shopReducer.parentCategorySlug)
  

  const { data: bySub = [], isLoading: lSub, error: eSub } =
    useGetProductsBySubcategoryQuery(subcategorySlug || '', {
      skip: !subcategorySlug,
    })

  const { data: byCat = [], isLoading: lCat, error: eCat   } =
    useGetProductsByCategoryQuery(categorySlug || '', {
      skip: !categorySlug,
    })

  const { data: byCatParent = [], isLoading: lCatParent, error: eCatParent } =
    useGetProductsByCategoryQuery(parentCategorySlug || '', {
      skip: !parentCategorySlug,
    })

  const baseList = useMemo(() => {
    if (subcategorySlug && bySub.length) return bySub
    if (byCat.length) return byCat
    if (byCatParent.length) return byCatParent
    return []
  }, [subcategorySlug, bySub, byCat, byCatParent])

  const isLoading = useMemo(() => lSub || lCat || lCatParent, [lSub, lCat, lCatParent])
  const error = useMemo(() => eSub || eCat || eCatParent, [eSub, eCat, eCatParent])

  useEffect(() => {
    if (!keyword) {
      if (productsFiltered.length !== baseList.length) {
        setProductsFiltered(baseList)
      }
      return
    }
  
    const k = keyword.toLowerCase()
    const filtered = baseList.filter(p => p.title?.toLowerCase().includes(k))
  
    if (filtered.length !== productsFiltered.length) {
      setProductsFiltered(filtered)
    }
  }, [keyword, baseList])

  const renderProductItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('Producto', { product: item })}>
      <FlatCard style={styles.productCard}>
        <Image
            source={{ uri: item.mainImage }}
            alt={item.title}
            width='100%'
            height={width * 1}
            resizeMode='contain'
            style={styles.productImage}
        />
        <Text style={styles.productBrand}>{item.brand} - {item.categorySlug}</Text>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <ProductButtons  product={item}/>
      </FlatCard>
    </Pressable>
  )


  const RenderNoProducts = () => (
    <View style={styles.wrapper}>  
      <View style={styles.emptyContainer}>
        <Ionicons name="storefront-outline" size={80} color={colors.mediumGray} />
        <Text style={styles.emptyTitle}>No hay productos disponibles</Text>
        <Text style={styles.emptySubtitle}>
          {keyword 
            ? `No encontramos productos que coincidan con "${keyword}"`
            : 'Esta categoría no tiene productos en este momento'
          }
        </Text>
        {keyword && (
          <Pressable 
            style={styles.clearSearchButton}
            onPress={() => setKeyword('')}
          >
            <Text style={styles.clearSearchText}>Limpiar búsqueda</Text>
          </Pressable>
        )}
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


  if (isLoading) return <Loader text="Cargando productos..." />
  if (error) return <Text style={styles.message}>Error al cargar productos</Text>
  if (productsFiltered.length === 0) return <RenderNoProducts />

  return (
    <>
      <Search keyword={keyword} setKeyword={setKeyword}/>
      <FlatList
        data={productsFiltered}
        renderItem={renderProductItem}
        keyExtractor={item => String(item.id)}
      />
    </>
  )
}

export default ProductsScreen

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
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    marginBottom: 20,
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
  productSubcategory: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 22,
    fontFamily: 'Ubuntu-Bold',
    color: colors.remGreenLight,
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  productBrand: {
    fontSize: 10,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    textTransform: 'uppercase', 
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 5,
  },
  productTitle: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom:10
  },
  productCard: {
    padding: 30,
    backgroundColor: '#fff',
    marginVertical: 20,
  }
})
