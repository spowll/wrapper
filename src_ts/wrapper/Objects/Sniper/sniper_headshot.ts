import Ability from "../Base/Ability"

export default class sniper_headshot extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Sniper_Headshot
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("sniper_headshot", sniper_headshot)
