import Ability from "../Base/Ability"

export default class invoker_exort extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Invoker_Exort
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("invoker_exort", invoker_exort)
