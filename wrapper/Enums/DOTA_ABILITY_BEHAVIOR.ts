// eslint-disable-next-line @typescript-eslint/naming-convention
export const DOTA_ABILITY_BEHAVIOR = {
	DOTA_ABILITY_BEHAVIOR_NONE: 0n,
	DOTA_ABILITY_BEHAVIOR_HIDDEN: 1n,
	DOTA_ABILITY_BEHAVIOR_PASSIVE: 2n,
	DOTA_ABILITY_BEHAVIOR_NO_TARGET: 4n,
	DOTA_ABILITY_BEHAVIOR_UNIT_TARGET: 8n,
	DOTA_ABILITY_BEHAVIOR_POINT: 16n,
	DOTA_ABILITY_BEHAVIOR_AOE: 32n,
	DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE: 64n,
	DOTA_ABILITY_BEHAVIOR_CHANNELLED: 128n,
	DOTA_ABILITY_BEHAVIOR_ITEM: 256n,
	DOTA_ABILITY_BEHAVIOR_TOGGLE: 512n,
	DOTA_ABILITY_BEHAVIOR_DIRECTIONAL: 1024n,
	DOTA_ABILITY_BEHAVIOR_IMMEDIATE: 2048n,
	DOTA_ABILITY_BEHAVIOR_AUTOCAST: 4096n,
	DOTA_ABILITY_BEHAVIOR_OPTIONAL_UNIT_TARGET: 8192n,
	DOTA_ABILITY_BEHAVIOR_OPTIONAL_POINT: 16384n,
	DOTA_ABILITY_BEHAVIOR_OPTIONAL_NO_TARGET: 32768n,
	DOTA_ABILITY_BEHAVIOR_AURA: 65536n,
	DOTA_ABILITY_BEHAVIOR_ATTACK: 131072n,
	DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT: 262144n,
	DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES: 524288n,
	DOTA_ABILITY_BEHAVIOR_UNRESTRICTED: 1048576n,
	DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE: 2097152n,
	DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL: 4194304n,
	DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_MOVEMENT: 8388608n,
	DOTA_ABILITY_BEHAVIOR_DONT_ALERT_TARGET: 16777216n,
	DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK: 33554432n,
	DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN: 67108864n,
	DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING: 134217728n,
	DOTA_ABILITY_BEHAVIOR_RUNE_TARGET: 268435456n,
	DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_CHANNEL: 536870912n,
	DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING: 1073741824n,
	DOTA_ABILITY_BEHAVIOR_LAST_RESORT_POINT: 2147483648n,
	DOTA_ABILITY_BEHAVIOR_CAN_SELF_CAST: 4294967296n,
	DOTA_ABILITY_BEHAVIOR_SHOW_IN_GUIDES: 8589934592n,
	DOTA_ABILITY_BEHAVIOR_UNLOCKED_BY_EFFECT_INDEX: 17179869184n,
	DOTA_ABILITY_BEHAVIOR_SUPPRESS_ASSOCIATED_CONSUMABLE: 34359738368n,
	DOTA_ABILITY_BEHAVIOR_FREE_DRAW_TARGETING: 68719476736n,
	DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE: 137438953472n,
	DOTA_ABILITY_BEHAVIOR_OVERSHOOT: 274877906944n,
	DOTA_ABILITY_BEHAVIOR_IGNORE_MUTED: 549755813888n,
	DOTA_ABILITY_BEHAVIOR_ALT_CASTABLE: 1099511627776n,
	DOTA_ABILITY_BEHAVIOR_SKIP_FOR_KEYBINDS: 4398046511104n,
	DOTA_ABILITY_BEHAVIOR_INNATE_UI: 8796093022208n,
	DOTA_ABILITY_BEHAVIOR_UNSWAPPABLE: 17592186044416n,
	DOTA_ABILITY_BEHAVIOR_DONT_PROC_OTHER_ABILITIES: 35184372088832n,
	DOTA_ABILITY_BEHAVIOR_IGNORE_INVISIBLE: 70368744177664n,
	DOTA_ABILITY_BEHAVIOR_AFFECTED_BY_MUTE: 140737488355328n,
	DOTA_ABILITY_BEHAVIOR_IS_FAKE_ITEM: 281474976710656n
}
export type DOTA_ABILITY_BEHAVIOR = bigint
