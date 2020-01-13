import { NearMouse, State } from "./Menu"
import { InitCombo } from "./module/Combo"
import { Unit, ArrayExtensions, Input } from "wrapper/Imports"
import { RegisterHeroModule, Units } from "XAIO/bootstrap"

RegisterHeroModule("npc_dota_hero_pudge", { InitTick })

export function InitTick(unit: Unit) {

	if (!State.value)
		return

	InitCombo(
		unit,
		ArrayExtensions.orderBy(
			Units.filter(x => x.IsHero
				&& x.IsEnemy()
				&& x.Distance(Input.CursorOnWorld) <= NearMouse.value
				&& x.IsAlive
				&& !x.IsInvulnerable
				&& x.IsVisible),
			x => x.Distance(Input.CursorOnWorld)
		)[0]
	)
}
