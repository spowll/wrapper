import Ability from "../../Base/Ability"

export default class visage_soul_assumption extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Visage_SoulAssumption>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("visage_soul_assumption", visage_soul_assumption)