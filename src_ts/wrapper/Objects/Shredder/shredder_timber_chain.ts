import Ability from "../Base/Ability"

export default class shredder_timber_chain extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Shredder_TimberChain
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("shredder_timber_chain", shredder_timber_chain)
