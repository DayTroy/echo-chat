import React, { useEffect, useState } from "react";
import Card from "../shared/Card";
import { FAB, Portal, Button, Dialog, TextInput } from "react-native-paper";
import SearchBar from "../shared/SearchBar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

const Chats = () => {
  const [chats, setChats] = useState<{ name: string }[]>([]);

  const [chatTitle, setChatTitle] = useState("");

  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/get-chats/")
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const createChat = (chatTitle: string) => {
    axios
      .post("http://localhost:3000/create-chat/")
      .then((response) => {
        setChats((prevChats) => [...prevChats, { name: chatTitle }]);
      })
      .catch((error) => console.log(error));
    hideDialog();
  };
  const onPressFAB = () => {
    showDialog();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.fabContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Chats</Text>
        <SearchBar />
        <View style={styles.cards}>
          {chats.map((chat: any, index: number) => (
            <Card key={index} chat={chat} />
          ))}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={onPressFAB}
        color="black"
        animated={true}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Content>
            <Text style={styles.dialog__content}>
              Are you sure you want to create a chat?
            </Text>
            <TextInput
              contentStyle={styles.dialog__input}
              style={styles.dialog__input}
              label="Chat title"
              value={chatTitle}
              onChangeText={(chatTitle) => setChatTitle(chatTitle)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} labelStyle={styles.dialog__actions}>
              Cancel
            </Button>
            <Button
              onPress={() => createChat(chatTitle)}
              labelStyle={styles.dialog__actions}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 20,
    overflow: "hidden",
    paddingTop: 20,
  },
  title: {
    fontFamily: "Nunito_400Regular",
    fontSize: 32,
    fontWeight: "400",
    marginTop: 40,
    marginBottom: 20,
  },
  cards: {
    marginTop: 40,
  },
  fabContainer: {
    flexGrow: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: "white",
  },
  dialog: {
    backgroundColor: "rgba(39, 39, 39, 1)",
  },
  dialog__content: {
    color: "white",
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  dialog__input: {
    fontFamily: "Nunito_400Regular",
  },
  dialog__actions: {
    color: "white",
    fontFamily: "Nunito_400Regular",
  },
});

export default Chats;
