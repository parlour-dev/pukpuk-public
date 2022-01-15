import React from "react"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import Colors from "../../constants/Colors"
import { Text, View } from "../Themed"

export default function JobOffer({
	price,
	name,
	category,
}: {
	price: string
	name: string
	category: string
}) {
	return (
		<View>
			<View style={styles.outsideContainer}>
				<View style={styles.jobDescNameContainer}>
					<Text style={styles.nameFont}>{name}</Text>
					<Text style={styles.descFont}>{category}</Text>
				</View>

				<View style={styles.priceContainer}>
					<Text style={styles.priceFont}>{price}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	outsideContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		backgroundColor: Colors.orangeScreen.primaryColor,
		marginRight: "5%",
		marginBottom: "5%",
		padding: "1%",
		borderRadius: 18,
	},
	jobDescNameContainer: {
		flexDirection: "column",
		backgroundColor: "rgba(0,0,0,0)",
		marginLeft: "7%",
		marginRight: "2%",
		width: "60%",
	},
	priceContainer: {
		backgroundColor: "rgba(0,0,0,0)",
	},
	descFont: {
		fontSize: 17,
		color: "#FFF",
	},
	nameFont: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#FFF",
	},
	priceFont: {
		fontSize: 40,
		color: "#FFF",
		fontWeight: "bold",
	},
})
