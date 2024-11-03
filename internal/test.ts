import { CModifierParams } from "../wrapper/Base/CModifierParams"
import { EModifierfunction } from "../wrapper/Enums/EModifierfunction"
import {
	Color,
	EntityManager,
	EventsSDK,
	RendererSDK,
	Unit,
	Vector3
} from "../wrapper/Imports"

let newValue = 0
const position = new Vector3(0, 0, 0)
const units = EntityManager.GetEntitiesByClass(Unit)
EventsSDK.on("Draw", () => {
	for (const unit of units) {
		newValue = unit.Modifiers.GetConstantLowestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
			new CModifierParams()
		)
		position.CopyFrom(unit.Position)
	}

	const w2s = RendererSDK.WorldToScreen(position)
	if (w2s !== undefined) {
		RendererSDK.Text(`${newValue}`, w2s, Color.White)
	}
})
