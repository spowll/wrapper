import Ability from "../../Base/Ability"

export default class omniknight_repel extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Omniknight_Repel>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("omniknight_repel", omniknight_repel)