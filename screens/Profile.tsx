import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@rneui/themed";
import { getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from Expo
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParams";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

interface ProfileProps {
  navigation: LoginScreenNavigationProp;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [avatar, setAvatar] = useState(
    "https://randomuser.me/api/portraits/men/36.jpg"
  );

  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
    } else {
      console.error("User not authenticated");
    }

    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    })();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((error) => Alert.alert("Login error", error.message));
  };

  const handleAvatarPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets?.[0];

      if (selectedImage && selectedImage.uri) {
        setAvatar(selectedImage.uri);
      } else {
        // Handle the case where 'uri' is not available
        console.error("Selected image has no URI");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        size={150}
        rounded
        source={{ uri: avatar }}
        onPress={handleAvatarPress}
      />
      <Text style={styles.user}>{user ? user.email : "Unknown Email"}</Text>
      <Button
        title="Log out"
        buttonStyle={{
          borderColor: "rgba(199, 43, 98, 1)",
        }}
        type="outline"
        raised
        titleStyle={{ color: "rgba(199, 43, 98, 1)" }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={handleLogout}
      />
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
  user: {
    fontFamily: "Nunito_400Regular",
    fontSize: 20,
    marginTop: 20,
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

export default Profile;
