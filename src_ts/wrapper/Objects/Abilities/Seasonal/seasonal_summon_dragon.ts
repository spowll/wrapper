import Ability from "../../Base/Ability"

export default class seasonal_summon_dragon extends Ability {
	public NativeEntity: Nullable<CDOTA_Ability_Seasonal_Summon_Dragon>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("seasonal_summon_dragon", seasonal_summon_dragon)