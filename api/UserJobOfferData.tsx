import { JobOfferData } from "../types"

var userJobOfferData: JobOfferData[] = [
	{
		id: "ce78f29c-b173-428d-94d9-f0cb354aecc2",
		name: "Łąka 12 arów do skoszenia",
		category: "koszenie_trawy",
		price: 240,
		price_per_h: false,
		location: "Graniczna 23, Strzyżowice",
		order: true,
		longitude: 19.09234,
		latitude: 50.383,
	},

	{
		id: "4fef5b31-9335-462a-b9f5-1f117e7dc9e4",
		name: "Posprzątam mieszkanie do 30m2",
		category: "sprzatanie",
		price: 50,
		price_per_h: false,
		location: "Moździerzowców 50, Jaworzno",
		order: false,
		longitude: 19.28041,
		latitude: 50.24342,
	},

	{
		id: "2288baaa-3933-4f0b-aee4-a9826a165be5",
		name: "Zaopiekuję się dzieckiem od 16 do 21",
		category: "opieka",
		price: 19,
		price_per_h: true,
		location: "Moździerzowców 50, Jaworzno",
		order: false,
		longitude: 19.28041,
		latitude: 50.24342,
	},

	{
		id: "155f1e1b-d437-42b2-b119-d959470225d6",
		name: "Hydraulik 24/7",
		category: "hydraulika",
		price: 25,
		price_per_h: true,
		location: "Moździerzowców 50, Jaworzno",
		order: false,
		longitude: 19.28041,
		latitude: 50.24342,
	},
]

export function getUserJobOfferData() {
	return userJobOfferData
}

export function getUserOrders() {
	return userJobOfferData.filter((el) => el.order)
}

export function getUserOffers() {
	return userJobOfferData.filter((el) => !el.order)
}

export function addUserJobOfferData(newdatum: JobOfferData) {
	userJobOfferData.push(newdatum)
}
