import Hero from "../Base/Hero"

export default class ChaosKnight extends Hero {
	public readonly m_pBaseEntity!: C_DOTA_Unit_Hero_ChaosKnight
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_ChaosKnight", ChaosKnight)