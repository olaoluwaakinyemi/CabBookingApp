import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CabsListScreen from "./screens/CabsListScreen";
import CabDetailScreen from "./screens/CabDetailScreen";
import MyCabsScreen from "./screens/MyCabsScreen";
import { BookingProvider } from "./context/BookingContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CabsList"
        component={CabsListScreen}
        options={{ title: "Cabs List" }}
      />
      <Stack.Screen
        name="CabDetail"
        component={CabDetailScreen}
        options={{ title: "Cab Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ title: "Home" }}
          />
          <Tab.Screen
            name="My Cab"
            component={MyCabsScreen}
            options={{ title: "My Cabs" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BookingProvider>
  );
}
