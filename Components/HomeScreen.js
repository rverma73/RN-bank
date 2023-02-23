import * as React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image source={require("../assets/HSBC1.png")} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={{ fontSize: 20 }}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("open savings account")}
      >
        <Text style={{ fontSize: 20, alignItems: "center" }}>
          create account
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5eaeeb",
    padding: 10,
    borderRadius: 20,
    width: 300,
    marginTop: 13,
    alignItems: "center",
  },
  image: {
    height: 100,
    with: 500,
    marginBottom: 80,
  },
});
