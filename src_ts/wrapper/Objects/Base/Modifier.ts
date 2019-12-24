import EntityManager from "../../Managers/EntityManager"
import Ability from "./Ability"
import Entity from "./Entity"
import Unit from "./Unit"
import Game from "../GameResources/GameRules"
import { IModifier } from "../../Managers/ModifierManager"
import * as StringTables from "../../Managers/StringTables"
import Vector3 from "../../Base/Vector3"

// AllowIllusionDuplicate
// CanParentBeAutoAttacked
// IsDebuff
// IsHidden
// IsPurgeException
// IsStunDebuff
// IsValid
// TextureName

export const TRUESIGHT_MODIFIERS = [
	"modifier_truesight",
	"modifier_item_dustofappearance",
	"modifier_bloodseeker_thirst_vision",
	"modifier_bounty_hunter_track",
]

export const SCEPTER_MODIFIERS = [
	"modifier_item_ultimate_scepter",
	"modifier_item_ultimate_scepter_consumed",
	"modifier_wisp_tether_scepter",
]

export const BLOCKING_DAMAGE_MODIFIERS = [
	"modifier_nyx_assassin_spiked_carapace",
	"modifier_item_combo_breaker_buff",
	"modifier_templar_assassin_refraction_absorb",
]

export const REFLECTING_DAMAGE_MODIFIERS = [
	"modifier_nyx_assassin_spiked_carapace",
	"modifier_item_blade_mail_reflect",
]

const ScepterRegExp = /modifier_item_ultimate_scepter|modifier_wisp_tether_scepter/

export default class Modifier {
	/* ================== Static ================== */
	public static HasTrueSightBuff(buffs: Modifier[]): boolean {
		return buffs.some(buff => TRUESIGHT_MODIFIERS.some(nameBuff => nameBuff === buff.Name))
	}
	public static HasScepterBuff(buffs: Modifier[]): boolean {
		return buffs.some(buff => ScepterRegExp.test(buff.Name))
	}

	/* =================== Fields =================== */
	public IsValid = true

	public readonly Index = this.m_pBuff.Index;
	public readonly SerialNumber = this.m_pBuff.SerialNum as number;

	public readonly AbilityLevel = this.m_pBuff.AbilityLevel as number;
	public readonly IsAura = this.m_pBuff.IsAura as boolean;

	private Parent_: Nullable<Unit>
	private Ability_: Nullable<Ability>

	private Caster_: Nullable<Entity> = EntityManager.EntityByHandle(this.m_pBuff.Caster)
	private AuraOwner_: Nullable<Entity> = EntityManager.EntityByHandle(this.m_pBuff.AuraOwner)
	private Name_: string = ""

	constructor(public m_pBuff: IModifier) { }

	public get Attributes(): DOTAModifierAttribute_t {
		return DOTAModifierAttribute_t.MODIFIER_ATTRIBUTE_NONE
	}
	// NOTICE: as number || number | undefined => DieTime: NaN (undefined + number)
	public get CreationTime(): number {
		return this.m_pBuff.CreationTime
	}
	public get DieTime(): number {
		return this.CreationTime + this.Duration
	}
	public get Duration(): number {
		return this.m_pBuff.Duration ?? 0
	}
	public get ElapsedTime(): number {
		return Math.max(Game.RawGameTime - this.CreationTime, 0)
	}
	public get Parent(): Nullable<Unit> {
		if (this.Parent_ === undefined) {
			let ent = EntityManager.EntityByHandle(this.m_pBuff.Parent)
			if (ent !== undefined) {
				if (ent instanceof Unit)
					this.Parent_ = ent
				/*else
					console.log(ent.m_pBaseEntity.constructor.name, this.m_pBuff.parent, this.Name)*/
			}
		}
		return this.Parent_
	}
	public get Ability(): Ability {
		if (this.Ability_ === undefined)
			this.Ability_ = EntityManager.EntityByHandle(this.m_pBuff.Ability) as Ability
		return this.Ability_
	}
	public get Caster(): Nullable<Entity> {
		if (this.Caster_ === undefined)
			this.Caster_ = EntityManager.EntityByHandle(this.m_pBuff.Caster)
		return this.Caster_
	}
	public get AuraOwner(): Nullable<Entity> {
		if (this.AuraOwner_ === undefined)
			this.AuraOwner_ = EntityManager.EntityByHandle(this.m_pBuff.AuraOwner)
		return this.AuraOwner_
	}
	public get RemainingTime(): number {
		return Math.max(this.DieTime - Game.RawGameTime, 0)
	}
	// NOTICE: as number || number | undefined
	public get StackCount(): number {
		return this.m_pBuff.StackCount
	}
	public get Name(): string {
		if (this.Name_ === undefined)
			this.Name_ = StringTables.GetString("ModifierNames", this.m_pBuff.ModifierClass as number)
		return this.Name_
	}
	public get vStart(): Vector3 {
		let vec = this.m_pBuff.vStart

		if (vec === undefined)
			return new Vector3().Invalidate()

		return new Vector3(vec.x, vec.y, vec.z)
	}
	public get vEnd(): Vector3 {
		let vec = this.m_pBuff.vEnd

		if (vec === undefined)
			return new Vector3().Invalidate()

		return new Vector3(vec.x, vec.y, vec.z)
	}

	public toString(): string {
		return this.Name
	}
}
