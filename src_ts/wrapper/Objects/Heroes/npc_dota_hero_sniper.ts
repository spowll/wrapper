import Hero from "../Base/Hero"

export default class npc_dota_hero_sniper extends Hero {
	public NativeEntity: Nullable<C_DOTA_Unit_Hero_Sniper>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Sniper", npc_dota_hero_sniper)