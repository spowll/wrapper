import * as Orders from "Orders"
import * as Utils from "Utils"

// loop-optimizer: KEEP
var spots: Vector3[] = /*Utils.orderBy(*/[
		new Vector3(4205.449707, -399.444458, 384.000000),
		new Vector3(-2533.218750, -552.533875, 385.125000), // calibrated
		new Vector3(-1865.487549, 4438.296875, 386.390900), // calibrated
		new Vector3(2546.226563, 41.390625, 384.000000), // calibrated
		new Vector3(-4255.669922, 3469.897461, 256.000000), // calibrated
		new Vector3(-55.859379, -3266.130127, 384.000000), // calibrated
		new Vector3(424.332947, -4665.735352, 396.747070), // calibrated
		new Vector3(-3744.976563, 853.449219, 385.992188), // calibrated
	],
	config = {
		enabled: false,
		// hotkey_dynamic: 0,
		visals: false,
	},
	is_stacking: boolean = false

Events.on("onDraw", () => {
	if (!IsInGame() || !config.visals)
		return
	spots.forEach((spot, i) => {
		let screen_pos = Renderer.WorldToScreen(spot)
		if (!screen_pos.IsValid)
			return
		Renderer.FilledRect(screen_pos.x - 25, screen_pos.y - 25, 50, 50, 255, 0, 0)
		Renderer.Text(screen_pos.x, screen_pos.y, (i + 1).toString(), 0, 255, 0)
	})
})
Events.on("onTick", () => {
	if (!config.enabled || is_stacking)
		return
	var MyEnt = LocalDOTAPlayer.m_hAssignedHero as C_DOTA_BaseNPC,
		torrent = Utils.GetAbilityByName(MyEnt, "kunkka_torrent")
	if (torrent === undefined || torrent.m_fCooldown !== 0 || torrent.m_iManaCost > MyEnt.m_flMana)
		return
	var cur_time = GameRules.m_fGameTime - GameRules.m_flGameStartTime
	if (cur_time < 60)
		return
	/*if (
		Math.abs (
			(cur_time % 60) - 47
		) <= Fusion.MyTick
	)
		KunkkaAutoStack_Notify(cur_time)*/
	if (
		Math.abs (
			(cur_time % 60) -
			(60 - (torrent.m_fCastPoint + torrent.GetSpecialValue("delay") + 0.6)), // it tooks ~0.6sec to raise y coord of creeps
		) >= 1 / 30
	)
		return
	var my_vec = MyEnt.m_vecNetworkOrigin,
		cast_range = Utils.GetCastRange(MyEnt, torrent)
	// loop-optimizer: KEEP
	Utils.orderBy(spots.filter(spot => spot.Distance2D(my_vec) < cast_range), spot => spot.Distance2D(my_vec)).every(spot => {
		Orders.CastPosition(MyEnt, torrent, spot, false)
		is_stacking = true
		setTimeout(torrent.m_fCastPoint * 1000 + 30, () => is_stacking = false)
		return false
	})
})

Events.on("onPrepareUnitOrders", order => order.unit !== LocalDOTAPlayer.m_hAssignedHero || !is_stacking) // cancel orders while stacking

/*Events.on("onWndProc", (message_type, wParam) => {
	if (!IsInGame())
		return true
	let key = parseInt(wParam as any)
	if (key === config.hotkey_dynamic && message_type === 0x101) { // WM_KEYUP
		const MyEnt = LocalDOTAPlayer.m_hAssignedHero as C_DOTA_BaseNPC,
			torrent = MyEnt.GetAbilityByName("kunkka_torrent"),
			torrent_radius = torrent.GetSpecialValue("radius")
		var ancients = Utils.GetCursorWorldVec().GetEntitiesInRange(1000).filter(ent =>
				ent instanceof C_DOTA_BaseNPC &&
				Utils.IsEnemy(ent, MyEnt) &&
				Utils.IsCreep(ent) &&
				!IsLaneCreep(ent) // &&
				//!ent.m_bIsWaitingToSpawn
			)
		var ancientsPositionSum = ancients.map(ancient => ancient.m_vecNetworkOrigin).reduce((sum, vec): number[] => sum ? [sum[0] + vec[0], sum[1] + vec[1], sum[2] + vec[2]] : vec),
			ancientsPosition = new Vector3(ancientsPositionSum[0] / ancients.length, ancientsPositionSum[1] / ancients.length, ancientsPositionSum[2] / ancients.length)
			var failed = ancients.some(ancient => ancient.m_vecNetworkOrigin.Distance(ancientsPosition) >= torrent_radius)
			if (!failed) {
				console.log(ancientsPosition)
				Orders.CastPosition(MyEnt, torrent, ancientsPosition, false)
			} else
				console.log("can't stack it.")
		return false
	}
	return true
})*/

{
	let root = new Menu_Node("Kuтkka Autostacker")
	root.entries.push(new Menu_Toggle (
		"State",
		config.enabled,
		node => config.enabled = node.value,
	))
	root.entries.push(new Menu_Toggle (
		"Draw visuals over stackable spots",
		config.visals,
		node => config.visals = node.value,
	))
	/*root.entries.push(new Menu_Keybind (
		"Dynamic hotkey (reqires spot vision)",
		config.hotkey_dynamic,
		node => config.hotkey_dynamic = node.value
	))*/
	root.Update()
	Menu.AddEntry(root)
}
