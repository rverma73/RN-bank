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

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
const Dashboard = ({ navigation, route }) => {
  //console.log(route.params.userlogedin.img);
  const userlogedin = route.params.userlogedin;

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Sign out</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {userlogedin ? (
          <View>
            <View>
              <Text>Hi, {userlogedin.name}</Text>
              <Text>email:- {userlogedin.email}</Text>
            </View>
            <View>
              <Text>Account Number {userlogedin.accountnumber}</Text>
            </View>
            <View style={{ backgroundColor: "#eef26b", alignItems: "center" }}>
              <Text>{userlogedin.balance}</Text>
            </View>

            <Text>Phone:- {userlogedin.phone}</Text>
            <Text>PAN number:- {userlogedin.PAN}</Text>
            <Text>address:- {userlogedin.address}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Send Money", { userlogedin })}
            >
              <Text style={{ fontSize: 14 }}>transfer money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("update profile", { userlogedin })
              }
            >
              <Text style={{ fontSize: 14 }}>Update profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text>error</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5eaeeb",
    padding: 10,
    marginTop: 15,
  },

  tinyLogo: {
    width: 100,
    height: 100,
  },
});
