import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("shadow_shaman_shackles")
export class shadow_shaman_shackles extends Ability {
	/**
	 * @param level
	 * @return {number}
	 */
	public GetBaseChannelTimeForLevel(level: number): number {
		return this.GetSpecialValue("channel_time", level)
	}
}
