import Ability from "../../Base/Ability"

export default class bristleback_viscous_nasal_goo extends Ability {

	public get AOERadius(): number {
		return this.Owner?.HasScepter
			? this.GetSpecialValue("radius_scepter")
			: 0
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("bristleback_viscous_nasal_goo", bristleback_viscous_nasal_goo)
