import Ability from "../Base/Ability"

export default class slark_dark_pact extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Slark_DarkPact
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("slark_dark_pact", slark_dark_pact)
