import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Spinner } from "tamagui";
import { NavParamList } from "./App";
import { ProductsService } from "./productService";
import globalStyles from "./theme";
import { StaticStarRow } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./Product";
// import { useNavigation } from '@react-navigation/native';

export default function Catalogue({
    navigation,
    route,
}: NativeStackScreenProps<NavParamList, "Catalogue">) {
    const { barcode } = route.params;
    const {
        data: products,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["badils", barcode],
        enabled: !!barcode,
        queryFn: () => ProductsService.getProducts(barcode),
    });
    console.log("errors", error);
    function handleDetailRequest(product: Product) {
        if (!product || !products) {
            console.log("Barcode is undefined");
            return;
        }
        console.log("barcode: " + product.barcode);
        if (product) {
            console.log("barcode match is: " + product.barcode);
            navigation.navigate("ProductDetail", { product: product });
        }
    }
    console.log("products", barcode);

    return (
        <View style={styles.root}>
            <ScrollView style={styles.listContainer}>
                {products == null && !isLoading && (
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                        No badils yet! Add your own!
                    </Text>
                )}
                {isLoading && <Spinner size="large" />}
                {(products ?? []).map((product, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleDetailRequest(product)}>
                            <View style={styles.card}>
                                <Image
                                    alt=""
                                    resizeMode="cover"
                                    source={{ uri: product.img ?? undefined }}
                                    style={styles.cardImg}
                                />

                                <View style={styles.cardBody}>
                                    <Text>
                                        <Text style={styles.cardTitle}>
                                            {product.productName}
                                        </Text>{" "}
                                        <Text style={styles.cardAirport}>
                                            {product.brand}
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
                                                providedRating={product.rating}
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
                                                {"NutriScore: " +
                                                    product.nutriScore}
                                            </Text>
                                        </View>
                                    </View>

                                    <View>
                                        <Button
                                            onPress={() => {
                                                console.log("click");
                                                handleDetailRequest(product);
                                            }}
                                            title="Product Details"
                                            color="#173153"
                                        />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
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
