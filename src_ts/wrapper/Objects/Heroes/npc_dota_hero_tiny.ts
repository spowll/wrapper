import Hero from "../Base/Hero"

export default class npc_dota_hero_tiny extends Hero {
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Tiny", npc_dota_hero_tiny)
