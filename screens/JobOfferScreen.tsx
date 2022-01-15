import React from "react"
import { Text, View } from "../components/Themed"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	Alert,
} from "react-native"
import Separator from "../components/BuyComponents/Separator"
import Colors from "../constants/Colors"
import { LinearGradient } from "expo-linear-gradient"

import JobOfferScreenComponent from "../components/JobOfferScreenComponent"
import ContactCard from "../components/ContactCard"
import { Category, GenericParams, JobOfferData } from "../types"
import { resolveCategoryName } from "../api/Util"

const categories = require("../constants/Categories").default

const JobOfferScreen = ({ route, navigation }: GenericParams) => {
	const isPink: boolean = route.name.substr(route.name.length - 4) === "Pink"
	const screenColors = isPink ? Colors.pinkScreen : Colors.orangeScreen

	var data: JobOfferData = route.params

	return (
		<>
			<View style={styles.container}>
				<SafeAreaView style={styles.jobsArea}>
					<ScrollView>
						{/* Title */}
						<Text style={styles.title}>{data.name}</Text>
						<Separator />

						{/* Job Title */}
						<Text style={styles.bigTitle}>
							{resolveCategoryName(data.category)}
						</Text>

						<JobOfferScreenComponent
							jobVariant="Cena"
							isPerHour={data.price_per_h}
							price={data.price}
							color={screenColors.secondaryColor}
						/>

						{/* Contact Info */}
						<ContactCard
							userEmail="test@kiszka.ovh"
							userPhone="123 555 111"
							userLocation={data.location.toString()}
							colors={[screenColors.secondaryColor, screenColors.primaryColor]}
						/>

						{/* See Profile Button */}
						<TouchableOpacity
							onPress={() => navigation.navigate("ProfileScreen")}
						>
							<LinearGradient
								colors={[screenColors.primaryColor, screenColors.primaryColor]}
								style={styles.button}
								start={[0, 1]}
								end={[1, 0]}
							>
								<Text
									style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
								>
									Zobacz Profil
								</Text>
							</LinearGradient>
						</TouchableOpacity>

						{/* Pay Button */}
						<TouchableOpacity
							onPress={() =>
								Alert.alert("Placeholder", "Tutaj będzie ekran zapłaty")
							}
						>
							<LinearGradient
								colors={[screenColors.primaryColor, screenColors.primaryColor]}
								style={styles.button}
								start={[0, 1]}
								end={[1, 0]}
							>
								<Text
									style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
								>
									Zamów
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	)
}

export default JobOfferScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},

	title: {
		marginTop: 25,
		marginBottom: 5,
		//	marginLeft: 27,
		fontSize: 30,
		//	alignSelf: 'flex-start',
		fontWeight: "bold",
		textAlign: "left",
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

	bigTitle: {
		marginTop: 18,
		marginBottom: 25,
		//	marginLeft: 27,
		fontSize: 40,
		//	alignSelf: 'flex-start',
		fontWeight: "bold",
		textAlign: "left",
	},

	contactCard: {
		width: "100%",
		height: 160,
		backgroundColor: "orange",
		borderRadius: 35,
		color: "#FFF",
	},

	button: {
		color: "white",
		height: 50,
		borderRadius: 25,
		width: "100%",
		alignItems: "center",
		padding: 10,
		marginTop: 20,
	},
})
