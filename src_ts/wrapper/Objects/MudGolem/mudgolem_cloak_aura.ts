import Ability from "../Base/Ability"

export default class mudgolem_cloak_aura extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_MudGolem_CloakAura
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("mudgolem_cloak_aura", mudgolem_cloak_aura)
