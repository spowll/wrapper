import Ability from "../Base/Ability"

export default class necronomicon_archer_purge extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_Necronomicon_Archer_Purge
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("necronomicon_archer_purge", necronomicon_archer_purge)
