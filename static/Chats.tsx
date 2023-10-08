import React, { useEffect, useState } from "react";
import Card from "../shared/Card";
import { FAB, Portal, Button, Dialog, TextInput } from "react-native-paper";
import SearchBar from "../shared/SearchBar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { Chat } from "../shared/interfaces/Chat";

import { useDispatch, useSelector } from "react-redux";
import { createChat, editChat, setChats } from "../core/chat/chatActions";
import { RootState } from "../core/rootState";

const Chats = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);

  const auth = getAuth();
  const user = auth.currentUser;

  const [chatTitle, setChatTitle] = useState("");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [visible, setVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/get-chats/")
      .then((response) => {
        dispatch(setChats(response.data));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCreateChat = async () => {
    dispatch(createChat({ uid: user?.uid, chatTitle }));  
    hideDialog();
  };
  

  const handleEditChat = () => {
    dispatch(editChat({ chatId: selectedChat?.id, updatedChatTitle: chatTitle }));
    hideEditDialog();
  };

  const onPressFAB = () => {
    setChatTitle("");
    showDialog();
  };

  const hideDialog = () => {
    setVisible(false);
    setChatTitle("");
  };

  const showDialog = () => setVisible(true);

  const hideEditDialog = () => {
    setEditDialogVisible(false);
    setChatTitle("");
  };

  const showEditDialog = (chat: Chat) => {
    return () => {
      setChatTitle(chat.title);
      setSelectedChat(chat);
      setEditDialogVisible(true);
    };
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
          {chats.map((chat: Chat, index: number) => (
            <Card
              key={index}
              chat={chat}
              isUserChat={user?.uid === chat.creatorID}
              showEditDialog={showEditDialog(chat)}
            />
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
        {/* Create Chat Dialog */}
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
              onChangeText={(newChatTitle) => setChatTitle(newChatTitle)}
              maxLength={30}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} labelStyle={styles.dialog__actions}>
              Cancel
            </Button>
            <Button onPress={handleCreateChat} labelStyle={styles.dialog__actions}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* Edit Chat Dialog */}
        <Dialog
          visible={editDialogVisible}
          onDismiss={hideEditDialog}
          style={styles.dialog}
        >
          <Dialog.Content>
            <Text style={styles.dialog__content}>
              Edit the chat title below:
            </Text>
            <TextInput
              contentStyle={styles.dialog__input}
              style={styles.dialog__input}
              label="Chat title"
              value={chatTitle}
              onChangeText={(newChatTitle) => setChatTitle(newChatTitle)}
              maxLength={30}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={hideEditDialog}
              labelStyle={styles.dialog__actions}
            >
              Cancel
            </Button>
            <Button onPress={handleEditChat} labelStyle={styles.dialog__actions}>
              Save
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
