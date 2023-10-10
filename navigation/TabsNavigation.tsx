import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../static/Profile";
import { ChatsStack } from "./StackNavigation";
import Icon from "react-native-vector-icons/AntDesign";

const Tabs = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case "Chats":
      iconName = "wechat";
      break;
    case "Profile":
      iconName = "user";
      break;
  }
  return <Icon name={iconName} color={color} size={24} />;
};

const TabsNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        tabBarActiveTintColor: "#44bc82",
        headerShown: false,
        tabBarLabelStyle: {fontFamily: "Nunito_400Regular", fontSize: 14},
      })}
    >
      <Tabs.Screen name="Chats" component={ChatsStack} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
