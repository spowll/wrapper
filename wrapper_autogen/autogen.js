const fs = require("fs")
let ability_list = ["antimage_mana_break", "antimage_blink", "antimage_spell_shield", "antimage_counterspell", "antimage_mana_void", "axe_berserkers_call", "axe_battle_hunger", "axe_counter_helix", "axe_culling_blade", "bane_enfeeble", "bane_brain_sap", "bane_fiends_grip", "bane_nightmare", "bane_nightmare_end", "bloodseeker_bloodrage", "bloodseeker_blood_bath", "bloodseeker_thirst", "bloodseeker_rupture", "drow_ranger_frost_arrows", "drow_ranger_multishot", "drow_ranger_silence", "drow_ranger_wave_of_silence", "drow_ranger_trueshot", "drow_ranger_marksmanship", "earthshaker_fissure", "earthshaker_enchant_totem", "earthshaker_aftershock", "earthshaker_echo_slam", "juggernaut_blade_dance", "juggernaut_blade_fury", "juggernaut_healing_ward", "juggernaut_omni_slash", "kunkka_torrent", "kunkka_torrent_storm", "kunkka_tidebringer", "kunkka_x_marks_the_spot", "kunkka_return", "kunkka_ghostship", "lina_dragon_slave", "lina_light_strike_array", "lina_fiery_soul", "lina_laguna_blade", "lion_impale", "lion_voodoo", "lion_mana_drain", "lion_finger_of_death", "mirana_arrow", "mirana_invis", "mirana_leap", "mirana_starfall", "morphling_waveform", "morphling_adaptive_strike_agi", "morphling_adaptive_strike_str", "morphling_morph", "morphling_morph_agi", "morphling_morph_str", "morphling_replicate", "morphling_morph_replicate", "morphling_hybrid", "nevermore_shadowraze1", "nevermore_shadowraze2", "nevermore_shadowraze3", "nevermore_necromastery", "nevermore_dark_lord", "nevermore_requiem", "phantom_lancer_spirit_lance", "phantom_lancer_doppelwalk", "phantom_lancer_juxtapose", "phantom_lancer_phantom_edge", "puck_illusory_orb", "puck_ethereal_jaunt", "puck_waning_rift", "puck_phase_shift", "puck_dream_coil", "pudge_flesh_heap", "pudge_meat_hook", "pudge_rot", "pudge_eject", "pudge_dismember", "shadow_shaman_ether_shock", "shadow_shaman_voodoo", "shadow_shaman_shackles", "shadow_shaman_mass_serpent_ward", "razor_plasma_field", "razor_static_link", "razor_unstable_current", "razor_eye_of_the_storm", "skeleton_king_hellfire_blast", "skeleton_king_vampiric_aura", "skeleton_king_mortal_strike", "skeleton_king_reincarnation", "death_prophet_carrion_swarm", "death_prophet_silence", "death_prophet_witchcraft", "death_prophet_spirit_siphon", "death_prophet_exorcism", "sven_storm_bolt", "sven_great_cleave", "sven_warcry", "sven_gods_strength", "storm_spirit_static_remnant", "storm_spirit_electric_vortex", "storm_spirit_overload", "storm_spirit_ball_lightning", "sandking_burrowstrike", "sandking_sand_storm", "sandking_caustic_finale", "sandking_epicenter", "tiny_avalanche", "tiny_toss", "tiny_craggy_exterior", "tiny_tree_grab", "tiny_toss_tree", "tiny_tree_channel", "tiny_grow", "zuus_arc_lightning", "zuus_lightning_bolt", "zuus_cloud", "zuus_static_field", "zuus_thundergods_wrath", "slardar_sprint", "slardar_scepter", "slardar_slithereen_crush", "slardar_bash", "slardar_amplify_damage", "tidehunter_gush", "tidehunter_kraken_shell", "tidehunter_anchor_smash", "tidehunter_ravage", "vengefulspirit_magic_missile", "vengefulspirit_command_aura", "vengefulspirit_wave_of_terror", "vengefulspirit_nether_swap", "crystal_maiden_crystal_nova", "crystal_maiden_frostbite", "crystal_maiden_brilliance_aura", "crystal_maiden_freezing_field", "windrunner_shackleshot", "windrunner_powershot", "windrunner_windrun", "windrunner_focusfire", "lich_frost_nova", "lich_dark_sorcery", "lich_sinister_gaze", "lich_frost_aura", "lich_frost_armor", "lich_frost_shield", "lich_chain_frost", "witch_doctor_paralyzing_cask", "witch_doctor_voodoo_restoration", "witch_doctor_maledict", "witch_doctor_death_ward", "riki_smoke_screen", "riki_blink_strike", "riki_backstab", "riki_permanent_invisibility", "riki_tricks_of_the_trade", "enigma_malefice", "enigma_demonic_conversion", "enigma_midnight_pulse", "enigma_black_hole", "tinker_laser", "tinker_heat_seeking_missile", "tinker_march_of_the_machines", "tinker_rearm", "sniper_shrapnel", "sniper_headshot", "sniper_take_aim", "sniper_assassinate", "necrolyte_death_pulse", "necrolyte_heartstopper_aura", "necrolyte_sadist", "necrolyte_sadist_stop", "necrolyte_reapers_scythe", "warlock_fatal_bonds", "warlock_shadow_word", "warlock_upheaval", "warlock_rain_of_chaos", "warlock_golem_flaming_fists", "warlock_golem_permanent_immolation", "beastmaster_wild_axes", "beastmaster_call_of_the_wild", "beastmaster_call_of_the_wild_boar", "beastmaster_call_of_the_wild_hawk", "beastmaster_hawk_invisibility", "beastmaster_boar_poison", "beastmaster_greater_boar_poison", "beastmaster_inner_beast", "beastmaster_primal_roar", "queenofpain_shadow_strike", "queenofpain_blink", "queenofpain_scream_of_pain", "queenofpain_sonic_wave", "venomancer_venomous_gale", "venomancer_poison_sting", "venomancer_plague_ward", "venomancer_poison_nova", "faceless_void_time_walk", "faceless_void_backtrack", "faceless_void_time_lock", "faceless_void_time_dilation", "faceless_void_chronosphere", "pugna_nether_blast", "pugna_decrepify", "pugna_nether_ward", "pugna_life_drain", "phantom_assassin_stifling_dagger", "phantom_assassin_phantom_strike", "phantom_assassin_blur", "phantom_assassin_coup_de_grace", "templar_assassin_refraction", "templar_assassin_meld", "templar_assassin_psi_blades", "templar_assassin_psionic_trap", "templar_assassin_trap", "templar_assassin_trap_teleport", "templar_assassin_self_trap", "viper_poison_attack", "viper_nethertoxin", "viper_corrosive_skin", "viper_viper_strike", "luna_lucent_beam", "luna_moon_glaive", "luna_lunar_blessing", "luna_lunar_grace", "luna_eclipse", "dragon_knight_breathe_fire", "dragon_knight_dragon_tail", "dragon_knight_dragon_blood", "dragon_knight_elder_dragon_form", "dragon_knight_frost_breath", "dazzle_poison_touch", "dazzle_shallow_grave", "dazzle_shadow_wave", "dazzle_weave", "dazzle_bad_juju", "rattletrap_overclocking", "rattletrap_battery_assault", "rattletrap_power_cogs", "rattletrap_rocket_flare", "rattletrap_hookshot", "leshrac_split_earth", "leshrac_diabolic_edict", "leshrac_lightning_storm", "leshrac_pulse_nova", "furion_sprout", "furion_teleportation", "furion_force_of_nature", "furion_wrath_of_nature", "life_stealer_rage", "life_stealer_feast", "life_stealer_open_wounds", "life_stealer_infest", "life_stealer_assimilate", "life_stealer_assimilate_eject", "life_stealer_consume", "life_stealer_control", "life_stealer_empty_1", "life_stealer_empty_2", "life_stealer_empty_3", "life_stealer_empty_4", "dark_seer_vacuum", "dark_seer_ion_shell", "dark_seer_surge", "dark_seer_wall_of_replica", "clinkz_strafe", "clinkz_searing_arrows", "clinkz_wind_walk", "clinkz_burning_army", "clinkz_scepter", "clinkz_death_pact", "omniknight_purification", "omniknight_repel", "omniknight_pacify", "omniknight_degen_aura", "omniknight_guardian_angel", "enchantress_untouchable", "enchantress_bunny_hop", "enchantress_enchant", "enchantress_natures_attendants", "enchantress_impetus", "huskar_inner_vitality", "huskar_inner_fire", "huskar_burning_spear", "huskar_berserkers_blood", "huskar_life_break", "night_stalker_void", "night_stalker_crippling_fear", "night_stalker_hunter_in_the_night", "night_stalker_darkness", "broodmother_spawn_spiderlings", "broodmother_poison_sting", "broodmother_spawn_spiderite", "broodmother_spin_web", "broodmother_incapacitating_bite", "broodmother_insatiable_hunger", "bounty_hunter_shuriken_toss", "bounty_hunter_jinada", "bounty_hunter_wind_walk", "bounty_hunter_track", "weaver_the_swarm", "weaver_shukuchi", "weaver_geminate_attack", "weaver_time_lapse", "jakiro_dual_breath", "jakiro_ice_path", "jakiro_liquid_fire", "jakiro_macropyre", "batrider_sticky_napalm", "batrider_flamebreak", "batrider_firefly", "batrider_flaming_lasso", "chen_penitence", "chen_test_of_faith", "chen_divine_favor", "chen_test_of_faith_teleport", "chen_holy_persuasion", "chen_hand_of_god", "spectre_spectral_dagger", "spectre_desolate", "spectre_dispersion", "spectre_haunt", "spectre_haunt_single", "spectre_reality", "doom_bringer_devour", "doom_bringer_scorched_earth", "doom_bringer_infernal_blade", "doom_bringer_doom", "doom_bringer_empty1", "doom_bringer_empty2", "ancient_apparition_cold_feet", "ancient_apparition_ice_vortex", "ancient_apparition_chilling_touch", "ancient_apparition_ice_blast", "ancient_apparition_ice_blast_release", "spirit_breaker_charge_of_darkness", "spirit_breaker_bulldoze", "spirit_breaker_empowering_haste", "spirit_breaker_greater_bash", "spirit_breaker_nether_strike", "ursa_earthshock", "ursa_overpower", "ursa_fury_swipes", "ursa_enrage", "gyrocopter_rocket_barrage", "gyrocopter_homing_missile", "gyrocopter_flak_cannon", "gyrocopter_call_down", "alchemist_acid_spray", "alchemist_unstable_concoction", "alchemist_unstable_concoction_throw", "alchemist_goblins_greed", "alchemist_chemical_rage", "invoker_quas", "invoker_wex", "invoker_exort", "invoker_empty1", "invoker_empty2", "invoker_invoke", "invoker_attribute_bonus", "invoker_cold_snap", "invoker_ghost_walk", "invoker_tornado", "invoker_emp", "invoker_alacrity", "invoker_chaos_meteor", "invoker_sun_strike", "invoker_forge_spirit", "forged_spirit_melting_strike", "invoker_ice_wall", "invoker_deafening_blast", "silencer_curse_of_the_silent", "silencer_glaives_of_wisdom", "silencer_last_word", "silencer_global_silence", "obsidian_destroyer_arcane_orb", "obsidian_destroyer_astral_imprisonment", "obsidian_destroyer_essence_aura", "obsidian_destroyer_equilibrium", "obsidian_destroyer_sanity_eclipse", "lycan_summon_wolves", "lycan_wolf_bite", "lycan_howl", "lycan_feral_impulse", "lycan_shapeshift", "lycan_summon_wolves_critical_strike", "lycan_summon_wolves_invisibility", "lone_druid_spirit_bear", "lone_druid_rabid", "lone_druid_spirit_link", "lone_druid_savage_roar", "lone_druid_savage_roar_bear", "lone_druid_true_form", "lone_druid_true_form_druid", "lone_druid_true_form_battle_cry", "lone_druid_spirit_bear_return", "lone_druid_spirit_bear_entangle", "lone_druid_entangling_claws", "lone_druid_spirit_bear_defender", "lone_druid_spirit_bear_demolish", "brewmaster_thunder_clap", "brewmaster_drunken_haze", "brewmaster_cinder_brew", "brewmaster_drunken_brawler", "brewmaster_primal_split", "brewmaster_earth_hurl_boulder", "brewmaster_earth_spell_immunity", "brewmaster_earth_pulverize", "brewmaster_storm_dispel_magic", "brewmaster_storm_cyclone", "brewmaster_storm_wind_walk", "brewmaster_fire_permanent_immolation", "shadow_demon_disruption", "shadow_demon_soul_catcher", "shadow_demon_shadow_poison", "shadow_demon_shadow_poison_release", "shadow_demon_demonic_purge", "chaos_knight_chaos_bolt", "chaos_knight_reality_rift", "chaos_knight_chaos_strike", "chaos_knight_phantasm", "meepo_earthbind", "meepo_poof", "meepo_geostrike", "meepo_ransack", "meepo_divided_we_stand", "treant_natures_guise", "treant_natures_grasp", "treant_leech_seed", "treant_living_armor", "treant_overgrowth", "treant_eyes_in_the_forest", "ogre_magi_fireblast", "ogre_magi_unrefined_fireblast", "ogre_magi_ignite", "ogre_magi_bloodlust", "ogre_magi_multicast", "undying_decay", "undying_soul_rip", "undying_tombstone", "undying_tombstone_zombie_aura", "undying_tombstone_zombie_deathstrike", "undying_flesh_golem", "rubick_telekinesis", "rubick_telekinesis_land", "rubick_fade_bolt", "rubick_null_field", "rubick_arcane_supremacy", "rubick_spell_steal", "rubick_empty1", "rubick_empty2", "rubick_hidden1", "rubick_hidden2", "rubick_hidden3", "disruptor_thunder_strike", "disruptor_glimpse", "disruptor_kinetic_field", "disruptor_static_storm", "nyx_assassin_impale", "nyx_assassin_mana_burn", "nyx_assassin_spiked_carapace", "nyx_assassin_vendetta", "nyx_assassin_burrow", "nyx_assassin_unburrow", "naga_siren_mirror_image", "naga_siren_ensnare", "naga_siren_rip_tide", "naga_siren_song_of_the_siren", "naga_siren_song_of_the_siren_cancel", "keeper_of_the_light_illuminate", "keeper_of_the_light_mana_leak", "keeper_of_the_light_will_o_wisp", "keeper_of_the_light_chakra_magic", "keeper_of_the_light_empty1", "keeper_of_the_light_empty2", "keeper_of_the_light_spirit_form", "keeper_of_the_light_recall", "keeper_of_the_light_blinding_light", "keeper_of_the_light_illuminate_end", "keeper_of_the_light_spirit_form_illuminate", "keeper_of_the_light_spirit_form_illuminate_end", "visage_grave_chill", "visage_soul_assumption", "visage_gravekeepers_cloak", "visage_summon_familiars", "visage_stone_form_self_cast", "visage_summon_familiars_stone_form", "wisp_tether", "wisp_spirits", "wisp_overcharge", "wisp_relocate", "wisp_tether_break", "wisp_spirits_in", "wisp_spirits_out", "slark_dark_pact", "slark_pounce", "slark_essence_shift", "slark_shadow_dance", "medusa_split_shot", "medusa_mystic_snake", "medusa_mana_shield", "medusa_stone_gaze", "troll_warlord_berserkers_rage", "troll_warlord_whirling_axes_ranged", "troll_warlord_whirling_axes_melee", "troll_warlord_scepter", "troll_warlord_fervor", "troll_warlord_battle_trance", "centaur_hoof_stomp", "centaur_double_edge", "centaur_return", "centaur_stampede", "magnataur_shockwave", "magnataur_empower", "magnataur_skewer", "magnataur_reverse_polarity", "shredder_whirling_death", "shredder_timber_chain", "shredder_reactive_armor", "shredder_chakram", "shredder_chakram_2", "shredder_return_chakram", "shredder_return_chakram_2", "bristleback_viscous_nasal_goo", "bristleback_quill_spray", "bristleback_bristleback", "bristleback_warpath", "tusk_ice_shards", "tusk_ice_shards_stop", "tusk_snowball", "tusk_launch_snowball", "tusk_frozen_sigil", "tusk_tag_team", "tusk_walrus_punch", "tusk_walrus_kick", "skywrath_mage_arcane_bolt", "skywrath_mage_concussive_shot", "skywrath_mage_ancient_seal", "skywrath_mage_mystic_flare", "abaddon_death_coil", "abaddon_aphotic_shield", "abaddon_frostmourne", "abaddon_borrowed_time", "elder_titan_echo_stomp", "elder_titan_echo_stomp_spirit", "elder_titan_ancestral_spirit", "elder_titan_return_spirit", "elder_titan_natural_order", "elder_titan_natural_order_spirit", "elder_titan_earth_splitter", "legion_commander_overwhelming_odds", "legion_commander_press_the_attack", "legion_commander_moment_of_courage", "legion_commander_duel", "ember_spirit_searing_chains", "ember_spirit_sleight_of_fist", "ember_spirit_flame_guard", "ember_spirit_fire_remnant", "ember_spirit_activate_fire_remnant", "earth_spirit_boulder_smash", "earth_spirit_rolling_boulder", "earth_spirit_geomagnetic_grip", "earth_spirit_stone_caller", "earth_spirit_petrify", "earth_spirit_magnetize", "abyssal_underlord_firestorm", "abyssal_underlord_pit_of_malice", "abyssal_underlord_atrophy_aura", "abyssal_underlord_dark_rift", "abyssal_underlord_cancel_dark_rift", "terrorblade_reflection", "terrorblade_conjure_image", "terrorblade_metamorphosis", "terrorblade_sunder", "phoenix_icarus_dive", "phoenix_icarus_dive_stop", "phoenix_fire_spirits", "phoenix_sun_ray", "phoenix_sun_ray_stop", "phoenix_sun_ray_toggle_move", "phoenix_supernova", "phoenix_launch_fire_spirit", "oracle_fortunes_end", "oracle_fates_edict", "oracle_purifying_flames", "oracle_false_promise", "broodmother_spin_web_destroy", "monkey_king_boundless_strike", "monkey_king_mischief", "monkey_king_untransform", "monkey_king_tree_dance", "monkey_king_primal_spring", "monkey_king_primal_spring_early", "monkey_king_wukongs_command", "monkey_king_jingu_mastery", "pangolier_swashbuckle", "pangolier_shield_crash", "pangolier_heartpiercer", "pangolier_lucky_shot", "pangolier_gyroshell", "pangolier_gyroshell_stop", "dark_willow_bramble_maze", "dark_willow_bedlam", "dark_willow_terrorize", "dark_willow_shadow_realm", "dark_willow_cursed_crown", "grimstroke_dark_artistry", "grimstroke_ink_creature", "grimstroke_scepter", "grimstroke_spirit_walk", "grimstroke_soul_chain", "mars_spear", "mars_gods_rebuke", "mars_bulwark", "mars_arena_of_blood", "void_spirit_aether_remnant", "void_spirit_dissimilate", "void_spirit_astral_step", "void_spirit_resonant_pulse", "snapfire_scatterblast", "snapfire_mortimer_kisses", "snapfire_firesnap_cookie", "snapfire_lil_shredder", "necronomicon_warrior_last_will", "necronomicon_warrior_sight", "necronomicon_warrior_mana_burn", "necronomicon_archer_mana_burn", "necronomicon_archer_purge", "necronomicon_archer_aoe", "courier_autodeliver", "courier_return_to_base", "courier_go_to_secretshop", "courier_transfer_items", "courier_transfer_items_to_other_player", "courier_return_stash_items", "courier_take_stash_items", "courier_queue_pickup_from_stash", "courier_dequeue_pickup_from_stash", "courier_take_stash_and_transfer_items", "courier_shield", "courier_burst", "courier_morph", "courier_go_to_enemy_secretshop", "courier_go_to_sideshop", "courier_go_to_sideshop2", "roshan_spell_block", "roshan_halloween_spell_block", "roshan_bash", "roshan_slam", "roshan_inherent_buffs", "roshan_devotion", "kobold_taskmaster_speed_aura", "centaur_khan_endurance_aura", "centaur_khan_war_stomp", "spawnlord_master_stomp", "spawnlord_master_freeze", "gnoll_assassin_envenomed_weapon", "ghost_frost_attack", "polar_furbolg_ursa_warrior_thunder_clap", "ogre_magi_frost_armor", "dark_troll_warlord_ensnare", "dark_troll_warlord_raise_dead", "mud_golem_rock_destroy", "mud_golem_hurl_boulder", "giant_wolf_critical_strike", "alpha_wolf_critical_strike", "alpha_wolf_command_aura", "enraged_wildkin_tornado", "enraged_wildkin_toughness_aura", "granite_golem_hp_aura", "granite_golem_bash", "satyr_trickster_purge", "satyr_soulstealer_mana_burn", "satyr_hellcaller_shockwave", "satyr_hellcaller_unholy_aura", "forest_troll_high_priest_heal", "harpy_storm_chain_lightning", "big_thunder_lizard_wardrums_aura", "black_dragon_dragonhide_aura", "black_dragon_fireball", "mudgolem_cloak_aura", "black_dragon_splash_attack", "blue_dragonspawn_sorcerer_evasion", "blue_dragonspawn_overseer_evasion", "spawnlord_aura", "spawnlord_master_bash", "blue_dragonspawn_overseer_devotion_aura", "big_thunder_lizard_slam", "big_thunder_lizard_frenzy", "forest_troll_high_priest_mana_aura", "roshan_halloween_candy", "roshan_halloween_angry", "roshan_halloween_wave_of_force", "roshan_halloween_greater_bash", "roshan_halloween_toss", "roshan_halloween_shell", "roshan_halloween_apocalypse", "roshan_halloween_burn", "roshan_halloween_levels", "roshan_halloween_summon", "roshan_halloween_fireball", "greevil_magic_missile", "greevil_cold_snap", "greevil_decrepify", "greevil_diabolic_edict", "greevil_maledict", "greevil_shadow_strike", "greevil_laguna_blade", "greevil_poison_nova", "greevil_ice_wall", "greevil_fatal_bonds", "greevil_blade_fury", "greevil_phantom_strike", "greevil_time_lock", "greevil_shadow_wave", "greevil_leech_seed", "greevil_echo_slam", "greevil_natures_attendants", "greevil_bloodlust", "greevil_purification", "greevil_flesh_golem", "greevil_hook", "greevil_rot", "greevil_black_hole", "greevil_miniboss_black_nightmare", "greevil_miniboss_black_brain_sap", "greevil_miniboss_blue_cold_feet", "greevil_miniboss_blue_ice_vortex", "greevil_miniboss_red_earthshock", "greevil_miniboss_red_overpower", "greevil_miniboss_yellow_ion_shell", "greevil_miniboss_yellow_surge", "greevil_miniboss_white_purification", "greevil_miniboss_white_degen_aura", "greevil_miniboss_green_living_armor", "greevil_miniboss_green_overgrowth", "greevil_miniboss_orange_dragon_slave", "greevil_miniboss_orange_light_strike_array", "greevil_miniboss_purple_venomous_gale", "greevil_miniboss_purple_plague_ward", "greevil_miniboss_sight", "throw_snowball", "throw_coal", "shoot_firework", "techies_land_mines", "techies_stasis_trap", "techies_suicide", "techies_remote_mines", "techies_focused_detonate", "techies_remote_mines_self_detonate", "techies_minefield_sign", "winter_wyvern_arctic_burn", "winter_wyvern_splinter_blast", "winter_wyvern_cold_embrace", "winter_wyvern_winters_curse", "arc_warden_scepter", "arc_warden_flux", "arc_warden_magnetic_field", "arc_warden_spark_wraith", "arc_warden_tempest_double", "seasonal_throw_snowball", "seasonal_summon_snowman", "seasonal_summon_penguin", "seasonal_decorate_tree", "seasonal_festive_firework", "frostivus2018_throw_snowball", "frostivus2018_summon_snowman", "frostivus2018_decorate_tree", "frostivus2018_festive_firework", "seasonal_summon_cny_balloon", "seasonal_summon_dragon", "seasonal_summon_cny_tree", "seasonal_firecrackers", "high_five", "seasonal_summon_ti9_balloon", "seasonal_ti9_banner", "seasonal_ti9_shovel", "seasonal_ti9_instruments", "seasonal_ti9_monkey", "item_blink", "item_blades_of_attack", "item_broadsword", "item_chainmail", "item_claymore", "item_helm_of_iron_will", "item_javelin", "item_mithril_hammer", "item_platemail", "item_quarterstaff", "item_quelling_blade", "item_faerie_fire", "item_infused_raindrop", "item_wind_lace", "item_ring_of_protection", "item_stout_shield", "item_moon_shard", "item_gauntlets", "item_slippers", "item_mantle", "item_branches", "item_belt_of_strength", "item_boots_of_elves", "item_robe", "item_circlet", "item_crown", "item_ogre_axe", "item_blade_of_alacrity", "item_staff_of_wizardry", "item_ultimate_orb", "item_gloves", "item_lifesteal", "item_ring_of_regen", "item_ring_of_tarrasque", "item_sobi_mask", "item_boots", "item_gem", "item_cloak", "item_talisman_of_evasion", "item_cheese", "item_magic_stick", "item_magic_wand", "item_ghost", "item_clarity", "item_enchanted_mango", "item_flask", "item_dust", "item_bottle", "item_ward_observer", "item_ward_sentry", "item_ward_dispenser", "item_tango", "item_tango_single", "item_courier", "item_flying_courier", "item_tpscroll", "item_travel_boots", "item_travel_boots_2", "item_phase_boots", "item_demon_edge", "item_eagle", "item_reaver", "item_relic", "item_hyperstone", "item_ring_of_health", "item_void_stone", "item_mystic_staff", "item_energy_booster", "item_point_booster", "item_vitality_booster", "item_power_treads", "item_hand_of_midas", "item_oblivion_staff", "item_pers", "item_poor_mans_shield", "item_bracer", "item_wraith_band", "item_null_talisman", "item_mekansm", "item_vladmir", "item_buckler", "item_ring_of_basilius", "item_holy_locket", "item_pipe", "item_urn_of_shadows", "item_headdress", "item_sheepstick", "item_orchid", "item_bloodthorn", "item_echo_sabre", "item_cyclone", "item_aether_lens", "item_force_staff", "item_hurricane_pike", "item_dagon", "item_dagon_2", "item_dagon_3", "item_dagon_4", "item_dagon_5", "item_necronomicon", "item_necronomicon_2", "item_necronomicon_3", "item_ultimate_scepter", "item_ultimate_scepter_2", "item_refresher", "item_assault", "item_heart", "item_black_king_bar", "item_aegis", "item_shivas_guard", "item_bloodstone", "item_sphere", "item_lotus_orb", "item_meteor_hammer", "item_nullifier", "item_aeon_disk", "item_kaya", "item_trident", "item_combo_breaker", "item_refresher_shard", "item_spirit_vessel", "item_vanguard", "item_crimson_guard", "item_blade_mail", "item_soul_booster", "item_hood_of_defiance", "item_rapier", "item_monkey_king_bar", "item_radiance", "item_butterfly", "item_greater_crit", "item_basher", "item_bfury", "item_manta", "item_lesser_crit", "item_dragon_lance", "item_armlet", "item_invis_sword", "item_silver_edge", "item_sange_and_yasha", "item_kaya_and_sange", "item_yasha_and_kaya", "item_satanic", "item_mjollnir", "item_skadi", "item_sange", "item_helm_of_the_dominator", "item_maelstrom", "item_desolator", "item_yasha", "item_mask_of_madness", "item_diffusal_blade", "item_ethereal_blade", "item_soul_ring", "item_arcane_boots", "item_octarine_core", "item_orb_of_venom", "item_blight_stone", "item_ancient_janggo", "item_medallion_of_courage", "item_solar_crest", "item_smoke_of_deceit", "item_tome_of_knowledge", "item_veil_of_discord", "item_guardian_greaves", "item_rod_of_atos", "item_iron_talon", "item_abyssal_blade", "item_heavens_halberd", "item_ring_of_aquila", "item_tranquil_boots", "item_shadow_amulet", "item_glimmer_cape", "item_river_painter", "item_river_painter2", "item_river_painter3", "item_river_painter4", "item_river_painter5", "item_river_painter6", "item_river_painter7", "item_mutation_tombstone", "item_super_blink", "item_pocket_tower", "item_pocket_roshan", "item_keen_optic", "item_grove_bow", "item_quickening_charm", "item_philosophers_stone", "item_force_boots", "item_desolator_2", "item_phoenix_ash", "item_seer_stone", "item_greater_mango", "item_elixer", "item_vampire_fangs", "item_craggy_coat", "item_greater_faerie_fire", "item_timeless_relic", "item_mirror_shield", "item_ironwood_tree", "item_mango_tree", "item_royal_jelly", "item_pupils_gift", "item_tome_of_aghanim", "item_repair_kit", "item_mind_breaker", "item_third_eye", "item_spell_prism", "item_princes_knife", "item_witless_shako", "item_imp_claw", "item_flicker", "item_spy_gadget", "item_spider_legs", "item_helm_of_the_undying", "item_vambrace", "item_horizon", "item_fusion_rune", "item_ocean_heart", "item_broom_handle", "item_trusty_shovel", "item_nether_shawl", "item_dragon_scale", "item_essence_ring", "item_clumsy_net", "item_enchanted_quiver", "item_ninja_gear", "item_illusionsts_cape", "item_havoc_hammer", "item_panic_button", "item_apex", "item_ballista", "item_woodland_striders", "item_demonicon", "item_fallen_sky", "item_pirate_hat", "item_dimensional_doorway", "item_ex_machina", "item_faded_broach", "item_paladin_sword", "item_minotaur_horn", "item_orb_of_destruction", "item_the_leveller", "item_arcane_ring", "item_titan_sliver"]
let heroes = ["antimage", "axe", "bane", "bloodseeker", "crystal_maiden", "drow_ranger", "earthshaker", "juggernaut", "mirana", "nevermore", "morphling", "phantom_lancer", "puck", "pudge", "razor", "sand_king", "storm_spirit", "sven", "tiny", "vengefulspirit", "windrunner", "zuus", "kunkka", "lina", "lich", "lion", "shadow_shaman", "slardar", "tidehunter", "witch_doctor", "riki", "enigma", "tinker", "sniper", "necrolyte", "warlock", "beastmaster", "queenofpain", "venomancer", "faceless_void", "skeleton_king", "death_prophet", "phantom_assassin", "pugna", "templar_assassin", "viper", "luna", "dragon_knight", "dazzle", "rattletrap", "leshrac", "furion", "life_stealer", "dark_seer", "clinkz", "omniknight", "enchantress", "huskar", "night_stalker", "broodmother", "bounty_hunter", "weaver", "jakiro", "batrider", "chen", "spectre", "doom_bringer", "ancient_apparition", "ursa", "spirit_breaker", "gyrocopter", "alchemist", "invoker", "silencer", "obsidian_destroyer", "lycan", "brewmaster", "shadow_demon", "lone_druid", "chaos_knight", "meepo", "treant", "ogre_magi", "undying", "rubick", "disruptor", "nyx_assassin", "naga_siren", "keeper_of_the_light", "wisp", "visage", "slark", "medusa", "troll_warlord", "centaur", "magnataur", "shredder", "bristleback", "tusk", "skywrath_mage", "abaddon", "elder_titan", "legion_commander", "ember_spirit", "earth_spirit", "terrorblade", "phoenix", "oracle", "techies", "winter_wyvern", "arc_warden", "abyssal_underlord", "monkey_king", "pangolier", "dark_willow", "grimstroke", "mars", "void_spirit", "snapfire"]
let units = ["creep_badguys_ranged", "creep_badguys_ranged_upgraded", "creep_badguys_ranged_upgraded_mega", "creep_goodguys_ranged", "creep_goodguys_ranged_upgraded", "creep_goodguys_ranged_upgraded_mega", "creep_badguys_melee", "creep_badguys_melee_upgraded", "creep_badguys_melee_upgraded_mega", "creep_goodguys_melee", "creep_goodguys_melee_upgraded", "creep_goodguys_melee_upgraded_mega", "goodguys_tower1_top", "goodguys_tower1_mid", "goodguys_tower1_bot", "goodguys_tower2_top", "goodguys_tower2_mid", "goodguys_tower2_bot", "goodguys_tower3_top", "goodguys_tower3_mid", "goodguys_tower3_bot", "goodguys_tower4", "badguys_tower1_top", "badguys_tower1_mid", "badguys_tower1_bot", "badguys_tower2_top", "badguys_tower2_mid", "badguys_tower2_bot", "badguys_tower3_top", "badguys_tower3_mid", "badguys_tower3_bot", "badguys_tower4", "watch_tower", "goodguys_fillers", "goodguys_healers", "badguys_fillers", "badguys_healers", "goodguys_melee_rax_top", "goodguys_melee_rax_mid", "goodguys_melee_rax_bot", "goodguys_range_rax_top", "goodguys_range_rax_mid", "goodguys_range_rax_bot", "badguys_melee_rax_top", "badguys_melee_rax_mid", "badguys_melee_rax_bot", "badguys_range_rax_top", "badguys_range_rax_mid", "badguys_range_rax_bot", "goodguys_fort", "badguys_fort", "goodguys_siege", "goodguys_siege_upgraded", "goodguys_siege_upgraded_mega", "badguys_siege", "badguys_siege_upgraded", "badguys_siege_upgraded_mega", "dota_fountain", "juggernaut_healing_ward", "healing_campfire", "zeus_cloud", "tusk_frozen_sigil1", "tusk_frozen_sigil2", "tusk_frozen_sigil3", "tusk_frozen_sigil4", "elder_titan_ancestral_spirit", "kobold", "kobold_tunneler", "kobold_taskmaster", "centaur_outrunner", "centaur_khan", "fel_beast", "polar_furbolg_champion", "polar_furbolg_ursa_warrior", "mud_golem", "mud_golem_split", "mud_golem_split_doom", "ogre_mauler", "ogre_magi", "giant_wolf", "alpha_wolf", "wildkin", "enraged_wildkin", "satyr_soulstealer", "satyr_hellcaller", "jungle_stalker", "elder_jungle_stalker", "prowler_acolyte", "prowler_shaman", "rock_golem", "granite_golem", "big_thunder_lizard", "small_thunder_lizard", "gnoll_assassin", "ghost", "wraith_ghost", "dark_troll", "dark_troll_warlord", "satyr_trickster", "forest_troll_berserker", "forest_troll_high_priest", "harpy_scout", "harpy_storm", "black_drake", "black_dragon", "necronomicon_warrior_1", "necronomicon_warrior_2", "necronomicon_warrior_3", "necronomicon_archer_1", "necronomicon_archer_2", "necronomicon_archer_3", "observer_wards", "sentry_wards", "courier", "flying_courier", "witch_doctor_death_ward", "shadow_shaman_ward_1", "shadow_shaman_ward_2", "shadow_shaman_ward_3", "venomancer_plague_ward_1", "venomancer_plague_ward_2", "venomancer_plague_ward_3", "venomancer_plague_ward_4", "lesser_eidolon", "eidolon", "greater_eidolon", "dire_eidolon", "furion_treant_1", "furion_treant_2", "furion_treant_3", "furion_treant_4", "furion_treant_large", "invoker_forged_spirit", "broodmother_spiderling", "broodmother_spiderite", "dark_troll_warlord_skeleton_warrior", "wraith_king_skeleton_warrior", "clinkz_skeleton_archer", "enraged_wildkin_tornado", "roshan", "roshan_halloween", "roshan_halloween_minion", "ent_dota_radiant_candybucket", "ent_dota_dire_candybucket", "warlock_golem_1", "warlock_golem_2", "warlock_golem_3", "warlock_golem_scepter_1", "warlock_golem_scepter_2", "warlock_golem_scepter_3", "scout_hawk", "greater_hawk", "beastmaster_hawk", "beastmaster_hawk_1", "beastmaster_hawk_2", "beastmaster_hawk_3", "beastmaster_hawk_4", "beastmaster_boar", "beastmaster_greater_boar", "beastmaster_boar_1", "beastmaster_boar_2", "beastmaster_boar_3", "beastmaster_boar_4", "brewmaster_earth_1", "brewmaster_earth_2", "brewmaster_earth_3", "brewmaster_storm_1", "brewmaster_storm_2", "brewmaster_storm_3", "brewmaster_fire_1", "brewmaster_fire_2", "brewmaster_fire_3", "unit_tombstone1", "unit_tombstone2", "unit_tombstone3", "unit_tombstone4", "unit_undying_zombie", "unit_undying_zombie_torso", "pugna_nether_ward_1", "pugna_nether_ward_2", "pugna_nether_ward_3", "pugna_nether_ward_4", "templar_assassin_psionic_trap", "rattletrap_cog", "rattletrap_rocket", "broodmother_web", "stormspirit_remnant", "ember_spirit_remnant", "earth_spirit_stone", "slark_visual", "weaver_swarm", "death_prophet_torment", "gyrocopter_homing_missile", "plasma_field", "metamorphosis_fear", "lycan_wolf1", "lycan_wolf2", "lycan_wolf3", "lycan_wolf4", "lycan_wolf_lane", "lone_druid_bear1", "lone_druid_bear2", "lone_druid_bear3", "lone_druid_bear4", "visage_familiar1", "visage_familiar2", "visage_familiar3", "ent_dota_halloffame", "ent_dota_promo", "wisp_spirit", "beastmaster_axe", "troll_warlord_axe", "creep_goodguys_melee_diretide", "creep_goodguys_ranged_diretide", "creep_badguys_melee_diretide", "creep_badguys_ranged_diretide", "goodguys_siege_diretide", "badguys_siege_diretide", "halloween_chaos_unit", "roquelaire", "greevil", "loot_greevil", "greevil_miniboss_black", "greevil_miniboss_blue", "greevil_miniboss_red", "greevil_miniboss_yellow", "greevil_miniboss_white", "greevil_minion_white", "greevil_minion_black", "greevil_minion_red", "greevil_minion_blue", "greevil_minion_yellow", "greevil_miniboss_green", "greevil_miniboss_orange", "greevil_miniboss_purple", "greevil_minion_orange", "greevil_minion_purple", "greevil_minion_green", "phoenix_sun", "ignis_fatuus", "target_dummy", "looping_sound", "invisible_vision_source", "techies_land_mine", "techies_stasis_trap", "techies_remote_mine", "techies_minefield_sign", "treant_eyes", "phantomassassin_gravestone", "goodguys_cny_beast", "badguys_cny_beast", "dota_death_prophet_exorcism_spirit", "dark_willow_creature", "mutation_pocket_roshan", "grimstroke_ink_creature", "seasonal_snowman", "frostivus2018_snowman", "seasonal_dragon", "seasonal_cny_balloon", "seasonal_ti9_balloon", "seasonal_ti9_drums", "seasonal_ti9_monkey", "seasonal_ti9_shovel_baby_roshan", "seasonal_ti9_shovel_ghost", "seasonal_ti9_shovel_stasis_trap", "seasonal_ti9_shovel_pudgling", "aether_remnant", "seasonal_penguin"]
let known_prefixes = new Map([
	// items
	["item", "Items"],

	// seasonal
	["seasonal", "Seasonal"],
	["frostivus2018", "Seasonal"],
	["throw", "Seasonal"],
	["shoot", "Seasonal"],
	["high", "Seasonal"],

	// heroes
	["sandking", "SandKing"],

	// units
	["forged_spirit", "ForgedSpirit"],
	["necronomicon_warrior", "NecronomiconWarrior"],
	["necronomicon_archer", "NecronomiconArcher"],
	["spawnlord", "Spawnlord"],
	["mudgolem", "MudGolem"],
	["blue_dragonspawn", "BlackDragon"],
])

function StandartifyString(str) {
	if (str.startsWith("item_"))
		str = str.substring(5)
	return str.toLowerCase().split("_").join("")
}

function MakeKnownClass(abil_name, class_name) {
	return [StandartifyString(abil_name), class_name]
}

let known_classes = new Map([
	// items
	MakeKnownClass("item_cloak", "C_DOTA_Item_PlaneswalkersCloak"), // Needs test
	MakeKnownClass("item_mutation_tombstone", "C_DOTA_Item_Tombstone"), // Needs test
	MakeKnownClass("item_dagon_2", "C_DOTA_Item_Dagon_Upgraded2"),
	MakeKnownClass("item_dagon_3", "C_DOTA_Item_Dagon_Upgraded3"),
	MakeKnownClass("item_dagon_4", "C_DOTA_Item_Dagon_Upgraded4"),
	MakeKnownClass("item_dagon_5", "C_DOTA_Item_Dagon_Upgraded5"),
	MakeKnownClass("item_necronomicon_2", "C_DOTA_Item_Necronomicon_Level2"),
	MakeKnownClass("item_necronomicon_3", "C_DOTA_Item_Necronomicon_Level3"),
	MakeKnownClass("item_blink", "C_DOTA_Item_BlinkDagger"),
	MakeKnownClass("item_super_blink", "CDOTA_Item_SuperBlinkDagger"),
	MakeKnownClass("item_tpscroll", "C_DOTA_Item_TeleportScroll"),
	MakeKnownClass("item_travel_boots", "C_DOTA_Item_Recipe_BootsOfTravel"),
	MakeKnownClass("item_travel_boots_2", "CDOTA_Item_Recipe_BootsOfTravel_2"),
	MakeKnownClass("item_boots_of_elves", "C_DOTA_Item_BootsOfElven"),
	MakeKnownClass("item_gloves", "C_DOTA_Item_GlovesOfHaste"),
	MakeKnownClass("item_lifesteal", "C_DOTA_Item_MaskOfDeath"),
	MakeKnownClass("item_bottle", "C_DOTA_Item_EmptyBottle"),
	MakeKnownClass("item_ring_of_regen", "C_DOTA_Item_RingOfRegeneration"),
	MakeKnownClass("item_gem", "C_DOTA_Item_GemOfTrueSight"),
	MakeKnownClass("item_boots", "C_DOTA_Item_BootsOfSpeed"),
	MakeKnownClass("item_branches", "C_DOTA_Item_IronwoodBranch"),
	MakeKnownClass("item_robe", "C_DOTA_Item_RobeOfMagi"),
	MakeKnownClass("item_ghost", "C_DOTA_Item_GhostScepter"),
	MakeKnownClass("item_dust", "C_DOTA_Item_DustofAppearance"),
	MakeKnownClass("item_ward_observer", "CDOTA_Item_ObserverWard"),
	MakeKnownClass("item_ward_sentry", "CDOTA_Item_SentryWard"),
	MakeKnownClass("item_ward_sentry", "CDOTA_Item_SentryWard"),
	MakeKnownClass("item_relic", "C_DOTA_Item_SacredRelic"),
	MakeKnownClass("item_orchid", "C_DOTA_Item_OrchidMalevolence"),
	MakeKnownClass("item_rapier", "C_DOTA_Item_DivineRapier"),
	MakeKnownClass("item_bfury", "CDOTA_Item_Battlefury"),
	MakeKnownClass("item_refresher", "C_DOTA_Item_RefresherOrb"),
	MakeKnownClass("item_pers", "C_DOTA_Item_Perseverance"),
	MakeKnownClass("item_assault", "C_DOTA_Item_Assault_Cuirass"),
	MakeKnownClass("item_combo_breaker", "C_DOTA_Item_AeonDisk"),
	MakeKnownClass("item_refresher_shard", "CDOTA_Item_RefresherOrb_Shard"),
	MakeKnownClass("item_invis_sword", "C_DOTA_Item_InvisibilityEdge"),
	MakeKnownClass("item_manta", "C_DOTA_Item_MantaStyle"),
	MakeKnownClass("item_lesser_crit", "C_DOTA_Item_LesserCritical"),
	MakeKnownClass("item_greater_crit", "C_DOTA_Item_GreaterCritical"),
	MakeKnownClass("item_basher", "C_DOTA_Item_CraniumBasher"),
	MakeKnownClass("item_eagle", "C_DOTA_Item_Eaglehorn"),

	// abilities
	MakeKnownClass("monkey_king_jingu_mastery", "C_DOTA_Ability_MonkeyKing_QuadrupleTap"), // Needs test
	MakeKnownClass("dark_willow_cursed_crown", "C_DOTA_Ability_DarkWillow_LeyConduit"), // Needs test
	MakeKnownClass("monkey_king_mischief", "C_DOTA_Ability_MonkeyKing_Transform"),
	MakeKnownClass("monkey_king_primal_spring", "C_DOTA_Ability_MonkeyKing_Spring"),
	MakeKnownClass("monkey_king_primal_spring_early", "C_DOTA_Ability_MonkeyKing_Spring_Early"),
	MakeKnownClass("treant_leech_seed", "C_CDOTA_Ability_Treant_LeechSeed"),
	MakeKnownClass("nevermore_dark_lord", "C_DOTA_Ability_Nevermore_Presence"),
	MakeKnownClass("mirana_invis", "C_DOTA_Ability_Mirana_MoonlightShadow"),
	MakeKnownClass("beastmaster_hawk_invisibility", "CDOTA_Ability_CallOfTheWild_Hawk_Invisibility"),
	MakeKnownClass("beastmaster_boar_poison", "CDOTA_Ability_CallOfTheWild_Boar_Poison"),
	MakeKnownClass("beastmaster_greater_boar_poison", "CDOTA_Ability_CallOfTheWild_Boar_PoisonGreater"),
	MakeKnownClass("shredder_chakram_2", "C_DOTA_Ability_Shredder_ChakramAlias_shredder_chakram_2"),
	MakeKnownClass("shredder_return_chakram_2", "C_DOTA_Ability_Shredder_ReturnChakramAlias_shredder_return_chakram_2"),
	MakeKnownClass("monkey_king_wukongs_command", "C_DOTA_Ability_MonkeyKing_FurArmy"),
	MakeKnownClass("brewmaster_earth_hurl_boulder", "C_DOTA_Ability_Brewmaster_HurlBoulder"),
	MakeKnownClass("brewmaster_earth_spell_immunity", "C_DOTA_Ability_Brewmaster_SpellImmunity"),
	MakeKnownClass("brewmaster_earth_pulverize", "C_DOTA_Ability_Brewmaster_Pulverize"),
	MakeKnownClass("brewmaster_storm_dispel_magic", "C_DOTA_Ability_Brewmaster_DispelMagic"),
	MakeKnownClass("brewmaster_storm_cyclone", "C_DOTA_Ability_Brewmaster_Cyclone"),
	MakeKnownClass("brewmaster_storm_wind_walk", "C_DOTA_Ability_Brewmaster_WindWalk"),
	MakeKnownClass("brewmaster_fire_permanent_immolation", "C_DOTA_Ability_Brewmaster_PermanentImmolation"),
])
let ignore_list = [
	// unused abilities that doesn't have ability classes
	"slardar_scepter",
	"troll_warlord_scepter",
	"life_stealer_empty_4", // there's class for life_stealer_empty_3 etc, but not for 4th
	"dragon_knight_frost_breath",
	"lycan_summon_wolves_invisibility",
	"undying_tombstone_zombie_aura",
	"keeper_of_the_light_spirit_form",
	"keeper_of_the_light_empty1",
	"keeper_of_the_light_empty2",

	// needs test
	"beastmaster_call_of_the_wild",
	"undying_tombstone_zombie_aura",
	"big_thunder_lizard_wardrums_aura",
]

function ParseClassNames(str) {
	let regex = /declare class (\w+) extends/g,
		class_list = [],
		result
	while (result = regex.exec(str))
		class_list.push(result[1])
	return class_list
}
const class_list = ParseClassNames(fs.readFileSync("../Fusion-Native2.d.ts").toString())

function TryFindClass(prefix, name) {
	return known_classes.get(name) || class_list.find(class_name => {
		if (!class_name.startsWith(prefix))
			return false
		return StandartifyString(class_name.substring(prefix.length)) === name
	})
}

function NicifyPrefix(pref) {
	let nice = ""
	let next_upper = true
	for (let i = 0; i < pref.length; i++) {
		let char = pref[i]
		if (char === "_") {
			next_upper = true
			continue
		}
		if (next_upper)
			char = char.toUpperCase()
		nice += char
		next_upper = false
	}
	return nice
}

ability_list.forEach(abil => {
	let separator_id = abil.lastIndexOf("_")
	if (separator_id === -1)
		throw "Probably invalid ability name " + abil

	let folder = undefined
	while (separator_id !== -1) {
		let separator_str = abil.substring(0, separator_id)
		folder = known_prefixes.get(separator_str)
		if (folder !== undefined)
			break
		if (heroes.includes(separator_str) || units.includes(separator_str)) {
			folder = NicifyPrefix(separator_str)
			known_prefixes.set(separator_str, folder)
			break
		}
		separator_id = abil.lastIndexOf("_", separator_id - 1)
	}
	if (!folder)
		throw "Please manually specify known prefix for " + abil
	let is_item = abil.startsWith("item_")
	let search_str = StandartifyString(abil)
	let class_name = TryFindClass(is_item ? "C_DOTA_Item_" : "C_DOTA_Ability_", search_str) || TryFindClass(is_item ? "CDOTA_Item_" : "CDOTA_Ability_", search_str)
	if (!class_name && !ignore_list.includes(abil) && !abil.startsWith("greevil_") && !abil.startsWith("roshan_halloween_"))
		console.log(`${abil} isn't exposed in classes`)
	let path = `folder/${folder}/`
	if (!fs.existsSync(path))
		fs.mkdirSync(path, { recursive: true })
	path += abil + ".ts"
	let extends_class = is_item ? "Item" : "Ability"
	let source = `\
import ${extends_class} from "../Base/${extends_class}"

export default class ${abil} extends ${extends_class} {
`
	if (class_name) {
		source += `\tpublic readonly m_pBaseEntity!: `
		source += class_name
	}
	source += `
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("${abil}", ${abil})
`
	fs.writeFileSync(path, source)
})

heroes.forEach(hero => {
	let search_str = StandartifyString(hero)
	let class_name = TryFindClass("C_DOTA_Unit_Hero_", search_str) || TryFindClass("CDOTA_Unit_Hero_", search_str)
	if (!class_name)
		throw `Hero ${hero} isn't exposed in classes`
	let path = `folder/${NicifyPrefix(hero)}/`
	if (!fs.existsSync(path))
		fs.mkdirSync(path, { recursive: true })
	hero = "npc_dota_hero_" + hero
	path += hero + ".ts"
	let source = `\
import Hero from "../Base/Hero"

export default class ${hero} extends Hero {
	public readonly m_pBaseEntity!: ${class_name}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("${class_name}", ${hero})
`
	fs.writeFileSync(path, source)
})