import Hero from "../Base/Hero"

export default class npc_dota_hero_life_stealer extends Hero {
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Life_Stealer", npc_dota_hero_life_stealer)
