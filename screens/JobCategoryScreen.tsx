import React from "react"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
} from "react-native"
import { Text, View } from "../components/Themed"
import Separator from "../components/BuyComponents/Separator"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import CategoryComponent from "../components/BuyComponents/CategoryComponent"
import CategoryComponentPink from "../components/SellComponents/CategoryComponentPink"
import Categories from "../constants/Categories"
import { GenericParams } from "../types"

export default function JobCategoryScreen({ navigation, route }: GenericParams) {
	const isPink: boolean = route.name.substr(route.name.length - 4) === "Pink"
	const Category = isPink ? CategoryComponentPink : CategoryComponent

	function goto(categoryType: string) {
		if (isPink) navigation.navigate("JobDescriptionScreenPink", categoryType)
		else navigation.navigate("JobDescriptionScreen", categoryType)
	}

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.jobsArea}>
				<ScrollView>
					{/* Title */}
					<Text style={styles.title}>Wybierz Kategorię</Text>
					<Separator />

					{Categories.map((cat) => {
						return (
							<TouchableOpacity key={cat.id} onPress={() => goto(cat.id)}>
								<Category categoryType={cat.label} />
							</TouchableOpacity>
						)
					})}
				</ScrollView>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	orderButton: {
		backgroundColor: "red",
		padding: "6%",
		marginTop: "5%",
		width: "100%",
		borderRadius: 25,
		display: "flex",
		justifyContent: "space-between",
	},
	orderOffer: {
		flexDirection: "row",
	},
	buttonLargeText: {
		fontSize: 30,
		paddingBottom: "10%",
		color: "white",
		fontWeight: "600",
	},
	buttonDescription: {
		fontSize: 15,
		color: "white",
	},

	searchCategoriesContainer: {
		display: "flex",
		flexDirection: "row",
	},

	searchBox: {
		backgroundColor: "#eee",
		marginTop: 5,
		padding: 5,
		paddingLeft: 20,
		width: "75%",
		marginRight: "5%",
		borderRadius: 100,
		height: 35,
		color: "white",
	},

	categories: {
		backgroundColor: "#eee",
		marginTop: 5,
		width: "20%",
		borderRadius: 18,
		height: 35,
		alignItems: "center",
		paddingTop: 2,
	},

	title: {
		marginTop: 25,
		marginBottom: 5,
		//	marginLeft: 27,
		fontSize: 32,
		//	alignSelf: 'flex-start',
		fontWeight: "bold",
		textAlign: "left",
	},
	whitespace: {
		marginTop: 20,
		height: 1,
		width: "80%",
	},
	jobsArea: {
		width: "90%",
		flex: 1,
	},
})
