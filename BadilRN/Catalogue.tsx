import {
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
} from "react-native";
import globalStyles from "./theme";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { ProductsService } from "./productService";
import { StaticStarRow } from "./utils";

export default function Catalogue({ navigation, route }) {
    const { barcode } = route.params;
    const productsService = new ProductsService();
    const products = productsService.getProducts();
    function handleDetailRequest({ barcode }: { barcode: string | undefined }) {
        if (!barcode) {
            console.log("Barcode is undefined");
            return;
        }

        const product = products.find((product) => product.barcode === barcode);

        if (product) {
            console.log("barcode match is: " + product.barcode);
            navigation.navigate("ProductDetail", { product: product });
        }
    }

    return (
        <View style={styles.root}>
            <ScrollView style={styles.listContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginBottom: 15,
                    }}>
                    <Text style={{ fontWeight: "bold", fontSize: 32 }}>
                        {barcode}
                    </Text>
                </View>
                {products.map(
                    (
                        {
                            img,
                            productName,
                            brand,
                            rating,
                            nutriScore,
                            barcode,
                        },
                        index,
                    ) => {
                        return (
                            <View key={index} style={styles.card}>
                                <Image
                                    alt=""
                                    resizeMode="cover"
                                    source={{ uri: img }}
                                    style={styles.cardImg}
                                />

                                <View style={styles.cardBody}>
                                    <Text>
                                        <Text style={styles.cardTitle}>
                                            {productName}
                                        </Text>{" "}
                                        <Text style={styles.cardAirport}>
                                            {brand}
                                        </Text>
                                    </Text>

                                    <View style={styles.cardRow}>
                                        <View style={styles.cardRowItem}>
                                            <FontAwesome
                                                color="#6f61c4"
                                                name="plane-departure"
                                                size={10}
                                            />

                                            <StaticStarRow
                                                providedRating={rating}
                                            />
                                        </View>

                                        <View style={styles.cardRowItem}>
                                            <FontAwesome
                                                color="#6f61c4"
                                                name="plane-arrival"
                                                size={10}
                                            />

                                            <Text
                                                style={styles.cardRowItemText}>
                                                {"NutriScore: " + nutriScore}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* <Text style={styles.cardPrice}>
                                            <Text>from </Text>

                                            <Text style={styles.cardPriceValue}>
                                                ${price.toLocaleString("en-US")}{" "}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.cardPriceCurrency
                                                }>
                                                USD
                                            </Text>
                                        </Text> */}

                                    <TouchableOpacity
                                        onPress={() =>
                                            handleDetailRequest({
                                                barcode: barcode,
                                            })
                                        }>
                                        <View style={styles.btn}>
                                            <Text style={styles.btnText}>
                                                Product Details
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    },
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: globalStyles.pageBg.backgroundColor,
        flex: 1,
        padding: 20,
    },
    listContainer: {
        flex: 1,
        flexDirection: "column",
    },
    container: {
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1d1d1d",
        marginBottom: 12,
    },
    /** Card */
    card: {
        flexDirection: "row",
        alignItems: "stretch",
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    cardImg: {
        width: 120,
        height: 154,
        borderRadius: 12,
    },
    cardBody: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#173153",
        marginRight: 8,
    },
    cardAirport: {
        fontSize: 13,
        fontWeight: "600",
        color: "#5f697d",
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: -8,
        flexWrap: "wrap",
    },
    cardRowItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 6,
    },
    cardRowItemText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: "500",
        color: "#5f697d",
    },
    cardPrice: {
        fontSize: 13,
        fontWeight: "500",
        color: "#5f697d",
        marginBottom: 15,
    },
    cardPriceValue: {
        fontSize: 21,
        fontWeight: "700",
        color: "#173153",
    },
    cardPriceCurrency: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#6f61c4",
    },
    /** Button */
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        backgroundColor: "#173153",
        borderColor: "#173153",
    },
    btnText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "600",
        color: "#fff",
    },
});
