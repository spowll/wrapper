import { NetworkedBasicField, WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("invoker_cold_snap_ad")
export class invoker_cold_snap_ad extends Ability {
	@NetworkedBasicField("m_nQuasLevel")
	public QuasLevel = 0
	@NetworkedBasicField("m_nWexLevel")
	public WexLevel = 0
	@NetworkedBasicField("m_nExortLevel")
	public ExortLevel = 0

	public GetMaxCooldownForLevel(level: number): number {
		return this.GetSpecialValue("AbilityCooldown", level)
	}
}
