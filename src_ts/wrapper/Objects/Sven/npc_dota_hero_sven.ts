import Hero from "../Base/Hero"

export default class npc_dota_hero_sven extends Hero {
	public readonly m_pBaseEntity!: C_DOTA_Unit_Hero_Sven
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Sven", npc_dota_hero_sven)