import Ability from "../Base/Ability"

export default class invoker_cold_snap extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Invoker_ColdSnap
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("invoker_cold_snap", invoker_cold_snap)
