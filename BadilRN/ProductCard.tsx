import { StyleSheet, View } from "react-native";
import type { CardProps } from "tamagui";
import { Button, Card, H2, Image, Paragraph, Text, XStack } from "tamagui";
import NutriCircle from "./NutriCircle";
import { Product } from "./Product";
import { InteractiveStarRow } from "./utils";

type DemoCardProps = CardProps & {
    product: {
        img: null | string;
        productName: string;
        brand: string;
        rating: number;
        nutriScore: string;
        barcode: string | undefined;
    };
};

export function CardDemo({ product }: { product: Product }) {
    return (
        <XStack $sm={{ flexDirection: "column" }} paddingHorizontal="$4" space>
            <DemoCard
                animation="bouncy"
                size="$4"
                width={375}
                height={450}
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
                product={product}
            />
        </XStack>
    );
}
export function DemoCard(props: DemoCardProps) {
    return (
        <Card elevate size="$4" bordered {...props}>
            <Card.Header padded>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                    <View
                        style={{
                            flexDirection: "column",
                            borderWidth: 2,
                            borderColor: "transparent",
                        }}>
                        <H2>{props.product.productName}</H2>
                        <Paragraph theme="alt2">
                            {props.product.brand}
                        </Paragraph>
                    </View>
                    <NutriCircle score={props.product.nutriScore} />
                </View>
            </Card.Header>

            <View style={styles.imageRow}>
                <View style={styles.imageContainer}>
                    <Image
                        resizeMode="contain"
                        alignSelf="center"
                        source={{
                            uri: props.product.img
                                ? props.product.img
                                : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
                        }}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>
            </View>

            <Card.Footer padded>
                <XStack flex={1} style={{ flexDirection: "column" }}>
                    <Text>Rate this alternative: </Text>
                    <InteractiveStarRow providedRating={props.product.rating} />
                </XStack>

                <Button borderRadius="$10">Submit Rate</Button>
            </Card.Footer>

            <Card.Background>
                {/* <Image
                    resizeMode="contain"
                    alignSelf="center"
                    source={{
                        width: 300,
                        height: 300,
                        
                    }}
                /> */}
            </Card.Background>
        </Card>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        // borderWidth: 2,
        // borderColor: "red",
        flex: 1,
    },
    imageRow: {
        flexDirection: "row",
        flex: 1,
        width: "80%",
        alignSelf: "center",
    },
});
