import Ability from "../../Base/Ability"

export default class enchantress_natures_attendants extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Enchantress_NaturesAttendants>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("enchantress_natures_attendants", enchantress_natures_attendants)