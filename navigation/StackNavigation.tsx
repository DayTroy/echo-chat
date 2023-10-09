import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../static/Register";
import Login from "../static/Login";
import TabsNavigation from "./TabsNavigation";
import Chat from "../static/Chat";
import Chats from "../static/Chats";
const Stack = createNativeStackNavigator();
import { User } from "firebase/auth";

interface MainStackProps {
  user: User | null;
}

const MainStack: React.FC<MainStackProps> = ({ user }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      {!user ? (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Group>
      ) : (
        <Stack.Screen name="Tabs" component={TabsNavigation} />
      )}
    </Stack.Navigator>
  );
};

const ChatsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export { MainStack, ChatsStack };
