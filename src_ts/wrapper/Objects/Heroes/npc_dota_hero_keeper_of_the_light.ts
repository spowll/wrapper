import Hero from "../Base/Hero"

export default class npc_dota_hero_keeper_of_the_light extends Hero {
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_KeeperOfTheLight", npc_dota_hero_keeper_of_the_light)
