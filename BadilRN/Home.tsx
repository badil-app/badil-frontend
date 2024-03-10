import { ReactNativeScannerView } from "@pushpendersingh/react-native-scanner";
import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    NativeSyntheticEvent,
} from "react-native";
import { Button } from "tamagui";
import globalStyles from "./theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavParamList } from "./App";

const { width, height } = Dimensions.get("window");

interface QRScannedEvent {
    value: string;
}

type BarcodeModalState = {
    open: boolean;
    barcode: string | undefined;
};

export default function HomeScreen({
    navigation,
}: NativeStackScreenProps<NavParamList, "Home">) {
    // const [barcode, setBarcode] = useState<string | undefined>();
    const [barcodeModal, setBarcodeModal] = useState<BarcodeModalState>({
        open: false,
        barcode: undefined,
    });

    function handleCatalogueRoute() {
        setBarcodeModal((prevState) => ({
            ...prevState,
            open: false,
        }));
        console.log(
            "what we are sending to catalogue is: " + barcodeModal.barcode,
        );
        navigation.navigate("Catalogue", {
            barcode: barcodeModal.barcode!,
        });
    }
    const handleBarcodeCapture = (
        event: NativeSyntheticEvent<QRScannedEvent>,
    ) => {
        if (barcodeModal.barcode) return;
        const { value } = event.nativeEvent;
        console.log(" and barc is: " + value);
        setBarcodeModal(() => ({
            open: true,
            barcode: value,
        }));
    };

    const handleOpenChange = (isOpen: boolean) => {
        console.log("modal swiped. isOpen is now: " + isOpen);
        if (!isOpen) {
            setTimeout(() => {
                setBarcodeModal(() => ({
                    open: false,
                    barcode: undefined,
                }));
                console.log("modal closed");
            }, 500);
        }
    };

    return (
        <View style={styles.container}>
            <ReactNativeScannerView
                style={{ height: height, width: width }}
                onQrScanned={handleBarcodeCapture}
            />
            <Sheet
                open={barcodeModal.open}
                onOpenChange={handleOpenChange}
                snapPoints={[30]} // height of sheet
                modal={true} // overlays modal on content
                dismissOnSnapToBottom>
                <Sheet.Frame
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{
                        backgroundColor: globalStyles.modal.backgroundColor,
                        borderColor: "black",
                        borderWidth: 1,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        padding: 20,
                    }}>
                    <Text
                        style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 24,
                        }}>
                        Product Identified:
                    </Text>

                    <Text
                        style={{
                            color: "black",
                            fontSize: 18,
                        }}>
                        {barcodeModal.barcode}
                    </Text>

                    <View style={{ marginTop: 15 }}>
                        <Button
                            backgroundColor={globalStyles.modalButton.color}
                            onPress={handleCatalogueRoute}>
                            <Text
                                style={{
                                    color: "black",
                                }}>
                                See Alternatives!
                            </Text>
                        </Button>
                    </View>
                </Sheet.Frame>
            </Sheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: globalStyles.pageBg.backgroundColor,
    },
});
