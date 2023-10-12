import React, { useEffect, useState } from "react";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import { PaperProvider } from 'react-native-paper';
import MainNavigation from "./navigation/MainNavigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import store from "./core/store";
const App = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });
    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Provider store={store}>
        <MainNavigation user={user} />
      </Provider>
    </PaperProvider>
  );
};

export default App;
