import { CModifierParams } from "../../Base/CModifierParams"
import { Vector4 } from "../../Base/Vector4"
import { EModifierfunction } from "../../Enums/EModifierfunction"
import { EntityManager } from "../../Managers/EntityManager"
import { EventsSDK } from "../../Managers/EventsSDK"
import { IModifier } from "../../Managers/ModifierManager"
import { GameState } from "../../Utils/GameState"
import { AbilityData } from "../DataBook/AbilityData"
import { Ability } from "./Ability"
import { Entity } from "./Entity"
import { Unit } from "./Unit"

const scepterRegExp = /^modifier_(item_ultimate_scepter|wisp_tether_scepter)/

export type ModifierHandlerValue = (params?: CModifierParams) => number
export type ModifierMapFieldHandler = Map<EModifierfunction, ModifierHandlerValue>

export class Modifier {
	public static readonly DebuffHeal: string[] = [
		"modifier_ice_blast",
		"modifier_doom_bringer_doom"
	]
	public static readonly AttackThroughImmunity: string[] = [
		"modifier_item_revenants_brooch_active",
		"modifier_muerta_pierce_the_veil_buff"
	]
	// TODO: rework this after add ModifierManager
	public static HasTrueSightBuff(buffs: Modifier[]): boolean {
		return buffs.some(buff => {
			switch (buff.Name) {
				case "modifier_truesight":
				case "modifier_item_dustofappearance":
				case "modifier_bloodseeker_thirst_vision":
				case "modifier_bounty_hunter_track":
					return true
				default:
					return false
			}
		})
	}

	// TODO: rework this after add ModifierManager
	public static HasScepterBuff(buffs: Modifier[]): boolean {
		return buffs.some(buff => scepterRegExp.test(buff.Name))
	}

	// TODO: rework this after add ModifierManager
	public static HasShardBuff(buffs: Modifier[]): boolean {
		return buffs.some(buff => buff.Name === "modifier_item_aghanims_shard")
	}

	public static CanBeHealed(unit: Unit): boolean
	public static CanBeHealed(buffs: Modifier[]): boolean
	public static CanBeHealed(option: Unit | Modifier[]): boolean {
		return Array.isArray(option)
			? option.every(buff => !this.DebuffHeal.includes(buff.Name))
			: option.ModifierManager.All.every(
					buff => !this.DebuffHeal.includes(buff.Name)
				)
	}

	public readonly Name: string
	public readonly IsAura: boolean
	public readonly Index: number
	public readonly SerialNumber: number
	public readonly DDAbilityName: string

	public NetworkArmor = 0
	public NetworkDamage = 0
	public NetworkFadeTime = 0
	public NetworkBonusMana = 0
	public NetworkBonusHealth = 0
	public NetworkAttackSpeed = 0
	public NetworkChannelTime = 0
	public NetworkMovementSpeed = 0
	public NetworkBonusAllStats = 0

	public CreationTime = 0
	public CustomEntity: Nullable<Unit>
	public StackCount = 0
	public Duration = 0
	public AbilityLevel = 0

	public Parent: Nullable<Unit>
	public Ability: Nullable<Ability>
	public Caster: Nullable<Unit>
	public AuraOwner: Nullable<Unit>

	public IsValid = true
	public ShouldDoFlyHeightVisual = false
	public DeclaredFunction: Nullable<ModifierMapFieldHandler>

	constructor(public kv: IModifier) {
		this.Index = this.kv.Index ?? -1
		this.SerialNumber = this.kv.SerialNum ?? -1
		this.IsAura = this.kv.IsAura ?? false
		this.Name = this.kv.InternalName
		this.DDAbilityName = this.kv.InternalDDAbilityName
	}

	public get InvisibilityLevel(): number {
		const fadeTime = this.kv.FadeTime
		if (fadeTime === undefined) {
			return 0
		}
		if (fadeTime === 0) {
			return 1
		}
		return Math.min(this.ElapsedTime / (fadeTime * 2), 1)
	}

	public get DeltaZ(): number {
		return 0
	}

	public get DieTime(): number {
		return this.CreationTime + this.Duration
	}

	public get ElapsedTime(): number {
		return Math.max(GameState.RawGameTime - this.CreationTime, 0)
	}

	public get RemainingTime(): number {
		return Math.max(this.DieTime - GameState.RawGameTime, 0)
	}

	public get DDModifierID(): Nullable<number> {
		return this.kv.DDModifierID
	}

	public get vStart(): Vector4 {
		const vec = this.kv.vStart
		if (vec === undefined) {
			return new Vector4().Invalidate()
		}
		return new Vector4(vec.x, vec.y, vec.z, vec.w)
	}

	public get vEnd(): Vector4 {
		const vec = this.kv.vEnd
		if (vec === undefined) {
			return new Vector4().Invalidate()
		}
		return new Vector4(vec.x, vec.y, vec.z, vec.w)
	}

	public Update(): void {
		let newParent = EntityManager.EntityByIndex<Unit>(this.kv.Parent),
			newCaster = EntityManager.EntityByIndex<Unit>(this.kv.Caster),
			newAbility = EntityManager.EntityByIndex<Ability>(this.kv.Ability),
			newAuraOwner = EntityManager.EntityByIndex<Unit>(this.kv.AuraOwner),
			newCustomEntity = EntityManager.EntityByIndex<Unit>(this.kv.CustomEntity)

		if (!newParent?.IsUnit) {
			newParent = undefined
		}
		if (!newCaster?.IsUnit) {
			newCaster = undefined
		}
		if (!newAbility?.IsAbility) {
			newAbility = undefined
		}
		if (!newAuraOwner?.IsUnit) {
			newAuraOwner = undefined
		}
		if (!newCustomEntity?.IsUnit) {
			newCustomEntity = undefined
		}
		const newAbilityLevel = this.kv.AbilityLevel ?? 0,
			newDuration = this.kv.Duration ?? 0,
			newStackCount = this.kv.StackCount ?? 0,
			newCreationTime = this.kv.CreationTime ?? 0,
			newArmor = this.kv.Armor ?? 0,
			newAttackSpeed = this.kv.AttackSpeed ?? 0,
			newChannelTime = this.kv.ChannelTime ?? 0,
			newDamage = this.kv.Damage ?? 0,
			newFadeTime = this.kv.FadeTime ?? 0

		if (this.Parent !== newParent) {
			this.Remove()
		}
		let updated = false
		if (this.Caster !== newCaster) {
			this.Caster = newCaster
			updated = true
		}
		if (this.NetworkFadeTime !== newFadeTime) {
			this.NetworkFadeTime = newFadeTime
			updated = true
		}
		if (this.Ability !== newAbility) {
			this.Ability = newAbility
			updated = true
		}
		if (this.AuraOwner !== newAuraOwner) {
			this.AuraOwner = newAuraOwner
			updated = true
		}
		if (this.AbilityLevel !== newAbilityLevel) {
			this.AbilityLevel = newAbilityLevel
			updated = true
		}
		if (this.NetworkDamage !== newDamage) {
			this.NetworkDamage = newDamage
			updated = true
		}
		if (this.Duration !== newDuration) {
			this.Duration = newDuration
			updated = true
		}
		if (this.StackCount !== newStackCount) {
			this.StackCount = newStackCount
			updated = true
		}
		if (this.CreationTime !== newCreationTime) {
			this.CreationTime = newCreationTime
			updated = true
		}
		if (this.NetworkArmor !== newArmor) {
			this.NetworkArmor = newArmor
			updated = true
		}
		if (this.CustomEntity !== newCustomEntity) {
			this.CustomEntity = newCustomEntity
			updated = true
		}
		if (this.NetworkChannelTime !== newChannelTime) {
			this.NetworkChannelTime = newChannelTime
			updated = true
		}
		if (this.NetworkAttackSpeed !== newAttackSpeed) {
			this.NetworkAttackSpeed = newAttackSpeed
			updated = true
		}
		if (this.Parent !== newParent) {
			this.Parent = newParent
			this.AddModifier()
		} else if (this.Parent !== undefined && updated) {
			this.UnitModifierChanged()
			EventsSDK.emit("ModifierChanged", false, this)
		} else if (this.Parent !== undefined) {
			EventsSDK.emit("ModifierChangedVBE", false, this)
		}
	}

	public GetTexturePath(): string {
		return this.Ability?.TexturePath ?? ""
	}

	public IsEnemy(ent?: Entity): boolean {
		return this.Parent?.IsEnemy(ent) ?? false
	}

	public Remove(): boolean {
		if (
			this.Parent === undefined ||
			!this.Parent.ModifierManager.All.includes(this)
		) {
			return false
		}
		if (this.DeclaredFunction !== undefined) {
			this.DeclaredFunction.forEach((handler, key) =>
				this.Parent!.ModifierManager.RemoveInternalEModifierfunction(key, handler)
			)
		}
		this.Parent.Buffs.remove(this)
		this.Parent.ModifierManager.All.remove(this)
		this.IsValid = false
		EventsSDK.emit("ModifierRemoved", false, this)
		this.Parent.ChangeFieldsByEvents()
		return true
	}

	public GetEModifierfunction(
		eFunction: EModifierfunction
	): Nullable<ModifierHandlerValue> {
		return this.DeclaredFunction?.get(eFunction)
	}

	protected AddModifier(): boolean {
		if (this.Parent === undefined || this.Parent.ModifierManager.All.includes(this)) {
			return false
		}

		if (this.DeclaredFunction !== undefined) {
			this.DeclaredFunction.forEach((handler, key) =>
				this.Parent!.ModifierManager.AddInternalEModifierfunction(key, handler)
			)
		}

		this.Parent.Buffs.push(this)
		this.Parent.ModifierManager.All.push(this)
		EventsSDK.emit("ModifierCreated", false, this)
		this.Parent.ChangeFieldsByEvents()
		return true
	}

	protected GetSpecialValue(
		specialName: string,
		abilityName: string,
		level = Math.max(this.Ability?.Level ?? this.AbilityLevel, 1)
	): number {
		let specialValue = 0
		const ability = this.Ability
		if (ability === undefined) {
			const data = AbilityData.GetAbilityByName(abilityName)
			specialValue = data?.GetSpecialValue(specialName, level) ?? 0
		} else {
			specialValue = ability.GetSpecialValue(specialName, level)
		}
		return specialValue
	}

	protected UnitModifierChanged(): void {
		if (this.DeclaredFunction !== undefined) {
			this.DeclaredFunction.forEach(handler => handler())
		}
	}
}
