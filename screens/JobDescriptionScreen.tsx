import React, { useState } from "react"
import { Text, View } from "../components/Themed"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
	Platform,
	Alert,
} from "react-native"
import Separator from "../components/BuyComponents/Separator"
import { LinearGradient } from "expo-linear-gradient"
import { Entypo } from "@expo/vector-icons"
import * as Location from "expo-location"

import DateTimePicker from "@react-native-community/datetimepicker"
import MapView, { Marker } from "react-native-maps"

import Colors from "../constants/Colors"
import Global from "../globalState"
import { useEffect } from "react"
import { formatDate } from "../api/Util"
import { GenericParams } from "../types"

export default function JobDescriptionScreen({ route, navigation }: GenericParams) {
	const isPink: boolean = route.name.substr(route.name.length - 4) === "Pink"
	const screenColors = isPink ? Colors.pinkScreen : Colors.orangeScreen

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== "granted") {
				Alert.alert(
					"Lokalizacja musi być włączona",
					"Aby aplikacja działała, należy pozwolić na wykorzystywanie lokalizacji.",
					[
						{
							onPress: () => {
								navigation.goBack()
							},
						},
					]
				)
				return
			}
		})()
	}, [])

	const [jobTitle, setJobTitle] = useState("")
	const [jobPrice, setJobPrice] = useState("zł")
	const [jobDescription, setJobDescription] = useState("")
	const [jobLocation, setJobLocation] = useState("")

	const [jobPhysicalRegion, setJobPhysicalRegion] = useState(null)

	const [date, setDate] = useState<Date>(new Date())
	const [mode, setMode] = useState("date")
	const [show, setShow] = useState(false)

	const category = route.params

	const onChange = (event: Event, selectedDate: Date | undefined) => {
		const currentDate = selectedDate || date
		setShow(Platform.OS === "ios")
		setDate(currentDate)
	}

	const showMode = (currentMode) => {
		setShow(true)
		setMode(currentMode)
	}

	const showDatepicker = () => {
		showMode("date")
	}

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.jobsArea}>
				<ScrollView>
					{/* Title */}
					<Text style={styles.title}>Szczegóły zlecenia</Text>
					{/* Separator */}
					<Separator />
					{/* Job Title */}
					<Text style={styles.smallTitle}>Tytuł zlecenia</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Tytuł zlecenia"
						placeholderTextColor="#c1c1c1"
						onChangeText={(value) => setJobTitle(value)}
						maxLength={32}
					></TextInput>

					{/* Fix that later */}
					<View style={styles.priceDateContainer}>
						{/* Price */}
						<View>
							<Text style={styles.smallTitle}>Cena</Text>
							<TextInput
								style={styles.smallTextInput}
								placeholder="Cena w złotych"
								keyboardType="number-pad"
								returnKeyType="done"
								placeholderTextColor="#c1c1c1"
								onChangeText={(value) => setJobPrice(value)}
								maxLength={8}
							></TextInput>
						</View>

						{/* Date */}

						{Platform.OS === "android" && (
							<View>
								<Text style={styles.smallTitle}>Termin</Text>
								<View>
									<TouchableOpacity onPress={showDatepicker}>
										<View style={styles.dateButton}>
											<Text
												style={{
													color: "#000",
													fontWeight: "bold",
													padding: 4,
												}}
											>
												{formatDate(date) || "Wybierz datę"}
											</Text>
										</View>
									</TouchableOpacity>
								</View>
								{show && (
									<DateTimePicker
										testID="dateTimePicker"
										value={date}
										mode={mode}
										is24Hour={true}
										display="default"
										onChange={onChange}
									/>
								)}
							</View>
						)}

						{Platform.OS === "ios" && (
							<View>
								<Text style={styles.smallTitle}>Termin</Text>

								<DateTimePicker
									testID="dateTimePicker"
									value={date}
									mode={mode}
									is24Hour={true}
									display="default"
									onChange={onChange}
									style={{ width: "200%", marginTop: 5 }}
									minimumDate={date}
								/>
							</View>
						)}
					</View>

					{/* Description */}
					<View>
						<Text style={styles.smallTitle}>Opis</Text>
						<View style={styles.textAreaContainer}>
							<TextInput
								style={styles.textArea}
								underlineColorAndroid="transparent"
								placeholder="Opisz dokładnie swoje zlecenie"
								placeholderTextColor="#c1c1c1"
								numberOfLines={10}
								multiline={true}
								onChangeText={(value) => setJobDescription(value)}
								returnKeyType="default"
								keyboardType="default"
								maxLength={256}
							/>
						</View>
					</View>

					{/* Map section */}
					<Text style={styles.smallTitle}>Lokalizacja</Text>
					<View style={styles.searchCategoriesContainer}>
						{/* Search Bar */}
						<TextInput
							style={styles.searchBox}
							placeholder="Wyszukaj lokalizację"
							placeholderTextColor="#c1c1c1"
							onChangeText={(value) => setJobLocation(value)}
							value={jobLocation}
						></TextInput>

						{/* search button */}

						<LinearGradient
							colors={[screenColors.primaryColor, screenColors.secondaryColor]}
							style={styles.categories}
							start={[0, 1]}
							end={[1, 0]}
						>
							<TouchableOpacity
								onPress={() => {
									;(async () => {
										// convert the user-specified location into coordinates
										const coords = (await Location.geocodeAsync(jobLocation))[0]

										setJobPhysicalRegion({
											latitude: coords.latitude,
											longitude: coords.longitude,
											latitudeDelta: 0.001,
											longitudeDelta: 0.001,
										})
									})()
								}}
							>
								<Entypo name="magnifying-glass" size={30} color="white" />
							</TouchableOpacity>
						</LinearGradient>

						{/* Auto Locate Button */}

						<LinearGradient
							colors={[screenColors.primaryColor, screenColors.secondaryColor]}
							style={styles.categories}
							start={[0, 1]}
							end={[1, 0]}
						>
							<TouchableOpacity
								onPress={() => {
									;(async (e) => {
										const location = await Location.getCurrentPositionAsync({
											accuracy: Location.Accuracy.BestForNavigation,
										})

										setJobPhysicalRegion({
											latitude: location.coords.latitude,
											longitude: location.coords.longitude,
											latitudeDelta: 0.001,
											longitudeDelta: 0.001,
										})

										const address = (
											await Location.reverseGeocodeAsync({
												latitude: location.coords.latitude,
												longitude: location.coords.longitude,
											})
										)[0]
										setJobLocation(
											address.street + " " + address.name + ", " + address.city
										)
									})()
								}}
							>
								<Entypo name="location-pin" size={30} color="white" />
							</TouchableOpacity>
						</LinearGradient>
					</View>

					{/* Map */}
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							marginTop: "7%",
							borderRadius: 10,
							overflow: "hidden",
						}}
					>
						<MapView
							region={
								jobPhysicalRegion || {
									latitude: 52,
									longitude: 19,
									latitudeDelta: 5,
									longitudeDelta: 5,
								}
							}
							style={{
								width: "100%",
								height: 200,
							}}
						>
							{jobPhysicalRegion !== null && (
								<Marker coordinate={jobPhysicalRegion} />
							)}
						</MapView>
					</View>

					{/* Button */}
					<TouchableOpacity
						onPress={() => {
							const screenName = isPink
								? "JobSummaryScreenPink"
								: "JobSummaryScreen"

							Global.date = date

							navigation.navigate(screenName, {
								jobTitle,
								jobPrice,
								jobDescription,
								jobLocation,
								jobPhysicalRegion,
								category,
							})
						}}
					>
						<LinearGradient
							colors={[screenColors.primaryColor, screenColors.secondaryColor]}
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

	priceDateContainer: {
		display: "flex",
		flexDirection: "row",
	},

	textInput: {
		backgroundColor: "#eee",
		marginTop: 5,
		padding: 5,
		paddingLeft: 20,
		width: "100%",
		marginRight: "5%",
		borderRadius: 100,
		height: 35,
	},

	dateButton: {
		backgroundColor: "#eee",
		marginTop: 5,
		marginBottom: 10,
		padding: 5,
		paddingLeft: 20,
		width: 150,
		marginRight: "10%",
		borderRadius: 100,
		height: 35,
	},

	smallTextInput: {
		backgroundColor: "#eee",
		marginTop: 5,
		padding: 5,
		paddingLeft: 20,
		width: 150,
		marginRight: "10%",
		borderRadius: 100,
		height: 35,
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

	smallTitle: {
		marginTop: 25,
		//	marginLeft: 27,
		fontSize: 20,
		//	alignSelf: 'flex-start',
		fontWeight: "bold",
		textAlign: "left",
	},

	jobsArea: {
		width: "90%",
		flex: 1,
	},

	textAreaContainer: {},
	textArea: {
		height: 150,
		justifyContent: "flex-start",
		backgroundColor: "#eee",
		marginTop: 5,
		padding: 5,
		paddingTop: 10,
		paddingLeft: 20,
		width: "100%",
		marginRight: "5%",
		borderRadius: 20,
	},

	map: {
		width: "100%",
		marginTop: 10,
		height: 200,
		backgroundColor: "lightgrey",
		borderRadius: 30,
	},

	searchCategoriesContainer: {
		display: "flex",
		flexDirection: "row",
		alignContent: "space-between",
		height: 35,
		marginTop: 5,
	},

	searchBox: {
		backgroundColor: "#eee",

		padding: 5,
		paddingLeft: 20,

		borderRadius: 100,
		flex: 6,
	},

	categories: {
		backgroundColor: "#eee",
		alignItems: "center",

		borderRadius: 18,
		paddingTop: 2,
		marginLeft: "1%",

		flex: 2,
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
