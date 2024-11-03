import { CModifierParams } from "../../Base/CModifierParams"
import { MoveSpeedData } from "../../Data/GameData"
import { EModifierfunction } from "../../Enums/EModifierfunction"
import { Modifier, ModifierHandlerValue } from "../Base/Modifier"
import { Unit } from "../Base/Unit"

export class UnitModifierManager {
	private readonly EModifierfunctions = new Map<
		EModifierfunction,
		ModifierHandlerValue[]
	>()

	public readonly All: Modifier[] = []
	public readonly Buffs: Modifier[] = []
	public readonly Debuffs: Modifier[] = []

	constructor(public readonly Owner: Unit) {}

	public GetConstantLowestInternal(
		eModifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.EModifierfunctions.get(eModifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 0
		}
		let lowestValue = Number.MAX_VALUE
		params ??= new CModifierParams()
		for (let i = handlers.length - 1; i > -1; i--) {
			const result = handlers[i](params)
			if (result !== 0) {
				lowestValue = Math.min(lowestValue, result)
			}
		}
		return lowestValue === Number.MAX_VALUE ? 0 : lowestValue
	}

	public GetConstantHighestInternal(
		eModifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.EModifierfunctions.get(eModifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 0
		}
		let result = 0
		params ??= new CModifierParams()
		for (let i = handlers.length - 1; i > -1; i--) {
			result = Math.max(result, handlers[i](params))
		}
		return result
	}

	public GetConstantAdditiveInternal(
		eModifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.EModifierfunctions.get(eModifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 0
		}
		let result = 0
		params ??= new CModifierParams()
		for (let i = handlers.length - 1; i > -1; i--) {
			result += handlers[i](params)
		}
		return result
	}

	public GetConditionalAdditiveInternal(
		eModifierfunction: EModifierfunction,
		multiplier: number = 1,
		incoming: number = 0,
		params?: CModifierParams
	) {
		const handlers = this.EModifierfunctions.get(eModifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 0
		}
		let result = 0
		params ??= new CModifierParams()
		for (let i = handlers.length - 1; i > -1; i--) {
			const modifierValue = handlers[i](params)
			result += modifierValue * (modifierValue < 0 ? incoming : multiplier)
		}
		return result
	}

	public GetConditionalPercentageInternal(
		eModifierfunction: EModifierfunction,
		multiplier: number = 1,
		incoming: number = 0,
		params?: CModifierParams
	) {
		let totalResult = 96
		const multiplierFactor = MoveSpeedData.Multiplier,
			handlers = this.EModifierfunctions.get(eModifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return totalResult * multiplierFactor
		}
		params ??= new CModifierParams()
		for (let i = handlers.length - 1; i > -1; i--) {
			const modifierValue = handlers[i](params)
			totalResult += modifierValue * (modifierValue < 0 ? incoming : multiplier)
		}

		console.log(totalResult, incoming, multiplier, multiplierFactor)

		return totalResult * multiplierFactor
	}

	public GetPercentageAdditiveInternal(
		eModifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.EModifierfunctions.get(eModifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 1
		}
		let result = 100
		params ??= new CModifierParams()
		for (let i = handlers.length - 1; i > -1; i--) {
			result += handlers[i](params)
		}
		return result / 100
	}

	public GetPercentageLowestInternal(
		eModifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.EModifierfunctions.get(eModifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 1
		}
		let lowestValue = 100
		params ??= new CModifierParams()
		for (let i = handlers.length - 1; i > -1; i--) {
			const result = handlers[i](params)
			if (result !== 0) {
				lowestValue = Math.min(lowestValue, result)
			}
		}
		return lowestValue * MoveSpeedData.Multiplier
	}

	public GetPercentageEffectiveInternal(
		eModifierfunction: EModifierfunction,
		isNegative: boolean,
		applyOnlyPositive: boolean,
		params?: CModifierParams
	) {
		const handlers = this.EModifierfunctions.get(eModifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 1
		}

		let aggregateValue = 1
		params ??= new CModifierParams()

		for (let i = handlers.length - 1; i > -1; i--) {
			const result = handlers[i](params)
			if (result > 99.99) {
				if (!isNegative) {
					aggregateValue = 0
					break
				}
			} else if (!isNegative) {
				// positive case
				if (!applyOnlyPositive || result > 0) {
					aggregateValue *= 1 - result * MoveSpeedData.Multiplier
				}
			} else if (result < 0) {
				// negative case
				aggregateValue *= result * MoveSpeedData.Multiplier + 1
			}
		}
		return 1 - aggregateValue + 1
	}

	public AddInternalEModifierfunction(
		eModifierfunction: EModifierfunction,
		handler: ModifierHandlerValue
	): void {
		const modifiers = this.EModifierfunctions.get(eModifierfunction)
		if (modifiers === undefined) {
			this.EModifierfunctions.set(eModifierfunction, [handler])
			return
		}
		modifiers.push(handler)
	}

	public RemoveInternalEModifierfunction(
		eModifierfunction: EModifierfunction,
		modifier: ModifierHandlerValue
	): void {
		const modifiers = this.EModifierfunctions.get(eModifierfunction)
		if (modifiers !== undefined) {
			modifiers.remove(modifier)
		}
	}
}
