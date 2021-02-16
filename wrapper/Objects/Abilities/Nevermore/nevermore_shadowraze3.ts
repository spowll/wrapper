import { WrapperClass } from "../../../Decorators"
import Ability from "../../Base/Ability"

@WrapperClass("nevermore_shadowraze3")
export default class nevermore_shadowraze3 extends Ability {
	public get AOERadius() {
		return this.GetSpecialValue("shadowraze_radius")
	}
	public get BaseCastRange() {
		return this.GetSpecialValue("shadowraze_range")
	}
}
