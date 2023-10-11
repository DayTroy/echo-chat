import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import socket from "../utils";
import { styles } from "../utils/styles";
import { View, Pressable, FlatList, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Message from "../shared/Message";
import { getAuth } from "firebase/auth";


const Chat = ({ route }: { route: any }) => {
  const chatId = route.params?.chatId || "";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as any[]);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleNewMessage = () => {
    const hr =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    socket.emit("newChatMessage", {
      currentChatMessage: message,
      groupIdentifier: chatId,
      currentUser: {
        id: user?.uid, 
        email: user?.email,
      },
      timeData: { hr, mins },
    });
    setMessage("")
  };

  useLayoutEffect(() => {
    socket.emit("findGroup", chatId);
    socket.on("foundGroup", (roomChats) => setMessages(roomChats));
  }, []);

  useEffect(() => {
    socket.on("foundGroup", (roomChats) => setMessages(roomChats));
  }, [socket]);

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {messages[0] ? (
          <FlatList
            data={messages}
            renderItem={({ item }) => <Message item={item} user={user} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          value={message}
          contentStyle={{ fontFamily: "Nunito_400Regular" }}
          onChangeText={(value) => setMessage(value)}
          selectionColor={"#44bc82"}
          underlineColor="white"
          activeOutlineColor="#44bc82"
          textColor="white"
          activeUnderlineColor="#44bc82"
          style={{ backgroundColor: "#7E9181" }}
          mode="outlined"
          maxLength={1000}
        />
        <Button
          icon={"send"}
          mode="contained"
          onPress={handleNewMessage}
          textColor="white"
          buttonColor="#44bc82"
          labelStyle={{ fontFamily: "Nunito_400Regular" }}
          style={{
            justifyContent: "center", 
            alignItems: "center",
            marginLeft: 20,
            backgroundColor: "#44bc82",
          }}
          contentStyle={{ flexDirection: "row-reverse" }}
          >
          {"Send"}
        </Button>
      </View>
    </View>
  );
};

export default Chat;
