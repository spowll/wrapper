import Ability from "../Base/Ability"

export default class zuus_static_field extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Zuus_StaticField
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("zuus_static_field", zuus_static_field)
