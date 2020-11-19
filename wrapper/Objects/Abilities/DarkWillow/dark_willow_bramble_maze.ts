import { WrapperClass } from "../../../Decorators"
import Ability from "../../Base/Ability"

@WrapperClass("dark_willow_bramble_maze")
export default class dark_willow_bramble_maze extends Ability {
	public get AOERadius(): number {
		return this.GetSpecialValue("placement_range")
	}
}
