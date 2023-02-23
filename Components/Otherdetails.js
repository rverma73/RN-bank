import * as React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from "react-native-formik";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("please! enter name"),
  email: Yup.string().required("please! enter email?").email("Invalid email"),
  password: Yup.string()
    .required()
    .min(4, "too short, must be at least 4 character"),
  phone: Yup.string().required(),
  address: Yup.string().required(),
});

import {
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase.config";
const Otherdetails = ({ navigation, route }) => {
  const userlogedin = route.params.userlogedin;

  async function UpdateUser(val) {
    const ref = doc(db, "banking-profiles", userlogedin.accountnumber);
    await updateDoc(ref, {
      name: val.name,
      phone: val.phone,
      email: val.email,
      password: val.password,
      address: val.address,
    })
      .then(() => {
        navigation.navigate("Dashboard", { userlogedin });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const showConfirmDialog = () => {
    return alert(
      "Are your sure?",
      "Are you sure you want to Delete this User? This action cannot be undone!",
      [
        {
          text: "Yes",
          onPress: () => {
            DeleteUser();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  async function DeleteUser() {
    const ref = doc(db, "banking-profiles", data.accountnumber);
    await deleteDoc(ref)
      .then(() => {
        navigation.navigate("HomeScreen");
        alert("Account Deleted Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}
    >
      <Formik
        initialValues={{
          name: userlogedin.name,
          phone: userlogedin.phone,
          email: userlogedin.mail,
          password: userlogedin.password,
          address: userlogedin.address,
        }}
        onSubmit={(values) => {
          UpdateUser(values);
          alert("Updated");
          navigation.navigate("Dashboard", { userlogedin });
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
          <View style={{ flex: 1, margin: 10 }}>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="name"
            />
            {errors.name && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.name}
                </Text>
              </View>
            )}
            <Text>email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="user@email.com"
            />

            {errors.email && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.email}
                </Text>
              </View>
            )}
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
            />
            {errors.password && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              </View>
            )}
            <Text>phone</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              placeholder="phone"
            />
            {errors.phone && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.phone}
                </Text>
              </View>
            )}
            <Text>address</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              placeholder="address"
            />
            {errors.address && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.address}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={{ fontSize: 20, color: "white" }}>Update</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity style={styles.button} onPress={showConfirmDialog}>
        <Text style={{ fontSize: 20, color: "white" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#051559",
    padding: 10,
    alignItems: "center",
  },
});
export default Otherdetails;
