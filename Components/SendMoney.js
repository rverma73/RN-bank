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
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import db from "../firebase.config";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";

const SendMoney = ({ navigation, route }) => {
  //console.log(route.params.userlogedin.img);
  const userlogedin = route.params.userlogedin;
  //console.log(data);
  const accountnumbersender = route.params.userlogedin.accountnumber;
  console.log(accountnumbersender);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const colRef = collection(db, "banking-profiles");
    onSnapshot(colRef, (QuerySnapshot) => {
      const data = [];
      QuerySnapshot.forEach((doc) => {
        const { name, balance } = doc.data();
        data.push({
          accountnumber: doc.id,
          name,
          balance,
        });
      });
      setUsers(data);
    });
  }, []);
  let accountnumberreciver = {};
  function check(values) {
    for (let x of users) {
      if (x.accountnumber == values.reciveraccount) {
        accountnumberreciver = x;
        return true;
      }
    }
    return false;
  }

  const validationSchema = Yup.object().shape({
    reciveraccount: Yup.string().required("please! enter name"),
  });
  let val = {};
  async function Update() {
    const reciver = doc(
      db,
      "banking-profiles",
      accountnumberreciver.accountnumber
    );
    await updateDoc(reciver, {
      balance: parseInt(accountnumberreciver.balance) + parseInt(val.sendmoney),
    })
      .then(async () => {
        const sender = doc(db, "banking-profiles", accountnumbersender);
        await updateDoc(sender, {
          balance: parseInt(userlogedin.balance) - parseInt(val.sendmoney),
        })
          .then(() => {
            userlogedin.balance =
              parseInt(userlogedin.balance) - parseInt(val.sendmoney);
            // return navigation.navigate("Dashboard", { userlogedin });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Formik
        initialValues={{
          senderaccount: accountnumbersender,
          reciveraccount: "",
          sendmoney: 0,
        }}
        onSubmit={(values) => {
          if (check(values)) {
            val = values;
            Update();
            alert("Send");
            return navigation.navigate("Dashboard", { userlogedin });
          } else {
            return alert("Account Number does not exist");
          }
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
            <Text>Sender's Account Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("senderaccount")}
              onBlur={handleBlur("senderaccount")}
              value={values.senderaccount}
              placeholder="sender's Account Number"
            />

            <Text>Reciver's Account Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("reciveraccount")}
              onBlur={handleBlur("reciveraccount")}
              value={values.reciveraccount}
              placeholder="Reciver's Account Number"
            />

            <Text>send Money</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("sendmoney")}
              onBlur={handleBlur("sendmoney")}
              value={values.sendmoney}
              placeholder="send money"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={{ fontSize: 20, color: "white" }}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};
export default SendMoney;

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
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
