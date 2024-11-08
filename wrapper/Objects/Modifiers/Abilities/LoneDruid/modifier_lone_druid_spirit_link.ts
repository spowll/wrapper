import { WrapperClassModifier } from "../../../../Decorators"
import { ModifierManager } from "../../../../Managers/ModifierManager"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_lone_druid_spirit_link extends Modifier {
	private isEmited = false

	public Update(): void {
		super.Update()
		this.addIntervalThink()
	}

	public Remove(): boolean {
		if (!super.Remove()) {
			return false
		}
		this.BonusArmor = 0
		this.isEmited = false
		return true
	}

	public OnIntervalThink(): void {
		this.SetBonusArmor()
	}

	protected SetBonusAttackSpeed(
		specialName = "bonus_attack_speed",
		subtract = false
	): void {
		super.SetBonusAttackSpeed(specialName, subtract)
	}

	protected SetBonusArmor(specialName = "armor_sharing", _subtract = false): void {
		const caster = this.Caster
		if (caster === undefined || caster === this.Parent) {
			this.BonusArmor = 0
			return
		}
		const armor = Math.max(caster.Armor, 0) // share only positive?
		const value = this.GetSpecialValue(specialName) / 100
		this.BonusArmor = armor * value
	}

	private addIntervalThink(): void {
		if (!this.isEmited) {
			this.isEmited = true
			ModifierManager.AddIntervalThink(this)
		}
	}
}
