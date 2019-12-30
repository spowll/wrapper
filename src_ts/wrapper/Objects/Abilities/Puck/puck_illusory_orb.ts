import Ability from "../../Base/Ability"

export default class puck_illusory_orb extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Puck_IllusoryOrb

	private get CaclculateOrb(): number {
		let speed = this.GetSpecialValue("max_distance")
		let talent = this.Owner?.GetTalentValue("special_bonus_unique_puck")

		if (talent !== 0)
			speed *= (talent! / 100) + 1

		return speed
	}

	public get BaseCastRange(): number {
		return this.CaclculateOrb
	}

	public get Speed(): number {
		return this.CaclculateOrb
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("puck_illusory_orb", puck_illusory_orb)
