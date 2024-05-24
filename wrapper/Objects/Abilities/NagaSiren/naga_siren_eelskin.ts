import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("naga_siren_eelskin")
export class naga_siren_eelskin extends Ability {
	public get ShouldBeDrawable(): boolean {
		return false
	}
}