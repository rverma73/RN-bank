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
import { Formik } from "formik";
import * as Yup from "yup";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import db from "../firebase.config";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  collection,
  doc,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
const validationSchema = Yup.object().shape({
  email: Yup.string().required("please! enter email?").email("Invalid email"),
  password: Yup.string()
    .required()
    .min(4, "too short, must be at least 4 character"),
  accountnumber: Yup.string().required("please! enter accountnumber"),
});

const SignIn = ({ navigation }) => {
  // const [email, setEmail] = React.useState("Useless Text");
  // const [password, setPassword] = React.useState("");
  const [val, setVal] = React.useState({});
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const colRef = collection(db, "banking-profiles");
    onSnapshot(colRef, (QuerySnapshot) => {
      const data = [];
      QuerySnapshot.forEach((doc) => {
        const { name, email, phone, password, address, PAN, balance } =
          doc.data();
        data.push({
          accountnumber: doc.id,
          name,
          email,
          phone,
          password,
          address,
          PAN,
          balance,
        });
      });
      setUsers(data);
      console.log(users);
    });
  }, [val]);
  let userlogedin = {};
  function checkLogin(values) {
    for (let x of users) {
      console.log(
        typeof(x.accountnumber), typeof(values.accountnumber)
      );
      if (
        x.accountnumber == values.accountnumber &&
        x.email == values.email &&
        x.password == values.password
      ) {
        userlogedin = x;
        return true;
      }
    }
    return false;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/profile-icon.jpeg")}
          style={styles.image}
        />
        <Formik
          initialValues={{ accountnumber: "", email: "", password: "" }}
          onSubmit={(values) => {
            setVal(values);
            if (checkLogin(values) === true) {
              navigation.navigate("Dashboard", { userlogedin });
            } else alert("Invalid credentials");
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ alignItems: "center" }}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("accountnumber")}
                onBlur={handleBlur("accountnumber")}
                value={values.accountnumber}
                placeholder="Account Number"
              />

              {errors.email && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.accountnumber}
                </Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="HSBC@email.com"
              />

              {errors.email && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.email}
                </Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
                placeholder="Password"
              />

              {errors.password && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ fontSize: 20, color: "white" }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("open savings account")}
      >
        <Text style={{ fontSize: 20, color: "red" }}>open savings account</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 7,
    paddingLeft: 20,
    width: 300,
    borderRadius: 20,
    backgroundColor: "#f0f1f2",
  },
  button: {
    backgroundColor: "#051559",
    padding: 10,
    marginTop: 10,
    width: 150,
    borderRadius: 20,
    margin: 12,

    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
});
