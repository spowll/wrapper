import Ability from "../Base/Ability"

export default class tusk_walrus_kick extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_Tusk_WalrusKick
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("tusk_walrus_kick", tusk_walrus_kick)
