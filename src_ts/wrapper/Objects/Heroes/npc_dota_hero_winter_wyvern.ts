import Hero from "../Base/Hero"

export default class npc_dota_hero_winter_wyvern extends Hero {
	public NativeEntity: Nullable<C_DOTA_Unit_Hero_Winter_Wyvern>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Winter_Wyvern", npc_dota_hero_winter_wyvern)