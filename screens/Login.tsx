import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParams";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<LoginProps> = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Signin success");
          navigation.replace("Profile");
        })
        .catch((error) => Alert.alert("Login error", error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authorization</Text>
      <Image
        source={require("../assets/images/login-background.svg")}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        title="Sign in"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          borderRadius: 5,
        }}
        titleStyle={{
          fontWeight: "bold",
          fontSize: 23,
          fontFamily: "Nunito_400Regular",
        }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
        onPress={handleLogin}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Nunito_400Regular",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  image: {
    width: 80,
    height: 80,
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
    fontFamily: "Nunito_400Regular",
  },
  signUpText: {
    marginTop: 20,
    fontSize: 16,
    color: "black",
    fontFamily: "Nunito_400Regular",
  },
});

export default Login;
