import Ability from "../../Base/Ability"

export default class spectre_reality extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Spectre_Reality>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("spectre_reality", spectre_reality)