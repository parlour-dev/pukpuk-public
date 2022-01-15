import React from "react"
import { Text, View } from "../Themed"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
} from "react-native"

const NewOrderCategory = ({ categoryType }) => {
	return (
		<>
			<ScrollView>
				<View style={styles.categoryContainer}>
					<Text style={styles.categoryTitle}>{categoryType}</Text>
				</View>
			</ScrollView>
		</>
	)
}

export default NewOrderCategory

const styles = StyleSheet.create({
	categoryContainer: {
		marginTop: 10,
		marginBottom: 2,
		width: "100%",
		height: 80,
		backgroundColor: "#ef4600",
		borderRadius: 25,
		padding: 20,
	},

	categoryTitle: {
		color: "white",
		fontWeight: "bold",
		fontSize: 30,
	},
})
