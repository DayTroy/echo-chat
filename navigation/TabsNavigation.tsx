import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../static/Profile";
import { ChatsStack } from "./StackNavigation";

const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="ChatsTab"
        component={ChatsStack}
        options={({ route }) => ({
          tabBarShowLabel: false,
        })}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={Profile}
        options={({ route }) => ({
          tabBarShowLabel: false,
        })}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
