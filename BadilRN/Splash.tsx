// SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Home");
        }, 2000); // simulating app loading
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                resizeMode="contain"
                width={200}
                height={200}
                source={require("./assets/images/badil-logo.png")}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SplashScreen;
