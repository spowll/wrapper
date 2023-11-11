import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("rubick_empty1")
export class rubick_empty1 extends Ability {
	constructor(index: number, serial: number, name: string) {
		super(index, serial, name)
		this.IsEmpty = true
	}
}
