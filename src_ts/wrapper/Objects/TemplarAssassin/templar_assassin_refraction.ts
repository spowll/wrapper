import Ability from "../Base/Ability"

export default class templar_assassin_refraction extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_TemplarAssassin_Refraction
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("templar_assassin_refraction", templar_assassin_refraction)
