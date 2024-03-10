/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { PortalProvider } from "@tamagui/portal";
import MyStack from "./Stack";

import { config } from "@tamagui/config/v3";
import { Product } from "./Product";

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config);

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
    interface TamaguiCustomConfig extends Conf {}
}

export type NavParamList = {
    Home: undefined;
    Catalogue: {
        barcode: string;
    };
    ProductDetail: {
        product: Product;
    };
};

export default function App() {
    return (
        <TamaguiProvider config={tamaguiConfig}>
            <PortalProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <NavigationContainer>
                        <MyStack />
                    </NavigationContainer>
                </SafeAreaView>
            </PortalProvider>
        </TamaguiProvider>
    );
}
