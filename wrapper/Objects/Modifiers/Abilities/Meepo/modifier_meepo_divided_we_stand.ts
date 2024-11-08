import { WrapperClassModifier } from "../../../../Decorators"
import { EventsSDK } from "../../../../Managers/EventsSDK"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_meepo_divided_we_stand extends Modifier {
	public UnitPropertyChanged(changed?: boolean): boolean {
		const owner = this.Parent
		if (owner === undefined) {
			return false
		}
		EventsSDK.emit("UnitPropertyChanged", false, owner)
		return super.UnitPropertyChanged(changed)
	}
}
