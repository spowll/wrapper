import Ability from "../Base/Ability"

export default class phoenix_fire_spirits extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Phoenix_FireSpirits
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("phoenix_fire_spirits", phoenix_fire_spirits)
