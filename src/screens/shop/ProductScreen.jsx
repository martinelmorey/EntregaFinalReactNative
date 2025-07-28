import { StyleSheet, Text, View, Pressable, Image, ScrollView, useWindowDimensions } from 'react-native'
import { useState } from 'react';
import { colors } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addItems } from '../../features/cart/cartSlice';
import { useAddToListaMutation } from '../../services/lista/listaApi';
import Ionicons from 'react-native-vector-icons/Ionicons'

const ProductScreen = ({ route }) => {
    const localId = useSelector(state => state.userReducer.localId)
    const { product } = route.params
    const { width } = useWindowDimensions()
    const [quantity, setQuantity] = useState(1)
    const [addToLista] = useAddToListaMutation() 
    const dispatch = useDispatch()
    
    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1)
        }
    }
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <ScrollView style={styles.productContainer}>
            <Text style={styles.textBrand}>{product.brand}</Text>
            <Text style={styles.textTitle}>{product.title}</Text>
            <Image
                source={{ uri: product.mainImage }}
                alt={product.title}
                width='100%'
                height={width * 1}
                resizeMode='contain'
            />
            <Text style={styles.shortDescription}>{product.shortDescription}</Text>
            <View style={styles.tagsContainer}>
                <View style={styles.tags}>
                    <View style={styles.tagsList}>
                        {
                            product.tags?.map(tag => <Text key={Math.random()} style={styles.tagText}>{tag}</Text>)
                        }
                    </View>
                </View>

                {
                    product.discount > 0 && <View style={styles.discount}><Text style={styles.discountText}>-{product.discount}%</Text></View>
                }
            </View>
            {
                product.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
            }
            <Text style={styles.price}>Precio: ${product.price}</Text>

            {product.stock > 0 && (
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>Cantidad:</Text>
                    <View style={styles.quantitySelector}>
                        <Pressable 
                            style={({pressed}) => [
                                {opacity: pressed ? 0.7 : 1},
                                styles.quantityButton
                            ]}
                            onPress={decrementQuantity}
                        >
                            <Ionicons name="remove" size={24} color="white" />
                        </Pressable>
                        
                        <Text style={styles.quantityText}>{quantity}</Text>
                        
                        <Pressable 
                            style={({pressed}) => [
                                {opacity: pressed ? 0.7 : 1},
                                styles.quantityButton
                            ]}
                            onPress={incrementQuantity}
                        >
                            <Ionicons name="add" size={24} color="white" />
                        </Pressable>
                    </View>
                </View>
            )}
            
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
                    onPress={() => dispatch(addItems({product: product, quantity: quantity}))}
                    disabled={product.stock <= 0}
                >
                    <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToListButton]}
                    onPress={() => addToLista({localId: localId, product: product})}
                >
                    <Ionicons name="heart" size={24} color="white" />
            </Pressable>
            </View>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    productContainer: {
        paddingHorizontal: 16,
        marginVertical: 16
    },
    textBrand: {
        color: colors.grisOscuro,
        fontFamily:'Ubuntu-Bold'
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily:'Ubuntu-Bold'
    },
    shortDescription: {
        fontSize: 16,
        textAlign: 'justify',
        paddingVertical: 8,
        fontFamily:'Ubuntu-Regular'
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 8
    },
    tags: {
        flex: 1,
        marginRight: 10
    },
    tagsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.remGreenLight,
        fontFamily:'Ubuntu-Medium',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        marginBottom: 5
    },
    price: {
        fontWeight: '800',
        fontSize: 18,
        fontFamily:'Ubuntu-Medium'
    },
    discount: {
        backgroundColor: colors.remGreenLight,
        width: 52,
        height: 52,
        borderRadius: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    discountText: {
        color: colors.white,
        textAlign: 'center',
        verticalAlign: 'center'
    },
    noStockText: {
        color: colors.error
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16,
        fontFamily:'Ubuntu-Medium'
    },
    addToCartButton: {
        width: 290,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.remGreenLight,
        borderRadius: 10,
        marginVertical: 16
    },
    addToListButton: {
        width: 65,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 15,
        backgroundColor: colors.remGreenLight,
        borderRadius: 10,
        marginVertical: 16
    },
    textAddToCart: {
        color: colors.white,
        fontSize: 22,
        fontFamily:'Ubuntu-Medium',
        textAlign: 'center',
    },
    quantityContainer: {
        alignItems: 'center',
        marginVertical: 0
    },
    quantityLabel: {
        fontSize: 16,
        fontFamily: 'Ubuntu-Medium',
        marginBottom: 4
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    quantityButton: {
        backgroundColor: colors.remGreenLight,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityText: {
        fontSize: 18,
        fontFamily: 'Ubuntu-Bold',
        marginHorizontal: 20,
        minWidth: 30,
        textAlign: 'center'
    },
})