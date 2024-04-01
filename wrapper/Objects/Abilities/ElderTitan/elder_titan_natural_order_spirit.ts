import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("elder_titan_natural_order_spirit")
export class elder_titan_natural_order_spirit extends Ability {
	public GetBaseAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("radius", level)
	}
}
