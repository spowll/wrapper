import Ability from "../Base/Ability"

export default class phoenix_icarus_dive extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Phoenix_IcarusDive
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("phoenix_icarus_dive", phoenix_icarus_dive)
