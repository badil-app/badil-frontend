import React from "react";
import { View, Text } from "react-native";
import { CardDemo } from "./ProductCard";
import globalStyles from "./theme";

export default function ProductDetail({ route }) {
    const { product } = route.params;
    return (
        <View
            style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: globalStyles.modalButton.color,
                flex: 1,
            }}>
            <CardDemo product={product} />
        </View>
    );
}
