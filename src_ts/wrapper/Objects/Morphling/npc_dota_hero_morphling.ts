import Hero from "../Base/Hero"

export default class npc_dota_hero_morphling extends Hero {
	public readonly m_pBaseEntity!: C_DOTA_Unit_Hero_Morphling
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Morphling", npc_dota_hero_morphling)