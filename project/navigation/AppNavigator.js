import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import FoodDetailScreen from "../screens/FoodDetailScreen";
import CategoryScreen from "../screens/CategoryScreen";
import RestaurantListScreen from "../screens/RestaurantListScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";

import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
       <Stack.Screen name="Onboard" component={OnboardingScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
       <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
      
      {/* <Stack.Screen name="FoodDetail" component={FoodDetailScreen} /> */}
    </Stack.Navigator>
  );
}