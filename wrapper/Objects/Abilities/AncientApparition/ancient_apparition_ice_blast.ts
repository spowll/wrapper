import Ability from "../../Base/Ability"
import { WrapperClass } from "../../../Decorators"

@WrapperClass("ancient_apparition_ice_blast")
export default class ancient_apparition_ice_blast extends Ability {
	public get AOERadius(): number {
		return this.GetSpecialValue("path_radius")
	}
}