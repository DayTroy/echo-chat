import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";

interface Chat {
  id: string,
  title: string,
  creatorID: string | undefined
}

interface CardProps {
  chat: Chat;
  isUserChat: boolean;
  showEditDialog: () => void;
}

const Card: React.FC<CardProps> = ({ chat, isUserChat, showEditDialog }) => {
  return (
    <View style={styles.container} >
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>{chat.title}</Text>
        </View>
        <Button
          title="Join"
          buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
          containerStyle={{
            width: 200,
            height: 40,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{
            color: "white",
            marginHorizontal: 20,
            fontFamily: "Nunito_400Regular",
          }}
        />
        {isUserChat && (
          <>
            <Button
              title="Edit"
              onPress={showEditDialog}
              buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
              containerStyle={{
                width: 200,
                height: 40,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{
                color: "white",
                marginHorizontal: 20,
                fontFamily: "Nunito_400Regular",
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 20,
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "black",
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontFamily: "Nunito_400Regular",
    fontSize: 24,
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
  },
});

export default Card;
