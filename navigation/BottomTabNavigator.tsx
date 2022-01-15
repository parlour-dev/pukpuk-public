import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"

import Colors from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import TabOneScreen from "../screens/TabOneScreen"
import MapScreen from "../screens/MapScreen"
import {
	BottomTabParamList,
	TabOneParamList,
	TabTwoParamList,
	MapParamList,
	GenericParams,
} from "../types"
import { Text, View } from "../components/Themed"
import ProfilePicture from "../components/ProfilePicture"

import { FontAwesome } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import JobCategoryScreen from "../screens/JobCategoryScreen"
import JobDescriptionScreen from "../screens/JobDescriptionScreen"
import JobSummaryScreen from "../screens/JobSummaryScreen"
import { Platform } from "react-native"
import JobOfferScreen from "../screens/JobOfferScreen"

const BottomTab = createMaterialTopTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme()

	return (
		<BottomTab.Navigator
			initialRouteName="Zleć"
			tabBarOptions={{
				activeTintColor: Colors[colorScheme].tint,
				labelStyle: {
					fontSize: 15,
					margin: 0,
					padding: 0,
					paddingBottom: Platform.OS === "ios" ? "7%" : "1%",
					color: "#000",
					fontWeight: "600",
				},
				showIcon: true,
			}}
			tabBarPosition="bottom"
			/* on Android, swiping is broken on the map screen */
			swipeEnabled={Platform.OS === "android" ? false : true}
		>
			<BottomTab.Screen
				name="Zleć"
				component={TabOneNavigator}
				options={{
					tabBarIcon: ({ focused, color }) => (
						<FontAwesome
							name="cart-arrow-down"
							size={24}
							color={focused ? "#FF9C33" : "#fcb56a"}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="Mapa"
				component={MapNavigator}
				options={{
					tabBarIcon: ({ focused, color }) => (
						<FontAwesome
							name="map"
							size={20}
							color={focused ? "#3bbdf9" : "#7ed4fc"}
							style={{
								marginLeft: 3,
							}}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="Zarób"
				component={TabTwoNavigator}
				options={{
					tabBarIcon: ({ focused, color }) => (
						<MaterialCommunityIcons
							name="offer"
							size={28}
							color={focused ? "#ef4600" : "#fc7d46"}
							style={{
								marginTop: -4,
							}}
						/>
					),
				}}
			/>
		</BottomTab.Navigator>
	)
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>()

function TabOneNavigator({ navigation }: GenericParams) {
	return (
		<TabOneStack.Navigator>
			<TabOneStack.Screen
				name="TabOneScreen"
				component={TabOneScreen}
				options={{
					headerTitle: generateHeaderTitle("Zleć", navigation),
				}}
			/>
			<TabOneStack.Screen
				name="JobCategoryScreen"
				component={JobCategoryScreen}
				options={{
					headerTitle: "Tworzenie zlecenia",
				}}
			/>
			<TabOneStack.Screen
				name="JobDescriptionScreen"
				component={JobDescriptionScreen}
				options={{
					headerTitle: "Tworzenie zlecenia",
				}}
			/>
			<TabOneStack.Screen
				name="JobSummaryScreen"
				component={JobSummaryScreen}
				options={{
					headerTitle: "Tworzenie zlecenia",
				}}
			/>
			<TabOneStack.Screen
				name="JobOfferScreen"
				component={JobOfferScreen}
				options={{
					headerTitle: "Podgląd oferty",
				}}
			/>
		</TabOneStack.Navigator>
	)
}

const MapStack = createStackNavigator<MapParamList>()

function MapNavigator({ navigation }: GenericParams) {
	return (
		<MapStack.Navigator>
			<MapStack.Screen
				name="MapScreen"
				component={MapScreen}
				options={{
					headerTitle: generateHeaderTitle("Mapa", navigation),
					headerShown: false,
				}}
			/>
			<MapStack.Screen
				name="JobOfferScreen"
				component={JobOfferScreen}
				options={{
					headerTitle: "Podgląd oferty",
				}}
			/>
		</MapStack.Navigator>
	)
}

const TabTwoStack = createStackNavigator<TabTwoParamList>()

function TabTwoNavigator({ navigation }: GenericParams) {
	return (
		<TabTwoStack.Navigator>
			<TabTwoStack.Screen
				name="TabOneScreenPink"
				component={TabOneScreen}
				options={{
					headerTitle: generateHeaderTitle("Zarób", navigation),
				}}
			/>
			<TabTwoStack.Screen
				name="JobCategoryScreenPink"
				component={JobCategoryScreen}
				options={{
					headerTitle: "Tworzenie zlecenia",
				}}
			/>
			<TabTwoStack.Screen
				name="JobDescriptionScreenPink"
				component={JobDescriptionScreen}
				options={{
					headerTitle: "Tworzenie zlecenia",
				}}
			/>
			<TabTwoStack.Screen
				name="JobSummaryScreenPink"
				component={JobSummaryScreen}
				options={{
					headerTitle: "Tworzenie zlecenia",
				}}
			/>
			<TabTwoStack.Screen
				name="JobOfferScreenPink"
				component={JobOfferScreen}
				options={{
					headerTitle: "Podgląd oferty",
				}}
			/>
		</TabTwoStack.Navigator>
	)
}

function generateHeaderTitle(title: string, navigation: any) {
	return (props: any) => (
		<View style={{ flexDirection: "row" }}>
			<ProfilePicture
				onPress={() => {
					navigation.navigate("ProfileScreen")
				}}
			/>
			<Text
				style={{
					paddingLeft: 18,
					fontSize: 29,
					fontWeight: "700",
				}}
			>
				{title}
			</Text>
		</View>
	)
}
