import { DOTA_ABILITY_BEHAVIOR } from "../../Enums/DOTA_ABILITY_BEHAVIOR"
import { GameSleeper } from "../../Helpers/Sleeper"
import { Item } from "../../Objects/Base/Item"
import { Modifier } from "../../Objects/Base/Modifier"
import { Unit } from "../../Objects/Base/Unit"
import { GameState } from "../../Utils/GameState"
import { EventsSDK } from "../EventsSDK"

const Monitor = new (class {
	private readonly sleeper = new GameSleeper()
	private readonly ignoreBuffs = [
		"modifier_monkey_king_bounce_leap",
		"modifier_monkey_king_arc_to_ground",
		"modifier_monkey_king_right_click_jump_activity",
		"modifier_monkey_king_tree_dance_activity",
		"modifier_smoke_of_deceit",
		"modifier_bottle_regeneration",
		"modifier_clarity_potion",
		"modifier_flask_healing",
		"modifier_fountain_aura_buff",
		"modifier_item_invisibility_edge_windwalk",
		"modifier_item_shadow_amulet_fade",
		"modifier_item_phase_boots_active"
	]

	public ModifierChangedVBE(mod: Modifier) {
		const parent = mod.Parent
		if (parent === undefined || mod.IsAura || parent.IsEnemy()) {
			return
		}

		if (this.sleeper.Sleeping(parent.Index)) {
			return
		}

		const ability = mod.Ability
		if (!(ability instanceof Item) || ability.IsNeutralDrop) {
			return
		}

		if (ability.HasBehavior(DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE)) {
			return
		}

		const maxEndTime = 2
		const item = parent.TotalItems.find(x => x === ability)
		if (item === undefined || item.CreateTime + maxEndTime > GameState.RawGameTime) {
			return
		}

		if (
			item.CreateTime + maxEndTime > GameState.RawGameTime ||
			item.PurchaseTime + maxEndTime > GameState.RawGameTime ||
			parent.HasAnyBuffByNames(this.ignoreBuffs)
		) {
			return
		}

		parent.IsVisibleForEnemiesLastTime = GameState.RawGameTime
		EventsSDK.emit("UnitVisibilityChanged", false, parent)
	}

	public UnitItemsChanged(unit: Unit) {
		if (!unit.IsEnemy()) {
			this.sleeper.Sleep(2 * 1000, unit.Index)
		}
	}

	public GameEnded() {
		this.sleeper.FullReset()
	}
})()

EventsSDK.on("GameEnded", Monitor.GameEnded, Number.MIN_SAFE_INTEGER)

EventsSDK.on("UnitItemsChanged", Monitor.UnitItemsChanged, Number.MIN_SAFE_INTEGER)

EventsSDK.on("ModifierChangedVBE", Monitor.ModifierChangedVBE, Number.MIN_SAFE_INTEGER)
