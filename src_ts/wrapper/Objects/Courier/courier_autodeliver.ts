import Ability from "../Base/Ability"

export default class courier_autodeliver extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_Courier_AutoDeliver
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("courier_autodeliver", courier_autodeliver)
