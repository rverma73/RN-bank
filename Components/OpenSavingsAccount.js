import * as React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
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
  confirmpassword: Yup.string()
    .required()
    .min(4, "too short, must be at least 4 character"),
  address: Yup.string().required(),
  PAN: Yup.string().required().min(12, "Enter Valid PAN"),
});

import { addDoc, collection } from "firebase/firestore";
import db from "../firebase.config";

const OpenSavingsAccount = () => {
  async function AddUser(val) {
    // Add a new document with a generated id.
    await addDoc(collection(db, "banking-profiles"), {
      name: val.name,
      email: val.email,
      phone: val.phone,
      password: val.password,
      address: val.address,
      PAN: val.PAN,
      balance: 0,
    })
      .then(() => {
        alert(`Savings Account Created Successfully!}`);

        return navigation.navigate("SignIn");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
    <ScrollView>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          password: "",
          confirmpassword: "",
          address: "",
          PAN: "",
        }}
        onSubmit={(values) => AddUser(values)}
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
              placeholder="Name"
            />
            {errors.name && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.name}
                </Text>
              </View>
            )}
            <Text>PAN Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("PAN")}
              onBlur={handleBlur("PAN")}
              value={values.PAN}
              placeholder="PAN"
            />
            {errors.PAN && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>{errors.PAN}</Text>
              </View>
            )}
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              placeholder="Password"
            />
            {errors.password && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              </View>
            )}
            <Text>Confirm Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("confirmpassword")}
              onBlur={handleBlur("confirmpassword")}
              value={values.confirmpassword}
              placeholder="confirm Password"
            />
            {errors.confirmpassword && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.confirmpassword}
                </Text>
              </View>
            )}
            <Text>E-mail</Text>
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
            <Text>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              placeholder="Address"
            />
            {errors.address && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.address}
              </Text>
            )}
            <Text>Phone</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={{ fontSize: 20, color: "white" }}>
                open saving account
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <TextInput
    //     style={styles.input}
    //     onChangeText={setName}
    //     placeholder="name"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     onChangeText={setPassword}
    //     placeholder="password"
    //     secureTextEntry={true}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     onChangeText={setEmail}
    //     placeholder="Email"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     onChangeText={setPhone}
    //     placeholder="phone"
    //     keyboardType="numeric"
    //   />
    //   <TouchableOpacity style={styles.button} onPress={AddUser}>
    //     <Text style={{ fontSize: 20 }}>Sign Up</Text>
    //   </TouchableOpacity>
    // </View>
  );
};
export default OpenSavingsAccount;
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
