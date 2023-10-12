import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
export default function Message({ item, user }) {
	const status = item.user !== user;
	return (
		<View>
			<View
				style={
					status
						? styles.messageWrapper
						: [styles.messageWrapper, { alignItems: "flex-end" }]
				}
			>
				<View style={{ flexDirection: "row", alignItems: "flex-start" }}>
					
					<Ionicons
						name='person-circle-outline'
						size={30}
						color='black'
						style={styles.messageAvatar}
					/>
					<View
						style={
							status
								? styles.message
								: [styles.message, { backgroundColor: "rgb(194, 243, 194)" }]
						}
					>
						<Text style={{color: "#F0FFF1", fontFamily: "Nunito_400Regular", marginTop: -10}}>{user.email}</Text>
						<Text style={{color: "#F0FFF1", fontFamily: "Nunito_400Regular", marginTop: 10}}>{item.text}</Text>
					</View>
				</View>
				<Text style={{ marginLeft: 40, fontFamily: "Nunito_400Regular"}}>{item.time}</Text>
			</View>
		</View>
	);
}


export const styles = StyleSheet.create({
	messageWrapper: {
		width: "100%",
		alignItems: "flex-start",
		marginBottom: 15,
	},
	message: {
		maxWidth: "50%",
		backgroundColor: "#44bc82",
		color: "white",
		padding: 15,
		borderRadius: 10,
		marginLeft: 5,
		maxWidth: 250,
		marginBottom: 2,
	},
	messageAvatar: {
		marginRight: 5,
		alignSelf: "flex-end",
	},
});