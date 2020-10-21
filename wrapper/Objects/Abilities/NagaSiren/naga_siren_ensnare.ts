import Ability from "../../Base/Ability"
import { WrapperClass } from "../../../Decorators"

@WrapperClass("naga_siren_ensnare")
export default class naga_siren_ensnare extends Ability {
	public get ProjectileName() {
		return ["particles/units/heroes/hero_siren/siren_net_projectile.vpcf"]
	}
}
