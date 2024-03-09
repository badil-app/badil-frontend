/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./Stack";
import { TamaguiProvider, createTamagui } from "@tamagui/core";

import { config } from "@tamagui/config/v3";

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config);

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
    interface TamaguiCustomConfig extends Conf {}
}

export default function App() {
    return (
        <TamaguiProvider config={tamaguiConfig}>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <MyStack />
                </NavigationContainer>
            </SafeAreaView>
        </TamaguiProvider>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
    },
    highlight: {
        fontWeight: "700",
    },
});
