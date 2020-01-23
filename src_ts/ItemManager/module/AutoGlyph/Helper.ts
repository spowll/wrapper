import { GameRules, TickSleeper, LocalPlayer, Player, Team, EntityManager, Unit, Building, Shop, Shrine, Creep, Hero } from "wrapper/Imports"
import ItemManagerBase from "../../abstract/Base"
import { StateBase } from "../../abstract/MenuBase"
import { State, TowerHP, TowerSwitcher } from "./Menu"
let Sleep = new TickSleeper()
let Base = new ItemManagerBase()
export function Tick() {
	if (!StateBase.value || !State.value || Sleep.Sleeping || Player === undefined) {
		return
	}
	let Time = LocalPlayer!.Team === Team.Radiant
		? (GameRules?.GlyphCooldownRadiant ?? 0)
		: (GameRules?.GlyphCooldownDire ?? 0)
	if (Time !== 0) {
		return
	}
	let include_name = "tower1"
	switch (TowerSwitcher.selected_id) {
		case 0: include_name = "tower1"; break
		case 1: include_name = "tower2"; break
		case 2: include_name = "tower3"; break
		case 3: include_name = "tower4"; break
		case 4: include_name = "tower"; break
		case 5: include_name = "npc_dota_"; break
	}
	if (!EntityManager.GetEntitiesByClass(Building).some(x =>
		!x.IsEnemy()
		&& !(x instanceof Shop)
		&& !(x instanceof Shrine)
		&& x.IsAlive
		&& x.HP <= TowerHP.value
		&& x.Name.includes(include_name)
		&& EntityManager.GetEntitiesByClass(Unit).some(unit =>
			unit.IsEnemy()
			&& unit.IsVisible
			&& unit.IsAlive && (unit instanceof Creep || unit instanceof Hero)
			&& unit.IsInRange(x, unit.AttackRange + (unit.HullRadius * 2)))))
		return

	Player.Glyph()
	Sleep.Sleep(Base.GetDelayCast)
	return
}
export function GameEnded() {
	Sleep.ResetTimer()
}
