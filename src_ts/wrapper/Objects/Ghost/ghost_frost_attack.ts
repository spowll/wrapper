import Ability from "../Base/Ability"

export default class ghost_frost_attack extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Ghost_FrostAttack
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("ghost_frost_attack", ghost_frost_attack)
