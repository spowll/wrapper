import Ability from "../../Base/Ability"

export default class earthshaker_enchant_totem extends Ability {

	public get AOERadius(): number {
		return this.GetSpecialValue("aftershock_range")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("earthshaker_enchant_totem", earthshaker_enchant_totem)
