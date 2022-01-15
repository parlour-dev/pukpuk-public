import * as React from "react"
import { useState } from "react"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
} from "react-native"

import { LinearGradient } from "expo-linear-gradient"

import JobOffer from "../components/BuyComponents/JobOffer"
import JobOfferPink from "../components/SellComponents/JobOfferPink"

import { Text, View } from "../components/Themed"
import Separator from "../components/BuyComponents/Separator"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Colors from "../constants/Colors"

// @ts-ignore
import SimplePopupMenu from "react-native-simple-popup-menu"
import { getJobOfferData } from "../api/JobOfferData"

import { Category, GenericParams, JobOfferData } from "../types"
import { getCategoryMenuItems, resolveCategoryName } from "../api/Util"

export default function TabOneScreen(
	{ navigation, route }: GenericParams,
	isRed: boolean
) {
	// Max category length: 19 characters
	const [offers, setOffers] = useState(getJobOfferData())

	const isPink: boolean = route.name.substr(route.name.length - 4) === "Pink"
	const screenColors = isPink ? Colors.pinkScreen : Colors.orangeScreen

	function sortJobOffers(category: string) {
		var newOffers: JobOfferData[] = []

		const jobsData = getJobOfferData()
		for (var job in jobsData) {
			if (isPink === jobsData[job].order) {
				if (category != "") {
					if (category === jobsData[job].category) {
						newOffers.push(jobsData[job])
					}
				} else {
					newOffers.push(jobsData[job])
				}
			}
		}

		setOffers(newOffers)
	}

	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			sortJobOffers("")
		})
		return unsubscribe
	}, [navigation])

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.jobsArea}>
				<ScrollView>
					{/* New Order Button */}
					<TouchableOpacity
						onPress={() => {
							if (isPink) navigation.navigate("JobCategoryScreenPink")
							else navigation.navigate("JobCategoryScreen")
						}}
					>
						<View style={styles.orderOffer}>
							<LinearGradient
								colors={[
									screenColors.primaryColor,
									screenColors.secondaryColor,
								]}
								style={styles.orderButton}
							>
								<Text style={styles.buttonLargeText}>
									{isPink ? "Utwórz\nnową ofertę" : "Utwórz\nnowe zlecenie"}
								</Text>
							</LinearGradient>
						</View>
					</TouchableOpacity>

					{/* Title */}
					{isPink ? (
						<Text style={styles.title}>Co możesz zrobić?</Text>
					) : (
						<Text style={styles.title}>Co oferują użytkownicy?</Text>
					)}
					<Separator />
					<View style={styles.searchCategoriesContainer}>
						{/* Search Bar */}
						<TextInput
							style={styles.searchBox}
							onChangeText={() => {}}
							placeholder="Szukaj"
							placeholderTextColor="#c1c1c1"
						></TextInput>

						{/* Categories */}
						<LinearGradient
							colors={[screenColors.primaryColor, screenColors.secondaryColor]}
							style={styles.categories}
							start={[0, 1]}
							end={[1, 0]}
						>
							<SimplePopupMenu
								items={getCategoryMenuItems(offers)}
								onCancel={() => {}}
								onSelect={(item: Category) => {
									sortJobOffers(item.id)
								}}
							>
								<MaterialCommunityIcons
									name="sort-variant"
									size={32}
									color="white"
								/>
							</SimplePopupMenu>
						</LinearGradient>
					</View>
					{/* Whitespace */}
					<View
						style={styles.whitespace}
						lightColor="#fff"
						darkColor="rgba(255,255,255,0.1)"
					/>

					{/* Job Offers */}
					<View>
						{offers.map((data) => (
							<View key={data.id}>
								{isPink && (
									<TouchableOpacity
										onPress={() =>
											navigation.navigate("JobOfferScreenPink", data)
										}
									>
										<JobOfferPink
											price={String(data.price) + "zł"}
											name={data.name}
											category={resolveCategoryName(data.category)}
										/>
									</TouchableOpacity>
								)}
								{!isPink && (
									<TouchableOpacity
										onPress={() => navigation.navigate("JobOfferScreen", data)}
									>
										<JobOffer
											price={String(data.price) + "zł"}
											name={data.name}
											category={resolveCategoryName(data.category)}
										/>
									</TouchableOpacity>
								)}
							</View>
						))}
					</View>
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
		//	marginLeft: 27,
		fontSize: 28,
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
