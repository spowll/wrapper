import Ability from "../Base/Ability"

export default class troll_warlord_fervor extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_TrollWarlord_Fervor
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("troll_warlord_fervor", troll_warlord_fervor)
