import { WrapperClass } from "../../../Decorators"
import Ability from "../../Base/Ability"

@WrapperClass("nevermore_dark_lord")
export default class nevermore_dark_lord extends Ability {
	public GetAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("presence_radius", level)
	}
}
