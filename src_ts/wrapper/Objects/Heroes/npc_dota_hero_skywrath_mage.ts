import Hero from "../Base/Hero"

export default class npc_dota_hero_skywrath_mage extends Hero {
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Skywrath_Mage", npc_dota_hero_skywrath_mage)
