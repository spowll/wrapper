import Ability from "../../Base/Ability"

export default class grimstroke_soul_chain extends Ability {
	public NativeEntity: Nullable<CDOTA_Ability_Grimstroke_SoulChain>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("grimstroke_soul_chain", grimstroke_soul_chain)