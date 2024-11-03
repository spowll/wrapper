import { Color, EntityManager, EventsSDK, Hero, RendererSDK } from "../wrapper/Imports"

const units = EntityManager.GetEntitiesByClass(Hero)
EventsSDK.on("Draw", () => {
	for (const unit of units) {
		const w2s = RendererSDK.WorldToScreen(unit.Position)
		if (w2s !== undefined) {
			RendererSDK.Text(
				`BaseSpeed: ${unit.BaseMoveSpeed}
				IdealSpeed: ${unit.IdealSpeed}`,
				w2s,
				Color.White
			)
		}
	}
})
