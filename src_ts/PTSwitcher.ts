import { EventsSDK, Game, LocalPlayer, MenuManager } from "./wrapper/Imports"
import { Ability } from 'wrapper/Imports';

const PtswitcherMenu = MenuManager.MenuFactory("PT Switcher")
const state = PtswitcherMenu.AddToggle("State", false)

var nextTick: number = 0
var changed: boolean = true
var lastStat: number

function IsValidMyHero(MyHero: any): boolean {
	return MyHero === undefined || MyHero.IsStunned || !MyHero.IsAlive || MyHero.IsInvisible || MyHero.IsInvulnerable || MyHero.IsChanneling
}

EventsSDK.on("Update", () => {

	if (!state.value)
		return

	const MyHero = LocalPlayer.Hero

	if (IsValidMyHero(MyHero))
		return

	let pt = MyHero.Inventory.GetItemByName("item_power_treads")

	if (pt === undefined)
		return

	let _PowerTreads = pt.m_pBaseEntity as C_DOTA_Item_PowerTreads // ???

	if (undefined !== lastStat && Game.RawGameTime >= nextTick) {

		if (_PowerTreads.m_iStat !== lastStat && !changed) {
			MyHero.CastNoTarget(pt)
			nextTick = nextTick + 0.05 + GetAvgLatency(Flow_t.OUT)
		}
		if (_PowerTreads.m_iStat === lastStat){
			lastStat = undefined
			changed = true
		}
	}
})

EventsSDK.on("PrepareUnitOrders", orders => {
	
	if (!state.value)
		return

	const MyHero = LocalPlayer.Hero

	if (IsValidMyHero(MyHero))
		return

	let pt = MyHero.GetItemByName("item_power_treads")

	if (pt === undefined)
		return

	if (orders.OrderType !== 5 && orders.OrderType !== 6
		&& orders.OrderType !== 7 && orders.OrderType !== 8 && orders.OrderType !== 9)
		return

	let ability = orders.Ability as Ability

	if (!ability.ManaCost)
		return

	let _PowerTreads = pt.m_pBaseEntity as C_DOTA_Item_PowerTreads // ???

	if (changed) {
		lastStat = _PowerTreads.m_iStat
	}

	if (_PowerTreads.m_iStat === 0){
		MyHero.CastNoTarget(pt)
	} else if (_PowerTreads.m_iStat === 2){
		MyHero.CastNoTarget(pt)
		MyHero.CastNoTarget(pt)
	}
	changed = false
	nextTick = Game.RawGameTime + ability.CastPoint + GetAvgLatency(Flow_t.OUT)
	orders.Execute()
})