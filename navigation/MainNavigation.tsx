import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./StackNavigation";
import { User } from "firebase/auth";
interface MainNavigationProps {
  user: User | null;
}


const MainNavigation:React.FC<MainNavigationProps> = ({user}) => {
  return (
    <NavigationContainer>
      <MainStack user={user} />
    </NavigationContainer>
  );
};

export default MainNavigation;
