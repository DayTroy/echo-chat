import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Profile: undefined;
  };
  const Stack = createNativeStackNavigator<RootStackParamList>();
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
      <Stack.Navigator>
        {user ? (
          <Stack.Group>
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
