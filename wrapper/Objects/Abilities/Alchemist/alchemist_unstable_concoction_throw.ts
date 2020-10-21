import Ability from "../../Base/Ability"
import { WrapperClass } from "../../../Decorators"

@WrapperClass("alchemist_unstable_concoction_throw")
export default class alchemist_unstable_concoction_throw extends Ability {
	public get AOERadius(): number {
		return this.GetSpecialValue("midair_explosion_radius")
	}
	public get ProjectileName() {
		return ["particles/units/heroes/hero_alchemist/alchemist_unstable_concoction_projectile.vpcf"]
	}
}
