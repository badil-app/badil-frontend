import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "tamagui";

export default function HomeScreen({ navigation }) {
    console.log("HomeScreen is rendered");
    return (
        <View style={styles.container}>
            <View style={{}}>
                <Button>
                    <Text style={{ color: "red" }}>Open Sheet</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Use the whole screen
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        backgroundColor: "white",
    },
});
