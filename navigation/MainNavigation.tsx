import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./StackNavigation";
import { User } from "firebase/auth"; // Make sure to import the correct type
interface MainNavigationProps {
  user: User | null; // Adjust the type according to your actual User type
}


const MainNavigation:React.FC<MainNavigationProps> = ({user}) => {
  return (
    <NavigationContainer>
      <MainStack user={user} />
    </NavigationContainer>
  );
};

export default MainNavigation;
