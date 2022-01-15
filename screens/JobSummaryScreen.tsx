import React from "react"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
	Alert,
	DevSettings,
} from "react-native"
import { Text, View } from "../components/Themed"
import Separator from "../components/BuyComponents/Separator"
import { LinearGradient } from "expo-linear-gradient"

import { JobOfferData } from "../types"
import { addUserJobOfferData } from "../api/UserJobOfferData"
import Colors from "../constants/Colors"
import Global from "../globalState"
import { formatDate, resolveCategoryName } from "../api/Util"

export default function JobSummaryScreen({ route, navigation }) {
	const isPink: boolean = route.name.substr(route.name.length - 4) === "Pink"
	const screenColors = isPink ? Colors.pinkScreen : Colors.orangeScreen

	const {
		jobTitle,
		jobPrice,
		jobDescription,
		jobLocation,
		jobPhysicalRegion,
		category,
	} = route.params

	const date = Global.date
	const jobDate = formatDate(date)

	var categoryReadableName = resolveCategoryName(category)

	// Block empty inputs
	const checkIfInputsAreEmpty = () => {
		if (!jobTitle.trim()) {
			Alert.alert(
				"Zlecenie musi mieć tytuł",
				"Dodaj tytuł zlecenia",
				[
					{
						text: "Wróć do edycji",
						style: "cancel",
						// onPress={}
					},
				],
				{
					cancelable: true,
				}
			)
			return false
		}

		if (!jobPrice.trim()) {
			Alert.alert(
				"Zlecenie musi mieć cenę",
				"Ustal cenę zlecenia",
				[
					{
						text: "Wróć do edycji",
						style: "cancel",
						// onPress={}
					},
				],
				{
					cancelable: true,
				}
			)
			return false
		}

		if (date == {}) {
			Alert.alert(
				"Zlecenie musi mieć termin",
				"Dodaj termin zlecenia",
				[
					{
						text: "Wróć do edycji",
						style: "cancel",
						// onPress={}
					},
				],
				{
					cancelable: true,
				}
			)
			return false
		}

		if (!jobLocation.trim()) {
			Alert.alert(
				"Zlecenie musi mieć lokalizację",
				"Dodaj lokalizację zlecenia",
				[
					{
						text: "Wróć do edycji",
						style: "cancel",
						// onPress={}
					},
				],
				{
					cancelable: true,
				}
			)
			return false
		}

		return true
	}

	return (
		<>
			<View style={styles.container}>
				<SafeAreaView style={styles.jobsArea}>
					<ScrollView>
						{/* Title */}
						<Text style={styles.title}>Podsumowanie zlecenia</Text>
						<Separator />

						<Text style={styles.smallTitle}>Tytuł zlecenia</Text>
						<Text style={styles.summaryVariables}>{jobTitle}</Text>

						<Text style={styles.smallTitle}>Kategoria</Text>
						<Text style={styles.summaryVariables}>{categoryReadableName}</Text>

						<Text style={styles.smallTitle}>Cena</Text>
						<Text style={styles.summaryVariables}>{jobPrice}</Text>

						<Text style={styles.smallTitle}>Termin</Text>
						<Text style={styles.summaryVariables}>{jobDate}</Text>

						<Text style={styles.smallTitle}>Opis</Text>
						<Text style={styles.summaryDescription}>{jobDescription}</Text>

						<Text style={styles.smallTitle}>Lokalizacja</Text>
						<Text style={styles.summaryVariables}>{jobLocation}</Text>

						<TouchableOpacity
							onPress={() => {
								if (!checkIfInputsAreEmpty()) {
									navigation.goBack()
									return
								}

								// TODO: REPLACE ID BY A RANDOM UUID! THIS IS IMPORTANT
								var newOffer: JobOfferData = {
									id: (Math.random() + 1).toString(36),
									name: jobTitle,
									category: category,
									price: jobPrice,
									price_per_h: false,
									location: jobLocation,
									order: isPink,
									longitude: jobPhysicalRegion.longitude,
									latitude: jobPhysicalRegion.latitude,
								}
								addUserJobOfferData(newOffer)

								if (isPink) navigation.navigate("TabOneScreenPink")
								else navigation.navigate("TabOneScreen")
							}}
						>
							<LinearGradient
								colors={["#FF9C33", "#F9591E"]}
								style={styles.button}
								start={[0, 1]}
								end={[1, 0]}
							>
								<Text
									style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
								>
									Dalej
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
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

	smallTitle: {
		marginTop: 10,
		marginBottom: 5,
		//	marginLeft: 27,
		fontSize: 20,
		//	alignSelf: 'flex-start',
		fontWeight: "bold",
		textAlign: "left",
	},

	summaryVariables: {
		width: "100%",
		color: "#F9591E",
		fontWeight: "bold",
		fontSize: 25,
		padding: 3,
		paddingBottom: 0,
		borderWidth: 2,
		borderColor: "lightgrey",
	},

	summaryDescription: {
		width: "100%",
		height: 190,
		color: "#F9591E",
		fontWeight: "bold",
		fontSize: 20,
		padding: 3,
		borderWidth: 2,
		borderColor: "lightgrey",
	},

	button: {
		color: "white",
		height: 50,
		borderRadius: 25,
		width: "50%",
		alignItems: "center",
		padding: 10,
		marginTop: 40,
		marginLeft: "25%",
	},
})
