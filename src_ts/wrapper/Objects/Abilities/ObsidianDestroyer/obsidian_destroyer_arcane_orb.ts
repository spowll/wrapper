import Ability from "../../Base/Ability"

export default class obsidian_destroyer_arcane_orb extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_Obsidian_Destroyer_ArcaneOrb>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("obsidian_destroyer_arcane_orb", obsidian_destroyer_arcane_orb)