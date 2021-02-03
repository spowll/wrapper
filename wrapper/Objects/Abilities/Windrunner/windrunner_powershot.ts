import { WrapperClass } from "../../../Decorators"
import Ability from "../../Base/Ability"

@WrapperClass("windrunner_powershot")
export default class windrunner_powershot extends Ability {
	public get AOERadius() {
		return this.GetSpecialValue("arrow_width")
	}
}
