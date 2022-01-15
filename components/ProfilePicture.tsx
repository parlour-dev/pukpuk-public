import React from "react"
import { TouchableOpacity, Image } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

export default function ProfilePicture({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<FontAwesome name="user-circle" size={32} color="#FF9C33" />
		</TouchableOpacity>
	)
}
