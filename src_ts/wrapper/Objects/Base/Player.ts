import Vector2 from "../../Base/Vector2"
import Vector3 from "../../Base/Vector3"
import { Team } from "../../Enums/Team"
import { default as EntityManager, LocalPlayer } from "../../Managers/EntityManager"
import ExecuteOrder from "../../Native/ExecuteOrder"
import Ability from "./Ability"
import Entity from "./Entity"
import Hero from "./Hero"
import Unit from "./Unit"
import { ConnectionState } from "../../Enums/ConnectionState"
import { dotaunitorder_t } from "../../Enums/dotaunitorder_t"
import PlayerResource from "../GameResources/PlayerResource"

export default class Player extends Entity {
	static get QuickBuyItems(): number[] {
		return LocalPlayer !== undefined ? LocalPlayer.m_pBaseEntity.m_quickBuyItems : []
	}
	public static PrepareOrder(order: {
		orderType: dotaunitorder_t,
		target?: Entity | number,
		position?: Vector3 | Vector2,
		ability?: Ability,
		orderIssuer?: PlayerOrderIssuer_t,
		unit?: Unit,
		queue?: boolean,
		showEffects?: boolean,
	}): ExecuteOrder {
		return ExecuteOrder.fromObject(order).ExecuteQueued()
	}

	/**
	 * Only for LocalPlayer
	 */
	public static Buyback(queue?: boolean, showEffects?: boolean): ExecuteOrder {
		return this.PrepareOrder({ orderType: dotaunitorder_t.DOTA_UNIT_ORDER_BUYBACK, queue, showEffects })
	}
	/**
	 * Only for LocalPlayer
	 */
	public static Glyph(queue?: boolean, showEffects?: boolean): ExecuteOrder {
		return this.PrepareOrder({ orderType: dotaunitorder_t.DOTA_UNIT_ORDER_GLYPH, queue, showEffects })
	}
	/**
	 * Only for LocalPlayer
	 */
	public static CastRiverPaint(position: Vector3 | Vector2, queue?: boolean, showEffects?: boolean): ExecuteOrder {
		return this.PrepareOrder({ orderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_RIVER_PAINT, position, queue, showEffects })
	}
	/**
	 * Only for LocalPlayer
	 */
	public static PreGameAdgustItemAssigment(ItemID: number, queue?: boolean, showEffects?: boolean): ExecuteOrder {
		return this.PrepareOrder({ orderType: dotaunitorder_t.DOTA_UNIT_ORDER_PREGAME_ADJUST_ITEM_ASSIGNMENT, target: ItemID, queue, showEffects })
	}
	/**
	 * Only for LocalPlayer
	 */
	public static Scan(position: Vector3 | Vector2, queue?: boolean, showEffects?: boolean): ExecuteOrder {
		return this.PrepareOrder({ orderType: dotaunitorder_t.DOTA_UNIT_ORDER_RADAR, position, queue, showEffects })
	}

	public readonly m_pBaseEntity: C_DOTAPlayer
	public PlayerID = this.m_pBaseEntity.m_iPlayerID
	public Hero_: Hero | C_BaseEntity | number
	private m_Name: string
	private m_PlayerData: PlayerResourcePlayerData_t
	private m_PlayerTeamData: PlayerResourcePlayerTeamData_t
	constructor(m_pBaseEntity: C_BaseEntity) {
		super(m_pBaseEntity)
		this.Hero_ = this.m_pBaseEntity.m_hAssignedHero
	}

	/**
	 * Only for LocalPlayer
	 */
	get ActiveAbility(): Ability {
		return EntityManager.GetEntityByNative(this.m_pBaseEntity.m_hActiveAbility) as Ability
	}
	get Assists(): number {
		return this.PlayerTeamData.m_iAssists
	}
	get IsSpectator(): boolean {
		return this.Team === Team.Observer || this.Team === Team.Neutral || this.Team === Team.None || this.Team === Team.Undefined
	}
	get ButtleBonusRate(): number {
		return this.PlayerTeamData.m_iBattleBonusRate
	}
	// BuybackCooldownTime 		=> NonSpectator
	// BuybackCostTime			=> NonSpectator
	// BuybackGoldLimitTime		=> NonSpectator
	// CameraPosition			=> CameraManager
	// CampsStacked				=> NonSpectator
	// ClaimedDenyCount			=> NonSpectator
	// ClaimedMissCount 		=> NonSpectator
	get CompendiumLevel(): number {
		return this.PlayerTeamData.m_unCompendiumLevel
	}
	get ConnectionState(): ConnectionState {
		return this.PlayerData.m_iConnectionState
	}
	// CreepKillGold			=> NonSpectator
	// CreepsStacked			=> NonSpectator
	// CustomBuybackCooldown	=> NonSpectator
	get Deaths(): number {
		return this.PlayerTeamData.m_iDeaths
	}
	// DenyCount				=> NonSpectator
	// GoldSpentOnSupport		=> NonSpectator
	get HasRandomed(): boolean {
		return this.PlayerTeamData.m_bHasRandomed
	}
	// HasRepicked 				=> PlayerResourcePlayerTeamData_t
	// Healing					=> NonSpectator
	get Hero(): Hero {
		return this.Hero_ instanceof Entity ? this.Hero_ : (this.Hero_ = EntityManager.GetEntityByNative(this.Hero_) as Hero)
	}
	get HeroAssigned(): boolean {
		return this.Hero !== undefined && this.Hero.IsValid
	}
	// HeroDamage				=> NonSpectator
	// HeroKillGold				=> NonSpectator
	// IncomeGold				=> NonSpectator
	get IsAFK(): boolean {
		return this.PlayerTeamData.m_bAFK
	}
	get IsBattleBonusActive(): boolean {
		return this.PlayerTeamData.m_bBattleBonusActive
	}
	get IsBroadcaster(): boolean {
		return this.PlayerData.m_bIsBroadcaster
	}
	get IsFakeClient(): boolean {
		return this.PlayerData.m_bFakeClient
	}
	get IsFullyJoinedServer(): boolean {
		return this.PlayerData.m_bFullyJoinedServer
	}
	get IsPredictingVictory(): boolean {
		return this.PlayerTeamData.m_bHasPredictedVictory
	}
	get IsVoiceChatBanned(): boolean {
		return this.PlayerTeamData.m_bVoiceChatBanned
	}
	get Kills(): number {
		return this.PlayerTeamData.m_iKills
	}
	get KillStreak(): number {
		return this.PlayerTeamData.m_iStreak
	}
	get LastBuybackTime(): number {
		return this.PlayerTeamData.m_iLastBuybackTime
	}
	// LastHitCount				=> NonSpectator
	// LastHitMultikill			=> NonSpectator
	// LastHitStreak			=> NonSpectator
	get Level(): number {
		return this.PlayerTeamData.m_iLevel
	}
	get GameName(): string {
		return this.PlayerData.m_iszPlayerName
	}
	// MissCount				=> NonSpectator
	get Name(): string {
		return this.m_Name
			|| this.IsValid && PlayerResource
			? (this.m_Name = PlayerResource.GetNameByPlayerID(this.PlayerID)) : ""
	}
	// NearbyCreepDeathCount	=> NonSpectator
	// ObserverWardsPlaced		=> NonSpectator
	get PlayerData(): PlayerResourcePlayerData_t {
		return this.m_PlayerData
			|| this.IsValid
			? (this.m_PlayerData = PlayerResource.GetPlayerDataByPlayerID(this.PlayerID)) : undefined
	}
	get PlayerTeamData(): PlayerResourcePlayerTeamData_t {
		return this.m_PlayerTeamData
			|| this.IsValid && PlayerResource
			? (this.m_PlayerTeamData = PlayerResource.GetPlayerTeamDataByPlayerID(this.PlayerID)) : undefined
	}
	get PlayerSteamID(): bigint {
		return this.m_PlayerData.m_iPlayerSteamID
	}
	get QueryUnit(): Unit {
		return EntityManager.GetEntityByNative(this.m_pBaseEntity.m_hQueryUnit) as Unit
	}

	// ReliableGold				=> NonSpectator
	get RespawnSeconds(): number {
		return this.PlayerTeamData.m_iRespawnSeconds
	}
	// RoshanKills				=> NonSpectator
	// RunePickups				=> NonSpectator
	get SelectedHeroId(): number {
		return this.PlayerTeamData.m_nSelectedHeroID
	}
	get SelectedUnits(): Entity[] {

		let selected: Entity[] = []

		let selUnits = this.m_pBaseEntity.m_nSelectedUnits
		if (selUnits !== undefined && selUnits.length > 0)
			selUnits.forEach(unitNative => {
				let unit = EntityManager.GetEntityByNative(unitNative)
				if (unit !== undefined)
					selected.push(unit)
			})
		return selected
	}
	// SentryWardsPlaced		=> NonSpectator
	// SharedGold				=> NonSpectator

	// Stuns					=> NonSpectator
	// TeamSlot					=> NonSpectator
	get TotalEarnedGold(): number {
		return this.m_pBaseEntity.m_iTotalEarnedGold
	}
	get TotalEarnedXP(): number {
		return this.m_pBaseEntity.m_iTotalEarnedXP
	}
	// TowerKills				=> NonSpectator
	// UnreliableGold			=> NonSpectator
	// WardsDestroyed			=> NonSpectator
	// WardsPurchased			=> NonSpectator
	// StickyItemId ??
}
