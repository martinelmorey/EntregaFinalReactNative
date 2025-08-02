import { StyleSheet, Text, View, Image, ScrollView, useWindowDimensions } from 'react-native'
import { colors } from '../../global/colors';
import ProductActions from '../../components/ProductButtons'

const ProductScreen = ({ route }) => {
    const { product } = route.params
    const { width } = useWindowDimensions()

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
            
            <ProductActions product={product} showQuantitySelector={true} />

        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
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
    }
})