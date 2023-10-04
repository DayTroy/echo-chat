import Login from "./screens/Login";
import Register from "./screens/Register";
import Chats from "./screens/Chats";
import Profile from "./screens/Profile";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Profile: undefined;
    Chats: undefined;
  };
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  // Listen for authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    // Return a loading indicator or splash screen while initializing
    return null;
  }

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading
    return null;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Chats"
            component={Chats}
            options={{
              headerShown: false,
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require("./assets/icons/chat-icon.svg")}
                  style={{ tintColor: color, width: size, height: size }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require("./assets/icons/profile-icon.svg")}
                  style={{ tintColor: color, width: size, height: size }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
