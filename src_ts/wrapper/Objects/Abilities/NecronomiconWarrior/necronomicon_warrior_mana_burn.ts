import Ability from "../../Base/Ability"

export default class necronomicon_warrior_mana_burn extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Necronomicon_Warrior_ManaBurn>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("necronomicon_warrior_mana_burn", necronomicon_warrior_mana_burn)