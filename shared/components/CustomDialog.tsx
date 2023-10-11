import React from "react";
import { Button, Dialog, TextInput } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

interface CustomDialogProps {
  visible: boolean;
  dialogContent: string;
  chatTitle: string;
  setChatTitle: (newChatTitle: string) => void;
  hideDialog: () => void;
  handleDialogAction: () => void;
  isDeleteType: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  visible,
  dialogContent,
  chatTitle,
  hideDialog,
  setChatTitle,
  handleDialogAction,
  isDeleteType,
}) => {
  return (
    <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
      <Dialog.Content>
        <Text style={styles.dialog__content}>{dialogContent}</Text>
        {!isDeleteType && (
          <TextInput
            contentStyle={styles.dialog__input}
            style={styles.dialog__input}
            label="Chat title"
            value={chatTitle}
            onChangeText={setChatTitle}
            maxLength={30}
            placeholderTextColor={"black"}
            selectionColor={"#44bc82"}
            underlineColor="white"
            activeOutlineColor="#44bc82"
            activeUnderlineColor="#44bc82"
          />
        )}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog} labelStyle={styles.dialog__actions}>
          {isDeleteType ? "No" : "Cancel"}
        </Button>
        <Button
          onPress={handleDialogAction}
          labelStyle={styles.dialog__actions}
        >
          {isDeleteType ? "Yes" : "Save"}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
  },
  dialog__content: {
    color: "black",
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  dialog__input: {
    backgroundColor: "#e0e0e0",
    color: "black",
    fontFamily: "Nunito_400Regular",
    borderRadius: 8,
  },
  dialog__actions: {
    color: "black",
    fontFamily: "Nunito_400Regular",
  },
});

export default CustomDialog;
