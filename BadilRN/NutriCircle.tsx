import { Circle, Text } from "tamagui";

export default function NutriCircle({ score }: { score: string }) {
    let bgColour;
    switch (score.toLowerCase()) {
        case "a":
            bgColour = "#22823f";
            break;
        case "b":
            bgColour = "#86bc2b";
            break;
        case "c":
            bgColour = "#facc03";
            break;
        case "d":
            bgColour = "#ee8100";
            break;
        case "e":
            bgColour = "#e63c06";
            break;
        default:
            bgColour = null;
    }

    return (
        <Circle size={50} backgroundColor={bgColour!}>
            <Text>{score}</Text>
        </Circle>
    );
}
