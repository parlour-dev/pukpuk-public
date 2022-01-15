export type GenericParams = {
	route: any
	navigation: any
}

export type RootStackParamList = {
	Root: undefined
	NotFound: undefined
	ProfileScreen: undefined
}

export type BottomTabParamList = {
	Zleć: undefined
	Mapa: undefined
	Zarób: undefined
}

export type TabOneParamList = {
	TabOneScreen: undefined
	JobCategoryScreen: undefined
	JobDescriptionScreen: undefined
	JobSummaryScreen: undefined
	JobOfferScreen: undefined
}

export type MapParamList = {
	MapScreen: undefined
	JobOfferScreen: undefined
}

export type TabTwoParamList = {
	TabOneScreenPink: undefined
	JobCategoryScreenPink: undefined
	JobDescriptionScreenPink: undefined
	JobSummaryScreenPink: undefined
	JobOfferScreenPink: undefined
}

export type JobOfferData = {
	id: string
	name: string
	category: string
	price: number
	price_per_h: boolean
	location: string
	order: boolean
	longitude: number
	latitude: number
}

export type Category = {
	id: string
	label: string
}
