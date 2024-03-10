import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home";
import Catalogue from "./Catalogue";
import ProductDetail from "./ProductDetail";
import SplashScreen from "./Splash";

const Stack = createNativeStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Catalogue" component={Catalogue} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    );
}
