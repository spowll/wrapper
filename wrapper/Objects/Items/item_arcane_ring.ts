import { WrapperClass } from "../../Decorators"
import { Item } from "../Base/Item"
import { Unit } from "../Base/Unit"

@WrapperClass("item_arcane_ring")
export class item_arcane_ring extends Item implements IManaRestore<Unit> {
	public readonly RestoresAlly = true
	public readonly RestoresSelf = true
	public readonly InstantRestore = true

	public IsManaRestore(): this is IManaRestore<Unit> {
		return true
	}
	public GetManaRestore(_target: Unit): number {
		return this.GetSpecialValue("mana_restore")
	}
	public GetBaseAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("radius", level)
	}
}
