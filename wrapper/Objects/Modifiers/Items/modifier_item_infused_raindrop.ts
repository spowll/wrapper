import { WrapperClassModifier } from "../../../Decorators"
import { DAMAGE_TYPES } from "../../../Enums/DAMAGE_TYPES"
import { ModifierManager } from "../../../Managers/ModifierManager"
import { Modifier } from "../../Base/Modifier"

@WrapperClassModifier()
export class modifier_item_infused_raindrop extends Modifier {
	public readonly AbsorbDamageAfterReduction = true
	public readonly AbsorbDamageType = DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL

	private isEmited = false

	public Remove(): boolean {
		if (!super.Remove()) {
			return false
		}
		this.AbsorbDamage = 0
		this.isEmited = false
		return true
	}

	public Update(): void {
		super.Update()
		this.addIntervalThink()
	}

	public OnIntervalThink(): void {
		this.SetAbsorbDamage()
	}

	protected SetAbsorbDamage(specialName = "magic_damage_block", _subtract = false) {
		const abil = this.Ability
		if (abil === undefined || !abil.CanBeCasted()) {
			this.AbsorbDamage = 0
			return
		}
		this.AbsorbDamage = Math.max(this.GetSpecialValue(specialName), 0)
	}

	private addIntervalThink(): void {
		if (!this.isEmited) {
			this.isEmited = true
			ModifierManager.AddIntervalThink(this)
		}
	}
}
