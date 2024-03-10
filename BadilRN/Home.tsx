import { ReactNativeScannerView } from "@pushpendersingh/react-native-scanner";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Sheet } from "@tamagui/sheet";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    PERMISSIONS,
    RESULTS,
    openSettings,
    request,
} from "react-native-permissions";
import { Button } from "tamagui";
import { NavParamList } from "./App";
import NutriCircle from "./NutriCircle";
import { ProductsService, setupAxios } from "./productService";
import globalStyles from "./theme";

const { width, height } = Dimensions.get("window");

interface QRScannedEvent {
    value: string;
}

type BarcodeModalState = {
    open: boolean;
    barcode: string | undefined;
};

setupAxios();

export default function HomeScreen({
    navigation,
}: NativeStackScreenProps<NavParamList, "Home">) {
    const [isCameraPermissionGranted, setIsCameraPermissionGranted] =
        useState(false);
    useFocusEffect(
        useCallback(() => {
            setIsCameraPermissionGranted(false);
            checkCameraPermission();
            setBarcodeModal((prevState) => ({
                ...prevState,
                barcode: undefined,
            }));
        }, []),
    );
    const [barcodeModal, setBarcodeModal] = useState<BarcodeModalState>({
        open: false,
        barcode: undefined,
    });

    const checkCameraPermission = async () => {
        request(
            Platform.OS === "ios"
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
        ).then(async (result: any) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    // console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    Alert.alert(
                        "Permission Denied",
                        "You need to grant camera permission first",
                    );
                    openSettings();
                    break;
                case RESULTS.GRANTED:
                    setIsCameraPermissionGranted(true);
                    break;
                case RESULTS.BLOCKED:
                    Alert.alert(
                        "Permission Blocked",
                        "You need to grant camera permission first",
                    );
                    openSettings();
                    break;
            }
        });
    };

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

    const { data: product, isLoading } = useQuery({
        queryKey: ["get-product", barcodeModal.barcode],
        enabled: !!barcodeModal.barcode,
        queryFn: () => ProductsService.getProduct(barcodeModal.barcode!),
    });

    console.log("the product recieved was: " + product?.data.img);

    return (
        <View style={styles.container}>
            {isCameraPermissionGranted ? (
                <ReactNativeScannerView
                    style={{ height: height, width: width }}
                    onQrScanned={handleBarcodeCapture}
                />
            ) : (
                <Text style={{ fontSize: 30, color: "red" }}>
                    You need to grant camera permission first
                </Text>
            )}
            <Sheet
                open={barcodeModal.open}
                onOpenChange={handleOpenChange}
                snapPoints={[50]} // height of sheet
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
                        {isLoading ? (
                            <View>
                                <ActivityIndicator
                                    size="large"
                                    color="#0000ff"
                                />
                            </View>
                        ) : (
                            <Image
                                resizeMode="contain"
                                width={200}
                                height={200}
                                source={{
                                    uri:
                                        product?.data.img ??
                                        "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
                                }}
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                        )}
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            // borderWidth: 2,
                            // borderColor: "orange",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 25,
                        }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            NutriScore
                        </Text>
                        {isLoading ? (
                            <View>
                                <ActivityIndicator
                                    size="large"
                                    color="#0000ff"
                                />
                            </View>
                        ) : (
                            <NutriCircle
                                score={product?.data.nutriScore ?? "c"}
                            />
                        )}
                    </View>

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
