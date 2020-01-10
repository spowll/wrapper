import Ability from "../Base/Ability"

export default class puck_dream_coil extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Puck_DreamCoil

	public get AOERadius(): number {
		return this.GetSpecialValue("radius")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("puck_dream_coil", puck_dream_coil)