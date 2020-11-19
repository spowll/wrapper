import { WrapperClass } from "../../../Decorators"
import Ability from "../../Base/Ability"

@WrapperClass("tiny_tree_grab")
export default class tiny_tree_grab extends Ability {
	public get ProjectileName() {
		return ["particles/units/heroes/hero_tiny/tiny_tree_proj.vpcf"]
	}
}
