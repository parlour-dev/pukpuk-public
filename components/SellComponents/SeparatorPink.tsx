import React from "react"
import { View, Text } from "../../components/Themed"
import { LinearGradient } from "expo-linear-gradient"

const Separator = () => {
	return (
		<LinearGradient
			start={[0, 1]}
			end={[1, 0]}
			colors={["#ff0948", "#ef4600"]}
			style={{
				width: "100%",
				height: 5,
				backgroundColor: "red",
				borderRadius: 3,
				marginBottom: 10,
			}}
		>
			<View></View>
		</LinearGradient>
	)
}

export default Separator
