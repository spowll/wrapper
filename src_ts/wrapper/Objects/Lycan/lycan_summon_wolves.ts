import Ability from "../Base/Ability"

export default class lycan_summon_wolves extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Lycan_SummonWolves
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("lycan_summon_wolves", lycan_summon_wolves)