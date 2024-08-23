import { ConnectionState } from "../Enums/ConnectionState"
import { Team } from "../Enums/Team"
import { EntityPropertiesNode } from "./EntityProperties"

export class PlayerData {
	constructor(public readonly properties: EntityPropertiesNode) {}

	public get IsValid(): boolean {
		return this.properties.get("m_bIsValid") ?? false
	}
	public get Name(): string {
		return this.properties.get("m_iszPlayerName") ?? ""
	}
	public get IsBot(): boolean {
		return this.properties.get("m_bIsBot") ?? false
	}
	public get Team(): Team {
		return this.properties.get("m_iPlayerTeam") ?? Team.Invalid
	}
	public get FullyJoinedServer(): boolean {
		return this.properties.get("m_bFullyJoinedServer") ?? false
	}
	public get IsFakeClient(): boolean {
		return this.properties.get("m_bFakeClient") ?? false
	}
	public get IsBroadcaster(): boolean {
		return this.properties.get("m_bIsBroadcaster") ?? false
	}
	public get BroadcasterChannel(): number {
		return this.properties.get("m_iBroadcasterChannel") ?? -1
	}
	public get BroadcasterChannelSlot(): number {
		return this.properties.get("m_iBroadcasterChannelSlot") ?? -1
	}
	public get IsBroadcasterChannelCameraman(): boolean {
		return this.properties.get("m_bIsBroadcasterChannelCameraman") ?? false
	}
	public get ConnectionState(): ConnectionState {
		return this.properties.get("m_iConnectionState") ?? ConnectionState.Unknown
	}
	public get SteamID(): bigint {
		return this.properties.get("m_iPlayerSteamID") ?? 0n
	}
	public get CoachTeam(): Team {
		return Number(this.properties.get("m_eCoachTeam")) ?? Team.Invalid
	}
	public get CoachRating(): number {
		return this.properties.get("m_unCoachRating") ?? -1
	}
	public get LiveSpectatorTeam(): Team {
		return Number(this.properties.get("m_eLiveSpectatorTeam")) ?? Team.Invalid
	}
	public get IsPlusSubscriber(): boolean {
		return this.properties.get("m_bIsPlusSubscriber") ?? false
	}
	public get WasMVPLastGame(): boolean {
		return this.properties.get("m_bWasMVPLastGame") ?? false
	}
	public get AccoladeType(): number[] {
		return this.properties.get("m_eAccoladeType") ?? []
	}
	public get AccoladeData(): bigint[] {
		return this.properties.get("m_unAccoladeData") ?? []
	}
	public get RankTier(): number {
		return this.properties.get("m_iRankTier") ?? -1
	}
	public get Title(): number {
		return this.properties.get("m_iTitle") ?? -1
	}
	public get FavTeamPacked(): bigint {
		return this.properties.get("m_unFavTeamPacked") ?? 0n
	}
	public get HasNeutralTier(): boolean[] {
		return this.properties.get("m_bHasNeutralTier") ?? []
	}
	public get HasRedeemedNeutralTier(): boolean[] {
		return this.properties.get("m_bHasRedeemedNeutralTier") ?? []
	}
	public get CavernCrawlMapVariant(): bigint {
		return this.properties.get("m_nCavernCrawlMapVariant") ?? 0n
	}
	public get LiveSpectatorSpectatedHeroIndex(): number {
		return this.properties.get("m_nLiveSpectatorSpectatedHeroIndex") ?? -1
	}
	public get LeaderboardRank(): number {
		return this.properties.get("m_iLeaderboardRank") ?? -1
	}
	public get EMmrBoostType(): number {
		return this.properties.get("m_eMmrBoostType") ?? -1
	}
}
