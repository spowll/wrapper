import Hero from "../Base/Hero"
import meepo_divided_we_stand from "../Abilities/Meepo/meepo_divided_we_stand"

export default class npc_dota_hero_meepo extends Hero {
	public get WhichMeepo(): number {
		// move it when we_stand will be wrapped as Ability
		let findWeStand = this.GetAbilityByClass(meepo_divided_we_stand)
		if (findWeStand === undefined)
			return 0

		return findWeStand.WhichDividedWeStand
	}
	public get IsClone(): boolean {
		return this.WhichMeepo !== 0
	}
	public get IsIllusion(): boolean {
		return this.ReplicatingOtherHeroModel_ !== 0 && !this.IsClone
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_Unit_Hero_Meepo", npc_dota_hero_meepo)
