import React, { useEffect, useLayoutEffect, useState } from "react";
import socket from "../utils";
import { View, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Message from "../shared/components/Message";
import { getAuth } from "firebase/auth";

const Chat = ({ route }: { route: any }) => {
  const chatId = route.params?.chatId || "";
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

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
    setMessage("");
  };

  useLayoutEffect(() => {
    socket.emit("findGroup", chatId);
    socket.on("foundGroup", (roomChats: string[]) => setMessages(roomChats));
  }, []);

  useEffect(() => {
    socket.on("foundGroup", (roomChats: string[]) => setMessages(roomChats));
  }, [socket]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 10 }}>
        {messages[0] ? (
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Message item={item} user={item.currentUser} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View
        style={{
          width: "100%",
          minHeight: 100,
          backgroundColor: "white",
          paddingVertical: 30,
          paddingHorizontal: 15,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
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
