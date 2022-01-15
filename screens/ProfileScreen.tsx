import React from "react"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
	Image,
} from "react-native"
import JobOffer from "../components/BuyComponents/JobOffer"
import JobOfferPink from "../components/SellComponents/JobOfferPink"
import { Text, View } from "../components/Themed"
import Separator from "../components/BuyComponents/Separator"
import SeparatorPink from "../components/SellComponents/SeparatorPink"
import ContactCard from "../components/ContactCard"
import Colors from "../constants/Colors"
import {
	getUserOffers,
	getUserOrders,
} from "../api/UserJobOfferData"
import { resolveCategoryName } from "../api/Util"
import { GenericParams } from "../types"

const ProfileScreen = ({ navigation }: GenericParams) => {
	const orders = getUserOrders()
	const offers = getUserOffers()

	return (
		<>
			<View style={styles.container}>
				<SafeAreaView style={styles.jobsArea}>
					<ScrollView>
						{/* Profile Picture */}
						<Image
							source={{
								uri: "https://s2.fbcdn.pl/7/clubs/77287/team/n/piotr-grabowski-56-1460050397.jpg",
							}}
							style={{
								width: "50%",
								height: 180,
								marginLeft: "25%",
								borderRadius: 1000,
								marginTop: 40,
							}}
						/>
						<Text style={styles.heading}>Jan Kowalski</Text>
						<ContactCard
							userEmail="user@example.com"
							userPhone="472 838 119"
							colors={[
								Colors.orangeScreen.primaryColor,
								Colors.orangeScreen.secondaryColor,
							]}
						/>

						<Text style={styles.title}>Oferty</Text>
						<Separator />

						{offers.map((data) => (
							<View key={data.id}>
								<TouchableOpacity
									onPress={() => navigation.navigate("JobOfferScreen", data)}
								>
									<JobOffer
										price={String(data.price) + "zł"}
										name={data.name}
										category={resolveCategoryName(data.category)}
									/>
								</TouchableOpacity>
							</View>
						))}

						<Text style={styles.title}>Zlecenia</Text>
						<SeparatorPink />

						{orders.map((data) => (
							<View key={data.id}>
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
							</View>
						))}
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	)
}

export default ProfileScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},

	profilePicture: {
		width: 100,
	},

	name: {
		margin: 20,
		fontSize: 35,
		fontWeight: "bold",
	},
	heading: {
		fontWeight: "bold",
		//width:,
		marginRight: "2%",
		fontSize: 35,
		marginTop: 10,
		marginBottom: 10,
		alignSelf: "center",
	},
	regularText: {
		color: "white",
		fontSize: 20,
	},
	picturePlaceholder: {
		borderRadius: 100,
		backgroundColor: "grey",
		height: 200,
		width: 200,
		marginTop: 40,
		marginLeft: "12.5%",
		alignItems: "center",
	},
	personalInfo: {
		flexDirection: "column",
		justifyContent: "center",
		backgroundColor: "red",
		padding: 16,
		width: "100%",
		borderRadius: 20,
		marginLeft: "2.5%",
		marginRight: "5%",
	},
	messageMe: {
		backgroundColor: "orange",
		padding: 16,
		margin: 6,
		justifyContent: "center",
		borderRadius: 20,
	},

	jobsArea: {
		width: "90%",
		flex: 1,
	},

	title: {
		marginTop: 25,
		//	marginLeft: 27,
		fontSize: 28,
		//	alignSelf: 'flex-start',
		fontWeight: "bold",
		textAlign: "left",
	},
})
