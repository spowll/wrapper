import Ability from "../Base/Ability"

export default class weaver_the_swarm extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Weaver_TheSwarm
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("weaver_the_swarm", weaver_the_swarm)
