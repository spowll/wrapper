import Ability from "../../Base/Ability"

export default class invoker_sun_strike extends Ability {
	public get AOERadius(): number {
		return this.GetSpecialValue("area_of_effect")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("invoker_sun_strike", invoker_sun_strike)
