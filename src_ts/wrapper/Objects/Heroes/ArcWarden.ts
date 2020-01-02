import Hero from "../Base/Hero"

export default class ArcWarden extends Hero {
	public readonly m_pBaseEntity!: CDOTA_Unit_Hero_ArcWarden
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("CDOTA_Unit_Hero_ArcWarden", ArcWarden)
