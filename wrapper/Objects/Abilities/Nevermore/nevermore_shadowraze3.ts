import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("nevermore_shadowraze3")
export class nevermore_shadowraze3 extends Ability {
	public get UsesRotation() {
		return true
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetBaseCastRangeForLevel(level: number): number {
		return this.GetSpecialValue("shadowraze_range", level)
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetCastRangeForLevel(level: number): number {
		return this.GetBaseCastRangeForLevel(level)
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetBaseAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("shadowraze_radius", level)
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetMaxCooldownForLevel(level: number): number {
		return this.GetSpecialValue("AbilityCooldown", level)
	}
}
