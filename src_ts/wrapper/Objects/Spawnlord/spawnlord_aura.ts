import Ability from "../Base/Ability"

export default class spawnlord_aura extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_Spawnlord_Aura
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("spawnlord_aura", spawnlord_aura)
