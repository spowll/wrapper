import Hero from "../Base/Hero"

export default class npc_dota_hero_snapfire extends Hero {
	public readonly m_pBaseEntity!: CDOTA_Unit_Hero_Snapfire
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("CDOTA_Unit_Hero_Snapfire", npc_dota_hero_snapfire)