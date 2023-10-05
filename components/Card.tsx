import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";

const Card = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>Chat</Text>
          <Text style={styles.subtitle}>Members</Text>
        </View>
        <Button
          title="Join"
          buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
          containerStyle={{
            width: 100,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ color: "white", marginHorizontal: 20, fontFamily: "Nunito_400Regular"}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
    fontSize: 16,
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
  },
});

export default Card;
