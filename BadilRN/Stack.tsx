import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home";
import Catalogue from "./Catalogue";

const Stack = createNativeStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Catalogue" component={Catalogue} />
        </Stack.Navigator>
    );
}
