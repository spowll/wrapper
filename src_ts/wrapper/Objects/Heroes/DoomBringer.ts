import Hero from "../Base/Hero"

export default class DoomBringer extends Hero {
	public readonly m_pBaseEntity!: C_DOTA_Unit_Hero_DoomBringer
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_DoomBringer", DoomBringer)
