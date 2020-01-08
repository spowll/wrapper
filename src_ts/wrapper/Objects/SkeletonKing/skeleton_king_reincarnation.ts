import Ability from "../Base/Ability"

export default class skeleton_king_reincarnation extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_SkeletonKing_Reincarnation
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("skeleton_king_reincarnation", skeleton_king_reincarnation)
