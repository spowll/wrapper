import Ability from "../Base/Ability"

export default class lycan_howl extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Lycan_Howl
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("lycan_howl", lycan_howl)
