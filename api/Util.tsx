import Categories from "../constants/Categories"
import { Category, JobOfferData } from "../types"

// DATES ========================================

function zeroPad(unpadded: number) {
	var padded: string
	if (unpadded < 10) padded = "0" + unpadded.toString()
	else padded = unpadded.toString()

	return padded
}

export function formatDate(date: Date) {
	return (
		zeroPad(date.getDate()) +
		"." +
		zeroPad(date.getMonth()) +
		"." +
		date.getFullYear()
	)
}

// CATEGORIES ========================================

export function resolveCategory(catId: string) {
	const foundCategory = Categories.find((i) => {
		return i.id == catId
	})

	return foundCategory
}

export function resolveCategoryName(catId: string) {
	const foundCategory = resolveCategory(catId)
	return foundCategory ? foundCategory.label : catId
}

export function getCategoryMenuItems(jobOffers: JobOfferData[]) {
	const usedCategoryIds: Set<string> = new Set(
		jobOffers.map((i) => {
			return i.category
		})
	)
	const menuItems: Category[] = []

	usedCategoryIds.forEach((catId) => {
		const foundCategory = resolveCategory(catId)
		if (foundCategory) menuItems.push(foundCategory)
	})

	return menuItems.concat({ id: "", label: "Wyczyść" })
}
