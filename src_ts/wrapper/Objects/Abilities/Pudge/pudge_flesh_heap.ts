import Ability from "../../Base/Ability"

export default class pudge_flesh_heap extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Pudge_FleshHeap>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("pudge_flesh_heap", pudge_flesh_heap)