import Ability from "../../Base/Ability"
import { WrapperClass } from "../../../Decorators"

@WrapperClass("treant_eyes_in_the_forest")
export default class treant_eyes_in_the_forest extends Ability {
	public get AOERadius(): number {
		return this.GetSpecialValue("vision_aoe")
	}
}
