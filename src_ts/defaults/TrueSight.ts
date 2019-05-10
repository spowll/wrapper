import * as Utils from "Utils"

var enabled = true,
	particle = "",
	npcs: Array<[C_DOTA_BaseNPC, number]> = [],
	particles: number[] = []

Events.on("onNPCCreated", (npc: C_DOTA_BaseNPC) => {
	if (!Utils.IsEnemy(npc, LocalDOTAPlayer))
		npcs.push([npc, Entities.GetEntityID(npc)])
})
Events.on("onEntityDestroyed", ent => {
	if (ent instanceof C_DOTA_BaseNPC)
		npcs.some(([npc], i) => {
			if (npc === ent) {
				npcs.splice(i, 1)
				return true
			}
			return false
		})
})
Events.on("onUpdate", () => {
	if (!enabled || GameRules.m_bGamePaused)
		return
	npcs.forEach(([npc, id]) => {
		let is_truesighted = Utils.IsTrueSightedForEnemies(npc),
			alive = Utils.IsAlive(npc)
		if (is_truesighted && particles[id] === undefined && alive)
			particles[id] = Particles.Create(particle, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, npc)
		else if ((!alive || !is_truesighted) && particles[id] !== undefined) {
			Particles.Destroy(particles[id], true)
			delete particles[id]
		}
	})
})

{
	let root = new Menu_Node("TrueSight Detector")
	root.entries.push(new Menu_Toggle (
		"State",
		enabled,
		node => enabled = node.value,
	))
	root.entries.push(new Menu_Combo (
		"Particle",
		[
			"Sentry ward particle",
			"Shiva's Guard (DotA 1 effect)",
		],
		0,
		node => {
			particle = [
				"particles/econ/wards/portal/ward_portal_core/ward_portal_eye_sentry.vpcf",
				"particles/items_fx/aura_shivas.vpcf",
			][node.selected_id]
			particles.forEach(par => Particles.Destroy(par, true))
			particles = []
		},
	))
	root.Update()
	Menu.AddEntry(root)
}
