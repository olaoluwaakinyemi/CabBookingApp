import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import CabsListScreen from "./screens/CabsListScreen";
import CabDetailScreen from "./screens/CabDetailScreen";
import MyCabsScreen from "./screens/MyCabsScreen";
import { BookingProvider } from "./context/BookingContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CabsList" component={CabsListScreen} />
      <Stack.Screen name="CabDetail" component={CabDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home-outline";
              } else if (route.name === "My Cab") {
                iconName = "car-outline";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            showLabel: false,
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="My Cab" component={MyCabsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BookingProvider>
  );
}
