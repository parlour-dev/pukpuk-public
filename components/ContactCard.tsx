import React from "react"
import { Text, View } from "./Themed"
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

type ContactCardProps = {
	userEmail: string
	userPhone: string
	userLocation?: string | null
	colors: string[]
}

const ContactCard = ({
	userEmail,
	userPhone,
	userLocation,
	colors,
}: ContactCardProps) => {
	const phoneStyle = StyleSheet.compose(
		styles.phone,
		userLocation
			? StyleSheet.create({})
			: StyleSheet.create({ x: { paddingBottom: "5%" } }).x
	)

	return (
		<>
			<LinearGradient colors={colors} style={styles.contactCard}>
				<Text style={styles.email}>{userEmail}</Text>

				<Text style={phoneStyle}>{userPhone}</Text>

				{userLocation && <Text style={styles.location}>{userLocation}</Text>}
			</LinearGradient>
		</>
	)
}

export default ContactCard

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
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

	jobsArea: {
		width: "90%",
		flex: 1,
	},

	phone: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 40,
		paddingBottom: 0,
	},

	location: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 25,
		paddingBottom: "5%",
	},

	email: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 25,
		paddingTop: "5%",
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

	contactCard: {
		width: "100%",
		//height: 160,
		backgroundColor: "orange",
		borderRadius: 35,
		padding: 20,
	},
})
