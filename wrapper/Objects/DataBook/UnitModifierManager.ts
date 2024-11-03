import { CModifierParams } from "../../Base/CModifierParams"
import { EModifierfunction } from "../../Enums/EModifierfunction"
import { Modifier, ModifierHandlerValue } from "../Base/Modifier"

export class UnitModifierManager {
	private readonly modifierFunctions = new Map<
		EModifierfunction,
		ModifierHandlerValue[]
	>()

	public readonly All: Modifier[] = []
	public readonly Buffs: Modifier[] = []
	public readonly Debuffs: Modifier[] = []

	public GetConstantLowestInternal(
		modifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.modifierFunctions.get(modifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 0
		}
		params ??= new CModifierParams()
		let lowestValue = Number.MAX_VALUE
		for (let i = handlers.length - 1; i > -1; i--) {
			const result = handlers[i](params)
			if (result !== 0) {
				lowestValue = Math.min(lowestValue, result)
			}
		}
		return lowestValue === Number.MAX_VALUE ? 0 : lowestValue
	}

	public GetConstantHighestInternal(
		modifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.modifierFunctions.get(modifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 0
		}
		params ??= new CModifierParams()
		let result = 0
		for (let i = handlers.length - 1; i > -1; i--) {
			result = Math.max(result, handlers[i](params))
		}
		return result
	}

	public GetConstantAdditiveInternal(
		modifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.modifierFunctions.get(modifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 0
		}
		params ??= new CModifierParams()
		let result = 0
		for (let i = handlers.length - 1; i > -1; i--) {
			result += handlers[i](params)
		}
		return result
	}

	public GetPercentageAdditiveInternal(
		modifierfunction: EModifierfunction,
		params?: CModifierParams
	) {
		const handlers = this.modifierFunctions.get(modifierfunction)
		if (handlers === undefined || handlers.length === 0) {
			return 1
		}
		params ??= new CModifierParams()
		let result = 100
		for (let i = handlers.length - 1; i > -1; i--) {
			result += handlers[i](params)
		}
		return result / 100
	}

	public AddInternalModifierFunction(
		modifierfunction: EModifierfunction,
		handler: ModifierHandlerValue
	): void {
		const modifiers = this.modifierFunctions.get(modifierfunction)
		if (modifiers === undefined) {
			this.modifierFunctions.set(modifierfunction, [handler])
			return
		}
		modifiers.push(handler)
	}

	public RemoveInternalModifierFunction(
		modifierfunction: EModifierfunction,
		modifier: ModifierHandlerValue
	): void {
		const modifiers = this.modifierFunctions.get(modifierfunction)
		if (modifiers !== undefined) {
			modifiers.remove(modifier)
		}
	}
}
