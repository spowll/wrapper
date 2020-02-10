import Ability from "../../Base/Ability"

export default class void_spirit_astral_step extends Ability {
	public NativeEntity: Nullable<CDOTA_Ability_VoidSpirit_AstralStep>

	public get AOERadius(): number {
		return this.GetSpecialValue("radius")
	}
	public get CastRange(): number {
		return this.GetSpecialValue("max_travel_distance")
	}
	public get Speed(): number {
		return Number.MAX_SAFE_INTEGER
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("void_spirit_astral_step", void_spirit_astral_step)