import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Chat } from "./interfaces/Chat";
import { Card, IconButton, Button } from "react-native-paper";
interface CardProps {
  chat: Chat;
  isUserChat: boolean;
  showEditDialog: () => void;
  showDeleteDialog: () => void;
}

const ChatCard: React.FC<CardProps> = ({
  chat,
  isUserChat,
  showEditDialog,
  showDeleteDialog,
}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View>
          <Text style={styles.title}>{chat.title}</Text>
        </View>
        {!isUserChat ? (
          <Card.Actions>
            <Button
              icon={"login"}
              style={styles.button}
              mode="contained"
              textColor="white"
              buttonColor="#44bc82"
              labelStyle={{ fontFamily: "Nunito_400Regular" }}
            >
              {"Join"}
            </Button>
          </Card.Actions>
        ) : (
          <Card.Actions
            style={{ marginTop: 30, alignSelf: "flex-start", padding: 0 }}
          >
            <Button
              icon={"login"}
              style={styles.button}
              mode="contained"
              textColor="white"
              buttonColor="#44bc82"
              labelStyle={{ fontFamily: "Nunito_400Regular" }}
            >
              {"Join"}
            </Button>
            <Button
              icon={"update"}
              style={{ ...styles.button, marginLeft: 10 }}
              onPress={showEditDialog}
              mode="contained"
              textColor="white"
              buttonColor="#0279ff"
              labelStyle={{ fontFamily: "Nunito_400Regular" }}
            >
              {"Edit"}
            </Button>
            <IconButton
              icon="delete"
              size={20}
              iconColor="white"
              style={{ ...styles.button, marginLeft: 20 }}
              containerColor="#ec5053"
              onPress={showDeleteDialog}
            />
          </Card.Actions>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 20,
  },
  card: {
    padding: 20,
    width: 300,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Nunito_400Regular",
    fontSize: 24,
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
  },
  button: {
    borderRadius: 8,
    fontFamily: "Nunito_400Regular",
    marginLeft: 0,
  },
});

export default ChatCard;
