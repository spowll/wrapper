import * as Orders from "Orders"
import { FindAttackingUnit } from "Utils"

var config = {
		hotkey: 0,
		method: 0,
	},
	enabled = false,
	target = undefined,
	target_pos = undefined

Events.addListener("onDraw", () => {
	if (enabled)
		Renderer.Text(0, 100, "Auto Crit enabled")
})

Events.addListener("onUnitAnimation", (npc, sequenceVariant, playbackrate, castpoint, type, activity) => {
	if (!enabled || !npc.IsControllableByPlayer(LocalDOTAPlayer.m_iPlayerID))
		return
	if (activity === 1503) {
		if (target !== undefined)
			if (!target.IsEnemy(npc) || (target instanceof C_DOTA_BaseNPC && (target.m_bIsWard || target.m_bIsTower || target.m_bIsShrine)))
				return
		Orders.EntStop(npc, false)
		setTimeout(config.method === 0 ? 1000 / npc.m_fAttacksPerSecond / 3 : Math.max(100, 1000 / npc.m_fAttacksPerSecond) - 100, () => {
			if (target !== undefined)
				Orders.AttackTarget(npc, target, false)
			else if (target_pos !== undefined)
				Orders.MoveToAttackPos(npc, target_pos, false)
		})
	}
})

Events.addListener("onPrepareUnitOrders", order => {
	switch (order.order_type) {
		case dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_TARGET:
			target = order.target
			target_pos = undefined
			break
		case dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_MOVE:
			target = undefined
			target_pos = order.position
			break
		case dotaunitorder_t.DOTA_UNIT_ORDER_STOP:
			enabled = false
			break
	}
	return true
})
Events.addListener("onWndProc", (message_type, wParam) => {
	if (!IsInGame() || parseInt(wParam as any) !== config.hotkey)
		return true
	if (message_type === 0x100) // WM_KEYDOWN
		return false
	else if (message_type === 0x101) { // WM_KEYUP
		enabled = !enabled
		return false
	}
	return true
})
Events.addListener("onGameEnded", () => enabled = false)

{
	let root = new Menu_Node("Auto Crit")
	root.entries.push(new Menu_Keybind (
		"Hotkey",
		config.hotkey,
		"Hotkey is in toggle mode",
		node => config.hotkey = node.value
	))
	root.entries.push(new Menu_Combo (
		"Method",
		[
			"Faster",
			"Slower"
		],
		config.method,
		"Choose slower mode only if ",
		node => config.method = node.selected_id
	))
	root.Update()
	Menu.AddEntry(root)
}
