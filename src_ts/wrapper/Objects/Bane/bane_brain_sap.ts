import Ability from "../Base/Ability"

export default class bane_brain_sap extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Bane_BrainSap
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("bane_brain_sap", bane_brain_sap)
