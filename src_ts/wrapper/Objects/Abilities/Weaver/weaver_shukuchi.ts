import Ability from "../../Base/Ability"

export default class weaver_shukuchi extends Ability {
	public get IsInvisibilityType() {
		return true
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("weaver_shukuchi", weaver_shukuchi)
