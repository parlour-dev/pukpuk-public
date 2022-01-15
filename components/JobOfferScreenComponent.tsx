import React from "react"
import { Text, View } from "./Themed"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
} from "react-native"

type NewOrderCategoryProps = {
	jobVariant: string
	price: number
	isPerHour: boolean
	color: string
}

const NewOrderCategory = ({
	jobVariant,
	price,
	isPerHour,
	color,
}: NewOrderCategoryProps) => {
	const actualBgcolor = StyleSheet.create({
		container: { backgroundColor: color },
	})
	const containerStyle = StyleSheet.compose(
		styles.outsideContainer,
		actualBgcolor.container
	)

	const priceText = price.toString() + " " + (isPerHour ? "zł za godz." : "zł")

	return (
		<>
			<View>
				<View style={containerStyle}>
					<View style={styles.jobDescNameContainer}>
						<Text style={styles.nameFont}>{jobVariant}</Text>
					</View>

					<View style={styles.priceContainer}>
						<Text style={styles.priceFont}>{priceText}</Text>
					</View>
				</View>
			</View>
		</>
	)
}

export default NewOrderCategory

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	outsideContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginRight: "5%",
		marginBottom: "5%",
		borderRadius: 25,
		padding: 20,
		height: 80,
		backgroundColor: "black",
	},
	jobDescNameContainer: {
		flexDirection: "column",
		backgroundColor: "rgba(0,0,0,0)",
	},
	priceContainer: {
		backgroundColor: "rgba(0,0,0,0)",
	},

	nameFont: {
		fontSize: 35,
		color: "white",
	},
	priceFont: {
		fontSize: 35,
		fontWeight: "bold",
		color: "white",
	},
})
