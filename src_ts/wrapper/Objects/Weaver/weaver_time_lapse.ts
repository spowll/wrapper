import Ability from "../Base/Ability"

export default class weaver_time_lapse extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Weaver_TimeLapse
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("weaver_time_lapse", weaver_time_lapse)
