import * as React from "react"
import { useState } from "react"
import { View, Image } from "react-native"
import MapView, { Marker, LatLng } from "react-native-maps"
import { getJobOfferData } from "../api/JobOfferData"
import { GenericParams, JobOfferData } from "../types"

export default function MapScreen(this: any, { navigation }: GenericParams) {
	const [jobsData, setJobsData] = useState(getJobOfferData())
	const [markers, setMarkers] = useState<Marker[]>([])

	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			setJobsData(getJobOfferData())

			const markerArr: any[] = jobsData.map((value: JobOfferData) => {
				const coords: LatLng = {
					latitude: value.latitude,
					longitude: value.longitude,
				}

				if (value.order === true) return MarkerOrder(value, coords, navigation)
				else return MarkerOffer(value, coords, navigation)
			})

			setMarkers(markerArr)
		})
		return unsubscribe
	}, [navigation])

	return (
		<View>
			<MapView
				region={{
					latitude: 52,
					longitude: 19,
					latitudeDelta: 5,
					longitudeDelta: 5,
				}}
				style={{ width: "100%", height: "100%" }}
			>
				{markers}
			</MapView>
			<View
				style={{
					position: "absolute",
					top: 20,
					left: 10,
					width: 130,
					height: 130,
				}}
			>
				<Image
					style={{
						flex: 1,
						resizeMode: "contain",
						width: undefined,
						height: undefined,
					}}
					source={require("../assets/images/pukpuk.png")}
				/>
			</View>
		</View>
	)
}

function MarkerOrder(data: JobOfferData, coords: LatLng, navigation: any) {
	const pinOrange = require("../assets/images/pin-orange.png")
	return (
		<Marker
			key={data.id}
			image={pinOrange}
			coordinate={coords}
			title="Zlecenie"
			description={data.location}
			onCalloutPress={() => {
				navigation.navigate("JobOfferScreen", data)
			}}
		/>
	)
}

function MarkerOffer(data: JobOfferData, coords: LatLng, navigation: any) {
	const pinRed = require("../assets/images/pin-red.png")
	return (
		<Marker
			key={data.id}
			image={pinRed}
			coordinate={coords}
			title="Oferta"
			description={data.location}
			onCalloutPress={() => {
				navigation.navigate("JobOfferScreen", data)
			}}
		/>
	)
}
