import Ability from "../../Base/Ability"

export default class storm_spirit_ball_lightning extends Ability {
	public get CastRange(): number {
		let mana = (this.Owner?.Mana ?? 0) - this.ManaCost
		if (mana <= 0)
			return 0

		let travelCost = this.GetSpecialValue("ball_lightning_travel_cost_base")
			+ ((this.Owner?.MaxMana ?? 0) * (this.GetSpecialValue("ball_lightning_travel_cost_percent") / 100))

		return travelCost !== 0 ? Math.ceil(mana / travelCost) * 100 : 0

	}

	public get AOERadius(): number {
		return this.GetSpecialValue("ball_lightning_aoe")
	}

	public get Speed(): number {
		return this.GetSpecialValue("ball_lightning_move_speed")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("storm_spirit_ball_lightning", storm_spirit_ball_lightning)
