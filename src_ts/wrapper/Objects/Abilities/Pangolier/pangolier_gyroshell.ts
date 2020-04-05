import Ability from "../../Base/Ability"

export default class pangolier_gyroshell extends Ability {
	public get AOERadius(): number {
		return this.GetSpecialValue("hit_radius")
	}
	public get Speed(): number {
		return this.GetSpecialValue("forward_move_speed")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("pangolier_gyroshell", pangolier_gyroshell)
