import React, { useEffect, useState } from "react";
import ChatCard from "../shared/ChatCard";
import { FAB, Portal } from "react-native-paper";
import SearchBar from "../shared/SearchBar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { getAuth } from "firebase/auth";
import { Chat } from "../shared/interfaces/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  setChats,
  createChat,
  editChat,
  deleteChat,
} from "../core/chat/chatActions";
import { RootState } from "../core/rootState";
import CustomDialog from "../shared/CustomDialog";
import socket from "../utils";


const Chats = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);

  const auth = getAuth();
  const user = auth.currentUser;

  const [chatTitle, setChatTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  useEffect(() => {
    dispatch(setChats() as any);
  }, [dispatch]);

  const handleCreateChat = async () => {
    socket.emit("newChat", chatTitle);
    dispatch(createChat({ uid: user?.uid, chatTitle }) as any);
    hideCreateDialog();
  };

  const handleEditChat = () => {
    dispatch(
      editChat({ chatId: selectedChat?.id, updatedChatTitle: chatTitle }) as any
    );
    hideEditDialog();
  };

  const handleDeleteChat = () => {
    dispatch(
      deleteChat({
        chatId: selectedChat?.id,
        updatedChatTitle: chatTitle,
      }) as any
    );
    hideDeleteDialog();
  };

  const onPressFAB = () => {
    setChatTitle("");
    showCreateDialog();
  };

  const showCreateDialog = () => setCreateDialogVisible(true);

  const hideCreateDialog = () => {
    setCreateDialogVisible(false);
    setChatTitle("");
  };

  const showEditDialog = (chat: Chat) => {
    return () => {
      setChatTitle(chat.title);
      setSelectedChat(chat);
      setEditDialogVisible(true);
    };
  };

  const hideEditDialog = () => {
    setEditDialogVisible(false);
    setChatTitle("");
  };

  const showDeleteDialog = (chat: Chat) => {
    return () => {
      setChatTitle(chat.title);
      setSelectedChat(chat);
      setDeleteDialogVisible(true);
    };
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setChatTitle("");
  };

  const filteredChats = chats.filter((chat: Chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.fabContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Chats</Text>
        <SearchBar setSearchQuery={setSearchQuery} />
        <View style={styles.cards}>
          {filteredChats.map((chat: Chat, index: number) => (
            <ChatCard
              key={index}
              chat={chat}
              isUserChat={user?.uid === chat.creatorID}
              showEditDialog={showEditDialog(chat)}
              showDeleteDialog={showDeleteDialog(chat)}
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
        <CustomDialog
          visible={createDialogVisible}
          dialogContent="Are you sure you want to create a chat?"
          chatTitle={chatTitle}
          setChatTitle={(newChatTitle: string) => setChatTitle(newChatTitle)}
          hideDialog={hideCreateDialog}
          handleDialogAction={handleCreateChat}
          isDeleteType={false}
        />

        <CustomDialog
          visible={editDialogVisible}
          dialogContent="Are you sure you want to edit the chat?"
          chatTitle={chatTitle}
          setChatTitle={(newChatTitle: string) => setChatTitle(newChatTitle)}
          hideDialog={hideEditDialog}
          handleDialogAction={handleEditChat}
          isDeleteType={false}
        />

        <CustomDialog
          visible={deleteDialogVisible}
          dialogContent="Are you sure you want to delete the chat?"
          chatTitle={chatTitle}
          setChatTitle={(newChatTitle: string) => setChatTitle(newChatTitle)}
          hideDialog={hideEditDialog}
          handleDialogAction={handleDeleteChat}
          isDeleteType={true}
        />
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
    overflow: "hidden",
    paddingTop: 20,
    paddingHorizontal: 20,
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
});

export default Chats;
