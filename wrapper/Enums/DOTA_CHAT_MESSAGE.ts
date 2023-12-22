export enum DOTA_CHAT_MESSAGE {
	CHAT_MESSAGE_INVALID = -1,
	CHAT_MESSAGE_HERO_KILL = 0,
	CHAT_MESSAGE_HERO_DENY = 1,
	CHAT_MESSAGE_BARRACKS_KILL = 2,
	CHAT_MESSAGE_TOWER_KILL = 3,
	CHAT_MESSAGE_TOWER_DENY = 4,
	CHAT_MESSAGE_FIRSTBLOOD = 5,
	CHAT_MESSAGE_STREAK_KILL = 6,
	CHAT_MESSAGE_BUYBACK = 7,
	CHAT_MESSAGE_AEGIS = 8,
	CHAT_MESSAGE_ROSHAN_KILL = 9,
	CHAT_MESSAGE_COURIER_LOST = 10,
	CHAT_MESSAGE_COURIER_RESPAWNED = 11,
	CHAT_MESSAGE_GLYPH_USED = 12,
	CHAT_MESSAGE_ITEM_PURCHASE = 13,
	CHAT_MESSAGE_CONNECT = 14,
	CHAT_MESSAGE_DISCONNECT = 15,
	CHAT_MESSAGE_DISCONNECT_WAIT_FOR_RECONNECT = 16,
	CHAT_MESSAGE_DISCONNECT_TIME_REMAINING = 17,
	CHAT_MESSAGE_DISCONNECT_TIME_REMAINING_PLURAL = 18,
	CHAT_MESSAGE_RECONNECT = 19,
	CHAT_MESSAGE_PLAYER_LEFT = 20,
	CHAT_MESSAGE_SAFE_TO_LEAVE = 21,
	CHAT_MESSAGE_RUNE_PICKUP = 22,
	CHAT_MESSAGE_RUNE_BOTTLE = 23,
	CHAT_MESSAGE_RUNE_DENY = 114,
	CHAT_MESSAGE_INTHEBAG = 24,
	CHAT_MESSAGE_SECRETSHOP = 25,
	CHAT_MESSAGE_ITEM_AUTOPURCHASED = 26,
	CHAT_MESSAGE_ITEMS_COMBINED = 27,
	CHAT_MESSAGE_SUPER_CREEPS = 28,
	CHAT_MESSAGE_CANT_USE_ACTION_ITEM = 29,
	CHAT_MESSAGE_CANTPAUSE = 31,
	CHAT_MESSAGE_NOPAUSESLEFT = 32,
	CHAT_MESSAGE_CANTPAUSEYET = 33,
	CHAT_MESSAGE_PAUSED = 34,
	CHAT_MESSAGE_UNPAUSE_COUNTDOWN = 35,
	CHAT_MESSAGE_UNPAUSED = 36,
	CHAT_MESSAGE_AUTO_UNPAUSED = 37,
	CHAT_MESSAGE_YOUPAUSED = 38,
	CHAT_MESSAGE_CANTUNPAUSETEAM = 39,
	CHAT_MESSAGE_VOICE_TEXT_BANNED = 41,
	CHAT_MESSAGE_SPECTATORS_WATCHING_THIS_GAME = 42,
	CHAT_MESSAGE_REPORT_REMINDER = 43,
	CHAT_MESSAGE_ECON_ITEM = 44,
	CHAT_MESSAGE_TAUNT = 45,
	CHAT_MESSAGE_RANDOM = 46,
	CHAT_MESSAGE_RD_TURN = 47,
	CHAT_MESSAGE_DROP_RATE_BONUS = 49,
	CHAT_MESSAGE_NO_BATTLE_POINTS = 50,
	CHAT_MESSAGE_DENIED_AEGIS = 51,
	CHAT_MESSAGE_INFORMATIONAL = 52,
	CHAT_MESSAGE_AEGIS_STOLEN = 53,
	CHAT_MESSAGE_ROSHAN_CANDY = 54,
	CHAT_MESSAGE_ITEM_GIFTED = 55,
	CHAT_MESSAGE_HERO_KILL_WITH_GREEVIL = 56,
	CHAT_MESSAGE_HOLDOUT_TOWER_DESTROYED = 57,
	CHAT_MESSAGE_HOLDOUT_WALL_DESTROYED = 58,
	CHAT_MESSAGE_HOLDOUT_WALL_FINISHED = 59,
	CHAT_MESSAGE_PLAYER_LEFT_LIMITED_HERO = 62,
	CHAT_MESSAGE_ABANDON_LIMITED_HERO_EXPLANATION = 63,
	CHAT_MESSAGE_DISCONNECT_LIMITED_HERO = 64,
	CHAT_MESSAGE_LOW_PRIORITY_COMPLETED_EXPLANATION = 65,
	CHAT_MESSAGE_RECRUITMENT_DROP_RATE_BONUS = 66,
	CHAT_MESSAGE_FROSTIVUS_SHINING_BOOSTER_ACTIVE = 67,
	CHAT_MESSAGE_PLAYER_LEFT_AFK = 73,
	CHAT_MESSAGE_PLAYER_LEFT_DISCONNECTED_TOO_LONG = 74,
	CHAT_MESSAGE_PLAYER_ABANDONED = 75,
	CHAT_MESSAGE_PLAYER_ABANDONED_AFK = 76,
	CHAT_MESSAGE_PLAYER_ABANDONED_DISCONNECTED_TOO_LONG = 77,
	CHAT_MESSAGE_WILL_NOT_BE_SCORED = 78,
	CHAT_MESSAGE_WILL_NOT_BE_SCORED_RANKED = 79,
	CHAT_MESSAGE_WILL_NOT_BE_SCORED_NETWORK = 80,
	CHAT_MESSAGE_WILL_NOT_BE_SCORED_NETWORK_RANKED = 81,
	CHAT_MESSAGE_CAN_QUIT_WITHOUT_ABANDON = 82,
	CHAT_MESSAGE_RANKED_GAME_STILL_SCORED_LEAVERS_GET_LOSS = 83,
	CHAT_MESSAGE_ABANDON_RANKED_BEFORE_FIRST_BLOOD_PARTY = 84,
	CHAT_MESSAGE_COMPENDIUM_LEVEL = 85,
	CHAT_MESSAGE_VICTORY_PREDICTION_STREAK = 86,
	CHAT_MESSAGE_ASSASSIN_ANNOUNCE = 87,
	CHAT_MESSAGE_ASSASSIN_SUCCESS = 88,
	CHAT_MESSAGE_ASSASSIN_DENIED = 89,
	CHAT_MESSAGE_VICTORY_PREDICTION_SINGLE_USER_CONFIRM = 90,
	CHAT_MESSAGE_EFFIGY_KILL = 91,
	CHAT_MESSAGE_VOICE_TEXT_BANNED_OVERFLOW = 92,
	CHAT_MESSAGE_YEAR_BEAST_KILLED = 93,
	CHAT_MESSAGE_PAUSE_COUNTDOWN = 94,
	CHAT_MESSAGE_COINS_WAGERED = 95,
	CHAT_MESSAGE_HERO_NOMINATED_BAN = 96,
	CHAT_MESSAGE_HERO_BANNED = 97,
	CHAT_MESSAGE_HERO_BAN_COUNT = 98,
	CHAT_MESSAGE_RIVER_PAINTED = 99,
	CHAT_MESSAGE_SCAN_USED = 100,
	CHAT_MESSAGE_SHRINE_KILLED = 101,
	CHAT_MESSAGE_WAGER_TOKEN_SPENT = 102,
	CHAT_MESSAGE_RANK_WAGER = 103,
	CHAT_MESSAGE_NEW_PLAYER_REMINDER = 104,
	CHAT_MESSAGE_OBSERVER_WARD_KILLED = 105,
	CHAT_MESSAGE_SENTRY_WARD_KILLED = 106,
	CHAT_MESSAGE_ITEM_PLACED_IN_NEUTRAL_STASH = 107,
	CHAT_MESSAGE_HERO_CHOICE_INVALID = 108,
	CHAT_MESSAGE_BOUNTY = 109,
	CHAT_MESSAGE_ABILITY_DRAFT_START = 110,
	CHAT_MESSAGE_HERO_FOUND_CANDY = 111,
	CHAT_MESSAGE_ABILITY_DRAFT_RANDOMED = 112,
	CHAT_MESSAGE_PRIVATE_COACH_CONNECTED = 113,
	CHAT_MESSAGE_CANT_PAUSE_TOO_EARLY = 115,
	CHAT_MESSAGE_HERO_KILL_WITH_PENGUIN = 116,
	CHAT_MESSAGE_MINIBOSS_KILL = 117,
	CHAT_MESSAGE_PLAYER_IN_GAME_BAN_TEXT = 118,
	CHAT_MESSAGE_BANNER_PLANTED = 119
}
