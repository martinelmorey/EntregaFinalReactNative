import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItems } from '../features/cart/cartSlice.js';
import { useAddToListaMutation } from '../services/lista/listaApi.js';
import { useAddToCartMutation } from '../services/cart/cartApi.js';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message'
import { colors } from '../global/colors.js';

const ProductButtons = ({ 
    product, 
    showQuantitySelector = false, 
    initialQuantity = 1,
    buttonStyle = 'horizontal' 
}) => {
    const localId = useSelector(state => state.userReducer.localId)
    const [quantity, setQuantity] = useState(initialQuantity)
    const [addToLista] = useAddToListaMutation() 
    const [addToCart] = useAddToCartMutation()
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

    const handleAddToList = async () => {
        try {
            await addToLista({localId: localId, product: product})
            Toast.show({
                type: 'success',
                text1: '¡Producto agregado a la lista!',
                position: 'top',
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Hubo un error al agregar el producto a la lista. Intenta nuevamente.',
                position: 'top',
            })
        }
    }

    const handleAddToCart = async () => {
        try {
            await addToCart({localId: localId, product: product})
            dispatch(addItems({product: product, quantity: quantity}))
            Toast.show({
                type: 'success',
                text1: '¡Producto agregado al carrito!',
                position: 'top',
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Hubo un error al agregar el producto al carrito. Intenta nuevamente.',
                position: 'top',
            })
        }
    }

    return (
        <View style={styles.container}>
            {showQuantitySelector && product.stock > 0 && (
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
                            <Ionicons name="remove" size={20} color="white" />
                        </Pressable>
                        
                        <Text style={styles.quantityText}>{quantity}</Text>
                        
                        <Pressable 
                            style={({pressed}) => [
                                {opacity: pressed ? 0.7 : 1},
                                styles.quantityButton
                            ]}
                            onPress={incrementQuantity}
                        >
                            <Ionicons name="add" size={20} color="white" />
                        </Pressable>
                    </View>
                </View>
            )}
            
            <View style={[
                styles.buttonsContainer, 
                buttonStyle === 'vertical' && styles.buttonsVertical
            ]}>
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.95 : 1 }, 
                        styles.addToCartButton,
                        buttonStyle === 'vertical' && styles.buttonVertical
                    ]}
                    onPress={handleAddToCart}
                    disabled={product.stock <= 0}
                >
                    <Text style={styles.textAddToCart}>
                        {buttonStyle === 'vertical' ? '+' : 'Agregar al carrito'}
                    </Text>
                </Pressable>
                
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.95 : 1 }, 
                        styles.addToListButton,
                        buttonStyle === 'vertical' && styles.buttonVertical
                    ]}
                    onPress={handleAddToList}
                >
                    <Ionicons name="heart" size={buttonStyle === 'vertical' ? 20 : 24} color="white" />
                </Pressable>
            </View>
        </View>
    )
}

export default ProductButtons

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    quantityLabel: {
        fontSize: 16,
        fontFamily: 'Ubuntu-Medium',
        color: colors.text,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    quantityButton: {
        backgroundColor: colors.remGreenLight,
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityText: {
        fontSize: 18,
        fontFamily: 'Ubuntu-Bold',
        color: colors.text,
        minWidth: 30,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsVertical: {
        flexDirection: 'column',
        gap: 5,
    },
    addToCartButton: {
        width: 290,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.remGreenLight,
        borderRadius: 5,
    },
    addToListButton: {
        width: 65,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 15,
        backgroundColor: colors.remGreenLight,
        borderRadius: 5,
        marginVertical: 16
    },
    buttonVertical: {
        flex: 0,
        minWidth: 40,
        minHeight: 40,
    },
    textAddToCart: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Ubuntu-Medium',
        textAlign: 'center',
    },
})
