import Ability from "../Base/Ability"

export default class lich_frost_nova extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Lich_FrostNova
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("lich_frost_nova", lich_frost_nova)
