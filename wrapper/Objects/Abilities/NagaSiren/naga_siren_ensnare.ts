import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("naga_siren_ensnare")
export class naga_siren_ensnare extends Ability {
	public get CanHitSpellImmuneEnemy(): boolean {
		return this.GetSpecialValue("can_target_magic_immune") === 1
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetBaseCastRangeForLevel(level: number): number {
		return this.GetSpecialValue("AbilityCastRange", level)
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetMaxCooldownForLevel(level: number): number {
		return this.GetSpecialValue("AbilityCooldown", level)
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetBaseSpeedForLevel(level: number): number {
		return this.GetSpecialValue("net_speed", level)
	}
}
