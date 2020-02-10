import Ability from "../../Base/Ability"

export default class lina_light_strike_array extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Lina_LightStrikeArray>

	public get AOERadius(): number {
		return this.GetSpecialValue("light_strike_array_aoe")
	}
	public get ActivationDelay(): number {
		return this.GetSpecialValue("light_strike_array_delay_time")
	}
	public get AbilityDamage(): number {
		return this.GetSpecialValue("light_strike_array_damage") + (this.Owner?.GetTalentValue("special_bonus_unique_lina_3") ?? 0)
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("lina_light_strike_array", lina_light_strike_array)