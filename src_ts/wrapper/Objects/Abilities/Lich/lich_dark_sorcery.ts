import Ability from "../../Base/Ability"

export default class lich_dark_sorcery extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Lich_DarkSorcery>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("lich_dark_sorcery", lich_dark_sorcery)