import Ability from "../../Base/Ability"

export default class invoker_deafening_blast extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Invoker_DeafeningBlast>

	public get EndRadius(): number {
		return this.GetSpecialValue("radius_end")
	}
	public get AOERadius(): number {
		return this.GetSpecialValue("radius_start")
	}
	public get Speed(): number {
		return this.GetSpecialValue("travel_speed")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("invoker_deafening_blast", invoker_deafening_blast)