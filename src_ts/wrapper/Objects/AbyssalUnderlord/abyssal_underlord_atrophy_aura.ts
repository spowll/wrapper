import Ability from "../Base/Ability"

export default class abyssal_underlord_atrophy_aura extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_AbyssalUnderlord_AtrophyAura
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("abyssal_underlord_atrophy_aura", abyssal_underlord_atrophy_aura)
