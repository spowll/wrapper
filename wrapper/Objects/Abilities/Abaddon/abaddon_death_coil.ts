import Ability from "../../Base/Ability"
import { WrapperClass } from "../../../Decorators"

@WrapperClass("abaddon_death_coil")
export default class abaddon_death_coil extends Ability {
	public get ProjectileName() {
		return ["particles/units/heroes/hero_abaddon/abaddon_death_coil.vpcf"]
	}
}