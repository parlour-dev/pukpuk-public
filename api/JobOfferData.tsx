import { JobOfferData } from "../types"
//import { v4 as uuidv4 } from 'uuid'

var jobOfferData: JobOfferData[] = [
	{
		id: "e3e14769-e5a5-4a41-b6dc-336f9dd50002",
		name: "Koszenie trawy do 1 ha",
		category: "koszenie_trawy",
		price: 12,
		price_per_h: false,
		location: "Belna 10, Psary",
		order: true,
		longitude: 19.092,
		latitude: 50.383,
	},

	{
		id: "c4305c19-d371-4726-aa04-ab6f97b509dd",
		name: "Domy i biura",
		category: "sprzatanie",
		price: 25,
		price_per_h: true,
		location: "Moździerzowców 50, Jaworzno",
		order: false,
		longitude: 19.280,
		latitude: 50.24342,
	},

	{
		id: "2f449af7-d53c-4688-93f1-35a0a9414ff8",
		name: "Pielęgnacja kwiatów",
		category: "prace_ogrodowe",
		price: 12,
		price_per_h: false,
		location: "Warszawa, Złota 2",
		order: false,
		longitude: 21.011,
		latitude: 52.233,
	},
]

export function getJobOfferData(): JobOfferData[] {
	return jobOfferData
}

export function addJobOfferData(newdatum: JobOfferData) {
	jobOfferData.push(newdatum)
}
