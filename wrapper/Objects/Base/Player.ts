import Vector3 from "../../Base/Vector3"
import { NetworkedBasicField, WrapperClass } from "../../Decorators"
import { EShareAbility } from "../../Enums/EShareAbility"
import { Team } from "../../Enums/Team"
import EntityManager from "../../Managers/EntityManager"
import EventsSDK from "../../Managers/EventsSDK"
import ExecuteOrder from "../../Native/ExecuteOrder"
import Entity from "./Entity"
import Hero from "./Hero"
import Item from "./Item"
import { EPropertyType } from "../../Enums/PropertyType"

@WrapperClass("CDOTAPlayer")
export default class Player extends Entity {
	@NetworkedBasicField("m_nPlayerID", EPropertyType.INT32)
	public PlayerID = -1
	@NetworkedBasicField("m_quickBuyItems")
	public QuickBuyItems: number[] = []
	@NetworkedBasicField("m_iTotalEarnedGold")
	public TotalEarnedGold = 0
	@NetworkedBasicField("m_iTotalEarnedXP")
	public TotalEarnedXP = 0
	public Hero: Nullable<Hero> = undefined
	public Hero_ = 0

	public get IsSpectator(): boolean {
		return this.Team === Team.Observer || this.Team === Team.Neutral || this.Team === Team.None || this.Team === Team.Shop
	}
	public CannotUseItem(item: Item): boolean {
		return item.Shareability === EShareAbility.ITEM_NOT_SHAREABLE && this.PlayerID !== item.PurchaserID
	}
	public Buyback(queue?: boolean, showEffects?: boolean): void {
		return ExecuteOrder.Buyback(queue, showEffects)
	}
	public Glyph(queue?: boolean, showEffects?: boolean): void {
		return ExecuteOrder.Glyph(queue, showEffects)
	}
	public CastRiverPaint(position: Vector3, queue?: boolean, showEffects?: boolean): void {
		return ExecuteOrder.CastRiverPaint(position, queue, showEffects)
	}
	public PreGameAdjustItemAssigment(ItemID: number, queue?: boolean, showEffects?: boolean): void {
		return ExecuteOrder.PreGameAdjustItemAssigment(ItemID, queue, showEffects)
	}
	public Scan(position: Vector3, queue?: boolean, showEffects?: boolean): void {
		return ExecuteOrder.Scan(position, queue, showEffects)
	}
}
const Players = EntityManager.GetEntitiesByClass(Player)

import { RegisterFieldHandler } from "../NativeToSDK"
RegisterFieldHandler(Player, "m_hAssignedHero", (player, new_value) => {
	player.Hero_ = new_value as number
	const ent = EntityManager.EntityByIndex(player.Hero_)
	player.Hero = ent instanceof Hero ? ent : undefined
})

EventsSDK.on("PreEntityCreated", ent => {
	if (!(ent instanceof Hero) || !ent.CanBeMainHero)
		return
	for (const player of Players)
		if (ent.HandleMatches(player.Hero_))
			player.Hero = ent
})

EventsSDK.on("EntityDestroyed", ent => {
	if (!(ent instanceof Hero))
		return
	for (const player of Players)
		if (ent.HandleMatches(player.Hero_))
			player.Hero = undefined
})
