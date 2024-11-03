import { MoveSpeedData } from "../../Data/GameData"
import { EModifierfunction } from "../../Enums/EModifierfunction"
import { TickSleeper } from "../../Helpers/Sleeper"
import { GameState } from "../../Utils/GameState"
import { GameRules } from "../Base/Entity"
import { Unit } from "../Base/Unit"

export class UnitMoveSpeedManager {
	private cachedMoveSpeed = 0

	constructor(public readonly Owner: Unit) {}

	/**
	 * @description
	 * The night-time movement speed bonus.
	 * @url see: https://dota2.fandom.com/wiki/Movement_Speed
	 */
	public get NightTimeMoveSpeedBonus(): number {
		if (GameRules === undefined || !GameRules.IsNight) {
			return 0
		}

		const cooldown = 5 // hardcoded by valve
		const nightMoveSpeed = 15 * 2 // hardcoded by valve

		// All units now gain 15 movement speed during the night.
		// The effect is doubled for heroes, but it can be broken for seconds upon
		// attacking or taking damage from player-controlled sources.

		const rawGameTime = GameState.RawGameTime,
			lastDamageTime = this.Owner.LastDamageTime + cooldown,
			lastAttackTime = this.Owner.LastAttackTime + cooldown

		if (rawGameTime < lastAttackTime || rawGameTime < lastDamageTime) {
			return 0
		}

		return nightMoveSpeed
	}

	private readonly sleeper = new TickSleeper()

	public GetMoveSpeedModifier(
		baseSpeed: number,
		isUnslowable: boolean = false
	): number {
		// if (this.canUseCachedSpeed()) {
		// 	return this.cachedMoveSpeed
		// }

		const { Min, Max, Multiplier } = MoveSpeedData,
			nightSpeed = this.NightTimeMoveSpeedBonus,
			modifierManager = this.Owner.ModifierManager

		let slowValue = 1,
			slowMultiplier = Multiplier

		if (isUnslowable || this.Owner.IsUnslowable) {
			slowValue = 0
			slowMultiplier = 0
		}

		const moveSpeedReductionPercentage = modifierManager.GetPercentageLowestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_REDUCTION_PERCENTAGE
		)

		const slowResistanceUnique = modifierManager.GetConstantHighestInternal(
			EModifierfunction.MODIFIER_PROPERTY_SLOW_RESISTANCE_UNIQUE
		)

		const slowResistanceStacking = modifierManager.GetPercentageEffectiveInternal(
			EModifierfunction.MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
			false,
			false
		)

		const effectiveReduction =
			(moveSpeedReductionPercentage * slowValue -
				moveSpeedReductionPercentage * slowMultiplier * slowResistanceUnique) *
			(1 - (slowResistanceStacking - 1))

		const moveSpeedBonusConstant = modifierManager.GetConditionalAdditiveInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
			1,
			effectiveReduction
		)

		const moveSpeedBonusConstantUnique = modifierManager.GetConstantHighestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE
		)

		const moveSpeedBonusConstantUnique2 = modifierManager.GetConstantHighestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE_2
		)

		const moveSpeedBonusPercentage = modifierManager.GetConditionalPercentageInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
			1,
			effectiveReduction
		)

		const moveSpeedBonusPercentageUnique = modifierManager.GetConstantHighestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE
		)

		const effectiveBonusPercentage = moveSpeedBonusPercentageUnique * Multiplier

		const moveSpeedBonusUnique = modifierManager.GetConstantHighestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE
		)

		let calculatedSpeed = Math.max(
			(moveSpeedBonusUnique +
				moveSpeedBonusConstantUnique2 +
				moveSpeedBonusConstantUnique +
				(moveSpeedBonusConstant + baseSpeed + nightSpeed)) *
				(effectiveBonusPercentage + moveSpeedBonusPercentage),
			Min
		)

		const ignoreSpeedLimit = modifierManager.GetConstantHighestInternal(
			EModifierfunction.MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT
		)

		if (ignoreSpeedLimit === 0 && calculatedSpeed >= Max) {
			calculatedSpeed = Max
		}

		const absoluteSpeed = modifierManager.GetConstantHighestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE
		)

		const absoluteSpeedMin = modifierManager.GetConstantHighestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MIN
		)

		const absoluteSpeedMax = modifierManager.GetConstantLowestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX
		)

		if (!this.sleeper.Sleeping) {
			console.log(
				"MODIFIER_PROPERTY_MOVESPEED_REDUCTION_PERCENTAGE",
				moveSpeedReductionPercentage,
				"MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT",
				moveSpeedBonusConstant,
				"MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE",
				moveSpeedBonusPercentage,
				"MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING",
				slowResistanceStacking,
				"MODIFIER_PROPERTY_SLOW_RESISTANCE_UNIQUE",
				slowResistanceUnique,
				"effectiveBonusPercentage",
				effectiveBonusPercentage,
				"effectiveReduction",
				effectiveReduction
			)
			this.sleeper.Sleep(2000)
		}

		if (absoluteSpeed > 0 || absoluteSpeedMin > 0) {
			if (absoluteSpeedMax <= 0) {
				calculatedSpeed =
					absoluteSpeedMin <= 0
						? absoluteSpeed
						: Math.max(
								Math.max(absoluteSpeedMin, calculatedSpeed),
								absoluteSpeed
							)
			} else {
				calculatedSpeed = absoluteSpeedMax
			}
		} else if (absoluteSpeedMax > 0) {
			calculatedSpeed = absoluteSpeedMax
		}

		const speedLimit = modifierManager.GetConstantLowestInternal(
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_LIMIT
		)

		if (speedLimit === 0 || isUnslowable) {
			return (this.cachedMoveSpeed = calculatedSpeed)
		}

		const result = Math.min(calculatedSpeed, speedLimit)
		return (this.cachedMoveSpeed = result)
	}

	private canUseCachedSpeed() {
		if (this.cachedMoveSpeed === 0) {
			return false
		}
		const owner = this.Owner,
			isNetwork = owner.NetworkActivity === owner.NetworkActivityPrev
		return !owner.IsAlive || !isNetwork || !owner.IsMoving
	}
}
