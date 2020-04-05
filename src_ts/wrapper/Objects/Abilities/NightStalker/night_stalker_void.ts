import Ability from "../../Base/Ability"

export default class night_stalker_void extends Ability {
	public get AOERadius(): number {
		return this.GetSpecialValue("radius_scepter")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("night_stalker_void", night_stalker_void)
