import * as React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./Components/Dashboard.js";
import Otherdetails from "./Components/Otherdetails.js";
import SignIn from "./Components/SignIn";
import SendMoney from "./Components/SendMoney";
import HomeScreen from "./Components/HomeScreen";
import OpenSavingsAccount from "./Components/OpenSavingsAccount";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"HomeScreen"}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="open savings account"
          component={OpenSavingsAccount}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen
          name="Send Money"
          component={SendMoney}
        />
        <Stack.Screen name="update profile" component={Otherdetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
