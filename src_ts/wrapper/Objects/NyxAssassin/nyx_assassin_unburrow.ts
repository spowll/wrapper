import Ability from "../Base/Ability"

export default class nyx_assassin_unburrow extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_Nyx_Assassin_Unburrow
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("nyx_assassin_unburrow", nyx_assassin_unburrow)
