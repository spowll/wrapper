import { Game, Menu, EntityManager, EventsSDK } from "wrapper/Imports"

const tree = Menu.AddEntry(["Utility", "Bait leave"]),
	autodisconnect = tree.AddToggle("Auto Disconnect"),
	Additionaldelay = tree.AddSlider("Delay auto disconnect", 1, 1, 10),
	playersList = tree.AddSwitcher("Player ID", ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8", "Player 9", "Player 10"]),
	colors = ["#415fff", "#83ffda", "#c3009c", "#d5ff16", "#f16900", "#ff6ca5", "#85c83b", "#74d6f9", "#009e31", "#8f6f00"],
	gap = "<br>".repeat(75),
	Language = tree.AddSwitcher("Language", ["Russian", "English"]),
	button = tree.AddButton("Leave button"),
	heroes: { [name: string]: string } = {
		npc_dota_hero_queenofpain: "Queen of Pain",
		npc_dota_hero_antimage: "Anti-Mage",
		npc_dota_hero_kunkka: "Kunkka",
		npc_dota_hero_lina: "Lina",
		npc_dota_hero_mirana: "Mirana",
		npc_dota_hero_windrunner: "Windranger",
		npc_dota_hero_slardar: "Slardar",
		npc_dota_hero_lion: "Lion",
		npc_dota_hero_phantom_assassin: "Phantom Assassin",
		npc_dota_hero_tidehunter: "Tidehunter",
		npc_dota_hero_witch_doctor: "Witch Doctor",
		npc_dota_hero_vengefulspirit: "Vengeful Spirit",
		npc_dota_hero_juggernaut: "Juggernaut",
		npc_dota_hero_earthshaker: "Earthshaker",
		npc_dota_hero_pudge: "Pudge",
		npc_dota_hero_bane: "Bane",
		npc_dota_hero_crystal_maiden: "Crystal Maiden",
		npc_dota_hero_sven: "Sven",
		npc_dota_hero_skeleton_king: "Wraith King",
		npc_dota_hero_storm_spirit: "Storm Spirit",
		npc_dota_hero_sand_king: "Sand King",
		npc_dota_hero_nevermore: "Shadow Fiend",
		npc_dota_hero_drow_ranger: "Drow Ranger",
		npc_dota_hero_axe: "Axe",
		npc_dota_hero_bloodseeker: "Bloodseeker",
		npc_dota_hero_phantom_lancer: "Phantom Lancer",
		npc_dota_hero_razor: "Razor",
		npc_dota_hero_morphling: "Morphling",
		npc_dota_hero_zuus: "Zeus",
		npc_dota_hero_tiny: "Tiny",
		npc_dota_hero_puck: "Puck",
		npc_dota_hero_lich: "Lich",
		npc_dota_hero_shadow_shaman: "Shadow Shaman",
		npc_dota_hero_riki: "Riki",
		npc_dota_hero_enigma: "Enigma",
		npc_dota_hero_tinker: "Tinker",
		npc_dota_hero_sniper: "Sniper",
		npc_dota_hero_necrolyte: "Necrophos",
		npc_dota_hero_warlock: "Warlock",
		npc_dota_hero_beastmaster: "Beastmaster",
		npc_dota_hero_venomancer: "Venomancer",
		npc_dota_hero_faceless_void: "Faceless Void",
		npc_dota_hero_death_prophet: "Death Prophet",
		npc_dota_hero_pugna: "Pugna",
		npc_dota_hero_templar_assassin: "Templar Assassin",
		npc_dota_hero_viper: "Viper",
		npc_dota_hero_luna: "Luna",
		npc_dota_hero_dragon_knight: "Dragon Knight",
		npc_dota_hero_dazzle: "Dazzle",
		npc_dota_hero_rattletrap: "Clockwerk",
		npc_dota_hero_leshrac: "Leshrac",
		npc_dota_hero_furion: "Nature's Prophet",
		npc_dota_hero_life_stealer: "Lifestealer",
		npc_dota_hero_dark_seer: "Dark Seer",
		npc_dota_hero_clinkz: "Clinkz",
		npc_dota_hero_omniknight: "Omniknight",
		npc_dota_hero_enchantress: "Enchantress",
		npc_dota_hero_huskar: "Huskar",
		npc_dota_hero_night_stalker: "Night Stalker",
		npc_dota_hero_broodmother: "Broodmother",
		npc_dota_hero_bounty_hunter: "Bounty Hunter",
		npc_dota_hero_weaver: "Weaver",
		npc_dota_hero_jakiro: "Jakiro",
		npc_dota_hero_batrider: "Batrider",
		npc_dota_hero_chen: "Chen",
		npc_dota_hero_spectre: "Spectre",
		npc_dota_hero_doom_bringer: "Doom",
		npc_dota_hero_ancient_apparition: "Ancient Apparition",
		npc_dota_hero_ursa: "Ursa",
		npc_dota_hero_spirit_breaker: "Spirit Breaker",
		npc_dota_hero_gyrocopter: "Gyrocopter",
		npc_dota_hero_alchemist: "Alchemist",
		npc_dota_hero_invoker: "Invoker",
		npc_dota_hero_silencer: "Silencer",
		npc_dota_hero_pangolier: "Pangolier",
		npc_dota_hero_dark_willow: "Dark Willow",
		npc_dota_hero_monkey_king: "Monkey King",
		npc_dota_hero_arc_warden: "Arc Warden",
		npc_dota_hero_winter_wyvern: "Winter Wyvern",
		npc_dota_hero_techies: "Techies",
		npc_dota_hero_oracle: "Oracle",
		npc_dota_hero_phoenix: "Phoenix",
		npc_dota_hero_terrorblade: "Terrorblade",
		npc_dota_hero_ember_spirit: "Ember Spirit",
		npc_dota_hero_earth_spirit: "Earth Spirit",
		npc_dota_hero_abyssal_underlord: "Underlord",
		npc_dota_hero_legion_commander: "Legion Commander",
		npc_dota_hero_elder_titan: "Elder Titan",
		npc_dota_hero_abaddon: "Abaddon",
		npc_dota_hero_skywrath_mage: "Skywrath Mage",
		npc_dota_hero_tusk: "Tusk",
		npc_dota_hero_bristleback: "Bristleback",
		npc_dota_hero_shredder: "Timbersaw",
		npc_dota_hero_troll_warlord: "Troll Warlord",
		npc_dota_hero_centaur: "Centaur Warrunner",
		npc_dota_hero_magnataur: "Magnus",
		npc_dota_hero_medusa: "Medusa",
		npc_dota_hero_slark: "Slark",
		npc_dota_hero_wisp: "Io",
		npc_dota_hero_visage: "Visage",
		npc_dota_hero_naga_siren: "Naga Siren",
		npc_dota_hero_keeper_of_the_light: "Keeper of the Light",
		npc_dota_hero_disruptor: "Disruptor",
		npc_dota_hero_nyx_assassin: "Nyx Assassin",
		npc_dota_hero_rubick: "Rubick",
		npc_dota_hero_undying: "Undying",
		npc_dota_hero_meepo: "Meepo",
		npc_dota_hero_ogre_magi: "Ogre Magi",
		npc_dota_hero_treant: "Treant Protector",
		npc_dota_hero_brewmaster: "Brewmaster",
		npc_dota_hero_shadow_demon: "Shadow Demon",
		npc_dota_hero_lone_druid: "Lone Druid",
		npc_dota_hero_chaos_knight: "Chaos Knight",
		npc_dota_hero_obsidian_destroyer: "Outworld Devourer",
		npc_dota_hero_lycan: "Lycan",
	}

let dc_time = 0
button.OnValue(() => {
	let PlayerID = playersList.selected_id,
		player = EntityManager.GetPlayerByID(PlayerID)
	if (player === undefined || player.Hero === undefined)
		return false

	let PlayerName = player.GameName,
		PlayerHero = heroes[player.Hero.Name],
		switch_language: string = ""

	if (!PlayerHero) {
		console.log("[Leaver] Hero name not found")
		return
	}

	switch (Language.selected_id) {
		case 0:
			switch_language = `
<font color="${colors[PlayerID]}">${PlayerName} (${PlayerHero})</font> отключается от игры. Пожалуйста, дождитесь повторного подключения.<br><font color='#FF0000'>
<b>У <font color="${colors[PlayerID]}">${PlayerName} (${PlayerHero})</font> осталось 5 мин. для повторного подключения.</b></font>
<br> <font color="${colors[PlayerID]}">${PlayerName} (${PlayerHero})</font> покидает игру.<br><font color='#00FF00'><b>Теперь эту игру можно спокойно покинуть.</b></font>`
			break
		case 1:
			switch_language = `
<font color="${colors[PlayerID]}">${PlayerName} (${PlayerHero})</font> has disconnected from the game. Please wait for them to reconnect.<br><font color='#FF0000'>
<b> <font color="${colors[PlayerID]}">${PlayerName} (${PlayerHero})</font> has 5 minutes left to reconnect.</b></font>
<br> <font color="${colors[PlayerID]}">${PlayerName} (${PlayerHero})</font> has abandoned the game.<br><font color='#00FF00'><b>This game is now safe to leave.</b></font>`
			break
	}
	ChatWheelAbuse(gap + switch_language)

	if (autodisconnect.value)
		dc_time = hrtime()
})

EventsSDK.on("Draw", () => {
	if (dc_time !== 0 && dc_time + Additionaldelay.value * 1000 < hrtime()) {
		Game.ExecuteCommand("disconnect")
		dc_time = 0
	}
})
