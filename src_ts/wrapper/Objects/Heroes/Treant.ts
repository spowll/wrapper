import Hero from "../Base/Hero"

export default class Treant extends Hero {
	public readonly m_pBaseEntity!: C_DOTA_Unit_Hero_Treant
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Treant", Treant)
