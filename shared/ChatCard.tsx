import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chat } from "./interfaces/Chat";
import { Card, Button } from "react-native-paper";
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
              style={styles.button}
              mode="contained"
              textColor="white"
              buttonColor="#44bc82"
              labelStyle={{fontFamily: "Nunito_400Regular"}}
            >
              {"Join"}
            </Button>
          </Card.Actions>
        ) : (
          <Card.Actions style={{marginTop: 10}}>
            <Button
              style={styles.button}
              mode="contained"
              textColor="white"
              buttonColor="#44bc82"
              labelStyle={{fontFamily: "Nunito_400Regular"}}
            >
              {"Join"}
            </Button>
            <Button
              style={styles.button}
              onPress={showEditDialog}
              mode="contained"
              textColor="white"
              buttonColor="#0279ff"
              labelStyle={{fontFamily: "Nunito_400Regular"}}
            >
              {"Edit"}
            </Button>
            <Button
              style={styles.button}
              onPress={showDeleteDialog}
              textColor="white"
              buttonColor="#ec5053"
              labelStyle={{fontFamily: "Nunito_400Regular"}}
            >
              Delete
            </Button>
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
  },
});

export default ChatCard;
