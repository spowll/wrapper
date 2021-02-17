/// GLOBAL OBJECTS
declare var IOBuffer: Float32Array // 128 floats in size
declare var EntityVisualPositions: Float32Array
declare var EntityVisualRotations: Float32Array
declare var ServerMessageBuffer: Uint8Array
/**
struct CUnitOrder {
	uint32_t order_type; // 0
	uint32_t issuer; // 4
	Vector position; // 8
	CEntityIndex target; // 20
	CEntityIndex ability; // 24
	bool show_effects; // 28
	bool queue; // 29
	uint32_t issuers_size; // 30
	CEntityIndex issuers[128]; // 34+
};
 */
declare var LatestUnitOrder: Uint8Array
/**
struct CUserCmd {
	int command_number; // 0
	int tick_count; // 4
	QAngle viewangles; // 8
	float forwardmove; // 20
	float sidemove; // 24
	float upmove; // 28
	uint64_t buttons; // 32, 4 bit => up 5 bit => down 10 bit => left 11 bit => right
	int impulse; // 40
	CEntityIndex weaponselect; // 44
	CEntityIndex weaponsubtype; // 48
	float mousex; // 52
	float mousey; // 56
	int16_t cameraposition[2]; // 60
	uint8_t clickbehavior; // 64
	uint8_t statspanel; // 65, dota_spectator_stats_panel
	uint8_t shoppanel; // 66
	uint8_t stats_dropdown; // 67, spectator_stats_category_id
	uint8_t stats_dropdown_sort; // 68, spectator_stats_sort_method
	Vector3 crosshairtrace; // 69
};
 */
declare var LatestUserCmd: Uint8Array
declare var CursorPosition: Int32Array // 2 ints in size
declare var SchemaClassesInheritance: Map<string, string[]>

declare var console: Console
declare var ConVars: ConVars
declare var CustomGameEvents: CustomGameEvents
declare var Minimap: Minimap
declare var Particles: Particles
declare var Renderer: Renderer
declare var Camera: Camera

interface Console {
	memory: any
	assert(condition?: boolean, ...data: any[]): void
	clear(): void
	count(label?: string): void
	countReset(label?: string): void
	debug(...data: any[]): void
	dir(item?: any, options?: any): void
	dirxml(...data: any[]): void
	error(...data: any[]): void
	exception(message?: string, ...optionalParams: any[]): void
	group(...data: any[]): void
	groupCollapsed(...data: any[]): void
	groupEnd(): void
	info(...data: any[]): void
	log(...data: any[]): void
	table(tabularData?: any, properties?: string[]): void
	time(label?: string): void
	timeEnd(label?: string): void
	timeLog(label?: string, ...data: any[]): void
	timeStamp(label?: string): void
	trace(...data: any[]): void
	warn(...data: any[]): void
}

type BufferSource = ArrayBufferView | ArrayBuffer
declare namespace WebAssembly {
	interface CompileError {
	}

	var CompileError: {
		prototype: CompileError
		new(): CompileError
	}

	interface Global {
		value: any
		valueOf(): any
	}

	var Global: {
		prototype: Global
		new(descriptor: GlobalDescriptor, v?: any): Global
	}

	interface Instance {
		readonly exports: Exports
	}

	var Instance: {
		prototype: Instance
		new(module: Module, importObject?: Imports): Instance
	}

	interface LinkError {
	}

	var LinkError: {
		prototype: LinkError
		new(): LinkError
	}

	interface Memory {
		readonly buffer: ArrayBuffer
		grow(delta: number): number
	}

	var Memory: {
		prototype: Memory
		new(descriptor: MemoryDescriptor): Memory
	}

	interface Module {
	}

	var Module: {
		prototype: Module
		new(bytes: BufferSource): Module
		customSections(moduleObject: Module, sectionName: string): ArrayBuffer[]
		exports(moduleObject: Module): ModuleExportDescriptor[]
		imports(moduleObject: Module): ModuleImportDescriptor[]
	}

	interface RuntimeError {
	}

	var RuntimeError: {
		prototype: RuntimeError
		new(): RuntimeError
	}

	interface Table {
		readonly length: number
		get(index: number): Function | null
		grow(delta: number): number
		set(index: number, value: Function | null): void
	}

	var Table: {
		prototype: Table
		new(descriptor: TableDescriptor): Table
	}

	interface GlobalDescriptor {
		mutable?: boolean
		value: ValueType
	}

	interface MemoryDescriptor {
		initial: number
		maximum?: number
	}

	interface ModuleExportDescriptor {
		kind: ImportExportKind
		name: string
	}

	interface ModuleImportDescriptor {
		kind: ImportExportKind
		module: string
		name: string
	}

	interface TableDescriptor {
		element: TableKind
		initial: number
		maximum?: number
	}

	interface WebAssemblyInstantiatedSource {
		instance: Instance
		module: Module
	}

	type ImportExportKind = "function" | "global" | "memory" | "table"
	type TableKind = "anyfunc"
	type ValueType = "f32" | "f64" | "i32" | "i64"
	type ExportValue = Function | Global | Memory | Table
	type Exports = Record<string, ExportValue>
	type ImportValue = ExportValue | number
	type ModuleImports = Record<string, ImportValue>
	type Imports = Record<string, ModuleImports>
	function compile(bytes: BufferSource): Promise<Module>
	function instantiate(bytes: BufferSource, importObject?: Imports): Promise<WebAssemblyInstantiatedSource>
	function instantiate(moduleObject: Module, importObject?: Imports): Promise<Instance>
	function validate(bytes: BufferSource): boolean
}

declare interface ConVars {
	GetInt(convar_name: string): number
	GetString(convar_name: string): string
	Set(convar_name: string, value: number | boolean): void
}

declare interface CustomGameEvents {
	FireEventToClient(name: string, player_ent_id: number, data: Uint8Array): void
	FireEventToAllClients(name: string, data: Uint8Array): void
	FireEventToServer(name: string, data: Uint8Array): void
}

declare interface Minimap {
	SendPing(type?: number, direct_ping?: boolean, target?: number): void // pass location: Vector2 at IOBuffer offset 0
	SendLine(x: number, y: number, initial: boolean): void
	/**
	 * Draws icon at minimap
	 * @param icon_name can be found at https://github.com/SteamDatabase/GameTracking-Dota2/blob/master/game/dota/pak01_dir/scripts/mod_textures.txt
	 * @param size you can get that value for heroes from ConVars.GetInt("dota_minimap_hero_size")
	 * @param end_time Must be for ex. Game.RawGameTime + ConVars.GetInt("dota_minimap_ping_duration").
	 * @param end_time Changing it to 1 will hide icon from minimap if you're not calling it repeatedly in Draw event.
	 * @param end_time If it's <= 0 it'll be infinity for DotA.
	 * @param uid you can use this value to edit existing uid's location/color/icon, or specify 0x80000000 to make it unique
	 */
	DrawIcon(icon_name: string, size: number, end_time: number, uid: number): void // pass pos: Vector3 at IOBuffer offset 0, color: Color at IOBuffer offset 3
	/**
	 * Draws ping at minimap
	 * @param end_time Must be for ex. Game.RawGameTime + ConVars.GetInt("dota_minimap_ping_duration").
	 * @param end_time Changing it to 1 will hide ping from minimap if you're not calling it repeatedly in Draw event.
	 * @param end_time If it's <= 0 it'll be infinity for DotA.
	 * @param uid you can use this value to edit existing uid's location/color, or specify 0x80000000 to make it unique
	 */
	DrawPing(end_time: number, uid: number): void // pass pos: Vector3 at IOBuffer offset 0, color: Color at IOBuffer offset 3
}

declare interface Particles {
	Create(path: string, attach: ParticleAttachment_t, ent: number): number
	Destroy(particle_id: number, immediate: boolean): void
	SetControlPoint(particle_id: number, control_point: number): void // pass vec: Vector3 at IOBuffer offset 0
	SetControlPointForward(particle_id: number, control_point: number): void // pass vec: Vector3 at IOBuffer offset 0
	DeleteAll(): void
}

// must be called only in onDraw!
declare interface Renderer {
	CreateFont(name: string, weight: number, width: number, italic: boolean): number
	CreateFontFromData(buf: ArrayBuffer): number
	FreeFont(font_id: number): void
	/**
	 * Pass size: number at IOBuffer offset 0, scaleX: number at IOBuffer offset 1, skewX: number at IOBuffer offset 2
	 * @returns size: Vector2 to IOBuffer at offset 0
	 */
	GetTextSize(text: string, font_id: number): void
	/**
	 * Pass size: Vector2 at IOBuffer offset 0
	 * @returns texture_id
	 */
	CreateTexture(rgba: Uint8Array): number
	/**
	 * Returns size: Vector2 at IOBuffer offset 0
	 * @returns texture_id
	 */
	CreateTextureSVG(svg: Uint8Array): number
	FreeTexture(texture_id: number): void
	GetTextSize(text: string, font_id: number): boolean // returns Vector2 to IOBuffer offset 0
	ExecuteCommandBuffer(buf: Uint8Array): void
}

declare interface Camera {
	Distance: number
	Angles: boolean // returns QAngle to IOBuffer offset 0 on get, sets from IOBuffer offset 0 on set
	Position: boolean // returns Vector3 to IOBuffer offset 0 on get, sets from IOBuffer offset 0 on set
}

/// GLOBAL FUNCTIONS

declare function SendToConsole(command: string): void
declare function fread(path: string): ArrayBuffer | undefined
declare function fexists(path: string): boolean
declare function requestPlayerData(player_id: number): Promise<string>
/**
 * @param path pass empty to read from confings/../settings.json
 */
declare function readConfig(path: string): Promise<ArrayBuffer>
declare function writeConfig(path: string, data: ArrayBuffer): void
declare function GetLevelName(): string
declare function GetLevelNameShort(): string
declare function PrepareUnitOrders(obj: { // pass Position: Vector3 at IOBuffer offset 0
	OrderType: number,
	Target?: number,
	Ability?: number,
	OrderIssuer?: PlayerOrderIssuer_t,
	Issuers?: number[] | number,
	Queue?: boolean,
	ShowEffects?: boolean
}): void
declare function SelectUnit(ent: number, bAddToGroup: boolean): boolean
declare function GetLatency(flow: number): number
declare function GetAvgLatency(flow: number): number
declare function GetUIState(): number
declare function ChatWheelAbuse(str: string): void
declare function StartFindingMatch(): void
declare function SendGCPingResponse(): void
declare function AcceptMatch(): void
declare function ToggleFakeChat(state: boolean): void
declare function ToggleOBSBypass(state: boolean): void
declare function setFireEvent(func: (event_name: string, cancellable: boolean, ...args: any) => boolean): void
declare function require(absolute_path: string): any
declare function GetHeapStatistics(): {
	total_heap_size: bigint
	total_heap_size_executable: bigint
	total_physical_size: bigint
	total_available_size: bigint
	used_heap_size: bigint
	heap_size_limit: bigint
	malloced_memory: bigint
	external_memory: bigint
	peak_malloced_memory: bigint
	number_of_native_contexts: bigint
	number_of_detached_contexts: bigint
	does_zap_garbage: bigint
}
declare function hrtime(): number
declare function AddSearchPath(path: string): boolean
declare function RemoveSearchPath(path: string): boolean
declare function SetTreeModel(model_name: string, scale: number): void
declare function EmitChatEvent(
	type: number, // DOTA_CHAT_MESSAGE
	value: number,
	playerid_1: number,
	playerid_2: number,
	playerid_3: number,
	playerid_4: number,
	playerid_5: number,
	playerid_6: number,
	value2: number,
	value3: number
): void
declare function EmitStartSoundEvent( // pass location: Vector2 at IOBuffer offset 0
	soundevent_hash: number,
	source_entity_index: number,
	seed: number
): void
declare function EnforceEntityVisibility(
	entity_id: number,
	team_num: number,
	is_visible: boolean
): void
declare function GetEntityCollisionRadius(entity_id: number): number | undefined
/**
 * @returns Vector2 to IOBuffer offset 0
 */
declare function GetEntityAttachment(entity_id: number, attachment_name: string): void
declare function GetEntityUnitState(entity_id: number): bigint | undefined
declare function GetUnitNumberPropertyByName(entity_id: number, name: string): number | undefined
/**
 * treat IOBuffer as DataView for this function
 * every element should consist of [u32, u32, u8] = [(entity_id << 1) or (binary_id << 1) | 1, color_u32, RenderMode_t]
 * @param count count of elements in IOBuffer
 */
declare function BatchSetEntityColor(count: number): void
/**
 * treat IOBuffer as DataView for this function
 * every element should consist of [u32, u32] = [(entity_id << 1) or (binary_id << 1) | 1, color_u32]
 * @param count count of elements in IOBuffer
 */
declare function BatchSetEntityGlow(count: number): void
declare function GetPlayerMuteFlags(steamid64: bigint): number

/// AUTOMATICALLY GENERATED

declare enum C_BaseCombatCharacter__WaterWakeMode_t {
	C_BaseCombatCharacter__WATER_WAKE_NONE = 0,
	C_BaseCombatCharacter__WATER_WAKE_IDLE = 1,
	C_BaseCombatCharacter__WATER_WAKE_WALKING = 2,
	C_BaseCombatCharacter__WATER_WAKE_RUNNING = 3,
	C_BaseCombatCharacter__WATER_WAKE_WATER_OVERHEAD = 4,
}

declare enum CDOTA_BaseNPC_AghsFort_Watch_Tower__ExitDirection_t {
	CDOTA_BaseNPC_AghsFort_Watch_Tower__EXIT_DIRECTION_LEFT = 0,
	CDOTA_BaseNPC_AghsFort_Watch_Tower__EXIT_DIRECTION_TOP = 1,
	CDOTA_BaseNPC_AghsFort_Watch_Tower__EXIT_DIRECTION_RIGHT = 2,
}

declare enum Hull_t {
	HULL_HUMAN = 0,
	HULL_SMALL_CENTERED = 1,
	HULL_WIDE_HUMAN = 2,
	HULL_TINY = 3,
	HULL_MEDIUM = 4,
	HULL_TINY_CENTERED = 5,
	HULL_LARGE = 6,
	HULL_LARGE_CENTERED = 7,
	HULL_MEDIUM_TALL = 8,
	NUM_HULLS = 9,
	HULL_NONE = 10,
}

declare enum AnimationProcessingType_t {
	ANIMATION_PROCESSING_SERVER_SIMULATION = 0,
	ANIMATION_PROCESSING_CLIENT_SIMULATION = 1,
	ANIMATION_PROCESSING_CLIENT_PREDICTION = 2,
	ANIMATION_PROCESSING_CLIENT_INTERPOLATION = 3,
	ANIMATION_PROCESSING_CLIENT_RENDER = 4,
	ANIMATION_PROCESSING_MAX = 5,
}

declare enum RenderPrimitiveType_t {
	RENDER_PRIM_POINTS = 0,
	RENDER_PRIM_LINES = 1,
	RENDER_PRIM_LINES_WITH_ADJACENCY = 2,
	RENDER_PRIM_LINE_STRIP = 3,
	RENDER_PRIM_LINE_STRIP_WITH_ADJACENCY = 4,
	RENDER_PRIM_TRIANGLES = 5,
	RENDER_PRIM_TRIANGLES_WITH_ADJACENCY = 6,
	RENDER_PRIM_TRIANGLE_STRIP = 7,
	RENDER_PRIM_TRIANGLE_STRIP_WITH_ADJACENCY = 8,
	RENDER_PRIM_INSTANCED_QUADS = 9,
	RENDER_PRIM_HETEROGENOUS = 10,
	RENDER_PRIM_1_CONTROL_POINT_PATCHLIST = 11,
	RENDER_PRIM_2_CONTROL_POINT_PATCHLIST = 12,
	RENDER_PRIM_3_CONTROL_POINT_PATCHLIST = 13,
	RENDER_PRIM_4_CONTROL_POINT_PATCHLIST = 14,
	RENDER_PRIM_5_CONTROL_POINT_PATCHLIST = 15,
	RENDER_PRIM_6_CONTROL_POINT_PATCHLIST = 16,
	RENDER_PRIM_7_CONTROL_POINT_PATCHLIST = 17,
	RENDER_PRIM_8_CONTROL_POINT_PATCHLIST = 18,
	RENDER_PRIM_9_CONTROL_POINT_PATCHLIST = 19,
	RENDER_PRIM_10_CONTROL_POINT_PATCHLIST = 20,
	RENDER_PRIM_11_CONTROL_POINT_PATCHLIST = 21,
	RENDER_PRIM_12_CONTROL_POINT_PATCHLIST = 22,
	RENDER_PRIM_13_CONTROL_POINT_PATCHLIST = 23,
	RENDER_PRIM_14_CONTROL_POINT_PATCHLIST = 24,
	RENDER_PRIM_15_CONTROL_POINT_PATCHLIST = 25,
	RENDER_PRIM_16_CONTROL_POINT_PATCHLIST = 26,
	RENDER_PRIM_17_CONTROL_POINT_PATCHLIST = 27,
	RENDER_PRIM_18_CONTROL_POINT_PATCHLIST = 28,
	RENDER_PRIM_19_CONTROL_POINT_PATCHLIST = 29,
	RENDER_PRIM_20_CONTROL_POINT_PATCHLIST = 30,
	RENDER_PRIM_21_CONTROL_POINT_PATCHLIST = 31,
	RENDER_PRIM_22_CONTROL_POINT_PATCHLIST = 32,
	RENDER_PRIM_23_CONTROL_POINT_PATCHLIST = 33,
	RENDER_PRIM_24_CONTROL_POINT_PATCHLIST = 34,
	RENDER_PRIM_25_CONTROL_POINT_PATCHLIST = 35,
	RENDER_PRIM_26_CONTROL_POINT_PATCHLIST = 36,
	RENDER_PRIM_27_CONTROL_POINT_PATCHLIST = 37,
	RENDER_PRIM_28_CONTROL_POINT_PATCHLIST = 38,
	RENDER_PRIM_29_CONTROL_POINT_PATCHLIST = 39,
	RENDER_PRIM_30_CONTROL_POINT_PATCHLIST = 40,
	RENDER_PRIM_31_CONTROL_POINT_PATCHLIST = 41,
	RENDER_PRIM_32_CONTROL_POINT_PATCHLIST = 42,
	RENDER_PRIM_COMPUTE_SHADER = 43,
	RENDER_PRIM_TYPE_COUNT = 44,
}

declare enum LuaModifierType {
	LUA_MODIFIER_MOTION_NONE = 0,
	LUA_MODIFIER_MOTION_HORIZONTAL = 1,
	LUA_MODIFIER_MOTION_VERTICAL = 2,
	LUA_MODIFIER_MOTION_BOTH = 3,
	LUA_MODIFIER_INVALID = 4,
}

declare enum ObjectTypeFlags_t {
	OBJECT_TYPE_IMAGE_LOD = 1,
	OBJECT_TYPE_GEOMETRY_LOD = 2,
	OBJECT_TYPE_DECAL = 4,
	OBJECT_TYPE_MODEL = 8,
	OBJECT_TYPE_BLOCK_LIGHT = 16,
	OBJECT_TYPE_NO_SHADOWS = 32,
	OBJECT_TYPE_WORLDSPACE_TEXURE_BLEND = 64,
	OBJECT_TYPE_DISABLED_IN_LOW_QUALITY = 128,
	OBJECT_TYPE_NO_SUN_SHADOWS = 256,
	OBJECT_TYPE_RENDER_WITH_DYNAMIC = 512,
	OBJECT_TYPE_RENDER_TO_CUBEMAPS = 1024,
	OBJECT_TYPE_PRECOMPUTED_VISMEMBERS = 16384,
}

declare enum DOTAMusicStatus_t {
	DOTA_MUSIC_STATUS_NONE = 0,
	DOTA_MUSIC_STATUS_EXPLORATION = 1,
	DOTA_MUSIC_STATUS_BATTLE = 2,
	DOTA_MUSIC_STATUS_PRE_GAME_EXPLORATION = 3,
	DOTA_MUSIC_STATUS_DEAD = 4,
	DOTA_MUSIC_STATUS_LAST = 5,
}

declare enum MoveCollide_t {
	MOVECOLLIDE_DEFAULT = 0,
	MOVECOLLIDE_FLY_BOUNCE = 1,
	MOVECOLLIDE_FLY_CUSTOM = 2,
	MOVECOLLIDE_FLY_SLIDE = 3,
	MOVECOLLIDE_COUNT = 4,
	MOVECOLLIDE_MAX_BITS = 3,
}

declare enum DOTA_RUNES {
	DOTA_RUNE_INVALID = -1,
	DOTA_RUNE_DOUBLEDAMAGE = 0,
	DOTA_RUNE_HASTE = 1,
	DOTA_RUNE_ILLUSION = 2,
	DOTA_RUNE_INVISIBILITY = 3,
	DOTA_RUNE_REGENERATION = 4,
	DOTA_RUNE_BOUNTY = 5,
	DOTA_RUNE_ARCANE = 6,
	DOTA_RUNE_XP = 7,
	DOTA_RUNE_COUNT = 8,
}

declare enum Blend2DMode {
	Blend2DMode_General = 0,
	Blend2DMode_Directional = 1,
}

declare enum ItemQuality_t {
	DOTA_ITEM_QUALITY_CONSUMABLE = 0,
	DOTA_ITEM_QUALITY_PLAIN = 1,
	DOTA_ITEM_QUALITY_COMMON = 2,
	DOTA_ITEM_QUALITY_RARE = 3,
	DOTA_ITEM_QUALITY_EPIC = 4,
	DOTA_ITEM_QUALITY_ARTIFACT = 5,
	DOTA_ITEM_QUALITY_SECRET_SHOP = 6,
	NUM_ITEM_QUALITY_LEVELS = 7,
}

declare enum SteamUGCQuery {
	RankedByVote = 0,
	RankedByPublicationDate = 1,
	AcceptedForGameRankedByAcceptanceDate = 2,
	RankedByTrend = 3,
	FavoritedByFriendsRankedByPublicationDate = 4,
	CreatedByFriendsRankedByPublicationDate = 5,
	RankedByNumTimesReported = 6,
	CreatedByFollowedUsersRankedByPublicationDate = 7,
	NotYetRated = 8,
	RankedByTotalVotesAsc = 9,
	RankedByVotesUp = 10,
	RankedByTextSearch = 11,
	RankedByTotalUniqueSubscriptions = 12,
	RankedByPlaytimeTrend = 13,
	RankedByTotalPlaytime = 14,
	RankedByAveragePlaytimeTrend = 15,
	RankedByLifetimeAveragePlaytime = 16,
	RankedByPlaytimeSessionsTrend = 17,
	RankedByLifetimePlaytimeSessions = 18,
}

declare enum SpawnDebugRestrictionOverrideState_t {
	SPAWN_DEBUG_RESTRICT_NONE = 0,
	SPAWN_DEBUG_RESTRICT_IGNORE_MANAGER_DISTANCE_REQS = 1,
	SPAWN_DEBUG_RESTRICT_IGNORE_TEMPLATE_DISTANCE_LOS_REQS = 2,
	SPAWN_DEBUG_RESTRICT_IGNORE_TEMPLATE_COOLDOWN_LIMITS = 4,
	SPAWN_DEBUG_RESTRICT_IGNORE_TARGET_COOLDOWN_LIMITS = 8,
}

declare enum PlayerConnectedState {
	PlayerConnected = 0,
	PlayerDisconnecting = 1,
	PlayerDisconnected = 2,
}

declare enum ParticleVRHandChoiceList_t {
	PARTICLE_VRHAND_LEFT = 0,
	PARTICLE_VRHAND_RIGHT = 1,
	PARTICLE_VRHAND_CP = 2,
	PARTICLE_VRHAND_CP_OBJECT = 3,
}

declare enum JointMotion_t {
	JOINT_MOTION_FREE = 0,
	JOINT_MOTION_LOCKED = 1,
	JOINT_MOTION_COUNT = 2,
}

declare enum OrderQueueBehavior_t {
	DOTA_ORDER_QUEUE_DEFAULT = 0,
	DOTA_ORDER_QUEUE_NEVER = 1,
	DOTA_ORDER_QUEUE_ALWAYS = 2,
}

declare enum DotaGestureSlot_t {
	GESTURE_SLOT_NONE = -1,
	GESTURE_SLOT_ATTACK = 0,
	GESTURE_SLOT_ABILITY = 1,
	GESTURE_SLOT_OVERRIDE = 2,
	GESTURE_SLOT_CUSTOM = 3,
	GESTURE_SLOT_CUSTOM2 = 4,
	GESTURE_SLOT_CUSTOM3 = 5,
	GESTURE_SLOT_CONSTANT = 6,
	GESTURE_SLOT_TAUNT = 7,
	GESTURE_SLOT_ABSOLUTE = 8,
	GESTURE_SLOT_COUNT = 9,
	GESTURE_SLOT_STOLEN_ABILITY_BIT = 128,
}

declare enum RenderFx_t {
	kRenderFxNone = 0,
	kRenderFxPulseSlow = 1,
	kRenderFxPulseFast = 2,
	kRenderFxPulseSlowWide = 3,
	kRenderFxPulseFastWide = 4,
	kRenderFxFadeSlow = 5,
	kRenderFxFadeFast = 6,
	kRenderFxSolidSlow = 7,
	kRenderFxSolidFast = 8,
	kRenderFxStrobeSlow = 9,
	kRenderFxStrobeFast = 10,
	kRenderFxStrobeFaster = 11,
	kRenderFxFlickerSlow = 12,
	kRenderFxFlickerFast = 13,
	kRenderFxNoDissipation = 14,
	kRenderFxFadeOut = 15,
	kRenderFxFadeIn = 16,
	kRenderFxPulseFastWider = 17,
	kRenderFxGlowShell = 18,
	kRenderFxMax = 19,
}

declare enum GameActivity_t {
	ACT_DOTA_IDLE = 1500,
	ACT_DOTA_IDLE_RARE = 1501,
	ACT_DOTA_RUN = 1502,
	ACT_DOTA_ATTACK = 1503,
	ACT_DOTA_ATTACK2 = 1504,
	ACT_DOTA_ATTACK_EVENT = 1505,
	ACT_DOTA_DIE = 1506,
	ACT_DOTA_FLINCH = 1507,
	ACT_DOTA_FLAIL = 1508,
	ACT_DOTA_DISABLED = 1509,
	ACT_DOTA_CAST_ABILITY_1 = 1510,
	ACT_DOTA_CAST_ABILITY_2 = 1511,
	ACT_DOTA_CAST_ABILITY_3 = 1512,
	ACT_DOTA_CAST_ABILITY_4 = 1513,
	ACT_DOTA_CAST_ABILITY_5 = 1514,
	ACT_DOTA_CAST_ABILITY_6 = 1515,
	ACT_DOTA_OVERRIDE_ABILITY_1 = 1516,
	ACT_DOTA_OVERRIDE_ABILITY_2 = 1517,
	ACT_DOTA_OVERRIDE_ABILITY_3 = 1518,
	ACT_DOTA_OVERRIDE_ABILITY_4 = 1519,
	ACT_DOTA_CHANNEL_ABILITY_1 = 1520,
	ACT_DOTA_CHANNEL_ABILITY_2 = 1521,
	ACT_DOTA_CHANNEL_ABILITY_3 = 1522,
	ACT_DOTA_CHANNEL_ABILITY_4 = 1523,
	ACT_DOTA_CHANNEL_ABILITY_5 = 1524,
	ACT_DOTA_CHANNEL_ABILITY_6 = 1525,
	ACT_DOTA_CHANNEL_END_ABILITY_1 = 1526,
	ACT_DOTA_CHANNEL_END_ABILITY_2 = 1527,
	ACT_DOTA_CHANNEL_END_ABILITY_3 = 1528,
	ACT_DOTA_CHANNEL_END_ABILITY_4 = 1529,
	ACT_DOTA_CHANNEL_END_ABILITY_5 = 1530,
	ACT_DOTA_CHANNEL_END_ABILITY_6 = 1531,
	ACT_DOTA_CONSTANT_LAYER = 1532,
	ACT_DOTA_CAPTURE = 1533,
	ACT_DOTA_SPAWN = 1534,
	ACT_DOTA_KILLTAUNT = 1535,
	ACT_DOTA_TAUNT = 1536,
	ACT_DOTA_THIRST = 1537,
	ACT_DOTA_CAST_DRAGONBREATH = 1538,
	ACT_DOTA_ECHO_SLAM = 1539,
	ACT_DOTA_CAST_ABILITY_1_END = 1540,
	ACT_DOTA_CAST_ABILITY_2_END = 1541,
	ACT_DOTA_CAST_ABILITY_3_END = 1542,
	ACT_DOTA_CAST_ABILITY_4_END = 1543,
	ACT_MIRANA_LEAP_END = 1544,
	ACT_WAVEFORM_START = 1545,
	ACT_WAVEFORM_END = 1546,
	ACT_DOTA_CAST_ABILITY_ROT = 1547,
	ACT_DOTA_DIE_SPECIAL = 1548,
	ACT_DOTA_RATTLETRAP_BATTERYASSAULT = 1549,
	ACT_DOTA_RATTLETRAP_POWERCOGS = 1550,
	ACT_DOTA_RATTLETRAP_HOOKSHOT_START = 1551,
	ACT_DOTA_RATTLETRAP_HOOKSHOT_LOOP = 1552,
	ACT_DOTA_RATTLETRAP_HOOKSHOT_END = 1553,
	ACT_STORM_SPIRIT_OVERLOAD_RUN_OVERRIDE = 1554,
	ACT_DOTA_TINKER_REARM1 = 1555,
	ACT_DOTA_TINKER_REARM2 = 1556,
	ACT_DOTA_TINKER_REARM3 = 1557,
	ACT_TINY_AVALANCHE = 1558,
	ACT_TINY_TOSS = 1559,
	ACT_TINY_GROWL = 1560,
	ACT_DOTA_WEAVERBUG_ATTACH = 1561,
	ACT_DOTA_CAST_WILD_AXES_END = 1562,
	ACT_DOTA_CAST_LIFE_BREAK_START = 1563,
	ACT_DOTA_CAST_LIFE_BREAK_END = 1564,
	ACT_DOTA_NIGHTSTALKER_TRANSITION = 1565,
	ACT_DOTA_LIFESTEALER_RAGE = 1566,
	ACT_DOTA_LIFESTEALER_OPEN_WOUNDS = 1567,
	ACT_DOTA_SAND_KING_BURROW_IN = 1568,
	ACT_DOTA_SAND_KING_BURROW_OUT = 1569,
	ACT_DOTA_EARTHSHAKER_TOTEM_ATTACK = 1570,
	ACT_DOTA_WHEEL_LAYER = 1571,
	ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_START = 1572,
	ACT_DOTA_ALCHEMIST_CONCOCTION = 1573,
	ACT_DOTA_JAKIRO_LIQUIDFIRE_START = 1574,
	ACT_DOTA_JAKIRO_LIQUIDFIRE_LOOP = 1575,
	ACT_DOTA_LIFESTEALER_INFEST = 1576,
	ACT_DOTA_LIFESTEALER_INFEST_END = 1577,
	ACT_DOTA_LASSO_LOOP = 1578,
	ACT_DOTA_ALCHEMIST_CONCOCTION_THROW = 1579,
	ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_END = 1580,
	ACT_DOTA_CAST_COLD_SNAP = 1581,
	ACT_DOTA_CAST_GHOST_WALK = 1582,
	ACT_DOTA_CAST_TORNADO = 1583,
	ACT_DOTA_CAST_EMP = 1584,
	ACT_DOTA_CAST_ALACRITY = 1585,
	ACT_DOTA_CAST_CHAOS_METEOR = 1586,
	ACT_DOTA_CAST_SUN_STRIKE = 1587,
	ACT_DOTA_CAST_FORGE_SPIRIT = 1588,
	ACT_DOTA_CAST_ICE_WALL = 1589,
	ACT_DOTA_CAST_DEAFENING_BLAST = 1590,
	ACT_DOTA_VICTORY = 1591,
	ACT_DOTA_DEFEAT = 1592,
	ACT_DOTA_SPIRIT_BREAKER_CHARGE_POSE = 1593,
	ACT_DOTA_SPIRIT_BREAKER_CHARGE_END = 1594,
	ACT_DOTA_TELEPORT = 1595,
	ACT_DOTA_TELEPORT_END = 1596,
	ACT_DOTA_CAST_REFRACTION = 1597,
	ACT_DOTA_CAST_ABILITY_7 = 1598,
	ACT_DOTA_CANCEL_SIREN_SONG = 1599,
	ACT_DOTA_CHANNEL_ABILITY_7 = 1600,
	ACT_DOTA_LOADOUT = 1601,
	ACT_DOTA_FORCESTAFF_END = 1602,
	ACT_DOTA_POOF_END = 1603,
	ACT_DOTA_SLARK_POUNCE = 1604,
	ACT_DOTA_MAGNUS_SKEWER_START = 1605,
	ACT_DOTA_MAGNUS_SKEWER_END = 1606,
	ACT_DOTA_MEDUSA_STONE_GAZE = 1607,
	ACT_DOTA_RELAX_START = 1608,
	ACT_DOTA_RELAX_LOOP = 1609,
	ACT_DOTA_RELAX_END = 1610,
	ACT_DOTA_CENTAUR_STAMPEDE = 1611,
	ACT_DOTA_BELLYACHE_START = 1612,
	ACT_DOTA_BELLYACHE_LOOP = 1613,
	ACT_DOTA_BELLYACHE_END = 1614,
	ACT_DOTA_ROQUELAIRE_LAND = 1615,
	ACT_DOTA_ROQUELAIRE_LAND_IDLE = 1616,
	ACT_DOTA_GREEVIL_CAST = 1617,
	ACT_DOTA_GREEVIL_OVERRIDE_ABILITY = 1618,
	ACT_DOTA_GREEVIL_HOOK_START = 1619,
	ACT_DOTA_GREEVIL_HOOK_END = 1620,
	ACT_DOTA_GREEVIL_BLINK_BONE = 1621,
	ACT_DOTA_IDLE_SLEEPING = 1622,
	ACT_DOTA_INTRO = 1623,
	ACT_DOTA_GESTURE_POINT = 1624,
	ACT_DOTA_GESTURE_ACCENT = 1625,
	ACT_DOTA_SLEEPING_END = 1626,
	ACT_DOTA_AMBUSH = 1627,
	ACT_DOTA_ITEM_LOOK = 1628,
	ACT_DOTA_STARTLE = 1629,
	ACT_DOTA_FRUSTRATION = 1630,
	ACT_DOTA_TELEPORT_REACT = 1631,
	ACT_DOTA_TELEPORT_END_REACT = 1632,
	ACT_DOTA_SHRUG = 1633,
	ACT_DOTA_RELAX_LOOP_END = 1634,
	ACT_DOTA_PRESENT_ITEM = 1635,
	ACT_DOTA_IDLE_IMPATIENT = 1636,
	ACT_DOTA_SHARPEN_WEAPON = 1637,
	ACT_DOTA_SHARPEN_WEAPON_OUT = 1638,
	ACT_DOTA_IDLE_SLEEPING_END = 1639,
	ACT_DOTA_BRIDGE_DESTROY = 1640,
	ACT_DOTA_TAUNT_SNIPER = 1641,
	ACT_DOTA_DEATH_BY_SNIPER = 1642,
	ACT_DOTA_LOOK_AROUND = 1643,
	ACT_DOTA_CAGED_CREEP_RAGE = 1644,
	ACT_DOTA_CAGED_CREEP_RAGE_OUT = 1645,
	ACT_DOTA_CAGED_CREEP_SMASH = 1646,
	ACT_DOTA_CAGED_CREEP_SMASH_OUT = 1647,
	ACT_DOTA_IDLE_IMPATIENT_SWORD_TAP = 1648,
	ACT_DOTA_INTRO_LOOP = 1649,
	ACT_DOTA_BRIDGE_THREAT = 1650,
	ACT_DOTA_DAGON = 1651,
	ACT_DOTA_CAST_ABILITY_2_ES_ROLL_START = 1652,
	ACT_DOTA_CAST_ABILITY_2_ES_ROLL = 1653,
	ACT_DOTA_CAST_ABILITY_2_ES_ROLL_END = 1654,
	ACT_DOTA_NIAN_PIN_START = 1655,
	ACT_DOTA_NIAN_PIN_LOOP = 1656,
	ACT_DOTA_NIAN_PIN_END = 1657,
	ACT_DOTA_LEAP_STUN = 1658,
	ACT_DOTA_LEAP_SWIPE = 1659,
	ACT_DOTA_NIAN_INTRO_LEAP = 1660,
	ACT_DOTA_AREA_DENY = 1661,
	ACT_DOTA_NIAN_PIN_TO_STUN = 1662,
	ACT_DOTA_RAZE_1 = 1663,
	ACT_DOTA_RAZE_2 = 1664,
	ACT_DOTA_RAZE_3 = 1665,
	ACT_DOTA_UNDYING_DECAY = 1666,
	ACT_DOTA_UNDYING_SOUL_RIP = 1667,
	ACT_DOTA_UNDYING_TOMBSTONE = 1668,
	ACT_DOTA_WHIRLING_AXES_RANGED = 1669,
	ACT_DOTA_SHALLOW_GRAVE = 1670,
	ACT_DOTA_COLD_FEET = 1671,
	ACT_DOTA_ICE_VORTEX = 1672,
	ACT_DOTA_CHILLING_TOUCH = 1673,
	ACT_DOTA_ENFEEBLE = 1674,
	ACT_DOTA_FATAL_BONDS = 1675,
	ACT_DOTA_MIDNIGHT_PULSE = 1676,
	ACT_DOTA_ANCESTRAL_SPIRIT = 1677,
	ACT_DOTA_THUNDER_STRIKE = 1678,
	ACT_DOTA_KINETIC_FIELD = 1679,
	ACT_DOTA_STATIC_STORM = 1680,
	ACT_DOTA_MINI_TAUNT = 1681,
	ACT_DOTA_ARCTIC_BURN_END = 1682,
	ACT_DOTA_LOADOUT_RARE = 1683,
	ACT_DOTA_SWIM = 1684,
	ACT_DOTA_FLEE = 1685,
	ACT_DOTA_TROT = 1686,
	ACT_DOTA_SHAKE = 1687,
	ACT_DOTA_SWIM_IDLE = 1688,
	ACT_DOTA_WAIT_IDLE = 1689,
	ACT_DOTA_GREET = 1690,
	ACT_DOTA_TELEPORT_COOP_START = 1691,
	ACT_DOTA_TELEPORT_COOP_WAIT = 1692,
	ACT_DOTA_TELEPORT_COOP_END = 1693,
	ACT_DOTA_TELEPORT_COOP_EXIT = 1694,
	ACT_DOTA_SHOPKEEPER_PET_INTERACT = 1695,
	ACT_DOTA_ITEM_PICKUP = 1696,
	ACT_DOTA_ITEM_DROP = 1697,
	ACT_DOTA_CAPTURE_PET = 1698,
	ACT_DOTA_PET_WARD_OBSERVER = 1699,
	ACT_DOTA_PET_WARD_SENTRY = 1700,
	ACT_DOTA_PET_LEVEL = 1701,
	ACT_DOTA_CAST_BURROW_END = 1702,
	ACT_DOTA_LIFESTEALER_ASSIMILATE = 1703,
	ACT_DOTA_LIFESTEALER_EJECT = 1704,
	ACT_DOTA_ATTACK_EVENT_BASH = 1705,
	ACT_DOTA_CAPTURE_RARE = 1706,
	ACT_DOTA_AW_MAGNETIC_FIELD = 1707,
	ACT_DOTA_CAST_GHOST_SHIP = 1708,
	ACT_DOTA_FXANIM = 1709,
	ACT_DOTA_VICTORY_START = 1710,
	ACT_DOTA_DEFEAT_START = 1711,
	ACT_DOTA_DP_SPIRIT_SIPHON = 1712,
	ACT_DOTA_TRICKS_END = 1713,
	ACT_DOTA_ES_STONE_CALLER = 1714,
	ACT_DOTA_MK_STRIKE = 1715,
	ACT_DOTA_VERSUS = 1716,
	ACT_DOTA_CAPTURE_CARD = 1717,
	ACT_DOTA_MK_SPRING_SOAR = 1718,
	ACT_DOTA_MK_SPRING_END = 1719,
	ACT_DOTA_MK_TREE_SOAR = 1720,
	ACT_DOTA_MK_TREE_END = 1721,
	ACT_DOTA_MK_FUR_ARMY = 1722,
	ACT_DOTA_MK_SPRING_CAST = 1723,
	ACT_DOTA_NECRO_GHOST_SHROUD = 1724,
	ACT_DOTA_OVERRIDE_ARCANA = 1725,
	ACT_DOTA_SLIDE = 1726,
	ACT_DOTA_SLIDE_LOOP = 1727,
	ACT_DOTA_GENERIC_CHANNEL_1 = 1728,
	ACT_DOTA_GS_SOUL_CHAIN = 1729,
	ACT_DOTA_GS_INK_CREATURE = 1730,
	ACT_DOTA_TRANSITION = 1731,
	ACT_DOTA_BLINK_DAGGER = 1732,
	ACT_DOTA_BLINK_DAGGER_END = 1733,
	ACT_DOTA_CUSTOM_TOWER_ATTACK = 1734,
	ACT_DOTA_CUSTOM_TOWER_IDLE = 1735,
	ACT_DOTA_CUSTOM_TOWER_DIE = 1736,
	ACT_DOTA_CAST_COLD_SNAP_ORB = 1737,
	ACT_DOTA_CAST_GHOST_WALK_ORB = 1738,
	ACT_DOTA_CAST_TORNADO_ORB = 1739,
	ACT_DOTA_CAST_EMP_ORB = 1740,
	ACT_DOTA_CAST_ALACRITY_ORB = 1741,
	ACT_DOTA_CAST_CHAOS_METEOR_ORB = 1742,
	ACT_DOTA_CAST_SUN_STRIKE_ORB = 1743,
	ACT_DOTA_CAST_FORGE_SPIRIT_ORB = 1744,
	ACT_DOTA_CAST_ICE_WALL_ORB = 1745,
	ACT_DOTA_CAST_DEAFENING_BLAST_ORB = 1746,
	ACT_DOTA_NOTICE = 1747,
	ACT_DOTA_CAST_ABILITY_2_ALLY = 1748,
	ACT_DOTA_SHUFFLE_L = 1749,
	ACT_DOTA_SHUFFLE_R = 1750,
	ACT_DOTA_OVERRIDE_LOADOUT = 1751,
	ACT_DOTA_TAUNT_SPECIAL = 1752,
}

declare enum TOGGLE_STATE {
	TS_AT_TOP = 0,
	TS_AT_BOTTOM = 1,
	TS_GOING_UP = 2,
	TS_GOING_DOWN = 3,
	DOOR_OPEN = 0,
	DOOR_CLOSED = 1,
	DOOR_OPENING = 2,
	DOOR_CLOSING = 3,
}

declare enum Attributes {
	DOTA_ATTRIBUTE_STRENGTH = 0,
	DOTA_ATTRIBUTE_AGILITY = 1,
	DOTA_ATTRIBUTE_INTELLECT = 2,
	DOTA_ATTRIBUTE_MAX = 3,
	DOTA_ATTRIBUTE_INVALID = -1,
}

declare enum SpeechPriorityType {
	SPEECH_PRIORITY_LOW = 0,
	SPEECH_PRIORITY_NORMAL = 1,
	SPEECH_PRIORITY_MANUAL = 2,
	SPEECH_PRIORITY_UNINTERRUPTABLE = 3,
}

declare enum PointWorldTextJustifyVertical_t {
	POINT_WORLD_TEXT_JUSTIFY_VERTICAL_BOTTOM = 0,
	POINT_WORLD_TEXT_JUSTIFY_VERTICAL_CENTER = 1,
	POINT_WORLD_TEXT_JUSTIFY_VERTICAL_TOP = 2,
}

declare enum PortraitScale_t {
	PORTRAIT_SCALE_INVALID = -1,
	PORTRAIT_SCALE_LOADOUT = 0,
	PORTRAIT_SCALE_ALTERNATE_LOADOUT = 1,
	PORTRAIT_SCALE_WORLD = 2,
	PORTRAIT_SCALE_SPECTATOR_LOADOUT = 3,
	PORTRAIT_SCALE_VERSUS_LOADOUT = 4,
}

declare enum DOTA_UNIT_TARGET_TEAM {
	DOTA_UNIT_TARGET_TEAM_NONE = 0,
	DOTA_UNIT_TARGET_TEAM_FRIENDLY = 1,
	DOTA_UNIT_TARGET_TEAM_ENEMY = 2,
	DOTA_UNIT_TARGET_TEAM_CUSTOM = 4,
	DOTA_UNIT_TARGET_TEAM_BOTH = 3,
}

declare enum PointTemplateOwnerSpawnGroupType_t {
	INSERT_INTO_POINT_TEMPLATE_SPAWN_GROUP = 0,
	INSERT_INTO_CURRENTLY_ACTIVE_SPAWN_GROUP = 1,
	INSERT_INTO_NEWLY_CREATED_SPAWN_GROUP = 2,
}

declare enum ObstructionRelationshipClass_t {
	DOTA_OBSTRUCTION_RELATIONSHIP_NONE = 0,
	DOTA_OBSTRUCTION_RELATIONSHIP_BUILDING = 1,
	DOTA_OBSTRUCTION_RELATIONSHIP_PLAYER_CONTROLLED = 2,
	DOTA_OBSTRUCTION_RELATIONSHIP_NPC = 3,
	DOTA_OBSTRUCTION_RELATIONSHIP_LAST = 4,
}

declare enum NavDirType {
	NORTH = 0,
	EAST = 1,
	SOUTH = 2,
	WEST = 3,
	NUM_DIRECTIONS = 4,
}

declare enum AnimVrBoneTransformSource_t {
	AnimVrBoneTransformSource_LiveStream = 0,
	AnimVrBoneTransformSource_GripLimit = 1,
}

declare enum ViewFadeMode_t {
	VIEW_FADE_CONSTANT_COLOR = 0,
	VIEW_FADE_MODULATE = 1,
	VIEW_FADE_MOD2X = 2,
}

declare enum CLICK_BEHAVIORS {
	DOTA_CLICK_BEHAVIOR_NONE = 0,
	DOTA_CLICK_BEHAVIOR_MOVE = 1,
	DOTA_CLICK_BEHAVIOR_ATTACK = 2,
	DOTA_CLICK_BEHAVIOR_CAST = 3,
	DOTA_CLICK_BEHAVIOR_DROP_ITEM = 4,
	DOTA_CLICK_BEHAVIOR_DROP_SHOP_ITEM = 5,
	DOTA_CLICK_BEHAVIOR_DRAG = 6,
	DOTA_CLICK_BEHAVIOR_LEARN_ABILITY = 7,
	DOTA_CLICK_BEHAVIOR_PATROL = 8,
	DOTA_CLICK_BEHAVIOR_VECTOR_CAST = 9,
	DOTA_CLICK_BEHAVIOR_UNUSED = 10,
	DOTA_CLICK_BEHAVIOR_RADAR = 11,
	DOTA_CLICK_BEHAVIOR_LAST = 12,
}

declare enum sound_states {
	SS_NONE = 0,
	SS_SHUTDOWN = 1,
	SS_SHUTDOWN_WATER = 2,
	SS_START_WATER = 3,
	SS_START_IDLE = 4,
	SS_IDLE = 5,
	SS_GEAR_0 = 6,
	SS_GEAR_1 = 7,
	SS_GEAR_2 = 8,
	SS_GEAR_3 = 9,
	SS_GEAR_4 = 10,
	SS_SLOWDOWN = 11,
	SS_SLOWDOWN_HIGHSPEED = 12,
	SS_GEAR_0_RESUME = 13,
	SS_GEAR_1_RESUME = 14,
	SS_GEAR_2_RESUME = 15,
	SS_GEAR_3_RESUME = 16,
	SS_GEAR_4_RESUME = 17,
	SS_TURBO = 18,
	SS_REVERSE = 19,
	SS_NUM_STATES = 20,
}

declare enum SurroundingBoundsType_t {
	USE_OBB_COLLISION_BOUNDS = 0,
	USE_BEST_COLLISION_BOUNDS = 1,
	USE_HITBOXES = 2,
	USE_SPECIFIED_BOUNDS = 3,
	USE_GAME_CODE = 4,
	USE_ROTATION_EXPANDED_BOUNDS = 5,
	USE_COLLISION_BOUNDS_NEVER_VPHYSICS = 6,
	USE_ROTATION_EXPANDED_SEQUENCE_BOUNDS = 7,
	SURROUNDING_TYPE_BIT_COUNT = 3,
}

declare enum FlexOpCode_t {
	FLEX_OP_CONST = 1,
	FLEX_OP_FETCH1 = 2,
	FLEX_OP_FETCH2 = 3,
	FLEX_OP_ADD = 4,
	FLEX_OP_SUB = 5,
	FLEX_OP_MUL = 6,
	FLEX_OP_DIV = 7,
	FLEX_OP_NEG = 8,
	FLEX_OP_EXP = 9,
	FLEX_OP_OPEN = 10,
	FLEX_OP_CLOSE = 11,
	FLEX_OP_COMMA = 12,
	FLEX_OP_MAX = 13,
	FLEX_OP_MIN = 14,
	FLEX_OP_2WAY_0 = 15,
	FLEX_OP_2WAY_1 = 16,
	FLEX_OP_NWAY = 17,
	FLEX_OP_COMBO = 18,
	FLEX_OP_DOMINATE = 19,
	FLEX_OP_DME_LOWER_EYELID = 20,
	FLEX_OP_DME_UPPER_EYELID = 21,
	FLEX_OP_SQRT = 22,
	FLEX_OP_REMAPVALCLAMPED = 23,
	FLEX_OP_SIN = 24,
	FLEX_OP_COS = 25,
	FLEX_OP_ABS = 26,
}

declare enum CHeadLookParams__HeadLookPriority_t {
	CHeadLookParams__BORING = 0,
	CHeadLookParams__INTERESTING = 1,
	CHeadLookParams__IMPORTANT = 2,
	CHeadLookParams__CRITICAL = 3,
	CHeadLookParams__MANDATORY = 4,
}

declare enum RenderMultisampleType_t {
	RENDER_MULTISAMPLE_INVALID = -1,
	RENDER_MULTISAMPLE_NONE = 0,
	RENDER_MULTISAMPLE_2X = 1,
	RENDER_MULTISAMPLE_4X = 2,
	RENDER_MULTISAMPLE_6X = 3,
	RENDER_MULTISAMPLE_8X = 4,
	RENDER_MULTISAMPLE_16X = 5,
	RENDER_MULTISAMPLE_TYPE_COUNT = 6,
}

declare enum ParticleLightTypeChoiceList_t {
	PARTICLE_LIGHT_TYPE_POINT = 0,
	PARTICLE_LIGHT_TYPE_SPOT = 1,
	PARTICLE_LIGHT_TYPE_FX = 2,
}

declare enum IKSolverType {
	IKSOLVER_Perlin = 0,
	IKSOLVER_TwoBone = 1,
	IKSOLVER_Fabrik = 2,
	IKSOLVER_DogLeg3Bone = 3,
	IKSOLVER_CCD = 4,
	IKSOLVER_COUNT = 5,
}

declare enum WorldTextPanelOrientation_t {
	WORLDTEXT_ORIENTATION_DEFAULT = 0,
	WORLDTEXT_ORIENTATION_FACEUSER = 1,
	WORLDTEXT_ORIENTATION_FACEUSER_UPRIGHT = 2,
}

declare enum SolveIKChainAnimNodeDebugSetting {
	SOLVEIKCHAINANIMNODEDEBUGSETTING_None = 0,
	SOLVEIKCHAINANIMNODEDEBUGSETTING_X_Axis_Circle = 1,
	SOLVEIKCHAINANIMNODEDEBUGSETTING_Y_Axis_Circle = 2,
	SOLVEIKCHAINANIMNODEDEBUGSETTING_Z_Axis_Circle = 3,
	SOLVEIKCHAINANIMNODEDEBUGSETTING_Forward = 4,
	SOLVEIKCHAINANIMNODEDEBUGSETTING_Up = 5,
	SOLVEIKCHAINANIMNODEDEBUGSETTING_Left = 6,
}

declare enum DotaCustomUIType_t {
	DOTA_CUSTOM_UI_TYPE_HUD = 0,
	DOTA_CUSTOM_UI_TYPE_HERO_SELECTION = 1,
	DOTA_CUSTOM_UI_TYPE_GAME_INFO = 2,
	DOTA_CUSTOM_UI_TYPE_GAME_SETUP = 3,
	DOTA_CUSTOM_UI_TYPE_FLYOUT_SCOREBOARD = 4,
	DOTA_CUSTOM_UI_TYPE_HUD_TOP_BAR = 5,
	DOTA_CUSTOM_UI_TYPE_END_SCREEN = 6,
	DOTA_CUSTOM_UI_TYPE_COUNT = 7,
	DOTA_CUSTOM_UI_TYPE_INVALID = -1,
}

declare enum TextureSpecificationFlags_t {
	TSPEC_FLAGS = 0,
	TSPEC_RENDER_TARGET = 1,
	TSPEC_VERTEX_TEXTURE = 2,
	TSPEC_UNFILTERABLE_OK = 4,
	TSPEC_RENDER_TARGET_SAMPLEABLE = 8,
	TSPEC_SUGGEST_CLAMPS = 16,
	TSPEC_SUGGEST_CLAMPT = 32,
	TSPEC_SUGGEST_CLAMPU = 64,
	TSPEC_NO_LOD = 128,
	TSPEC_CUBE_TEXTURE = 256,
	TSPEC_VOLUME_TEXTURE = 512,
	TSPEC_TEXTURE_ARRAY = 1024,
	TSPEC_TEXTURE_GEN_MIP_MAPS = 2048,
	TSPEC_LINE_TEXTURE_360 = 4096,
	TSPEC_LINEAR_ADDRESSING_360 = 8192,
	TSPEC_USE_TYPED_IMAGEFORMAT = 16384,
	TSPEC_SHARED_RESOURCE = 32768,
	TSPEC_UAV = 65536,
	TSPEC_INPUT_ATTACHMENT = 131072,
	TSPEC_CUBE_CAN_SAMPLE_AS_ARRAY = 262144,
	TSPEC_LINEAR_COLOR_SPACE = 524288,
}

declare enum EShareAbility {
	ITEM_FULLY_SHAREABLE = 0,
	ITEM_PARTIALLY_SHAREABLE = 1,
	ITEM_NOT_SHAREABLE = 2,
}

declare enum vote_create_failed_t {
	VOTE_FAILED_GENERIC = 0,
	VOTE_FAILED_TRANSITIONING_PLAYERS = 1,
	VOTE_FAILED_RATE_EXCEEDED = 2,
	VOTE_FAILED_YES_MUST_EXCEED_NO = 3,
	VOTE_FAILED_QUORUM_FAILURE = 4,
	VOTE_FAILED_ISSUE_DISABLED = 5,
	VOTE_FAILED_MAP_NOT_FOUND = 6,
	VOTE_FAILED_MAP_NAME_REQUIRED = 7,
	VOTE_FAILED_FAILED_RECENTLY = 8,
	VOTE_FAILED_TEAM_CANT_CALL = 9,
	VOTE_FAILED_WAITINGFORPLAYERS = 10,
	VOTE_FAILED_PLAYERNOTFOUND = 11,
	VOTE_FAILED_CANNOT_KICK_ADMIN = 12,
	VOTE_FAILED_SCRAMBLE_IN_PROGRESS = 13,
	VOTE_FAILED_SPECTATOR = 14,
	VOTE_FAILED_MAX = 15,
}

declare enum PFuncVisualizationType_t {
	PFUNC_VISUALIZATION_SPHERE_WIREFRAME = 0,
	PFUNC_VISUALIZATION_SPHERE_SOLID = 1,
	PFUNC_VISUALIZATION_BOX = 2,
	PFUNC_VISUALIZATION_RING = 3,
	PFUNC_VISUALIZATION_PLANE = 4,
	PFUNC_VISUALIZATION_LINE = 5,
	PFUNC_VISUALIZATION_CYLINDER = 6,
}

declare enum PetLevelup_Rule_t {
	PETLEVELFROM_NOTHING = 0,
	PETLEVELFROM_KILLEATER = 1,
	PETLEVELFROM_COMPENDIUM_LEVEL = 2,
	NUM_PETLEVELUPRULES = 3,
}

declare enum VPhysXJoint_t__Flags_t {
	VPhysXJoint_t__JOINT_FLAGS_NONE = 0,
	VPhysXJoint_t__JOINT_FLAGS_BODY1_FIXED = 1,
}

declare enum EDOTA_ModifyGold_Reason {
	DOTA_ModifyGold_Unspecified = 0,
	DOTA_ModifyGold_Death = 1,
	DOTA_ModifyGold_Buyback = 2,
	DOTA_ModifyGold_PurchaseConsumable = 3,
	DOTA_ModifyGold_PurchaseItem = 4,
	DOTA_ModifyGold_AbandonedRedistribute = 5,
	DOTA_ModifyGold_SellItem = 6,
	DOTA_ModifyGold_AbilityCost = 7,
	DOTA_ModifyGold_CheatCommand = 8,
	DOTA_ModifyGold_SelectionPenalty = 9,
	DOTA_ModifyGold_GameTick = 10,
	DOTA_ModifyGold_Building = 11,
	DOTA_ModifyGold_HeroKill = 12,
	DOTA_ModifyGold_CreepKill = 13,
	DOTA_ModifyGold_NeutralKill = 14,
	DOTA_ModifyGold_RoshanKill = 15,
	DOTA_ModifyGold_CourierKill = 16,
	DOTA_ModifyGold_BountyRune = 17,
	DOTA_ModifyGold_SharedGold = 18,
	DOTA_ModifyGold_AbilityGold = 19,
	DOTA_ModifyGold_WardKill = 20,
}

declare enum DOTASlotType_t {
	DOTA_LOADOUT_TYPE_INVALID = -1,
	DOTA_LOADOUT_TYPE_WEAPON = 0,
	DOTA_LOADOUT_TYPE_OFFHAND_WEAPON = 1,
	DOTA_LOADOUT_TYPE_WEAPON2 = 2,
	DOTA_LOADOUT_TYPE_OFFHAND_WEAPON2 = 3,
	DOTA_LOADOUT_TYPE_HEAD = 4,
	DOTA_LOADOUT_TYPE_SHOULDER = 5,
	DOTA_LOADOUT_TYPE_ARMS = 6,
	DOTA_LOADOUT_TYPE_ARMOR = 7,
	DOTA_LOADOUT_TYPE_BELT = 8,
	DOTA_LOADOUT_TYPE_NECK = 9,
	DOTA_LOADOUT_TYPE_BACK = 10,
	DOTA_LOADOUT_TYPE_LEGS = 11,
	DOTA_LOADOUT_TYPE_GLOVES = 12,
	DOTA_LOADOUT_TYPE_TAIL = 13,
	DOTA_LOADOUT_TYPE_MISC = 14,
	DOTA_LOADOUT_TYPE_BODY_HEAD = 15,
	DOTA_LOADOUT_TYPE_MOUNT = 16,
	DOTA_LOADOUT_TYPE_SUMMON = 17,
	DOTA_LOADOUT_TYPE_SHAPESHIFT = 18,
	DOTA_LOADOUT_TYPE_TAUNT = 19,
	DOTA_LOADOUT_TYPE_AMBIENT_EFFECTS = 20,
	DOTA_LOADOUT_TYPE_ABILITY_ATTACK = 21,
	DOTA_LOADOUT_TYPE_ABILITY1 = 22,
	DOTA_LOADOUT_TYPE_ABILITY2 = 23,
	DOTA_LOADOUT_TYPE_ABILITY3 = 24,
	DOTA_LOADOUT_TYPE_ABILITY4 = 25,
	DOTA_LOADOUT_TYPE_ABILITY_ULTIMATE = 26,
	DOTA_LOADOUT_TYPE_VOICE = 27,
	DOTA_LOADOUT_TYPE_WEAPON_PERSONA_1 = 28,
	DOTA_LOADOUT_TYPE_OFFHAND_WEAPON_PERSONA_1 = 29,
	DOTA_LOADOUT_TYPE_WEAPON2_PERSONA_1 = 30,
	DOTA_LOADOUT_TYPE_OFFHAND_WEAPON2_PERSONA_1 = 31,
	DOTA_LOADOUT_TYPE_HEAD_PERSONA_1 = 32,
	DOTA_LOADOUT_TYPE_SHOULDER_PERSONA_1 = 33,
	DOTA_LOADOUT_TYPE_ARMS_PERSONA_1 = 34,
	DOTA_LOADOUT_TYPE_ARMOR_PERSONA_1 = 35,
	DOTA_LOADOUT_TYPE_BELT_PERSONA_1 = 36,
	DOTA_LOADOUT_TYPE_NECK_PERSONA_1 = 37,
	DOTA_LOADOUT_TYPE_BACK_PERSONA_1 = 38,
	DOTA_LOADOUT_TYPE_LEGS_PERSONA_1 = 39,
	DOTA_LOADOUT_TYPE_GLOVES_PERSONA_1 = 40,
	DOTA_LOADOUT_TYPE_TAIL_PERSONA_1 = 41,
	DOTA_LOADOUT_TYPE_MISC_PERSONA_1 = 42,
	DOTA_LOADOUT_TYPE_BODY_HEAD_PERSONA_1 = 43,
	DOTA_LOADOUT_TYPE_MOUNT_PERSONA_1 = 44,
	DOTA_LOADOUT_TYPE_SUMMON_PERSONA_1 = 45,
	DOTA_LOADOUT_TYPE_SHAPESHIFT_PERSONA_1 = 46,
	DOTA_LOADOUT_TYPE_TAUNT_PERSONA_1 = 47,
	DOTA_LOADOUT_TYPE_AMBIENT_EFFECTS_PERSONA_1 = 48,
	DOTA_LOADOUT_TYPE_ABILITY_ATTACK_PERSONA_1 = 49,
	DOTA_LOADOUT_TYPE_ABILITY1_PERSONA_1 = 50,
	DOTA_LOADOUT_TYPE_ABILITY2_PERSONA_1 = 51,
	DOTA_LOADOUT_TYPE_ABILITY3_PERSONA_1 = 52,
	DOTA_LOADOUT_TYPE_ABILITY4_PERSONA_1 = 53,
	DOTA_LOADOUT_TYPE_ABILITY_ULTIMATE_PERSONA_1 = 54,
	DOTA_LOADOUT_TYPE_VOICE_PERSONA_1 = 55,
	DOTA_LOADOUT_PERSONA_1_START = 28,
	DOTA_LOADOUT_PERSONA_1_END = 55,
	DOTA_LOADOUT_TYPE_PERSONA_SELECTOR = 56,
	DOTA_LOADOUT_TYPE_COURIER = 57,
	DOTA_LOADOUT_TYPE_ANNOUNCER = 58,
	DOTA_LOADOUT_TYPE_MEGA_KILLS = 59,
	DOTA_LOADOUT_TYPE_MUSIC = 60,
	DOTA_LOADOUT_TYPE_WARD = 61,
	DOTA_LOADOUT_TYPE_HUD_SKIN = 62,
	DOTA_LOADOUT_TYPE_LOADING_SCREEN = 63,
	DOTA_LOADOUT_TYPE_WEATHER = 64,
	DOTA_LOADOUT_TYPE_HEROIC_STATUE = 65,
	DOTA_LOADOUT_TYPE_MULTIKILL_BANNER = 66,
	DOTA_LOADOUT_TYPE_CURSOR_PACK = 67,
	DOTA_LOADOUT_TYPE_TELEPORT_EFFECT = 68,
	DOTA_LOADOUT_TYPE_BLINK_EFFECT = 69,
	DOTA_LOADOUT_TYPE_EMBLEM = 70,
	DOTA_LOADOUT_TYPE_TERRAIN = 71,
	DOTA_LOADOUT_TYPE_RADIANT_CREEPS = 72,
	DOTA_LOADOUT_TYPE_DIRE_CREEPS = 73,
	DOTA_LOADOUT_TYPE_RADIANT_TOWER = 74,
	DOTA_LOADOUT_TYPE_DIRE_TOWER = 75,
	DOTA_LOADOUT_TYPE_VERSUS_SCREEN = 76,
	DOTA_LOADOUT_TYPE_STREAK_EFFECT = 77,
	DOTA_PLAYER_LOADOUT_START = 57,
	DOTA_PLAYER_LOADOUT_END = 77,
	DOTA_LOADOUT_TYPE_NONE = 78,
	DOTA_LOADOUT_TYPE_COUNT = 79,
}

declare enum GroundIKTiltSource_t {
	TILT_None = 0,
	TILT_IK = 1,
	TILT_MovementManagerSlope = 2,
}

declare enum FinishedConditionOption {
	FinishedConditionOption_OnFinished = 0,
	FinishedConditionOption_OnAlmostFinished = 1,
}

declare enum PlayerUltimateStateOrTime_t {
	PLAYER_ULTIMATE_STATE_READY = 0,
	PLAYER_ULTIMATE_STATE_NO_MANA = -1,
	PLAYER_ULTIMATE_STATE_NOT_LEVELED = -2,
	PLAYER_ULTIMATE_STATE_HIDDEN = -3,
}

declare enum FowBlockerShape_t {
	FOW_BLOCKER_SHAPE_RECTANGLE = 0,
	FOW_BLOCKER_SHAPE_RECTANGLE_OUTLINE = 1,
}

declare enum DOTA_HOLDOUT_WALL_TYPE {
	DOTA_HOLDOUT_WALL_NONE = 0,
	DOTA_HOLDOUT_WALL_PHYSICAL = 1,
	DOTA_HOLDOUT_WALL_FIRE = 2,
	DOTA_HOLDOUT_WALL_ICE = 3,
	DOTA_HOLDOUT_WALL_COUNT = 4,
}

declare enum Materials {
	matGlass = 0,
	matWood = 1,
	matMetal = 2,
	matFlesh = 3,
	matCinderBlock = 4,
	matCeilingTile = 5,
	matComputer = 6,
	matUnbreakableGlass = 7,
	matRocks = 8,
	matWeb = 9,
	matNone = 10,
	matLastMaterial = 11,
}

declare enum LayoutPositionType_e {
	LAYOUTPOSITIONTYPE_VIEWPORT_RELATIVE = 0,
	LAYOUTPOSITIONTYPE_FRACTIONAL = 1,
	LAYOUTPOSITIONTYPE_NONE = 2,
}

declare enum HeroPickType {
	HERO_PICK = 0,
	HERO_BAN = 1,
}

declare enum JointAxis_t {
	JOINT_AXIS_X = 0,
	JOINT_AXIS_Y = 1,
	JOINT_AXIS_Z = 2,
	JOINT_AXIS_COUNT = 3,
}

declare enum ParticleFloatInputMode_t {
	PF_INPUT_MODE_INVALID = -1,
	PF_INPUT_MODE_CLAMPED = 0,
	PF_INPUT_MODE_LOOPED = 1,
	PF_INPUT_MODE_COUNT = 2,
}

declare enum AimMatrixBlendMode {
	AimMatrixBlendMode_Additive = 0,
	AimMatrixBlendMode_BoneMask = 1,
}

declare enum modifierstate {
	MODIFIER_STATE_ROOTED = 0,
	MODIFIER_STATE_DISARMED = 1,
	MODIFIER_STATE_ATTACK_IMMUNE = 2,
	MODIFIER_STATE_SILENCED = 3,
	MODIFIER_STATE_MUTED = 4,
	MODIFIER_STATE_STUNNED = 5,
	MODIFIER_STATE_HEXED = 6,
	MODIFIER_STATE_INVISIBLE = 7,
	MODIFIER_STATE_INVULNERABLE = 8,
	MODIFIER_STATE_MAGIC_IMMUNE = 9,
	MODIFIER_STATE_PROVIDES_VISION = 10,
	MODIFIER_STATE_NIGHTMARED = 11,
	MODIFIER_STATE_BLOCK_DISABLED = 12,
	MODIFIER_STATE_EVADE_DISABLED = 13,
	MODIFIER_STATE_UNSELECTABLE = 14,
	MODIFIER_STATE_CANNOT_TARGET_ENEMIES = 15,
	MODIFIER_STATE_CANNOT_MISS = 16,
	MODIFIER_STATE_SPECIALLY_DENIABLE = 17,
	MODIFIER_STATE_FROZEN = 18,
	MODIFIER_STATE_COMMAND_RESTRICTED = 19,
	MODIFIER_STATE_NOT_ON_MINIMAP = 20,
	MODIFIER_STATE_LOW_ATTACK_PRIORITY = 21,
	MODIFIER_STATE_NO_HEALTH_BAR = 22,
	MODIFIER_STATE_FLYING = 23,
	MODIFIER_STATE_NO_UNIT_COLLISION = 24,
	MODIFIER_STATE_NO_TEAM_MOVE_TO = 25,
	MODIFIER_STATE_NO_TEAM_SELECT = 26,
	MODIFIER_STATE_PASSIVES_DISABLED = 27,
	MODIFIER_STATE_DOMINATED = 28,
	MODIFIER_STATE_BLIND = 29,
	MODIFIER_STATE_OUT_OF_GAME = 30,
	MODIFIER_STATE_FAKE_ALLY = 31,
	MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY = 32,
	MODIFIER_STATE_TRUESIGHT_IMMUNE = 33,
	MODIFIER_STATE_UNTARGETABLE = 34,
	MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS = 35,
	MODIFIER_STATE_ALLOW_PATHING_TROUGH_TREES = 36,
	MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES = 37,
	MODIFIER_STATE_UNSLOWABLE = 38,
	MODIFIER_STATE_TETHERED = 39,
	MODIFIER_STATE_IGNORING_STOP_ORDERS = 40,
	MODIFIER_STATE_FEARED = 41,
	MODIFIER_STATE_TAUNTED = 42,
	MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED = 43,
	MODIFIER_STATE_LAST = 44,
}

declare enum BlurFilterType_t {
	BLURFILTER_GAUSSIAN = 0,
	BLURFILTER_BOX = 1,
}

declare enum MeshDrawPrimitiveFlags_t {
	MESH_DRAW_FLAGS_NONE = 0,
	MESH_DRAW_FLAGS_USE_SHADOW_FAST_PATH = 1,
	MESH_DRAW_FLAGS_USE_COMPRESSED_NORMAL_TANGENT = 2,
	MESH_DRAW_FLAGS_IS_OCCLUDER = 4,
	MESH_DRAW_INPUT_LAYOUT_IS_NOT_MATCHED_TO_MATERIAL = 8,
	MESH_DRAW_FLAGS_USE_COMPRESSED_PER_VERTEX_LIGHTING = 16,
	MESH_DRAW_FLAGS_USE_UNCOMPRESSED_PER_VERTEX_LIGHTING = 32,
	MESH_DRAW_FLAGS_CAN_BATCH_WITH_DYNAMIC_SHADER_CONSTANTS = 64,
	MESH_DRAW_FLAGS_DRAW_LAST = 128,
	MESH_DRAW_FLAGS_HAS_LIGHTING_BASIS = 256,
}

declare enum AnimVRHand_t {
	AnimVRHand_Left = 0,
	AnimVRHand_Right = 1,
}

declare enum ParticleFloatType_t {
	PF_TYPE_INVALID = -1,
	PF_TYPE_LITERAL = 0,
	PF_TYPE_RANDOM_UNIFORM = 1,
	PF_TYPE_RANDOM_BIASED = 2,
	PF_TYPE_COLLECTION_AGE = 3,
	PF_TYPE_ENDCAP_AGE = 4,
	PF_TYPE_CONTROL_POINT_COMPONENT = 5,
	PF_TYPE_CONTROL_POINT_CHANGE_AGE = 6,
	PF_TYPE_PARTICLE_DETAIL_LEVEL = 7,
	PF_TYPE_PARTICLE_NOISE = 8,
	PF_TYPE_PARTICLE_AGE = 9,
	PF_TYPE_PARTICLE_AGE_NORMALIZED = 10,
	PF_TYPE_PARTICLE_FLOAT = 11,
	PF_TYPE_PARTICLE_VECTOR_COMPONENT = 12,
	PF_TYPE_PARTICLE_SPEED = 13,
	PF_TYPE_PARTICLE_NUMBER = 14,
	PF_TYPE_PARTICLE_NUMBER_NORMALIZED = 15,
	PF_TYPE_COUNT = 16,
}

declare enum EconEntityParticleDisableMode_t {
	ECON_ENTITY_PARTICLES_ENABLED = 0,
	ECON_ENTITY_PARTICLES_DISABLED = 1,
	ECON_ENTITY_PARTICLES_DISABLED_BUT_PLAY_ENDCAPS_TO_STOP = 2,
}

declare enum ShopItemViewMode_t {
	SHOP_VIEW_MODE_LIST = 0,
	SHOP_VIEW_MODE_GRID = 1,
}

declare enum SelectorTagBehavior_t {
	SelectorTagBehavior_OnWhileCurrent = 0,
	SelectorTagBehavior_OffWhenFinished = 1,
	SelectorTagBehavior_OffBeforeFinished = 2,
}

declare enum ShardSolid_t {
	SHARD_SOLID = 0,
	SHARD_DEBRIS = 1,
}

declare enum IBody__ArousalType {
	IBody__NEUTRAL = 0,
	IBody__ALERT = 1,
	IBody__INTENSE = 2,
}

declare enum ParticleFloatMapType_t {
	PF_MAP_TYPE_INVALID = -1,
	PF_MAP_TYPE_DIRECT = 0,
	PF_MAP_TYPE_MULT = 1,
	PF_MAP_TYPE_REMAP = 2,
	PF_MAP_TYPE_REMAP_BIASED = 3,
	PF_MAP_TYPE_CURVE = 4,
	PF_MAP_TYPE_COUNT = 5,
}

declare enum BeamType_t {
	BEAM_INVALID = 0,
	BEAM_POINTS = 1,
	BEAM_ENTPOINT = 2,
	BEAM_ENTS = 3,
	BEAM_HOSE = 4,
	BEAM_SPLINE = 5,
	BEAM_LASER = 6,
}

declare enum subquest_player_stat_types_t {
	SUBQUEST_PLAYER_STAT_GOLD = 0,
	SUBQUEST_PLAYER_STAT_LEVEL = 1,
	SUBQUEST_PLAYER_STAT_LAST_HITS = 2,
	SUBQUEST_PLAYER_STAT_DENIES = 3,
	SUBQUEST_NUM_PLAYER_STATS = 4,
}

declare enum SequenceCombineMode_t {
	SEQUENCE_COMBINE_MODE_USE_SEQUENCE_0 = 0,
	SEQUENCE_COMBINE_MODE_USE_SEQUENCE_1 = 1,
	SEQUENCE_COMBINE_MODE_AVERAGE = 2,
	SEQUENCE_COMBINE_MODE_ADDITIVE = 3,
	SEQUENCE_COMBINE_MODE_ALPHA_FROM0_RGB_FROM_1 = 4,
	SEQUENCE_COMBINE_MODE_ALPHA_FROM1_RGB_FROM_0 = 5,
	SEQUENCE_COMBINE_MODE_WEIGHTED_BLEND = 6,
	SEQUENCE_COMBINE_MODE_ALPHA_BLEND_1_OVER_0 = 7,
	SEQUENCE_COMBINE_MODE_REPLICATEALPHA0 = 8,
	SEQUENCE_COMBINE_MODE_REPLICATEALPHA1 = 9,
	SEQUENCE_COMBINE_MODE_ALPHA_BLEND_0_OVER_1 = 10,
	SEQUENCE_COMBINE_MODE_REPLICATE_COLOR_0 = 11,
	SEQUENCE_COMBINE_MODE_REPLICATE_COLOR_1 = 12,
}

declare enum LightType_t {
	MATERIAL_LIGHT_DISABLE = 0,
	MATERIAL_LIGHT_POINT = 1,
	MATERIAL_LIGHT_DIRECTIONAL = 2,
	MATERIAL_LIGHT_SPOT = 3,
	MATERIAL_LIGHT_ORTHO = 4,
	MATERIAL_LIGHT_ENVIRONMENT_PROBE = 5,
}

declare enum ValueRemapperOutputType_t {
	OutputType_AnimationCycle = 0,
	OutputType_RotationX = 1,
	OutputType_RotationY = 2,
	OutputType_RotationZ = 3,
}

declare enum WorldTextAttachmentType_t {
	ATTACHED_NONE = 0,
	ATTACHED_PRIMARY_HAND = 1,
	ATTACHED_OFF_HAND = 2,
	ATTACHED_ENTITY = 3,
	ATTACHED_HMD = 4,
	ATTACHED_ENTITY_LARGE = 5,
	ATTACHED_HAND_SPECIFIED_IN_EVENT = 6,
}

declare enum DOTA_ABILITY_BEHAVIOR {
	DOTA_ABILITY_BEHAVIOR_NONE = 0,
	DOTA_ABILITY_BEHAVIOR_HIDDEN = 1,
	DOTA_ABILITY_BEHAVIOR_PASSIVE = 2,
	DOTA_ABILITY_BEHAVIOR_NO_TARGET = 4,
	DOTA_ABILITY_BEHAVIOR_UNIT_TARGET = 8,
	DOTA_ABILITY_BEHAVIOR_POINT = 16,
	DOTA_ABILITY_BEHAVIOR_AOE = 32,
	DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE = 64,
	DOTA_ABILITY_BEHAVIOR_CHANNELLED = 128,
	DOTA_ABILITY_BEHAVIOR_ITEM = 256,
	DOTA_ABILITY_BEHAVIOR_TOGGLE = 512,
	DOTA_ABILITY_BEHAVIOR_DIRECTIONAL = 1024,
	DOTA_ABILITY_BEHAVIOR_IMMEDIATE = 2048,
	DOTA_ABILITY_BEHAVIOR_AUTOCAST = 4096,
	DOTA_ABILITY_BEHAVIOR_OPTIONAL_UNIT_TARGET = 8192,
	DOTA_ABILITY_BEHAVIOR_OPTIONAL_POINT = 16384,
	DOTA_ABILITY_BEHAVIOR_OPTIONAL_NO_TARGET = 32768,
	DOTA_ABILITY_BEHAVIOR_AURA = 65536,
	DOTA_ABILITY_BEHAVIOR_ATTACK = 131072,
	DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT = 262144,
	DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES = 524288,
	DOTA_ABILITY_BEHAVIOR_UNRESTRICTED = 1048576,
	DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE = 2097152,
	DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL = 4194304,
	DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_MOVEMENT = 8388608,
	DOTA_ABILITY_BEHAVIOR_DONT_ALERT_TARGET = 16777216,
	DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK = 33554432,
	DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN = 67108864,
	DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING = 134217728,
	DOTA_ABILITY_BEHAVIOR_RUNE_TARGET = 268435456,
	DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_CHANNEL = 536870912,
	DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING = 1073741824,
	DOTA_ABILITY_BEHAVIOR_LAST_RESORT_POINT = 2147483648,
	DOTA_ABILITY_BEHAVIOR_CAN_SELF_CAST = 4294967296,
	DOTA_ABILITY_BEHAVIOR_SHOW_IN_GUIDES = 8589934592,
	DOTA_ABILITY_BEHAVIOR_UNLOCKED_BY_EFFECT_INDEX = 17179869184,
	DOTA_ABILITY_BEHAVIOR_SUPPRESS_ASSOCIATED_CONSUMABLE = 34359738368,
	DOTA_ABILITY_BEHAVIOR_FREE_DRAW_TARGETING = 68719476736,
}

declare enum DAMAGE_TYPES {
	DAMAGE_TYPE_NONE = 0,
	DAMAGE_TYPE_PHYSICAL = 1,
	DAMAGE_TYPE_MAGICAL = 2,
	DAMAGE_TYPE_PURE = 4,
	DAMAGE_TYPE_HP_REMOVAL = 8,
	DAMAGE_TYPE_ALL = 7,
}

declare enum SosGroupType_t {
	SOS_GROUPTYPE_DYNAMIC = 0,
	SOS_GROUPTYPE_STATIC = 1,
}

declare enum PFNoiseTurbulence_t {
	PF_NOISE_TURB_NONE = 0,
	PF_NOISE_TURB_HIGHLIGHT = 1,
	PF_NOISE_TURB_FEEDBACK = 2,
	PF_NOISE_TURB_LOOPY = 3,
	PF_NOISE_TURB_CONTRAST = 4,
	PF_NOISE_TURB_ALTERNATE = 5,
}

declare enum MotionSamplingMethod {
	Uniform = 0,
	AtFootCycleStart = 1,
}

declare enum MissingParentInheritBehavior_t {
	MISSING_PARENT_DO_NOTHING = -1,
	MISSING_PARENT_KILL = 0,
	MISSING_PARENT_FIND_NEW = 1,
}

declare enum AnimationType_t {
	ANIMATION_TYPE_FIXED_RATE = 0,
	ANIMATION_TYPE_FIT_LIFETIME = 1,
	ANIMATION_TYPE_MANUAL_FRAMES = 2,
}

declare enum AnimParamButton_t {
	ANIMPARAM_BUTTON_NONE = 0,
	ANIMPARAM_BUTTON_DPAD_UP = 1,
	ANIMPARAM_BUTTON_DPAD_RIGHT = 2,
	ANIMPARAM_BUTTON_DPAD_DOWN = 3,
	ANIMPARAM_BUTTON_DPAD_LEFT = 4,
	ANIMPARAM_BUTTON_A = 5,
	ANIMPARAM_BUTTON_B = 6,
	ANIMPARAM_BUTTON_X = 7,
	ANIMPARAM_BUTTON_Y = 8,
	ANIMPARAM_BUTTON_LEFT_SHOULDER = 9,
	ANIMPARAM_BUTTON_RIGHT_SHOULDER = 10,
	ANIMPARAM_BUTTON_LTRIGGER = 11,
	ANIMPARAM_BUTTON_RTRIGGER = 12,
}

declare enum BloomBlendMode_t {
	BLOOM_BLEND_ADD = 0,
	BLOOM_BLEND_SCREEN = 1,
	BLOOM_BLEND_BLUR = 2,
}

declare enum PrecipitationType_t {
	PRECIPITATION_TYPE_PARTICLERAIN = 4,
	PRECIPITATION_TYPE_PARTICLEASH = 5,
	PRECIPITATION_TYPE_PARTICLERAINSTORM = 6,
	PRECIPITATION_TYPE_PARTICLEBUGS = 7,
	PRECIPITATION_TYPE_PARTICLESMOKE = 8,
	PRECIPITATION_TYPE_PARTICLESNOW = 9,
	PRECIPITATION_TYPE_PARTICLEXENSPORES = 10,
	PRECIPITATION_TYPE_DUSTMOTES = 11,
	PRECIPITATION_TYPE_PARTICLEFLYINGEMBER = 12,
	PRECIPITATION_TYPE_PARTICLEGROUNDFOG = 13,
	NUM_PRECIPITATION_TYPES = 14,
}

declare enum DOTAModifierAttribute_t {
	MODIFIER_ATTRIBUTE_NONE = 0,
	MODIFIER_ATTRIBUTE_PERMANENT = 1,
	MODIFIER_ATTRIBUTE_MULTIPLE = 2,
	MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE = 4,
	MODIFIER_ATTRIBUTE_AURA_PRIORITY = 8,
}

declare enum PerformanceMode_t {
	PM_NORMAL = 0,
	PM_NO_GIBS = 1,
	PM_FULL_GIBS = 2,
	PM_REDUCED_GIBS = 3,
}

declare enum ParticleSetMethod_t {
	PARTICLE_SET_REPLACE_VALUE = 0,
	PARTICLE_SET_SCALE_INITIAL_VALUE = 1,
	PARTICLE_SET_ADD_TO_INITIAL_VALUE = 2,
	PARTICLE_SET_SCALE_CURRENT_VALUE = 3,
	PARTICLE_SET_ADD_TO_CURRENT_VALUE = 4,
}

declare enum ChoiceMethod {
	WeightedRandom = 0,
	WeightedRandomNoRepeat = 1,
	Iterate = 2,
	IterateRandom = 3,
}

declare enum VectorExpressionType_t {
	VECTOR_EXPRESSION_UNINITIALIZED = -1,
	VECTOR_EXPRESSION_ADD = 0,
	VECTOR_EXPRESSION_SUBTRACT = 1,
	VECTOR_EXPRESSION_MUL = 2,
	VECTOR_EXPRESSION_DIVIDE = 3,
	VECTOR_EXPRESSION_INPUT_1 = 4,
	VECTOR_EXPRESSION_MIN = 5,
	VECTOR_EXPRESSION_MAX = 6,
	VECTOR_EXPRESSION_NORMALIZE_INPUT_1 = 7,
}

declare enum PathStatusOptions {
	PathStatus_HasPath = 0,
	PathStatus_WaypointIsGoal = 1,
	PathStatus_GoalHasChanged = 2,
}

declare enum CGroundIKSolveAnimNode__DebugSkeletonBoneType_t {
	CGroundIKSolveAnimNode__FLAG_NO_BONE_FLAGS = 0,
	CGroundIKSolveAnimNode__FLAG_BONEFLEXDRIVER = 4,
	CGroundIKSolveAnimNode__FLAG_CLOTH = 8,
	CGroundIKSolveAnimNode__FLAG_PHYSICS = 16,
	CGroundIKSolveAnimNode__FLAG_ATTACHMENT = 32,
	CGroundIKSolveAnimNode__FLAG_ANIMATION = 64,
	CGroundIKSolveAnimNode__FLAG_MESH = 128,
	CGroundIKSolveAnimNode__FLAG_HITBOX = 256,
	CGroundIKSolveAnimNode__FLAG_RETARGET_SRC = 512,
	CGroundIKSolveAnimNode__FLAG_BONE_USED_BY_VERTEX_LOD0 = 1024,
	CGroundIKSolveAnimNode__FLAG_BONE_USED_BY_VERTEX_LOD1 = 2048,
	CGroundIKSolveAnimNode__FLAG_BONE_USED_BY_VERTEX_LOD2 = 4096,
	CGroundIKSolveAnimNode__FLAG_BONE_USED_BY_VERTEX_LOD3 = 8192,
	CGroundIKSolveAnimNode__FLAG_BONE_USED_BY_VERTEX_LOD4 = 16384,
	CGroundIKSolveAnimNode__FLAG_BONE_USED_BY_VERTEX_LOD5 = 32768,
	CGroundIKSolveAnimNode__FLAG_BONE_USED_BY_VERTEX_LOD6 = 65536,
	CGroundIKSolveAnimNode__FLAG_BONE_USED_BY_VERTEX_LOD7 = 131072,
	CGroundIKSolveAnimNode__FLAG_BONE_MERGE_READ = 262144,
	CGroundIKSolveAnimNode__FLAG_BONE_MERGE_WRITE = 524288,
	CGroundIKSolveAnimNode__BLEND_PREALIGNED = 1048576,
	CGroundIKSolveAnimNode__FLAG_RIGIDLENGTH = 2097152,
	CGroundIKSolveAnimNode__FLAG_PROCEDURAL = 4194304,
	CGroundIKSolveAnimNode__FLAG_IK = 8388608,
	CGroundIKSolveAnimNode__FLAG_ALL_BONE_FLAGS = 16777215,
}

declare enum ParticleSelection_t {
	PARTICLE_SELECTION_FIRST = 0,
	PARTICLE_SELECTION_LAST = 1,
	PARTICLE_SELECTION_NUMBER = 2,
}

declare enum MorphLookupType_t {
	LOOKUP_TYPE_TEXCOORD = 0,
	LOOKUP_TYPE_VERTEX_ID = 1,
	LOOKUP_TYPE_COUNT = 2,
}

declare enum BrushSolidities_e {
	BRUSHSOLID_TOGGLE = 0,
	BRUSHSOLID_NEVER = 1,
	BRUSHSOLID_ALWAYS = 2,
}

declare enum Detail2Combo_t {
	DETAIL_2_COMBO_UNINITIALIZED = -1,
	DETAIL_2_COMBO_OFF = 0,
	DETAIL_2_COMBO_ADD = 1,
	DETAIL_2_COMBO_ADD_SELF_ILLUM = 2,
	DETAIL_2_COMBO_MOD2X = 3,
	DETAIL_2_COMBO_MUL = 4,
	DETAIL_2_COMBO_CROSSFADE = 5,
}

declare enum ScreenEffectType_t {
	SCREENEFFECT_EP2_ADVISOR_STUN = 0,
	SCREENEFFECT_EP1_INTRO = 1,
	SCREENEFFECT_EP2_GROGGY = 2,
}

declare enum IGE_AssassinationState {
	ASSASSINMINIGAMESTATE_NotActive = 0,
	ASSASSINMINIGAMESTATE_AwaitingInitialization = 1,
	ASSASSINMINIGAMESTATE_InProgress = 2,
	ASSASSINMINIGAMESTATE_ContractFilled = 3,
	ASSASSINMINIGAMESTATE_ContractDenied = 4,
}

declare enum ValueRemapperInputType_t {
	InputType_PlayerShootPosition = 0,
	InputType_PlayerShootPositionAroundAxis = 1,
}

declare enum BaseActivity_t {
	ACT_RESET = 0,
	ACT_IDLE = 1,
	ACT_TRANSITION = 2,
	ACT_COVER = 3,
	ACT_COVER_MED = 4,
	ACT_COVER_LOW = 5,
	ACT_WALK = 6,
	ACT_WALK_AIM = 7,
	ACT_WALK_CROUCH = 8,
	ACT_WALK_CROUCH_AIM = 9,
	ACT_RUN = 10,
	ACT_RUN_AIM = 11,
	ACT_RUN_CROUCH = 12,
	ACT_RUN_CROUCH_AIM = 13,
	ACT_RUN_PROTECTED = 14,
	ACT_SCRIPT_CUSTOM_MOVE = 15,
	ACT_RANGE_ATTACK1 = 16,
	ACT_RANGE_ATTACK2 = 17,
	ACT_RANGE_ATTACK1_LOW = 18,
	ACT_RANGE_ATTACK2_LOW = 19,
	ACT_DIESIMPLE = 20,
	ACT_DIEBACKWARD = 21,
	ACT_DIEFORWARD = 22,
	ACT_DIEVIOLENT = 23,
	ACT_DIERAGDOLL = 24,
	ACT_FLY = 25,
	ACT_HOVER = 26,
	ACT_GLIDE = 27,
	ACT_SWIM = 28,
	ACT_JUMP = 29,
	ACT_HOP = 30,
	ACT_LEAP = 31,
	ACT_LAND = 32,
	ACT_CLIMB_UP = 33,
	ACT_CLIMB_DOWN = 34,
	ACT_CLIMB_DISMOUNT = 35,
	ACT_SHIPLADDER_UP = 36,
	ACT_SHIPLADDER_DOWN = 37,
	ACT_STRAFE_LEFT = 38,
	ACT_STRAFE_RIGHT = 39,
	ACT_ROLL_LEFT = 40,
	ACT_ROLL_RIGHT = 41,
	ACT_TURN_LEFT = 42,
	ACT_TURN_RIGHT = 43,
	ACT_CROUCH = 44,
	ACT_CROUCHIDLE = 45,
	ACT_STAND = 46,
	ACT_USE = 47,
	ACT_ALIEN_BURROW_IDLE = 48,
	ACT_ALIEN_BURROW_OUT = 49,
	ACT_SIGNAL1 = 50,
	ACT_SIGNAL2 = 51,
	ACT_SIGNAL3 = 52,
	ACT_SIGNAL_ADVANCE = 53,
	ACT_SIGNAL_FORWARD = 54,
	ACT_SIGNAL_GROUP = 55,
	ACT_SIGNAL_HALT = 56,
	ACT_SIGNAL_LEFT = 57,
	ACT_SIGNAL_RIGHT = 58,
	ACT_SIGNAL_TAKECOVER = 59,
	ACT_LOOKBACK_RIGHT = 60,
	ACT_LOOKBACK_LEFT = 61,
	ACT_COWER = 62,
	ACT_SMALL_FLINCH = 63,
	ACT_BIG_FLINCH = 64,
	ACT_MELEE_ATTACK1 = 65,
	ACT_MELEE_ATTACK2 = 66,
	ACT_RELOAD = 67,
	ACT_RELOAD_START = 68,
	ACT_RELOAD_FINISH = 69,
	ACT_RELOAD_LOW = 70,
	ACT_ARM = 71,
	ACT_DISARM = 72,
	ACT_DROP_WEAPON = 73,
	ACT_DROP_WEAPON_SHOTGUN = 74,
	ACT_PICKUP_GROUND = 75,
	ACT_PICKUP_RACK = 76,
	ACT_IDLE_ANGRY = 77,
	ACT_IDLE_RELAXED = 78,
	ACT_IDLE_STIMULATED = 79,
	ACT_IDLE_AGITATED = 80,
	ACT_IDLE_STEALTH = 81,
	ACT_IDLE_HURT = 82,
	ACT_WALK_RELAXED = 83,
	ACT_WALK_STIMULATED = 84,
	ACT_WALK_AGITATED = 85,
	ACT_WALK_STEALTH = 86,
	ACT_RUN_RELAXED = 87,
	ACT_RUN_STIMULATED = 88,
	ACT_RUN_AGITATED = 89,
	ACT_RUN_STEALTH = 90,
	ACT_IDLE_AIM_RELAXED = 91,
	ACT_IDLE_AIM_STIMULATED = 92,
	ACT_IDLE_AIM_AGITATED = 93,
	ACT_IDLE_AIM_STEALTH = 94,
	ACT_WALK_AIM_RELAXED = 95,
	ACT_WALK_AIM_STIMULATED = 96,
	ACT_WALK_AIM_AGITATED = 97,
	ACT_WALK_AIM_STEALTH = 98,
	ACT_RUN_AIM_RELAXED = 99,
	ACT_RUN_AIM_STIMULATED = 100,
	ACT_RUN_AIM_AGITATED = 101,
	ACT_RUN_AIM_STEALTH = 102,
	ACT_CROUCHIDLE_STIMULATED = 103,
	ACT_CROUCHIDLE_AIM_STIMULATED = 104,
	ACT_CROUCHIDLE_AGITATED = 105,
	ACT_WALK_HURT = 106,
	ACT_RUN_HURT = 107,
	ACT_SPECIAL_ATTACK1 = 108,
	ACT_SPECIAL_ATTACK2 = 109,
	ACT_COMBAT_IDLE = 110,
	ACT_WALK_SCARED = 111,
	ACT_RUN_SCARED = 112,
	ACT_VICTORY_DANCE = 113,
	ACT_DIE_HEADSHOT = 114,
	ACT_DIE_CHESTSHOT = 115,
	ACT_DIE_GUTSHOT = 116,
	ACT_DIE_BACKSHOT = 117,
	ACT_FLINCH_HEAD = 118,
	ACT_FLINCH_CHEST = 119,
	ACT_FLINCH_STOMACH = 120,
	ACT_FLINCH_LEFTARM = 121,
	ACT_FLINCH_RIGHTARM = 122,
	ACT_FLINCH_LEFTLEG = 123,
	ACT_FLINCH_RIGHTLEG = 124,
	ACT_FLINCH_PHYSICS = 125,
	ACT_FLINCH_HEAD_BACK = 126,
	ACT_FLINCH_CHEST_BACK = 127,
	ACT_FLINCH_STOMACH_BACK = 128,
	ACT_FLINCH_CROUCH_FRONT = 129,
	ACT_FLINCH_CROUCH_BACK = 130,
	ACT_FLINCH_CROUCH_LEFT = 131,
	ACT_FLINCH_CROUCH_RIGHT = 132,
	ACT_IDLE_ON_FIRE = 133,
	ACT_WALK_ON_FIRE = 134,
	ACT_RUN_ON_FIRE = 135,
	ACT_RAPPEL_LOOP = 136,
	ACT_180_LEFT = 137,
	ACT_180_RIGHT = 138,
	ACT_90_LEFT = 139,
	ACT_90_RIGHT = 140,
	ACT_STEP_LEFT = 141,
	ACT_STEP_RIGHT = 142,
	ACT_STEP_BACK = 143,
	ACT_STEP_FORE = 144,
	ACT_GESTURE_RANGE_ATTACK1 = 145,
	ACT_GESTURE_RANGE_ATTACK2 = 146,
	ACT_GESTURE_MELEE_ATTACK1 = 147,
	ACT_GESTURE_MELEE_ATTACK2 = 148,
	ACT_GESTURE_RANGE_ATTACK1_LOW = 149,
	ACT_GESTURE_RANGE_ATTACK2_LOW = 150,
	ACT_MELEE_ATTACK_SWING_GESTURE = 151,
	ACT_GESTURE_SMALL_FLINCH = 152,
	ACT_GESTURE_BIG_FLINCH = 153,
	ACT_GESTURE_FLINCH_BLAST = 154,
	ACT_GESTURE_FLINCH_BLAST_SHOTGUN = 155,
	ACT_GESTURE_FLINCH_BLAST_DAMAGED = 156,
	ACT_GESTURE_FLINCH_BLAST_DAMAGED_SHOTGUN = 157,
	ACT_GESTURE_FLINCH_HEAD = 158,
	ACT_GESTURE_FLINCH_CHEST = 159,
	ACT_GESTURE_FLINCH_STOMACH = 160,
	ACT_GESTURE_FLINCH_LEFTARM = 161,
	ACT_GESTURE_FLINCH_RIGHTARM = 162,
	ACT_GESTURE_FLINCH_LEFTLEG = 163,
	ACT_GESTURE_FLINCH_RIGHTLEG = 164,
	ACT_GESTURE_TURN_LEFT = 165,
	ACT_GESTURE_TURN_RIGHT = 166,
	ACT_GESTURE_TURN_LEFT45 = 167,
	ACT_GESTURE_TURN_RIGHT45 = 168,
	ACT_GESTURE_TURN_LEFT90 = 169,
	ACT_GESTURE_TURN_RIGHT90 = 170,
	ACT_GESTURE_TURN_LEFT45_FLAT = 171,
	ACT_GESTURE_TURN_RIGHT45_FLAT = 172,
	ACT_GESTURE_TURN_LEFT90_FLAT = 173,
	ACT_GESTURE_TURN_RIGHT90_FLAT = 174,
	ACT_BARNACLE_HIT = 175,
	ACT_BARNACLE_PULL = 176,
	ACT_BARNACLE_CHOMP = 177,
	ACT_BARNACLE_CHEW = 178,
	ACT_DO_NOT_DISTURB = 179,
	ACT_SPECIFIC_SEQUENCE = 180,
	ACT_VM_DEPLOY = 181,
	ACT_VM_RELOAD_EMPTY = 182,
	ACT_VM_DRAW = 183,
	ACT_VM_HOLSTER = 184,
	ACT_VM_IDLE = 185,
	ACT_VM_FIDGET = 186,
	ACT_VM_PULLBACK = 187,
	ACT_VM_PULLBACK_HIGH = 188,
	ACT_VM_PULLBACK_LOW = 189,
	ACT_VM_THROW = 190,
	ACT_VM_DROP = 191,
	ACT_VM_PULLPIN = 192,
	ACT_VM_PRIMARYATTACK = 193,
	ACT_VM_SECONDARYATTACK = 194,
	ACT_VM_RELOAD = 195,
	ACT_VM_DRYFIRE = 196,
	ACT_VM_HITLEFT = 197,
	ACT_VM_HITLEFT2 = 198,
	ACT_VM_HITRIGHT = 199,
	ACT_VM_HITRIGHT2 = 200,
	ACT_VM_HITCENTER = 201,
	ACT_VM_HITCENTER2 = 202,
	ACT_VM_MISSLEFT = 203,
	ACT_VM_MISSLEFT2 = 204,
	ACT_VM_MISSRIGHT = 205,
	ACT_VM_MISSRIGHT2 = 206,
	ACT_VM_MISSCENTER = 207,
	ACT_VM_MISSCENTER2 = 208,
	ACT_VM_HAULBACK = 209,
	ACT_VM_SWINGHARD = 210,
	ACT_VM_SWINGMISS = 211,
	ACT_VM_SWINGHIT = 212,
	ACT_VM_IDLE_TO_LOWERED = 213,
	ACT_VM_IDLE_LOWERED = 214,
	ACT_VM_LOWERED_TO_IDLE = 215,
	ACT_VM_RECOIL1 = 216,
	ACT_VM_RECOIL2 = 217,
	ACT_VM_RECOIL3 = 218,
	ACT_VM_PICKUP = 219,
	ACT_VM_RELEASE = 220,
	ACT_VM_MAUL_LOOP = 221,
	ACT_VM_ATTACH_SILENCER = 222,
	ACT_VM_DETACH_SILENCER = 223,
	ACT_SLAM_STICKWALL_IDLE = 224,
	ACT_SLAM_STICKWALL_ND_IDLE = 225,
	ACT_SLAM_STICKWALL_ATTACH = 226,
	ACT_SLAM_STICKWALL_ATTACH2 = 227,
	ACT_SLAM_STICKWALL_ND_ATTACH = 228,
	ACT_SLAM_STICKWALL_ND_ATTACH2 = 229,
	ACT_SLAM_STICKWALL_DETONATE = 230,
	ACT_SLAM_STICKWALL_DETONATOR_HOLSTER = 231,
	ACT_SLAM_STICKWALL_DRAW = 232,
	ACT_SLAM_STICKWALL_ND_DRAW = 233,
	ACT_SLAM_STICKWALL_TO_THROW = 234,
	ACT_SLAM_STICKWALL_TO_THROW_ND = 235,
	ACT_SLAM_STICKWALL_TO_TRIPMINE_ND = 236,
	ACT_SLAM_THROW_IDLE = 237,
	ACT_SLAM_THROW_ND_IDLE = 238,
	ACT_SLAM_THROW_THROW = 239,
	ACT_SLAM_THROW_THROW2 = 240,
	ACT_SLAM_THROW_THROW_ND = 241,
	ACT_SLAM_THROW_THROW_ND2 = 242,
	ACT_SLAM_THROW_DRAW = 243,
	ACT_SLAM_THROW_ND_DRAW = 244,
	ACT_SLAM_THROW_TO_STICKWALL = 245,
	ACT_SLAM_THROW_TO_STICKWALL_ND = 246,
	ACT_SLAM_THROW_DETONATE = 247,
	ACT_SLAM_THROW_DETONATOR_HOLSTER = 248,
	ACT_SLAM_THROW_TO_TRIPMINE_ND = 249,
	ACT_SLAM_TRIPMINE_IDLE = 250,
	ACT_SLAM_TRIPMINE_DRAW = 251,
	ACT_SLAM_TRIPMINE_ATTACH = 252,
	ACT_SLAM_TRIPMINE_ATTACH2 = 253,
	ACT_SLAM_TRIPMINE_TO_STICKWALL_ND = 254,
	ACT_SLAM_TRIPMINE_TO_THROW_ND = 255,
	ACT_SLAM_DETONATOR_IDLE = 256,
	ACT_SLAM_DETONATOR_DRAW = 257,
	ACT_SLAM_DETONATOR_DETONATE = 258,
	ACT_SLAM_DETONATOR_HOLSTER = 259,
	ACT_SLAM_DETONATOR_STICKWALL_DRAW = 260,
	ACT_SLAM_DETONATOR_THROW_DRAW = 261,
	ACT_SHOTGUN_RELOAD_START = 262,
	ACT_SHOTGUN_RELOAD_FINISH = 263,
	ACT_SHOTGUN_PUMP = 264,
	ACT_SMG2_IDLE2 = 265,
	ACT_SMG2_FIRE2 = 266,
	ACT_SMG2_DRAW2 = 267,
	ACT_SMG2_RELOAD2 = 268,
	ACT_SMG2_DRYFIRE2 = 269,
	ACT_SMG2_TOAUTO = 270,
	ACT_SMG2_TOBURST = 271,
	ACT_PHYSCANNON_UPGRADE = 272,
	ACT_RANGE_ATTACK_AR1 = 273,
	ACT_RANGE_ATTACK_AR2 = 274,
	ACT_RANGE_ATTACK_AR2_LOW = 275,
	ACT_RANGE_ATTACK_AR2_GRENADE = 276,
	ACT_RANGE_ATTACK_HMG1 = 277,
	ACT_RANGE_ATTACK_ML = 278,
	ACT_RANGE_ATTACK_SMG1 = 279,
	ACT_RANGE_ATTACK_SMG1_LOW = 280,
	ACT_RANGE_ATTACK_SMG2 = 281,
	ACT_RANGE_ATTACK_SHOTGUN = 282,
	ACT_RANGE_ATTACK_SHOTGUN_LOW = 283,
	ACT_RANGE_ATTACK_PISTOL = 284,
	ACT_RANGE_ATTACK_PISTOL_LOW = 285,
	ACT_RANGE_ATTACK_SLAM = 286,
	ACT_RANGE_ATTACK_TRIPWIRE = 287,
	ACT_RANGE_ATTACK_THROW = 288,
	ACT_RANGE_ATTACK_SNIPER_RIFLE = 289,
	ACT_RANGE_ATTACK_RPG = 290,
	ACT_MELEE_ATTACK_SWING = 291,
	ACT_RANGE_AIM_LOW = 292,
	ACT_RANGE_AIM_SMG1_LOW = 293,
	ACT_RANGE_AIM_PISTOL_LOW = 294,
	ACT_RANGE_AIM_AR2_LOW = 295,
	ACT_COVER_PISTOL_LOW = 296,
	ACT_COVER_SMG1_LOW = 297,
	ACT_GESTURE_RANGE_ATTACK_AR1 = 298,
	ACT_GESTURE_RANGE_ATTACK_AR2 = 299,
	ACT_GESTURE_RANGE_ATTACK_AR2_GRENADE = 300,
	ACT_GESTURE_RANGE_ATTACK_HMG1 = 301,
	ACT_GESTURE_RANGE_ATTACK_ML = 302,
	ACT_GESTURE_RANGE_ATTACK_SMG1 = 303,
	ACT_GESTURE_RANGE_ATTACK_SMG1_LOW = 304,
	ACT_GESTURE_RANGE_ATTACK_SMG2 = 305,
	ACT_GESTURE_RANGE_ATTACK_SHOTGUN = 306,
	ACT_GESTURE_RANGE_ATTACK_PISTOL = 307,
	ACT_GESTURE_RANGE_ATTACK_PISTOL_LOW = 308,
	ACT_GESTURE_RANGE_ATTACK_SLAM = 309,
	ACT_GESTURE_RANGE_ATTACK_TRIPWIRE = 310,
	ACT_GESTURE_RANGE_ATTACK_THROW = 311,
	ACT_GESTURE_RANGE_ATTACK_SNIPER_RIFLE = 312,
	ACT_GESTURE_MELEE_ATTACK_SWING = 313,
	ACT_IDLE_RIFLE = 314,
	ACT_IDLE_SMG1 = 315,
	ACT_IDLE_ANGRY_SMG1 = 316,
	ACT_IDLE_PISTOL = 317,
	ACT_IDLE_ANGRY_PISTOL = 318,
	ACT_IDLE_ANGRY_SHOTGUN = 319,
	ACT_IDLE_STEALTH_PISTOL = 320,
	ACT_IDLE_PACKAGE = 321,
	ACT_WALK_PACKAGE = 322,
	ACT_IDLE_SUITCASE = 323,
	ACT_WALK_SUITCASE = 324,
	ACT_IDLE_SMG1_RELAXED = 325,
	ACT_IDLE_SMG1_STIMULATED = 326,
	ACT_WALK_RIFLE_RELAXED = 327,
	ACT_RUN_RIFLE_RELAXED = 328,
	ACT_WALK_RIFLE_STIMULATED = 329,
	ACT_RUN_RIFLE_STIMULATED = 330,
	ACT_IDLE_AIM_RIFLE_STIMULATED = 331,
	ACT_WALK_AIM_RIFLE_STIMULATED = 332,
	ACT_RUN_AIM_RIFLE_STIMULATED = 333,
	ACT_IDLE_SHOTGUN_RELAXED = 334,
	ACT_IDLE_SHOTGUN_STIMULATED = 335,
	ACT_IDLE_SHOTGUN_AGITATED = 336,
	ACT_WALK_ANGRY = 337,
	ACT_POLICE_HARASS1 = 338,
	ACT_POLICE_HARASS2 = 339,
	ACT_IDLE_MANNEDGUN = 340,
	ACT_IDLE_MELEE = 341,
	ACT_IDLE_ANGRY_MELEE = 342,
	ACT_IDLE_RPG_RELAXED = 343,
	ACT_IDLE_RPG = 344,
	ACT_IDLE_ANGRY_RPG = 345,
	ACT_COVER_LOW_RPG = 346,
	ACT_WALK_RPG = 347,
	ACT_RUN_RPG = 348,
	ACT_WALK_CROUCH_RPG = 349,
	ACT_RUN_CROUCH_RPG = 350,
	ACT_WALK_RPG_RELAXED = 351,
	ACT_RUN_RPG_RELAXED = 352,
	ACT_WALK_RIFLE = 353,
	ACT_WALK_AIM_RIFLE = 354,
	ACT_WALK_CROUCH_RIFLE = 355,
	ACT_WALK_CROUCH_AIM_RIFLE = 356,
	ACT_RUN_RIFLE = 357,
	ACT_RUN_AIM_RIFLE = 358,
	ACT_RUN_CROUCH_RIFLE = 359,
	ACT_RUN_CROUCH_AIM_RIFLE = 360,
	ACT_RUN_STEALTH_PISTOL = 361,
	ACT_WALK_AIM_SHOTGUN = 362,
	ACT_RUN_AIM_SHOTGUN = 363,
	ACT_WALK_PISTOL = 364,
	ACT_RUN_PISTOL = 365,
	ACT_WALK_AIM_PISTOL = 366,
	ACT_RUN_AIM_PISTOL = 367,
	ACT_WALK_STEALTH_PISTOL = 368,
	ACT_WALK_AIM_STEALTH_PISTOL = 369,
	ACT_RUN_AIM_STEALTH_PISTOL = 370,
	ACT_RELOAD_PISTOL = 371,
	ACT_RELOAD_PISTOL_LOW = 372,
	ACT_RELOAD_SMG1 = 373,
	ACT_RELOAD_SMG1_LOW = 374,
	ACT_RELOAD_SHOTGUN = 375,
	ACT_RELOAD_SHOTGUN_LOW = 376,
	ACT_GESTURE_RELOAD = 377,
	ACT_GESTURE_RELOAD_PISTOL = 378,
	ACT_GESTURE_RELOAD_SMG1 = 379,
	ACT_GESTURE_RELOAD_SHOTGUN = 380,
	ACT_BUSY_LEAN_LEFT = 381,
	ACT_BUSY_LEAN_LEFT_ENTRY = 382,
	ACT_BUSY_LEAN_LEFT_EXIT = 383,
	ACT_BUSY_LEAN_BACK = 384,
	ACT_BUSY_LEAN_BACK_ENTRY = 385,
	ACT_BUSY_LEAN_BACK_EXIT = 386,
	ACT_BUSY_SIT_GROUND = 387,
	ACT_BUSY_SIT_GROUND_ENTRY = 388,
	ACT_BUSY_SIT_GROUND_EXIT = 389,
	ACT_BUSY_SIT_CHAIR = 390,
	ACT_BUSY_SIT_CHAIR_ENTRY = 391,
	ACT_BUSY_SIT_CHAIR_EXIT = 392,
	ACT_BUSY_STAND = 393,
	ACT_BUSY_QUEUE = 394,
	ACT_DUCK_DODGE = 395,
	ACT_DIE_BARNACLE_SWALLOW = 396,
	ACT_GESTURE_BARNACLE_STRANGLE = 397,
	ACT_PHYSCANNON_DETACH = 398,
	ACT_PHYSCANNON_ANIMATE = 399,
	ACT_PHYSCANNON_ANIMATE_PRE = 400,
	ACT_PHYSCANNON_ANIMATE_POST = 401,
	ACT_DIE_FRONTSIDE = 402,
	ACT_DIE_RIGHTSIDE = 403,
	ACT_DIE_BACKSIDE = 404,
	ACT_DIE_LEFTSIDE = 405,
	ACT_DIE_CROUCH_FRONTSIDE = 406,
	ACT_DIE_CROUCH_RIGHTSIDE = 407,
	ACT_DIE_CROUCH_BACKSIDE = 408,
	ACT_DIE_CROUCH_LEFTSIDE = 409,
	ACT_DIE_INCAP = 410,
	ACT_DIE_STANDING = 411,
	ACT_OPEN_DOOR = 412,
	ACT_DI_ALYX_ZOMBIE_MELEE = 413,
	ACT_DI_ALYX_ZOMBIE_TORSO_MELEE = 414,
	ACT_DI_ALYX_HEADCRAB_MELEE = 415,
	ACT_DI_ALYX_ANTLION = 416,
	ACT_DI_ALYX_ZOMBIE_SHOTGUN64 = 417,
	ACT_DI_ALYX_ZOMBIE_SHOTGUN26 = 418,
	ACT_READINESS_RELAXED_TO_STIMULATED = 419,
	ACT_READINESS_RELAXED_TO_STIMULATED_WALK = 420,
	ACT_READINESS_AGITATED_TO_STIMULATED = 421,
	ACT_READINESS_STIMULATED_TO_RELAXED = 422,
	ACT_READINESS_PISTOL_RELAXED_TO_STIMULATED = 423,
	ACT_READINESS_PISTOL_RELAXED_TO_STIMULATED_WALK = 424,
	ACT_READINESS_PISTOL_AGITATED_TO_STIMULATED = 425,
	ACT_READINESS_PISTOL_STIMULATED_TO_RELAXED = 426,
	ACT_IDLE_CARRY = 427,
	ACT_WALK_CARRY = 428,
	ACT_STARTDYING = 429,
	ACT_DYINGLOOP = 430,
	ACT_DYINGTODEAD = 431,
	ACT_RIDE_MANNED_GUN = 432,
	ACT_VM_SPRINT_ENTER = 433,
	ACT_VM_SPRINT_IDLE = 434,
	ACT_VM_SPRINT_LEAVE = 435,
	ACT_FIRE_START = 436,
	ACT_FIRE_LOOP = 437,
	ACT_FIRE_END = 438,
	ACT_CROUCHING_GRENADEIDLE = 439,
	ACT_CROUCHING_GRENADEREADY = 440,
	ACT_CROUCHING_PRIMARYATTACK = 441,
	ACT_OVERLAY_GRENADEIDLE = 442,
	ACT_OVERLAY_GRENADEREADY = 443,
	ACT_OVERLAY_PRIMARYATTACK = 444,
	ACT_OVERLAY_SHIELD_UP = 445,
	ACT_OVERLAY_SHIELD_DOWN = 446,
	ACT_OVERLAY_SHIELD_UP_IDLE = 447,
	ACT_OVERLAY_SHIELD_ATTACK = 448,
	ACT_OVERLAY_SHIELD_KNOCKBACK = 449,
	ACT_SHIELD_UP = 450,
	ACT_SHIELD_DOWN = 451,
	ACT_SHIELD_UP_IDLE = 452,
	ACT_SHIELD_ATTACK = 453,
	ACT_SHIELD_KNOCKBACK = 454,
	ACT_CROUCHING_SHIELD_UP = 455,
	ACT_CROUCHING_SHIELD_DOWN = 456,
	ACT_CROUCHING_SHIELD_UP_IDLE = 457,
	ACT_CROUCHING_SHIELD_ATTACK = 458,
	ACT_CROUCHING_SHIELD_KNOCKBACK = 459,
	ACT_TURNRIGHT45 = 460,
	ACT_TURNLEFT45 = 461,
	ACT_TURN = 462,
	ACT_OBJ_ASSEMBLING = 463,
	ACT_OBJ_DISMANTLING = 464,
	ACT_OBJ_STARTUP = 465,
	ACT_OBJ_RUNNING = 466,
	ACT_OBJ_IDLE = 467,
	ACT_OBJ_PLACING = 468,
	ACT_OBJ_DETERIORATING = 469,
	ACT_OBJ_UPGRADING = 470,
	ACT_DEPLOY = 471,
	ACT_DEPLOY_IDLE = 472,
	ACT_UNDEPLOY = 473,
	ACT_CROSSBOW_DRAW_UNLOADED = 474,
	ACT_GAUSS_SPINUP = 475,
	ACT_GAUSS_SPINCYCLE = 476,
	ACT_VM_PRIMARYATTACK_SILENCED = 477,
	ACT_VM_RELOAD_SILENCED = 478,
	ACT_VM_DRYFIRE_SILENCED = 479,
	ACT_VM_IDLE_SILENCED = 480,
	ACT_VM_DRAW_SILENCED = 481,
	ACT_VM_IDLE_EMPTY_LEFT = 482,
	ACT_VM_DRYFIRE_LEFT = 483,
	ACT_VM_IS_DRAW = 484,
	ACT_VM_IS_HOLSTER = 485,
	ACT_VM_IS_IDLE = 486,
	ACT_VM_IS_PRIMARYATTACK = 487,
	ACT_PLAYER_IDLE_FIRE = 488,
	ACT_PLAYER_CROUCH_FIRE = 489,
	ACT_PLAYER_CROUCH_WALK_FIRE = 490,
	ACT_PLAYER_WALK_FIRE = 491,
	ACT_PLAYER_RUN_FIRE = 492,
	ACT_IDLETORUN = 493,
	ACT_RUNTOIDLE = 494,
	ACT_VM_DRAW_DEPLOYED = 495,
	ACT_HL2MP_IDLE_MELEE = 496,
	ACT_HL2MP_RUN_MELEE = 497,
	ACT_HL2MP_IDLE_CROUCH_MELEE = 498,
	ACT_HL2MP_WALK_CROUCH_MELEE = 499,
	ACT_HL2MP_GESTURE_RANGE_ATTACK_MELEE = 500,
	ACT_HL2MP_GESTURE_RELOAD_MELEE = 501,
	ACT_HL2MP_JUMP_MELEE = 502,
	ACT_MP_STAND_IDLE = 503,
	ACT_MP_CROUCH_IDLE = 504,
	ACT_MP_CROUCH_DEPLOYED_IDLE = 505,
	ACT_MP_CROUCH_DEPLOYED = 506,
	ACT_MP_DEPLOYED_IDLE = 507,
	ACT_MP_RUN = 508,
	ACT_MP_WALK = 509,
	ACT_MP_AIRWALK = 510,
	ACT_MP_CROUCHWALK = 511,
	ACT_MP_SPRINT = 512,
	ACT_MP_JUMP = 513,
	ACT_MP_JUMP_START = 514,
	ACT_MP_JUMP_FLOAT = 515,
	ACT_MP_JUMP_LAND = 516,
	ACT_MP_DOUBLEJUMP = 517,
	ACT_MP_SWIM = 518,
	ACT_MP_DEPLOYED = 519,
	ACT_MP_SWIM_DEPLOYED = 520,
	ACT_MP_VCD = 521,
	ACT_MP_ATTACK_STAND_PRIMARYFIRE = 522,
	ACT_MP_ATTACK_STAND_PRIMARYFIRE_DEPLOYED = 523,
	ACT_MP_ATTACK_STAND_SECONDARYFIRE = 524,
	ACT_MP_ATTACK_STAND_GRENADE = 525,
	ACT_MP_ATTACK_CROUCH_PRIMARYFIRE = 526,
	ACT_MP_ATTACK_CROUCH_PRIMARYFIRE_DEPLOYED = 527,
	ACT_MP_ATTACK_CROUCH_SECONDARYFIRE = 528,
	ACT_MP_ATTACK_CROUCH_GRENADE = 529,
	ACT_MP_ATTACK_SWIM_PRIMARYFIRE = 530,
	ACT_MP_ATTACK_SWIM_SECONDARYFIRE = 531,
	ACT_MP_ATTACK_SWIM_GRENADE = 532,
	ACT_MP_ATTACK_AIRWALK_PRIMARYFIRE = 533,
	ACT_MP_ATTACK_AIRWALK_SECONDARYFIRE = 534,
	ACT_MP_ATTACK_AIRWALK_GRENADE = 535,
	ACT_MP_RELOAD_STAND = 536,
	ACT_MP_RELOAD_STAND_LOOP = 537,
	ACT_MP_RELOAD_STAND_END = 538,
	ACT_MP_RELOAD_CROUCH = 539,
	ACT_MP_RELOAD_CROUCH_LOOP = 540,
	ACT_MP_RELOAD_CROUCH_END = 541,
	ACT_MP_RELOAD_SWIM = 542,
	ACT_MP_RELOAD_SWIM_LOOP = 543,
	ACT_MP_RELOAD_SWIM_END = 544,
	ACT_MP_RELOAD_AIRWALK = 545,
	ACT_MP_RELOAD_AIRWALK_LOOP = 546,
	ACT_MP_RELOAD_AIRWALK_END = 547,
	ACT_MP_ATTACK_STAND_PREFIRE = 548,
	ACT_MP_ATTACK_STAND_POSTFIRE = 549,
	ACT_MP_ATTACK_STAND_STARTFIRE = 550,
	ACT_MP_ATTACK_CROUCH_PREFIRE = 551,
	ACT_MP_ATTACK_CROUCH_POSTFIRE = 552,
	ACT_MP_ATTACK_SWIM_PREFIRE = 553,
	ACT_MP_ATTACK_SWIM_POSTFIRE = 554,
	ACT_MP_STAND_PRIMARY = 555,
	ACT_MP_CROUCH_PRIMARY = 556,
	ACT_MP_RUN_PRIMARY = 557,
	ACT_MP_WALK_PRIMARY = 558,
	ACT_MP_AIRWALK_PRIMARY = 559,
	ACT_MP_CROUCHWALK_PRIMARY = 560,
	ACT_MP_JUMP_PRIMARY = 561,
	ACT_MP_JUMP_START_PRIMARY = 562,
	ACT_MP_JUMP_FLOAT_PRIMARY = 563,
	ACT_MP_JUMP_LAND_PRIMARY = 564,
	ACT_MP_SWIM_PRIMARY = 565,
	ACT_MP_DEPLOYED_PRIMARY = 566,
	ACT_MP_SWIM_DEPLOYED_PRIMARY = 567,
	ACT_MP_ATTACK_STAND_PRIMARY = 568,
	ACT_MP_ATTACK_STAND_PRIMARY_DEPLOYED = 569,
	ACT_MP_ATTACK_CROUCH_PRIMARY = 570,
	ACT_MP_ATTACK_CROUCH_PRIMARY_DEPLOYED = 571,
	ACT_MP_ATTACK_SWIM_PRIMARY = 572,
	ACT_MP_ATTACK_AIRWALK_PRIMARY = 573,
	ACT_MP_RELOAD_STAND_PRIMARY = 574,
	ACT_MP_RELOAD_STAND_PRIMARY_LOOP = 575,
	ACT_MP_RELOAD_STAND_PRIMARY_END = 576,
	ACT_MP_RELOAD_CROUCH_PRIMARY = 577,
	ACT_MP_RELOAD_CROUCH_PRIMARY_LOOP = 578,
	ACT_MP_RELOAD_CROUCH_PRIMARY_END = 579,
	ACT_MP_RELOAD_SWIM_PRIMARY = 580,
	ACT_MP_RELOAD_SWIM_PRIMARY_LOOP = 581,
	ACT_MP_RELOAD_SWIM_PRIMARY_END = 582,
	ACT_MP_RELOAD_AIRWALK_PRIMARY = 583,
	ACT_MP_RELOAD_AIRWALK_PRIMARY_LOOP = 584,
	ACT_MP_RELOAD_AIRWALK_PRIMARY_END = 585,
	ACT_MP_ATTACK_STAND_GRENADE_PRIMARY = 586,
	ACT_MP_ATTACK_CROUCH_GRENADE_PRIMARY = 587,
	ACT_MP_ATTACK_SWIM_GRENADE_PRIMARY = 588,
	ACT_MP_ATTACK_AIRWALK_GRENADE_PRIMARY = 589,
	ACT_MP_STAND_SECONDARY = 590,
	ACT_MP_CROUCH_SECONDARY = 591,
	ACT_MP_RUN_SECONDARY = 592,
	ACT_MP_WALK_SECONDARY = 593,
	ACT_MP_AIRWALK_SECONDARY = 594,
	ACT_MP_CROUCHWALK_SECONDARY = 595,
	ACT_MP_JUMP_SECONDARY = 596,
	ACT_MP_JUMP_START_SECONDARY = 597,
	ACT_MP_JUMP_FLOAT_SECONDARY = 598,
	ACT_MP_JUMP_LAND_SECONDARY = 599,
	ACT_MP_SWIM_SECONDARY = 600,
	ACT_MP_ATTACK_STAND_SECONDARY = 601,
	ACT_MP_ATTACK_CROUCH_SECONDARY = 602,
	ACT_MP_ATTACK_SWIM_SECONDARY = 603,
	ACT_MP_ATTACK_AIRWALK_SECONDARY = 604,
	ACT_MP_RELOAD_STAND_SECONDARY = 605,
	ACT_MP_RELOAD_STAND_SECONDARY_LOOP = 606,
	ACT_MP_RELOAD_STAND_SECONDARY_END = 607,
	ACT_MP_RELOAD_CROUCH_SECONDARY = 608,
	ACT_MP_RELOAD_CROUCH_SECONDARY_LOOP = 609,
	ACT_MP_RELOAD_CROUCH_SECONDARY_END = 610,
	ACT_MP_RELOAD_SWIM_SECONDARY = 611,
	ACT_MP_RELOAD_SWIM_SECONDARY_LOOP = 612,
	ACT_MP_RELOAD_SWIM_SECONDARY_END = 613,
	ACT_MP_RELOAD_AIRWALK_SECONDARY = 614,
	ACT_MP_RELOAD_AIRWALK_SECONDARY_LOOP = 615,
	ACT_MP_RELOAD_AIRWALK_SECONDARY_END = 616,
	ACT_MP_ATTACK_STAND_GRENADE_SECONDARY = 617,
	ACT_MP_ATTACK_CROUCH_GRENADE_SECONDARY = 618,
	ACT_MP_ATTACK_SWIM_GRENADE_SECONDARY = 619,
	ACT_MP_ATTACK_AIRWALK_GRENADE_SECONDARY = 620,
	ACT_MP_STAND_MELEE = 621,
	ACT_MP_CROUCH_MELEE = 622,
	ACT_MP_RUN_MELEE = 623,
	ACT_MP_WALK_MELEE = 624,
	ACT_MP_AIRWALK_MELEE = 625,
	ACT_MP_CROUCHWALK_MELEE = 626,
	ACT_MP_JUMP_MELEE = 627,
	ACT_MP_JUMP_START_MELEE = 628,
	ACT_MP_JUMP_FLOAT_MELEE = 629,
	ACT_MP_JUMP_LAND_MELEE = 630,
	ACT_MP_SWIM_MELEE = 631,
	ACT_MP_ATTACK_STAND_MELEE = 632,
	ACT_MP_ATTACK_STAND_MELEE_SECONDARY = 633,
	ACT_MP_ATTACK_CROUCH_MELEE = 634,
	ACT_MP_ATTACK_CROUCH_MELEE_SECONDARY = 635,
	ACT_MP_ATTACK_SWIM_MELEE = 636,
	ACT_MP_ATTACK_AIRWALK_MELEE = 637,
	ACT_MP_ATTACK_STAND_GRENADE_MELEE = 638,
	ACT_MP_ATTACK_CROUCH_GRENADE_MELEE = 639,
	ACT_MP_ATTACK_SWIM_GRENADE_MELEE = 640,
	ACT_MP_ATTACK_AIRWALK_GRENADE_MELEE = 641,
	ACT_MP_STAND_ITEM1 = 642,
	ACT_MP_CROUCH_ITEM1 = 643,
	ACT_MP_RUN_ITEM1 = 644,
	ACT_MP_WALK_ITEM1 = 645,
	ACT_MP_AIRWALK_ITEM1 = 646,
	ACT_MP_CROUCHWALK_ITEM1 = 647,
	ACT_MP_JUMP_ITEM1 = 648,
	ACT_MP_JUMP_START_ITEM1 = 649,
	ACT_MP_JUMP_FLOAT_ITEM1 = 650,
	ACT_MP_JUMP_LAND_ITEM1 = 651,
	ACT_MP_SWIM_ITEM1 = 652,
	ACT_MP_ATTACK_STAND_ITEM1 = 653,
	ACT_MP_ATTACK_STAND_ITEM1_SECONDARY = 654,
	ACT_MP_ATTACK_CROUCH_ITEM1 = 655,
	ACT_MP_ATTACK_CROUCH_ITEM1_SECONDARY = 656,
	ACT_MP_ATTACK_SWIM_ITEM1 = 657,
	ACT_MP_ATTACK_AIRWALK_ITEM1 = 658,
	ACT_MP_STAND_ITEM2 = 659,
	ACT_MP_CROUCH_ITEM2 = 660,
	ACT_MP_RUN_ITEM2 = 661,
	ACT_MP_WALK_ITEM2 = 662,
	ACT_MP_AIRWALK_ITEM2 = 663,
	ACT_MP_CROUCHWALK_ITEM2 = 664,
	ACT_MP_JUMP_ITEM2 = 665,
	ACT_MP_JUMP_START_ITEM2 = 666,
	ACT_MP_JUMP_FLOAT_ITEM2 = 667,
	ACT_MP_JUMP_LAND_ITEM2 = 668,
	ACT_MP_SWIM_ITEM2 = 669,
	ACT_MP_ATTACK_STAND_ITEM2 = 670,
	ACT_MP_ATTACK_STAND_ITEM2_SECONDARY = 671,
	ACT_MP_ATTACK_CROUCH_ITEM2 = 672,
	ACT_MP_ATTACK_CROUCH_ITEM2_SECONDARY = 673,
	ACT_MP_ATTACK_SWIM_ITEM2 = 674,
	ACT_MP_ATTACK_AIRWALK_ITEM2 = 675,
	ACT_MP_GESTURE_FLINCH = 676,
	ACT_MP_GESTURE_FLINCH_PRIMARY = 677,
	ACT_MP_GESTURE_FLINCH_SECONDARY = 678,
	ACT_MP_GESTURE_FLINCH_MELEE = 679,
	ACT_MP_GESTURE_FLINCH_ITEM1 = 680,
	ACT_MP_GESTURE_FLINCH_ITEM2 = 681,
	ACT_MP_GESTURE_FLINCH_HEAD = 682,
	ACT_MP_GESTURE_FLINCH_CHEST = 683,
	ACT_MP_GESTURE_FLINCH_STOMACH = 684,
	ACT_MP_GESTURE_FLINCH_LEFTARM = 685,
	ACT_MP_GESTURE_FLINCH_RIGHTARM = 686,
	ACT_MP_GESTURE_FLINCH_LEFTLEG = 687,
	ACT_MP_GESTURE_FLINCH_RIGHTLEG = 688,
	ACT_MP_GRENADE1_DRAW = 689,
	ACT_MP_GRENADE1_IDLE = 690,
	ACT_MP_GRENADE1_ATTACK = 691,
	ACT_MP_GRENADE2_DRAW = 692,
	ACT_MP_GRENADE2_IDLE = 693,
	ACT_MP_GRENADE2_ATTACK = 694,
	ACT_MP_PRIMARY_GRENADE1_DRAW = 695,
	ACT_MP_PRIMARY_GRENADE1_IDLE = 696,
	ACT_MP_PRIMARY_GRENADE1_ATTACK = 697,
	ACT_MP_PRIMARY_GRENADE2_DRAW = 698,
	ACT_MP_PRIMARY_GRENADE2_IDLE = 699,
	ACT_MP_PRIMARY_GRENADE2_ATTACK = 700,
	ACT_MP_SECONDARY_GRENADE1_DRAW = 701,
	ACT_MP_SECONDARY_GRENADE1_IDLE = 702,
	ACT_MP_SECONDARY_GRENADE1_ATTACK = 703,
	ACT_MP_SECONDARY_GRENADE2_DRAW = 704,
	ACT_MP_SECONDARY_GRENADE2_IDLE = 705,
	ACT_MP_SECONDARY_GRENADE2_ATTACK = 706,
	ACT_MP_MELEE_GRENADE1_DRAW = 707,
	ACT_MP_MELEE_GRENADE1_IDLE = 708,
	ACT_MP_MELEE_GRENADE1_ATTACK = 709,
	ACT_MP_MELEE_GRENADE2_DRAW = 710,
	ACT_MP_MELEE_GRENADE2_IDLE = 711,
	ACT_MP_MELEE_GRENADE2_ATTACK = 712,
	ACT_MP_ITEM1_GRENADE1_DRAW = 713,
	ACT_MP_ITEM1_GRENADE1_IDLE = 714,
	ACT_MP_ITEM1_GRENADE1_ATTACK = 715,
	ACT_MP_ITEM1_GRENADE2_DRAW = 716,
	ACT_MP_ITEM1_GRENADE2_IDLE = 717,
	ACT_MP_ITEM1_GRENADE2_ATTACK = 718,
	ACT_MP_ITEM2_GRENADE1_DRAW = 719,
	ACT_MP_ITEM2_GRENADE1_IDLE = 720,
	ACT_MP_ITEM2_GRENADE1_ATTACK = 721,
	ACT_MP_ITEM2_GRENADE2_DRAW = 722,
	ACT_MP_ITEM2_GRENADE2_IDLE = 723,
	ACT_MP_ITEM2_GRENADE2_ATTACK = 724,
	ACT_MP_STAND_BUILDING = 725,
	ACT_MP_CROUCH_BUILDING = 726,
	ACT_MP_RUN_BUILDING = 727,
	ACT_MP_WALK_BUILDING = 728,
	ACT_MP_AIRWALK_BUILDING = 729,
	ACT_MP_CROUCHWALK_BUILDING = 730,
	ACT_MP_JUMP_BUILDING = 731,
	ACT_MP_JUMP_START_BUILDING = 732,
	ACT_MP_JUMP_FLOAT_BUILDING = 733,
	ACT_MP_JUMP_LAND_BUILDING = 734,
	ACT_MP_SWIM_BUILDING = 735,
	ACT_MP_ATTACK_STAND_BUILDING = 736,
	ACT_MP_ATTACK_CROUCH_BUILDING = 737,
	ACT_MP_ATTACK_SWIM_BUILDING = 738,
	ACT_MP_ATTACK_AIRWALK_BUILDING = 739,
	ACT_MP_ATTACK_STAND_GRENADE_BUILDING = 740,
	ACT_MP_ATTACK_CROUCH_GRENADE_BUILDING = 741,
	ACT_MP_ATTACK_SWIM_GRENADE_BUILDING = 742,
	ACT_MP_ATTACK_AIRWALK_GRENADE_BUILDING = 743,
	ACT_MP_STAND_PDA = 744,
	ACT_MP_CROUCH_PDA = 745,
	ACT_MP_RUN_PDA = 746,
	ACT_MP_WALK_PDA = 747,
	ACT_MP_AIRWALK_PDA = 748,
	ACT_MP_CROUCHWALK_PDA = 749,
	ACT_MP_JUMP_PDA = 750,
	ACT_MP_JUMP_START_PDA = 751,
	ACT_MP_JUMP_FLOAT_PDA = 752,
	ACT_MP_JUMP_LAND_PDA = 753,
	ACT_MP_SWIM_PDA = 754,
	ACT_MP_ATTACK_STAND_PDA = 755,
	ACT_MP_ATTACK_SWIM_PDA = 756,
	ACT_MP_GESTURE_VC_HANDMOUTH = 757,
	ACT_MP_GESTURE_VC_FINGERPOINT = 758,
	ACT_MP_GESTURE_VC_FISTPUMP = 759,
	ACT_MP_GESTURE_VC_THUMBSUP = 760,
	ACT_MP_GESTURE_VC_NODYES = 761,
	ACT_MP_GESTURE_VC_NODNO = 762,
	ACT_MP_GESTURE_VC_HANDMOUTH_PRIMARY = 763,
	ACT_MP_GESTURE_VC_FINGERPOINT_PRIMARY = 764,
	ACT_MP_GESTURE_VC_FISTPUMP_PRIMARY = 765,
	ACT_MP_GESTURE_VC_THUMBSUP_PRIMARY = 766,
	ACT_MP_GESTURE_VC_NODYES_PRIMARY = 767,
	ACT_MP_GESTURE_VC_NODNO_PRIMARY = 768,
	ACT_MP_GESTURE_VC_HANDMOUTH_SECONDARY = 769,
	ACT_MP_GESTURE_VC_FINGERPOINT_SECONDARY = 770,
	ACT_MP_GESTURE_VC_FISTPUMP_SECONDARY = 771,
	ACT_MP_GESTURE_VC_THUMBSUP_SECONDARY = 772,
	ACT_MP_GESTURE_VC_NODYES_SECONDARY = 773,
	ACT_MP_GESTURE_VC_NODNO_SECONDARY = 774,
	ACT_MP_GESTURE_VC_HANDMOUTH_MELEE = 775,
	ACT_MP_GESTURE_VC_FINGERPOINT_MELEE = 776,
	ACT_MP_GESTURE_VC_FISTPUMP_MELEE = 777,
	ACT_MP_GESTURE_VC_THUMBSUP_MELEE = 778,
	ACT_MP_GESTURE_VC_NODYES_MELEE = 779,
	ACT_MP_GESTURE_VC_NODNO_MELEE = 780,
	ACT_MP_GESTURE_VC_HANDMOUTH_ITEM1 = 781,
	ACT_MP_GESTURE_VC_FINGERPOINT_ITEM1 = 782,
	ACT_MP_GESTURE_VC_FISTPUMP_ITEM1 = 783,
	ACT_MP_GESTURE_VC_THUMBSUP_ITEM1 = 784,
	ACT_MP_GESTURE_VC_NODYES_ITEM1 = 785,
	ACT_MP_GESTURE_VC_NODNO_ITEM1 = 786,
	ACT_MP_GESTURE_VC_HANDMOUTH_ITEM2 = 787,
	ACT_MP_GESTURE_VC_FINGERPOINT_ITEM2 = 788,
	ACT_MP_GESTURE_VC_FISTPUMP_ITEM2 = 789,
	ACT_MP_GESTURE_VC_THUMBSUP_ITEM2 = 790,
	ACT_MP_GESTURE_VC_NODYES_ITEM2 = 791,
	ACT_MP_GESTURE_VC_NODNO_ITEM2 = 792,
	ACT_MP_GESTURE_VC_HANDMOUTH_BUILDING = 793,
	ACT_MP_GESTURE_VC_FINGERPOINT_BUILDING = 794,
	ACT_MP_GESTURE_VC_FISTPUMP_BUILDING = 795,
	ACT_MP_GESTURE_VC_THUMBSUP_BUILDING = 796,
	ACT_MP_GESTURE_VC_NODYES_BUILDING = 797,
	ACT_MP_GESTURE_VC_NODNO_BUILDING = 798,
	ACT_MP_GESTURE_VC_HANDMOUTH_PDA = 799,
	ACT_MP_GESTURE_VC_FINGERPOINT_PDA = 800,
	ACT_MP_GESTURE_VC_FISTPUMP_PDA = 801,
	ACT_MP_GESTURE_VC_THUMBSUP_PDA = 802,
	ACT_MP_GESTURE_VC_NODYES_PDA = 803,
	ACT_MP_GESTURE_VC_NODNO_PDA = 804,
	ACT_VM_UNUSABLE = 805,
	ACT_VM_UNUSABLE_TO_USABLE = 806,
	ACT_VM_USABLE_TO_UNUSABLE = 807,
	ACT_PRIMARY_VM_DRAW = 808,
	ACT_PRIMARY_VM_HOLSTER = 809,
	ACT_PRIMARY_VM_IDLE = 810,
	ACT_PRIMARY_VM_PULLBACK = 811,
	ACT_PRIMARY_VM_PRIMARYATTACK = 812,
	ACT_PRIMARY_VM_SECONDARYATTACK = 813,
	ACT_PRIMARY_VM_RELOAD = 814,
	ACT_PRIMARY_VM_DRYFIRE = 815,
	ACT_PRIMARY_VM_IDLE_TO_LOWERED = 816,
	ACT_PRIMARY_VM_IDLE_LOWERED = 817,
	ACT_PRIMARY_VM_LOWERED_TO_IDLE = 818,
	ACT_SECONDARY_VM_DRAW = 819,
	ACT_SECONDARY_VM_HOLSTER = 820,
	ACT_SECONDARY_VM_IDLE = 821,
	ACT_SECONDARY_VM_PULLBACK = 822,
	ACT_SECONDARY_VM_PRIMARYATTACK = 823,
	ACT_SECONDARY_VM_SECONDARYATTACK = 824,
	ACT_SECONDARY_VM_RELOAD = 825,
	ACT_SECONDARY_VM_DRYFIRE = 826,
	ACT_SECONDARY_VM_IDLE_TO_LOWERED = 827,
	ACT_SECONDARY_VM_IDLE_LOWERED = 828,
	ACT_SECONDARY_VM_LOWERED_TO_IDLE = 829,
	ACT_MELEE_VM_DRAW = 830,
	ACT_MELEE_VM_HOLSTER = 831,
	ACT_MELEE_VM_IDLE = 832,
	ACT_MELEE_VM_PULLBACK = 833,
	ACT_MELEE_VM_PRIMARYATTACK = 834,
	ACT_MELEE_VM_SECONDARYATTACK = 835,
	ACT_MELEE_VM_RELOAD = 836,
	ACT_MELEE_VM_DRYFIRE = 837,
	ACT_MELEE_VM_IDLE_TO_LOWERED = 838,
	ACT_MELEE_VM_IDLE_LOWERED = 839,
	ACT_MELEE_VM_LOWERED_TO_IDLE = 840,
	ACT_PDA_VM_DRAW = 841,
	ACT_PDA_VM_HOLSTER = 842,
	ACT_PDA_VM_IDLE = 843,
	ACT_PDA_VM_PULLBACK = 844,
	ACT_PDA_VM_PRIMARYATTACK = 845,
	ACT_PDA_VM_SECONDARYATTACK = 846,
	ACT_PDA_VM_RELOAD = 847,
	ACT_PDA_VM_DRYFIRE = 848,
	ACT_PDA_VM_IDLE_TO_LOWERED = 849,
	ACT_PDA_VM_IDLE_LOWERED = 850,
	ACT_PDA_VM_LOWERED_TO_IDLE = 851,
	ACT_ITEM1_VM_DRAW = 852,
	ACT_ITEM1_VM_HOLSTER = 853,
	ACT_ITEM1_VM_IDLE = 854,
	ACT_ITEM1_VM_PULLBACK = 855,
	ACT_ITEM1_VM_PRIMARYATTACK = 856,
	ACT_ITEM1_VM_SECONDARYATTACK = 857,
	ACT_ITEM1_VM_RELOAD = 858,
	ACT_ITEM1_VM_DRYFIRE = 859,
	ACT_ITEM1_VM_IDLE_TO_LOWERED = 860,
	ACT_ITEM1_VM_IDLE_LOWERED = 861,
	ACT_ITEM1_VM_LOWERED_TO_IDLE = 862,
	ACT_ITEM2_VM_DRAW = 863,
	ACT_ITEM2_VM_HOLSTER = 864,
	ACT_ITEM2_VM_IDLE = 865,
	ACT_ITEM2_VM_PULLBACK = 866,
	ACT_ITEM2_VM_PRIMARYATTACK = 867,
	ACT_ITEM2_VM_SECONDARYATTACK = 868,
	ACT_ITEM2_VM_RELOAD = 869,
	ACT_ITEM2_VM_DRYFIRE = 870,
	ACT_ITEM2_VM_IDLE_TO_LOWERED = 871,
	ACT_ITEM2_VM_IDLE_LOWERED = 872,
	ACT_ITEM2_VM_LOWERED_TO_IDLE = 873,
	ACT_RELOAD_SUCCEED = 874,
	ACT_RELOAD_FAIL = 875,
	ACT_WALK_AIM_AUTOGUN = 876,
	ACT_RUN_AIM_AUTOGUN = 877,
	ACT_IDLE_AUTOGUN = 878,
	ACT_IDLE_AIM_AUTOGUN = 879,
	ACT_RELOAD_AUTOGUN = 880,
	ACT_CROUCH_IDLE_AUTOGUN = 881,
	ACT_RANGE_ATTACK_AUTOGUN = 882,
	ACT_JUMP_AUTOGUN = 883,
	ACT_IDLE_AIM_PISTOL = 884,
	ACT_WALK_AIM_DUAL = 885,
	ACT_RUN_AIM_DUAL = 886,
	ACT_IDLE_DUAL = 887,
	ACT_IDLE_AIM_DUAL = 888,
	ACT_RELOAD_DUAL = 889,
	ACT_CROUCH_IDLE_DUAL = 890,
	ACT_RANGE_ATTACK_DUAL = 891,
	ACT_JUMP_DUAL = 892,
	ACT_IDLE_AIM_SHOTGUN = 893,
	ACT_CROUCH_IDLE_SHOTGUN = 894,
	ACT_IDLE_AIM_RIFLE = 895,
	ACT_CROUCH_IDLE_RIFLE = 896,
	ACT_RANGE_ATTACK_RIFLE = 897,
	ACT_SLEEP = 898,
	ACT_WAKE = 899,
	ACT_FLICK_LEFT = 900,
	ACT_FLICK_LEFT_MIDDLE = 901,
	ACT_FLICK_RIGHT_MIDDLE = 902,
	ACT_FLICK_RIGHT = 903,
	ACT_SPINAROUND = 904,
	ACT_PREP_TO_FIRE = 905,
	ACT_FIRE = 906,
	ACT_FIRE_RECOVER = 907,
	ACT_SPRAY = 908,
	ACT_PREP_EXPLODE = 909,
	ACT_EXPLODE = 910,
	ACT_SCRIPT_CUSTOM_0 = 911,
	ACT_SCRIPT_CUSTOM_1 = 912,
	ACT_SCRIPT_CUSTOM_2 = 913,
	ACT_SCRIPT_CUSTOM_3 = 914,
	ACT_SCRIPT_CUSTOM_4 = 915,
	ACT_SCRIPT_CUSTOM_5 = 916,
	ACT_SCRIPT_CUSTOM_6 = 917,
	ACT_SCRIPT_CUSTOM_7 = 918,
	ACT_SCRIPT_CUSTOM_8 = 919,
	ACT_SCRIPT_CUSTOM_9 = 920,
	ACT_SCRIPT_CUSTOM_10 = 921,
	ACT_SCRIPT_CUSTOM_11 = 922,
	ACT_SCRIPT_CUSTOM_12 = 923,
	ACT_SCRIPT_CUSTOM_13 = 924,
	ACT_SCRIPT_CUSTOM_14 = 925,
	ACT_SCRIPT_CUSTOM_15 = 926,
	ACT_SCRIPT_CUSTOM_16 = 927,
	ACT_SCRIPT_CUSTOM_17 = 928,
	ACT_SCRIPT_CUSTOM_18 = 929,
	ACT_SCRIPT_CUSTOM_19 = 930,
	ACT_SCRIPT_CUSTOM_20 = 931,
	ACT_SCRIPT_CUSTOM_21 = 932,
	ACT_SCRIPT_CUSTOM_22 = 933,
	ACT_SCRIPT_CUSTOM_23 = 934,
	ACT_SCRIPT_CUSTOM_24 = 935,
	ACT_SCRIPT_CUSTOM_25 = 936,
	ACT_SCRIPT_CUSTOM_26 = 937,
	ACT_SCRIPT_CUSTOM_27 = 938,
	ACT_SCRIPT_CUSTOM_28 = 939,
	ACT_SCRIPT_CUSTOM_29 = 940,
	ACT_SCRIPT_CUSTOM_30 = 941,
	ACT_SCRIPT_CUSTOM_31 = 942,
	ACT_VR_PISTOL_LAST_SHOT = 943,
	ACT_VR_PISTOL_SLIDE_RELEASE = 944,
	ACT_VR_PISTOL_CLIP_OUT_CHAMBERED = 945,
	ACT_VR_PISTOL_CLIP_OUT_SLIDE_BACK = 946,
	ACT_VR_PISTOL_CLIP_IN_CHAMBERED = 947,
	ACT_VR_PISTOL_CLIP_IN_SLIDE_BACK = 948,
	ACT_VR_PISTOL_IDLE_SLIDE_BACK = 949,
	ACT_VR_PISTOL_IDLE_SLIDE_BACK_CLIP_READY = 950,
	ACT_RAGDOLL_RECOVERY_FRONT = 951,
	ACT_RAGDOLL_RECOVERY_BACK = 952,
	ACT_RAGDOLL_RECOVERY_LEFT = 953,
	ACT_RAGDOLL_RECOVERY_RIGHT = 954,
	ACT_GRABBITYGLOVES_GRAB = 955,
	ACT_GRABBITYGLOVES_RELEASE = 956,
	ACT_GRABBITYGLOVES_GRAB_IDLE = 957,
	ACT_GRABBITYGLOVES_ACTIVE = 958,
	ACT_GRABBITYGLOVES_ACTIVE_IDLE = 959,
	ACT_GRABBITYGLOVES_DEACTIVATE = 960,
	ACT_GRABBITYGLOVES_PULL = 961,
	ACT_HEADCRAB_SMOKE_BOMB = 962,
	ACT_HEADCRAB_SPIT = 963,
	ACT_ZOMBIE_TRIP = 964,
	ACT_ZOMBIE_LUNGE = 965,
	ACT_NEUTRAL_REF_POSE = 966,
	ACT_ANTLION_SCUTTLE_FORWARD = 967,
	ACT_ANTLION_SCUTTLE_BACK = 968,
	ACT_ANTLION_SCUTTLE_LEFT = 969,
	ACT_ANTLION_SCUTTLE_RIGHT = 970,
	ACT_VR_PISTOL_EMPTY_CLIP_IN_SLIDE_BACK = 971,
	ACT_VR_SHOTGUN_IDLE = 972,
	ACT_VR_SHOTGUN_OPEN_CHAMBER = 973,
	ACT_VR_SHOTGUN_RELOAD_1 = 974,
	ACT_VR_SHOTGUN_RELOAD_2 = 975,
	ACT_VR_SHOTGUN_RELOAD_3 = 976,
	ACT_VR_SHOTGUN_CLOSE_CHAMBER = 977,
	ACT_VR_SHOTGUN_TRIGGER_SQUEEZE = 978,
	ACT_VR_SHOTGUN_SHOOT = 979,
	ACT_VR_SHOTGUN_SLIDE_BACK = 980,
	ACT_VR_SHOTGUN_SLIDE_FORWARD = 981,
	ACT_VR_PISTOL_LONG_CLIP_IN_CHAMBERED = 982,
	ACT_VR_PISTOL_LONG_CLIP_IN_SLIDE_BACK = 983,
	ACT_VR_PISTOL_BURST_TOGGLE = 984,
	ACT_VR_PISTOL_LOW_KICK = 985,
	ACT_VR_PISTOL_BURST_ATTACK = 986,
	ACT_VR_SHOTGUN_GRENADE_TWIST = 987,
	ACT_DIE_STAND = 988,
	ACT_DIE_STAND_HEADSHOT = 989,
	ACT_DIE_CROUCH = 990,
	ACT_DIE_CROUCH_HEADSHOT = 991,
	ACT_CSGO_NULL = 992,
	ACT_CSGO_DEFUSE = 993,
	ACT_CSGO_DEFUSE_WITH_KIT = 994,
	ACT_CSGO_FLASHBANG_REACTION = 995,
	ACT_CSGO_FIRE_PRIMARY = 996,
	ACT_CSGO_FIRE_PRIMARY_OPT_1 = 997,
	ACT_CSGO_FIRE_PRIMARY_OPT_2 = 998,
	ACT_CSGO_FIRE_SECONDARY = 999,
	ACT_CSGO_FIRE_SECONDARY_OPT_1 = 1000,
	ACT_CSGO_FIRE_SECONDARY_OPT_2 = 1001,
	ACT_CSGO_RELOAD = 1002,
	ACT_CSGO_RELOAD_START = 1003,
	ACT_CSGO_RELOAD_LOOP = 1004,
	ACT_CSGO_RELOAD_END = 1005,
	ACT_CSGO_OPERATE = 1006,
	ACT_CSGO_DEPLOY = 1007,
	ACT_CSGO_CATCH = 1008,
	ACT_CSGO_SILENCER_DETACH = 1009,
	ACT_CSGO_SILENCER_ATTACH = 1010,
	ACT_CSGO_TWITCH = 1011,
	ACT_CSGO_TWITCH_BUYZONE = 1012,
	ACT_CSGO_PLANT_BOMB = 1013,
	ACT_CSGO_IDLE_TURN_BALANCEADJUST = 1014,
	ACT_CSGO_IDLE_ADJUST_STOPPEDMOVING = 1015,
	ACT_CSGO_ALIVE_LOOP = 1016,
	ACT_CSGO_FLINCH = 1017,
	ACT_CSGO_FLINCH_HEAD = 1018,
	ACT_CSGO_FLINCH_MOLOTOV = 1019,
	ACT_CSGO_JUMP = 1020,
	ACT_CSGO_FALL = 1021,
	ACT_CSGO_CLIMB_LADDER = 1022,
	ACT_CSGO_LAND_LIGHT = 1023,
	ACT_CSGO_LAND_HEAVY = 1024,
	ACT_CSGO_EXIT_LADDER_TOP = 1025,
	ACT_CSGO_EXIT_LADDER_BOTTOM = 1026,
	ACT_CSGO_PARACHUTE = 1027,
	ACT_CSGO_TAUNT = 1028,
}

declare enum ParticleVecType_t {
	PVEC_TYPE_INVALID = -1,
	PVEC_TYPE_LITERAL = 0,
	PVEC_TYPE_LITERAL_COLOR = 1,
	PVEC_TYPE_PARTICLE_VECTOR = 2,
	PVEC_TYPE_CP_VALUE = 3,
	PVEC_TYPE_CP_RELATIVE_POSITION = 4,
	PVEC_TYPE_CP_RELATIVE_DIR = 5,
	PVEC_TYPE_FLOAT_COMPONENTS = 6,
	PVEC_TYPE_FLOAT_INTERP_CLAMPED = 7,
	PVEC_TYPE_FLOAT_INTERP_OPEN = 8,
	PVEC_TYPE_FLOAT_INTERP_GRADIENT = 9,
	PVEC_TYPE_COUNT = 10,
}

declare enum ThreeState_t {
	TRS_FALSE = 0,
	TRS_TRUE = 1,
	TRS_NONE = 2,
}

declare enum TrainOrientationType_t {
	TrainOrientation_Fixed = 0,
	TrainOrientation_AtPathTracks = 1,
	TrainOrientation_LinearBlend = 2,
	TrainOrientation_EaseInEaseOut = 3,
}

declare enum PFNoiseModifier_t {
	PF_NOISE_MODIFIER_NONE = 0,
	PF_NOISE_MODIFIER_LINES = 1,
	PF_NOISE_MODIFIER_CLUMPS = 2,
	PF_NOISE_MODIFIER_RINGS = 3,
}

declare enum AnimVrFingerSplay_t {
	AnimVrFingerSplay_Thumb_Index = 0,
	AnimVrFingerSplay_Index_Middle = 1,
	AnimVrFingerSplay_Middle_Ring = 2,
	AnimVrFingerSplay_Ring_Pinky = 3,
}

declare enum ValueRemapperMomentumType_t {
	MomentumType_None = 0,
	MomentumType_Friction = 1,
	MomentumType_SpringTowardSnapValue = 2,
	MomentumType_SpringAwayFromSnapValue = 3,
}

declare enum ValueRemapperHapticsType_t {
	HaticsType_Default = 0,
	HaticsType_None = 1,
}

declare enum quest_hud_types_t {
	QUEST_HUD_TYPE_DEFAULT = 0,
	QUEST_HUD_TYPE_GOLD = 1,
	QUEST_HUD_TYPE_ATTACK = 2,
	QUEST_HUD_TYPE_DEFEND = 3,
	QUEST_NUM_HUD_TYPES = 4,
}

declare enum ParticleImpulseType_t {
	IMPULSE_TYPE_NONE = 0,
	IMPULSE_TYPE_GENERIC = 1,
	IMPULSE_TYPE_ROPE = 2,
	IMPULSE_TYPE_EXPLOSION = 4,
	IMPULSE_TYPE_EXPLOSION_UNDERWATER = 8,
	IMPULSE_TYPE_PARTICLE_SYSTEM = 16,
}

declare enum VPhysXAggregateData_t__VPhysXFlagEnum_t {
	VPhysXAggregateData_t__FLAG_IS_POLYSOUP_GEOMETRY = 1,
	VPhysXAggregateData_t__FLAG_LEVEL_COLLISION = 16,
	VPhysXAggregateData_t__FLAG_IGNORE_SCALE_OBSOLETE_DO_NOT_USE = 32,
}

declare enum ParticleFloatRandomMode_t {
	PF_RANDOM_MODE_INVALID = -1,
	PF_RANDOM_MODE_CONSTANT = 0,
	PF_RANDOM_MODE_VARYING = 1,
	PF_RANDOM_MODE_COUNT = 2,
}

declare enum DamageCategory_t {
	DOTA_DAMAGE_CATEGORY_SPELL = 0,
	DOTA_DAMAGE_CATEGORY_ATTACK = 1,
}

declare enum AnimNodeNetworkMode {
	ServerAuthoritative = 0,
	ClientSimulate = 1,
	ClientPredicted = 2,
}

declare enum IBody__PostureType {
	IBody__STAND = 0,
	IBody__CROUCH = 1,
	IBody__SIT = 2,
	IBody__CRAWL = 3,
	IBody__LIE = 4,
}

declare enum AnimPoseControl {
	NoPoseControl = 0,
	AbsolutePoseControl = 1,
	RelativePoseControl = 2,
}

declare enum FootLockSubVisualization {
	FOOTLOCKSUBVISUALIZATION_ReachabilityAnalysis = 0,
	FOOTLOCKSUBVISUALIZATION_IKSolve = 1,
}

declare enum FacingMode {
	FacingMode_Manual = 0,
	FacingMode_Path = 1,
	FacingMode_LookTarget = 2,
}

declare enum SeqCmd_t {
	SeqCmd_Nop = 0,
	SeqCmd_LinearDelta = 1,
	SeqCmd_FetchFrameRange = 2,
	SeqCmd_Slerp = 3,
	SeqCmd_Add = 4,
	SeqCmd_Subtract = 5,
	SeqCmd_Scale = 6,
	SeqCmd_Copy = 7,
	SeqCmd_Blend = 8,
	SeqCmd_Worldspace = 9,
	SeqCmd_Sequence = 10,
	SeqCmd_FetchCycle = 11,
	SeqCmd_FetchFrame = 12,
	SeqCmd_IKLockInPlace = 13,
	SeqCmd_IKRestoreAll = 14,
	SeqCmd_ReverseSequence = 15,
	SeqCmd_Transform = 16,
}

declare enum SteamUGCMatchingUGCType {
	Items = 0,
	Items_Mtx = 1,
	Items_ReadyToUse = 2,
	Collections = 3,
	Artwork = 4,
	Videos = 5,
	Screenshots = 6,
	AllGuides = 7,
	WebGuides = 8,
	IntegratedGuides = 9,
	UsableInGame = 10,
	ControllerBindings = 11,
	GameManagedItems = 12,
	All = -1,
}

declare enum navproperties_t {
	NAV_IGNORE = 1,
}

declare enum ChoiceBlendMethod {
	SingleBlendTime = 0,
	PerChoiceBlendTimes = 1,
}

declare enum CRR_Response__ResponseEnum_t {
	CRR_Response__MAX_RESPONSE_NAME = 192,
	CRR_Response__MAX_RULE_NAME = 128,
}

declare enum Explosions {
	expRandom = 0,
	expDirected = 1,
	expUsePrecise = 2,
}

declare enum DOTAProjectileAttachment_t {
	DOTA_PROJECTILE_ATTACHMENT_NONE = 0,
	DOTA_PROJECTILE_ATTACHMENT_ATTACK_1 = 1,
	DOTA_PROJECTILE_ATTACHMENT_ATTACK_2 = 2,
	DOTA_PROJECTILE_ATTACHMENT_HITLOCATION = 3,
	DOTA_PROJECTILE_ATTACHMENT_ATTACK_3 = 4,
	DOTA_PROJECTILE_ATTACHMENT_ATTACK_4 = 5,
	DOTA_PROJECTILE_ATTACHMENT_LAST = 6,
}

declare enum AbilityBarType_t {
	ABILITY_BAR_TYPE_MAIN = 0,
	ABILITY_BAR_TYPE_SECONDARY = 1,
	ABILITY_BAR_TYPE_TERTIARY = 2,
}

declare enum ChoiceChangeMethod {
	OnReset = 0,
	OnCycleEnd = 1,
	OnResetOrCycleEnd = 2,
}

declare enum Touch_t {
	touch_none = 0,
	touch_player_only = 1,
	touch_npc_only = 2,
	touch_player_or_npc = 3,
	touch_player_or_npc_or_physicsprop = 4,
}

declare enum PropDoorRotatingSpawnPos_t {
	DOOR_SPAWN_CLOSED = 0,
	DOOR_SPAWN_OPEN_FORWARD = 1,
	DOOR_SPAWN_OPEN_BACK = 2,
	DOOR_SPAWN_AJAR = 3,
}

declare enum DOTAInventoryFlags_t {
	DOTA_INVENTORY_ALLOW_NONE = 0,
	DOTA_INVENTORY_ALLOW_MAIN = 1,
	DOTA_INVENTORY_ALLOW_STASH = 2,
	DOTA_INVENTORY_ALLOW_DROP_ON_GROUND = 4,
	DOTA_INVENTORY_ALLOW_DROP_AT_FOUNTAIN = 8,
	DOTA_INVENTORY_LIMIT_DROP_ON_GROUND = 16,
	DOTA_INVENTORY_ALL_ACCESS = 3,
}

declare enum DotaDefaultUIElement_t {
	DOTA_DEFAULT_UI_INVALID = -1,
	DOTA_DEFAULT_UI_TOP_TIMEOFDAY = 0,
	DOTA_DEFAULT_UI_TOP_HEROES = 1,
	DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD = 2,
	DOTA_DEFAULT_UI_ACTION_PANEL = 3,
	DOTA_DEFAULT_UI_ACTION_MINIMAP = 4,
	DOTA_DEFAULT_UI_INVENTORY_PANEL = 5,
	DOTA_DEFAULT_UI_INVENTORY_SHOP = 6,
	DOTA_DEFAULT_UI_INVENTORY_ITEMS = 7,
	DOTA_DEFAULT_UI_INVENTORY_QUICKBUY = 8,
	DOTA_DEFAULT_UI_INVENTORY_COURIER = 9,
	DOTA_DEFAULT_UI_INVENTORY_PROTECT = 10,
	DOTA_DEFAULT_UI_INVENTORY_GOLD = 11,
	DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS = 12,
	DOTA_DEFAULT_UI_SHOP_COMMONITEMS = 13,
	DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS = 14,
	DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME = 15,
	DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK = 16,
	DOTA_DEFAULT_UI_TOP_MENU_BUTTONS = 17,
	DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND = 18,
	DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM = 19,
	DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM = 20,
	DOTA_DEFAULT_UI_TOP_BAR_SCORE = 21,
	DOTA_DEFAULT_UI_ENDGAME = 22,
	DOTA_DEFAULT_UI_ENDGAME_CHAT = 23,
	DOTA_DEFAULT_UI_QUICK_STATS = 24,
	DOTA_DEFAULT_UI_PREGAME_STRATEGYUI = 25,
	DOTA_DEFAULT_UI_KILLCAM = 26,
	DOTA_DEFAULT_UI_TOP_BAR = 27,
	DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS = 28,
	DOTA_DEFAULT_UI_ELEMENT_COUNT = 29,
}

declare enum MeshTranslucencyType_t {
	MESH_TRANSLUCENCY_FULLY_OPAQUE = 0,
	MESH_TRANSLUCENCY_PARTIALLY_ALPHA_BLENDED = 1,
	MESH_TRANSLUCENCY_FULLY_ALPHA_BLENDED = 2,
}

declare enum SceneOnPlayerDeath_t {
	SCENE_ONPLAYERDEATH_DO_NOTHING = 0,
	SCENE_ONPLAYERDEATH_CANCEL = 1,
}

declare enum EDOTASpecialBonusOperation {
	SPECIAL_BONUS_ADD = 0,
	SPECIAL_BONUS_MULTIPLY = 1,
	SPECIAL_BONUS_SUBTRACT = 2,
	SPECIAL_BONUS_PERCENTAGE_ADD = 3,
	SPECIAL_BONUS_PERCENTAGE_SUBTRACT = 4,
}

declare enum BinaryNodeChildOption {
	Child1 = 0,
	Child2 = 1,
}

declare enum DOTAAbilitySpeakTrigger_t {
	DOTA_ABILITY_SPEAK_START_ACTION_PHASE = 0,
	DOTA_ABILITY_SPEAK_CAST = 1,
}

declare enum HierarchyType_t {
	HIERARCHY_NONE = 0,
	HIERARCHY_BONE_MERGE = 1,
	HIERARCHY_ATTACHMENT = 2,
	HIERARCHY_ABSORIGIN = 3,
	HIERARCHY_BONE = 4,
	HIERARCHY_TYPE_COUNT = 5,
}

declare enum BoneMaskBlendSpace {
	BlendSpace_Parent = 0,
	BlendSpace_Model = 1,
	BlendSpace_Model_RotationOnly = 2,
	BlendSpace_Model_TranslationOnly = 3,
}

declare enum quest_text_replace_values_t {
	QUEST_TEXT_REPLACE_VALUE_CURRENT_VALUE = 0,
	QUEST_TEXT_REPLACE_VALUE_TARGET_VALUE = 1,
	QUEST_TEXT_REPLACE_VALUE_ROUND = 2,
	QUEST_TEXT_REPLACE_VALUE_REWARD = 3,
	QUEST_NUM_TEXT_REPLACE_VALUES = 4,
}

declare enum modifierremove {
	DOTA_BUFF_REMOVE_ALL = 0,
	DOTA_BUFF_REMOVE_ENEMY = 1,
	DOTA_BUFF_REMOVE_ALLY = 2,
}

declare enum DetailCombo_t {
	DETAIL_COMBO_OFF = 0,
	DETAIL_COMBO_ADD = 1,
	DETAIL_COMBO_ADD_SELF_ILLUM = 2,
	DETAIL_COMBO_MOD2X = 3,
}

declare enum DoorState_t {
	DOOR_STATE_CLOSED = 0,
	DOOR_STATE_OPENING = 1,
	DOOR_STATE_OPEN = 2,
	DOOR_STATE_CLOSING = 3,
	DOOR_STATE_AJAR = 4,
}

declare enum AnimVectorSource {
	MoveDirection = 0,
	FacingDirection = 1,
	LookDirection = 2,
	VectorParameter = 3,
	WayPointDirection = 4,
	Acceleration = 5,
	SlopeNormal = 6,
	SlopeNormal_WorldSpace = 7,
	LookTarget = 8,
	LookTarget_WorldSpace = 9,
	WayPointPosition = 10,
	GoalPosition = 11,
	RootMotionVelocity = 12,
}

declare enum TextureRepetitionMode_t {
	TEXTURE_REPETITION_PARTICLE = 0,
	TEXTURE_REPETITION_PATH = 1,
}

declare enum fieldtype_t {
	FIELD_VOID = 0,
	FIELD_FLOAT32 = 1,
	FIELD_STRING = 2,
	FIELD_VECTOR = 3,
	FIELD_QUATERNION = 4,
	FIELD_INT32 = 5,
	FIELD_BOOLEAN = 6,
	FIELD_INT16 = 7,
	FIELD_CHARACTER = 8,
	FIELD_COLOR32 = 9,
	FIELD_EMBEDDED = 10,
	FIELD_CUSTOM = 11,
	FIELD_CLASSPTR = 12,
	FIELD_EHANDLE = 13,
	FIELD_POSITION_VECTOR = 14,
	FIELD_TIME = 15,
	FIELD_TICK = 16,
	FIELD_SOUNDNAME = 17,
	FIELD_INPUT = 18,
	FIELD_FUNCTION = 19,
	FIELD_VMATRIX = 20,
	FIELD_VMATRIX_WORLDSPACE = 21,
	FIELD_MATRIX3X4_WORLDSPACE = 22,
	FIELD_INTERVAL = 23,
	FIELD_UNUSED = 24,
	FIELD_VECTOR2D = 25,
	FIELD_INT64 = 26,
	FIELD_VECTOR4D = 27,
	FIELD_RESOURCE = 28,
	FIELD_TYPEUNKNOWN = 29,
	FIELD_CSTRING = 30,
	FIELD_HSCRIPT = 31,
	FIELD_VARIANT = 32,
	FIELD_UINT64 = 33,
	FIELD_FLOAT64 = 34,
	FIELD_POSITIVEINTEGER_OR_NULL = 35,
	FIELD_HSCRIPT_NEW_INSTANCE = 36,
	FIELD_UINT32 = 37,
	FIELD_UTLSTRINGTOKEN = 38,
	FIELD_QANGLE = 39,
	FIELD_NETWORK_ORIGIN_CELL_QUANTIZED_VECTOR = 40,
	FIELD_HMATERIAL = 41,
	FIELD_HMODEL = 42,
	FIELD_NETWORK_QUANTIZED_VECTOR = 43,
	FIELD_NETWORK_QUANTIZED_FLOAT = 44,
	FIELD_DIRECTION_VECTOR_WORLDSPACE = 45,
	FIELD_QANGLE_WORLDSPACE = 46,
	FIELD_QUATERNION_WORLDSPACE = 47,
	FIELD_HSCRIPT_LIGHTBINDING = 48,
	FIELD_V8_VALUE = 49,
	FIELD_V8_OBJECT = 50,
	FIELD_V8_ARRAY = 51,
	FIELD_V8_CALLBACK_INFO = 52,
	FIELD_UTLSTRING = 53,
	FIELD_NETWORK_ORIGIN_CELL_QUANTIZED_POSITION_VECTOR = 54,
	FIELD_HRENDERTEXTURE = 55,
	FIELD_HPARTICLESYSTEMDEFINITION = 56,
	FIELD_UINT8 = 57,
	FIELD_UINT16 = 58,
	FIELD_CTRANSFORM = 59,
	FIELD_CTRANSFORM_WORLDSPACE = 60,
	FIELD_HPOSTPROCESSING = 61,
	FIELD_MATRIX3X4 = 62,
	FIELD_SHIM = 63,
	FIELD_CMOTIONTRANSFORM = 64,
	FIELD_CMOTIONTRANSFORM_WORLDSPACE = 65,
	FIELD_TYPECOUNT = 66,
}

declare enum IKTargetCoordinateSystem {
	IKTARGETCOORDINATESYSTEM_WorldSpace = 0,
	IKTARGETCOORDINATESYSTEM_ModelSpace = 1,
	IKTARGETCOORDINATESYSTEM_COUNT = 2,
}

declare enum LOSSpeculativeMuzzle_t {
	MUZZLE_CURRENT_NPC_STATE = 0,
	MUZZLE_STANDING = 1,
	MUZZLE_CROUCHING = 2,
}

declare enum PlayerOrderIssuer_t {
	DOTA_ORDER_ISSUER_SELECTED_UNITS = 0,
	DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY = 1,
	DOTA_ORDER_ISSUER_HERO_ONLY = 2,
	DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY = 3,
}

declare enum SPELL_DISPELLABLE_TYPES {
	SPELL_DISPELLABLE_NONE = 0,
	SPELL_DISPELLABLE_YES_STRONG = 1,
	SPELL_DISPELLABLE_YES = 2,
	SPELL_DISPELLABLE_NO = 3,
}

declare enum LessonPanelLayoutFileTypes_t {
	LAYOUT_HAND_DEFAULT = 0,
	LAYOUT_WORLD_DEFAULT = 1,
	LAYOUT_CUSTOM = 2,
}

declare enum DOTAMinimapEvent_t {
	DOTA_MINIMAP_EVENT_ANCIENT_UNDER_ATTACK = 2,
	DOTA_MINIMAP_EVENT_BASE_UNDER_ATTACK = 4,
	DOTA_MINIMAP_EVENT_BASE_GLYPHED = 8,
	DOTA_MINIMAP_EVENT_TEAMMATE_UNDER_ATTACK = 16,
	DOTA_MINIMAP_EVENT_TEAMMATE_TELEPORTING = 32,
	DOTA_MINIMAP_EVENT_TEAMMATE_DIED = 64,
	DOTA_MINIMAP_EVENT_TUTORIAL_TASK_ACTIVE = 128,
	DOTA_MINIMAP_EVENT_TUTORIAL_TASK_FINISHED = 256,
	DOTA_MINIMAP_EVENT_HINT_LOCATION = 512,
	DOTA_MINIMAP_EVENT_ENEMY_TELEPORTING = 1024,
	DOTA_MINIMAP_EVENT_CANCEL_TELEPORTING = 2048,
	DOTA_MINIMAP_EVENT_RADAR = 4096,
	DOTA_MINIMAP_EVENT_RADAR_TARGET = 8192,
	DOTA_MINIMAP_EVENT_MOVE_TO_TARGET = 16384,
}

declare enum EntityIOTargetType_t {
	ENTITY_IO_TARGET_INVALID = -1,
	ENTITY_IO_TARGET_CLASSNAME = 0,
	ENTITY_IO_TARGET_CLASSNAME_DERIVES_FROM = 1,
	ENTITY_IO_TARGET_ENTITYNAME = 2,
	ENTITY_IO_TARGET_CONTAINS_COMPONENT = 3,
	ENTITY_IO_TARGET_SPECIAL_ACTIVATOR = 4,
	ENTITY_IO_TARGET_SPECIAL_CALLER = 5,
	ENTITY_IO_TARGET_EHANDLE = 6,
	ENTITY_IO_TARGET_ENTITYNAME_OR_CLASSNAME = 7,
}

declare enum ModelSkeletonData_t__BoneFlags_t {
	ModelSkeletonData_t__FLAG_NO_BONE_FLAGS = 0,
	ModelSkeletonData_t__FLAG_BONEFLEXDRIVER = 4,
	ModelSkeletonData_t__FLAG_CLOTH = 8,
	ModelSkeletonData_t__FLAG_PHYSICS = 16,
	ModelSkeletonData_t__FLAG_ATTACHMENT = 32,
	ModelSkeletonData_t__FLAG_ANIMATION = 64,
	ModelSkeletonData_t__FLAG_MESH = 128,
	ModelSkeletonData_t__FLAG_HITBOX = 256,
	ModelSkeletonData_t__FLAG_RETARGET_SRC = 512,
	ModelSkeletonData_t__FLAG_BONE_USED_BY_VERTEX_LOD0 = 1024,
	ModelSkeletonData_t__FLAG_BONE_USED_BY_VERTEX_LOD1 = 2048,
	ModelSkeletonData_t__FLAG_BONE_USED_BY_VERTEX_LOD2 = 4096,
	ModelSkeletonData_t__FLAG_BONE_USED_BY_VERTEX_LOD3 = 8192,
	ModelSkeletonData_t__FLAG_BONE_USED_BY_VERTEX_LOD4 = 16384,
	ModelSkeletonData_t__FLAG_BONE_USED_BY_VERTEX_LOD5 = 32768,
	ModelSkeletonData_t__FLAG_BONE_USED_BY_VERTEX_LOD6 = 65536,
	ModelSkeletonData_t__FLAG_BONE_USED_BY_VERTEX_LOD7 = 131072,
	ModelSkeletonData_t__FLAG_BONE_MERGE_READ = 262144,
	ModelSkeletonData_t__FLAG_BONE_MERGE_WRITE = 524288,
	ModelSkeletonData_t__FLAG_ALL_BONE_FLAGS = 1048575,
	ModelSkeletonData_t__BLEND_PREALIGNED = 1048576,
	ModelSkeletonData_t__FLAG_RIGIDLENGTH = 2097152,
	ModelSkeletonData_t__FLAG_PROCEDURAL = 4194304,
}

declare enum PetCoopStates_t {
	COOP_IGNORE = 0,
	COOPTELEPORT_START_PERFORMING = 1,
	COOPTELEPORT_PLAY_ENDANIM = 2,
	COOPTELEPORT_PLAY_EXITANIM = 3,
	COOP_WARD_OBSERVER = 4,
	COOP_WARD_SENTRY = 5,
}

declare enum IBody__ActivityType {
	IBody__MOTION_CONTROLLED_XY = 1,
	IBody__MOTION_CONTROLLED_Z = 2,
	IBody__ACTIVITY_UNINTERRUPTIBLE = 4,
	IBody__ACTIVITY_TRANSITORY = 8,
	IBody__ENTINDEX_PLAYBACK_RATE = 16,
}

declare enum SteamUniverse {
	Invalid = 0,
	Internal = 3,
	Dev = 4,
	Beta = 2,
	Public = 1,
}

declare enum DOTACustomHeroPickRulesPhase_t {
	PHASE_Ban = 0,
	PHASE_Pick = 1,
}

declare enum DOTA_HOLDOUT_TOWER_TYPE {
	DOTA_HOLDOUT_TOWER_NONE = 0,
	DOTA_HOLDOUT_TOWER_LIGHTFAST = 1,
	DOTA_HOLDOUT_TOWER_HEAVYSLOW = 2,
	DOTA_HOLDOUT_TOWER_REDUCESPEED = 3,
	DOTA_HOLDOUT_TOWER_COUNT = 4,
}

declare enum PointWorldTextReorientMode_t {
	POINT_WORLD_TEXT_REORIENT_NONE = 0,
	POINT_WORLD_TEXT_REORIENT_AROUND_UP = 1,
}

declare enum DOTA_PURGE_FLAGS {
	DOTA_PURGE_FLAG_NONE = 0,
	DOTA_PURGE_FLAG_REMOVE_BUFFS = 2,
	DOTA_PURGE_FLAG_REMOVE_DEBUFFS = 4,
	DOTA_PURGE_FLAG_REMOVE_STUNS = 8,
	DOTA_PURGE_FLAG_REMOVE_EXCEPTIONS = 16,
	DOTA_PURGE_FLAG_REMOVE_THIS_FRAME_ONLY = 32,
}

declare enum ParticleSortingChoiceList_t {
	PARTICLE_SORTING_NEAREST = 0,
	PARTICLE_SORTING_CREATION_TIME = 1,
}

declare enum SosActionSortType_t {
	SOS_SORTTYPE_HIGHEST = 0,
	SOS_SORTTYPE_LOWEST = 1,
}

declare enum NPC_STATE {
	NPC_STATE_INVALID = -1,
	NPC_STATE_NONE = 0,
	NPC_STATE_IDLE = 1,
	NPC_STATE_ALERT = 2,
	NPC_STATE_COMBAT = 3,
	NPC_STATE_SCRIPT = 4,
	NPC_STATE_PLAYDEAD = 5,
	NPC_STATE_PRONE = 6,
	NPC_STATE_DEAD = 7,
}

declare enum ParticleFalloffFunction_t {
	PARTICLE_FALLOFF_CONSTANT = 0,
	PARTICLE_FALLOFF_LINEAR = 1,
	PARTICLE_FALLOFF_EXPONENTIAL = 2,
}

declare enum AnimVRHandMotionRange_t {
	MotionRange_WithController = 0,
	MotionRange_WithoutController = 1,
}

declare enum WorldTextPanelHorizontalAlign_t {
	WORLDTEXT_HORIZONTAL_ALIGN_LEFT = 0,
	WORLDTEXT_HORIZONTAL_ALIGN_CENTER = 1,
	WORLDTEXT_HORIZONTAL_ALIGN_RIGHT = 2,
}

declare enum OnFrame {
	ONFRAME_UNKNOWN = 0,
	ONFRAME_TRUE = 1,
	ONFRAME_FALSE = 2,
}

declare enum DOTA_UNIT_TARGET_TYPE {
	DOTA_UNIT_TARGET_NONE = 0,
	DOTA_UNIT_TARGET_HERO = 1,
	DOTA_UNIT_TARGET_CREEP = 2,
	DOTA_UNIT_TARGET_BUILDING = 4,
	DOTA_UNIT_TARGET_COURIER = 16,
	DOTA_UNIT_TARGET_OTHER = 32,
	DOTA_UNIT_TARGET_TREE = 64,
	DOTA_UNIT_TARGET_CUSTOM = 128,
	DOTA_UNIT_TARGET_BASIC = 18,
	DOTA_UNIT_TARGET_ALL = 55,
}

declare enum PetGroundType_t {
	PET_GROUND_NONE = 0,
	PET_GROUND_GRID = 1,
	PET_GROUND_PLANE = 2,
}

declare enum PortraitDisplayMode_t {
	PORTRAIT_DISPLAY_MODE_INVALID = -1,
	PORTRAIT_DISPLAY_MODE_LOADOUT = 0,
	PORTRAIT_DISPLAY_MODE_LOADOUT_DIRE = 1,
	PORTRAIT_DISPLAY_MODE_LOADOUT_SMALL = 2,
	PORTRAIT_DISPLAY_MODE_TREASURE_SMALL = 3,
}

declare enum eLogicalHandType {
	LOGICAL_HAND_TYPE_UNKNOWN = -1,
	LOGICAL_HAND_TYPE_PRIMARY_HAND = 0,
	LOGICAL_HAND_TYPE_OFF_HAND = 1,
	LOGICAL_HAND_TYPE_COUNT = 2,
}

declare enum ParticleDirectionNoiseType_t {
	PARTICLE_DIR_NOISE_PERLIN = 0,
	PARTICLE_DIR_NOISE_CURL = 1,
	PARTICLE_DIR_NOISE_WORLEY_BASIC = 2,
}

declare enum InputLayoutVariation_t {
	INPUT_LAYOUT_VARIATION_DEFAULT = 0,
	INPUT_LAYOUT_VARIATION_STREAM1_MAT3X4 = 1,
	INPUT_LAYOUT_VARIATION_STREAM1_INSTANCEID = 2,
	INPUT_LAYOUT_VARIATION_STREAM1_INSTANCEID_LIGHTMAP_PARAMS = 3,
	INPUT_LAYOUT_VARIATION_STREAM1_INSTANCEID_MORPH_VERT_ID = 4,
	INPUT_LAYOUT_VARIATION_MAX = 5,
}

declare enum CAnimationGraphVisualizerPrimitiveType {
	ANIMATIONGRAPHVISUALIZERPRIMITIVETYPE_Text = 0,
	ANIMATIONGRAPHVISUALIZERPRIMITIVETYPE_Sphere = 1,
	ANIMATIONGRAPHVISUALIZERPRIMITIVETYPE_Line = 2,
	ANIMATIONGRAPHVISUALIZERPRIMITIVETYPE_Pie = 3,
	ANIMATIONGRAPHVISUALIZERPRIMITIVETYPE_Axis = 4,
}

declare enum MorphEncodingType_t {
	ENCODING_TYPE_OBJECT_SPACE = 0,
	ENCODING_TYPE_TANGENT_SPACE = 1,
	ENCODING_TYPE_COUNT = 2,
}

declare enum BlendKeyType {
	BlendKey_UserValue = 0,
	BlendKey_Velocity = 1,
	BlendKey_Distance = 2,
	BlendKey_RemainingDistance = 3,
}

declare enum ParticlePinDistance_t {
	PARTICLE_PIN_DISTANCE_NONE = -1,
	PARTICLE_PIN_DISTANCE_NEIGHBOR = 0,
	PARTICLE_PIN_DISTANCE_FARTHEST = 1,
	PARTICLE_PIN_DISTANCE_FIRST = 2,
	PARTICLE_PIN_DISTANCE_LAST = 3,
	PARTICLE_PIN_DISTANCE_CENTER = 5,
	PARTICLE_PIN_DISTANCE_CP = 6,
	PARTICLE_PIN_DISTANCE_CP_PAIR_EITHER = 7,
	PARTICLE_PIN_DISTANCE_CP_PAIR_BOTH = 8,
	PARTICLE_PIN_SPEED = 9,
	PARTICLE_PIN_COLLECTION_AGE = 10,
}

declare enum VertJustification_e {
	VERT_JUSTIFICATION_TOP = 0,
	VERT_JUSTIFICATION_CENTER = 1,
	VERT_JUSTIFICATION_BOTTOM = 2,
	VERT_JUSTIFICATION_NONE = 3,
}

declare enum TakeHealthOptions_t {
	TH_IGNORE_MAX_HITPOINTS = 1,
}

declare enum MoveType_t {
	MOVETYPE_NONE = 0,
	MOVETYPE_ISOMETRIC = 1,
	MOVETYPE_WALK = 2,
	MOVETYPE_STEP = 3,
	MOVETYPE_FLY = 4,
	MOVETYPE_FLYGRAVITY = 5,
	MOVETYPE_VPHYSICS = 6,
	MOVETYPE_PUSH = 7,
	MOVETYPE_NOCLIP = 8,
	MOVETYPE_LADDER = 9,
	MOVETYPE_OBSERVER = 10,
	MOVETYPE_CUSTOM = 11,
	MOVETYPE_LAST = 11,
	MOVETYPE_MAX_BITS = 4,
}

declare enum AnimVRFinger_t {
	AnimVrFinger_Thumb = 0,
	AnimVrFinger_Index = 1,
	AnimVrFinger_Middle = 2,
	AnimVrFinger_Ring = 3,
	AnimVrFinger_Pinky = 4,
}

declare enum LatchDirtyPermission_t {
	LATCH_DIRTY_DISALLOW = 0,
	LATCH_DIRTY_SERVER_CONTROLLED = 1,
	LATCH_DIRTY_CLIENT_SIMULATED = 2,
	LATCH_DIRTY_PREDICTION = 3,
	LATCH_DIRTY_FRAMESIMULATE = 4,
	LATCH_DIRTY_PARTICLE_SIMULATE = 5,
}

declare enum AbilityLearnResult_t {
	ABILITY_CAN_BE_UPGRADED = 0,
	ABILITY_CANNOT_BE_UPGRADED_NOT_UPGRADABLE = 1,
	ABILITY_CANNOT_BE_UPGRADED_AT_MAX = 2,
	ABILITY_CANNOT_BE_UPGRADED_REQUIRES_LEVEL = 3,
	ABILITY_NOT_LEARNABLE = 4,
}

declare enum PostProcessParameterNames_t {
	PPPN_FADE_TIME = 0,
	PPPN_LOCAL_CONTRAST_STRENGTH = 1,
	PPPN_LOCAL_CONTRAST_EDGE_STRENGTH = 2,
	PPPN_VIGNETTE_START = 3,
	PPPN_VIGNETTE_END = 4,
	PPPN_VIGNETTE_BLUR_STRENGTH = 5,
	PPPN_FADE_TO_BLACK_STRENGTH = 6,
	PPPN_DEPTH_BLUR_FOCAL_DISTANCE = 7,
	PPPN_DEPTH_BLUR_STRENGTH = 8,
	PPPN_SCREEN_BLUR_STRENGTH = 9,
	PPPN_FILM_GRAIN_STRENGTH = 10,
	PPPN_TOP_VIGNETTE_STRENGTH = 11,
	POST_PROCESS_PARAMETER_COUNT = 12,
}

declare enum HorizJustification_e {
	HORIZ_JUSTIFICATION_LEFT = 0,
	HORIZ_JUSTIFICATION_CENTER = 1,
	HORIZ_JUSTIFICATION_RIGHT = 2,
	HORIZ_JUSTIFICATION_NONE = 3,
}

declare enum DOTAPortraitEnvironmentType_t {
	DOTA_PORTRAIT_ENVIRONMENT_INVALID = -1,
	DOTA_PORTRAIT_ENVIRONMENT_DEFAULT = 0,
	DOTA_PORTRAIT_ENVIRONMENT_FULL_BODY = 1,
	DOTA_PORTRAIT_ENVIRONMENT_CARD = 2,
	DOTA_PORTRAIT_ENVIRONMENT_WEBPAGE = 3,
	DOTA_PORTRAIT_ENVIRONMENT_FULL_BODY_RIGHT_SIDE = 4,
	DOTA_PORTRAIT_ENVIRONMENT_TYPE_COUNT = 5,
}

declare enum PointTemplateClientOnlyEntityBehavior_t {
	CREATE_FOR_CURRENTLY_CONNECTED_CLIENTS_ONLY = 0,
	CREATE_FOR_CLIENTS_WHO_CONNECT_LATER = 1,
}

declare enum SeqPoseSetting_t {
	SEQ_POSE_SETTING_CONSTANT = 0,
	SEQ_POSE_SETTING_ROTATION = 1,
	SEQ_POSE_SETTING_POSITION = 2,
	SEQ_POSE_SETTING_VELOCITY = 3,
}

declare enum DOTADamageFlag_t {
	DOTA_DAMAGE_FLAG_NONE = 0,
	DOTA_DAMAGE_FLAG_IGNORES_MAGIC_ARMOR = 1,
	DOTA_DAMAGE_FLAG_IGNORES_PHYSICAL_ARMOR = 2,
	DOTA_DAMAGE_FLAG_BYPASSES_INVULNERABILITY = 4,
	DOTA_DAMAGE_FLAG_BYPASSES_BLOCK = 8,
	DOTA_DAMAGE_FLAG_REFLECTION = 16,
	DOTA_DAMAGE_FLAG_HPLOSS = 32,
	DOTA_DAMAGE_FLAG_NO_DIRECTOR_EVENT = 64,
	DOTA_DAMAGE_FLAG_NON_LETHAL = 128,
	DOTA_DAMAGE_FLAG_USE_COMBAT_PROFICIENCY = 256,
	DOTA_DAMAGE_FLAG_NO_DAMAGE_MULTIPLIERS = 512,
	DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION = 1024,
	DOTA_DAMAGE_FLAG_DONT_DISPLAY_DAMAGE_IF_SOURCE_HIDDEN = 2048,
	DOTA_DAMAGE_FLAG_NO_SPELL_LIFESTEAL = 4096,
	DOTA_DAMAGE_FLAG_PROPERTY_FIRE = 8192,
	DOTA_DAMAGE_FLAG_IGNORES_BASE_PHYSICAL_ARMOR = 16384,
}

declare enum ShatterGlassStressType {
	SHATTERGLASS_BLUNT = 0,
	SHATTERGLASS_BALLISTIC = 1,
	SHATTERGLASS_PULSE = 2,
	SHATTERDRYWALL_CHUNKS = 3,
	SHATTERGLASS_EXPLOSIVE = 4,
}

declare enum TimelineCompression_t {
	TIMELINE_COMPRESSION_SUM = 0,
	TIMELINE_COMPRESSION_COUNT_PER_INTERVAL = 1,
	TIMELINE_COMPRESSION_AVERAGE = 2,
	TIMELINE_COMPRESSION_AVERAGE_BLEND = 3,
	TIMELINE_COMPRESSION_TOTAL = 4,
}

declare enum MorphFlexControllerRemapType_t {
	MORPH_FLEXCONTROLLER_REMAP_PASSTHRU = 0,
	MORPH_FLEXCONTROLLER_REMAP_2WAY = 1,
	MORPH_FLEXCONTROLLER_REMAP_NWAY = 2,
	MORPH_FLEXCONTROLLER_REMAP_EYELID = 3,
}

declare enum ERoshanSpawnPhase {
	ROSHAN_SPAWN_PHASE_ALIVE = 0,
	ROSHAN_SPAWN_PHASE_BASE_TIMER = 1,
	ROSHAN_SPAWN_PHASE_VISIBLE_TIMER = 2,
}

declare enum attributeprovidertypes_t {
	PROVIDER_GENERIC = 0,
	PROVIDER_WEAPON = 1,
}

declare enum DOTAUnitMoveCapability_t {
	DOTA_UNIT_CAP_MOVE_NONE = 0,
	DOTA_UNIT_CAP_MOVE_GROUND = 1,
	DOTA_UNIT_CAP_MOVE_FLY = 2,
}

declare enum DOTA_MOTION_CONTROLLER_PRIORITY {
	DOTA_MOTION_CONTROLLER_PRIORITY_LOWEST = 0,
	DOTA_MOTION_CONTROLLER_PRIORITY_LOW = 1,
	DOTA_MOTION_CONTROLLER_PRIORITY_MEDIUM = 2,
	DOTA_MOTION_CONTROLLER_PRIORITY_HIGH = 3,
	DOTA_MOTION_CONTROLLER_PRIORITY_HIGHEST = 4,
}

declare enum DOTAUnitAttackCapability_t {
	DOTA_UNIT_CAP_NO_ATTACK = 0,
	DOTA_UNIT_CAP_MELEE_ATTACK = 1,
	DOTA_UNIT_CAP_RANGED_ATTACK = 2,
	DOTA_UNIT_CAP_RANGED_ATTACK_DIRECTIONAL = 4,
	DOTA_UNIT_ATTACK_CAPABILITY_BIT_COUNT = 3,
}

declare enum SpawnDebugOverrideState_t {
	SPAWN_DEBUG_OVERRIDE_NONE = 0,
	SPAWN_DEBUG_OVERRIDE_FORCE_ENABLED = 1,
	SPAWN_DEBUG_OVERRIDE_FORCE_DISABLED = 2,
}

declare enum attackfail {
	DOTA_ATTACK_RECORD_FAIL_NO = 0,
	DOTA_ATTACK_RECORD_FAIL_TERRAIN_MISS = 1,
	DOTA_ATTACK_RECORD_FAIL_SOURCE_MISS = 2,
	DOTA_ATTACK_RECORD_FAIL_TARGET_EVADED = 3,
	DOTA_ATTACK_RECORD_FAIL_TARGET_INVULNERABLE = 4,
	DOTA_ATTACK_RECORD_FAIL_TARGET_OUT_OF_RANGE = 5,
	DOTA_ATTACK_RECORD_CANNOT_FAIL = 6,
	DOTA_ATTACK_RECORD_FAIL_BLOCKED_BY_OBSTRUCTION = 7,
}

declare enum ControlValue {
	ControlValue_MoveHeading = 0,
	ControlValue_MoveSpeed = 1,
	ControlValue_FacingHeading = 2,
	ControlValue_LookHeading = 3,
	ControlValue_LookPitch = 4,
	ControlValue_WayPointHeading = 5,
	ControlValue_WayPointDistance = 6,
	ControlValue_BoundaryRadius = 7,
	ControlValue_TotalTranslation_SourceState = 8,
	ControlValue_TotalTranslation_TargetState = 9,
	ControlValue_RemainingTranslation_SourceState = 10,
	ControlValue_RemainingTranslation_TargetState = 11,
	ControlValue_MoveVsFacingDelta = 12,
	ControlValue_SourceStateBlendWeight = 13,
	ControlValue_TargetStateBlendWeight = 14,
	ControlValue_TargetMoveHeading = 15,
	ControlValue_TargetMoveSpeed = 16,
	ControlValue_AccelerationHeading = 17,
	ControlValue_AccelerationSpeed = 18,
	ControlValue_SlopeHeading = 19,
	ControlValue_SlopeAngle = 20,
	ControlValue_SlopeYaw = 21,
	ControlValue_SlopePitch = 22,
	ControlValue_GoalDistance = 23,
	ControlValue_AccelerationLeftRight = 24,
	ControlValue_AccelerationFrontBack = 25,
	ControlValue_RootMotionSpeed = 26,
	ControlValue_RootMotionTurnSpeed = 27,
	ControlValue_MoveHeadingRelativeToLookHeading = 28,
	ControlValue_FingerCurl_Thumb = 29,
	ControlValue_FingerCurl_Index = 30,
	ControlValue_FingerCurl_Middle = 31,
	ControlValue_FingerCurl_Ring = 32,
	ControlValue_FingerCurl_Pinky = 33,
	ControlValue_FingerSplay_Thumb_Index = 34,
	ControlValue_FingerSplay_Index_Middle = 35,
	ControlValue_FingerSplay_Middle_Ring = 36,
	ControlValue_FingerSplay_Ring_Pinky = 37,
	ControlValue_Count = 38,
	ControlValue_Invalid = 255,
}

declare enum MorphBundleType_t {
	MORPH_BUNDLE_TYPE_NONE = 0,
	MORPH_BUNDLE_TYPE_POSITION_SPEED = 1,
	MORPH_BUNDLE_TYPE_NORMAL_WRINKLE = 2,
	MORPH_BUNDLE_TYPE_COUNT = 3,
}

declare enum NavAttributeEnum {
	NAV_MESH_CROUCH = 1,
	NAV_MESH_JUMP = 2,
	NAV_MESH_PRECISE = 4,
	NAV_MESH_NO_JUMP = 8,
	NAV_MESH_AVOID = 128,
	NAV_MESH_STAIRS = 4096,
	NAV_MESH_NO_MERGE = 8192,
	NAV_MESH_OBSTACLE_TOP = 16384,
	NAV_MESH_CLIFF = 32768,
	NAV_MESH_STOP = 16,
	NAV_MESH_RUN = 32,
	NAV_MESH_WALK = 64,
	NAV_MESH_TRANSIENT = 256,
	NAV_MESH_DONT_HIDE = 512,
	NAV_MESH_STAND = 1024,
	NAV_MESH_NO_HOSTAGES = 2048,
}

declare enum PortraitSummonsDisplayMode_t {
	PORTRAIT_SUMMONS_DISPLAY_MODE_INVALID = -1,
	PORTRAIT_SUMMONS_DISPLAY_MODE_NONE = 0,
	PORTRAIT_SUMMONS_DISPLAY_MODE_ALL = 1,
	PORTRAIT_SUMMONS_DISPLAY_MODE_NON_DEFAULT = 2,
	PORTRAIT_SUMMONS_DISPLAY_MODE_TYPE_COUNT = 3,
}

declare enum RenderBufferFlags_t {
	RENDER_BUFFER_USAGE_VERTEX_BUFFER = 1,
	RENDER_BUFFER_USAGE_INDEX_BUFFER = 2,
	RENDER_BUFFER_USAGE_SHADER_RESOURCE = 4,
	RENDER_BUFFER_USAGE_UNORDERED_ACCESS = 8,
	RENDER_BUFFER_BYTEADDRESS_BUFFER = 16,
	RENDER_BUFFER_STRUCTURED_BUFFER = 32,
	RENDER_BUFFER_APPEND_CONSUME_BUFFER = 64,
	RENDER_BUFFER_UAV_COUNTER = 128,
	RENDER_BUFFER_UAV_DRAW_INDIRECT_ARGS = 256,
}

declare enum ParticleDetailLevel_t {
	PARTICLEDETAIL_LOW = 0,
	PARTICLEDETAIL_MEDIUM = 1,
	PARTICLEDETAIL_HIGH = 2,
	PARTICLEDETAIL_ULTRA = 3,
}

declare enum DOTA_UNIT_TARGET_FLAGS {
	DOTA_UNIT_TARGET_FLAG_NONE = 0,
	DOTA_UNIT_TARGET_FLAG_RANGED_ONLY = 2,
	DOTA_UNIT_TARGET_FLAG_MELEE_ONLY = 4,
	DOTA_UNIT_TARGET_FLAG_DEAD = 8,
	DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES = 16,
	DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES = 32,
	DOTA_UNIT_TARGET_FLAG_INVULNERABLE = 64,
	DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE = 128,
	DOTA_UNIT_TARGET_FLAG_NO_INVIS = 256,
	DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS = 512,
	DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED = 1024,
	DOTA_UNIT_TARGET_FLAG_NOT_DOMINATED = 2048,
	DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED = 4096,
	DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS = 8192,
	DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE = 16384,
	DOTA_UNIT_TARGET_FLAG_MANA_ONLY = 32768,
	DOTA_UNIT_TARGET_FLAG_CHECK_DISABLE_HELP = 65536,
	DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO = 131072,
	DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD = 262144,
	DOTA_UNIT_TARGET_FLAG_NOT_NIGHTMARED = 524288,
	DOTA_UNIT_TARGET_FLAG_PREFER_ENEMIES = 1048576,
	DOTA_UNIT_TARGET_FLAG_RESPECT_OBSTRUCTIONS = 2097152,
}

declare enum TRAIN_CODE {
	TRAIN_SAFE = 0,
	TRAIN_BLOCKING = 1,
	TRAIN_FOLLOWING = 2,
}

declare enum FootstepLandedFootSoundType_t {
	FOOTSOUND_Left = 0,
	FOOTSOUND_Right = 1,
	FOOTSOUND_UseOverrideSound = 2,
}

declare enum vmix_processor_type_t {
	VPROCESSOR_UNKNOWN = 0,
	VPROCESSOR_STEAMAUDIO_REVERB = 1,
	VPROCESSOR_RT_PITCH = 2,
	VPROCESSOR_STEAMAUDIO_HRTF = 3,
	VPROCESSOR_DYNAMICS = 4,
	VPROCESSOR_PRESETDSP = 5,
	VPROCESSOR_DELAY = 6,
	VPROCESSOR_FULLWAVE_INTEGRATOR = 7,
	VPROCESSOR_FILTER = 8,
	VPROCESSOR_STEAMAUDIO_PATHING = 9,
	VPROCESSOR_EQ8 = 10,
	VPROCESSOR_ENVELOPE = 11,
	VPROCESSOR_VOCODER = 12,
}

declare enum SosEditItemType_t {
	SOS_EDIT_ITEM_TYPE_SOUNDEVENTS = 0,
	SOS_EDIT_ITEM_TYPE_SOUNDEVENT = 1,
	SOS_EDIT_ITEM_TYPE_LIBRARYSTACKS = 2,
	SOS_EDIT_ITEM_TYPE_STACK = 3,
	SOS_EDIT_ITEM_TYPE_OPERATOR = 4,
	SOS_EDIT_ITEM_TYPE_FIELD = 5,
}

declare enum DOTAScriptInventorySlot_t {
	DOTA_ITEM_SLOT_1 = 0,
	DOTA_ITEM_SLOT_2 = 1,
	DOTA_ITEM_SLOT_3 = 2,
	DOTA_ITEM_SLOT_4 = 3,
	DOTA_ITEM_SLOT_5 = 4,
	DOTA_ITEM_SLOT_6 = 5,
	DOTA_ITEM_SLOT_7 = 6,
	DOTA_ITEM_SLOT_8 = 7,
	DOTA_ITEM_SLOT_9 = 8,
	DOTA_STASH_SLOT_1 = 9,
	DOTA_STASH_SLOT_2 = 10,
	DOTA_STASH_SLOT_3 = 11,
	DOTA_STASH_SLOT_4 = 12,
	DOTA_STASH_SLOT_5 = 13,
	DOTA_STASH_SLOT_6 = 14,
}

declare enum filter_t {
	FILTER_AND = 0,
	FILTER_OR = 1,
}

declare enum subquest_text_replace_values_t {
	SUBQUEST_TEXT_REPLACE_VALUE_CURRENT_VALUE = 0,
	SUBQUEST_TEXT_REPLACE_VALUE_TARGET_VALUE = 1,
	SUBQUEST_NUM_TEXT_REPLACE_VALUES = 2,
}

declare enum SosActionStopType_t {
	SOS_STOPTYPE_NONE = 0,
	SOS_STOPTYPE_TIME = 1,
	SOS_STOPTYPE_OPVAR = 2,
}

declare enum ModelBoneFlexComponent_t {
	MODEL_BONE_FLEX_INVALID = -1,
	MODEL_BONE_FLEX_TX = 0,
	MODEL_BONE_FLEX_TY = 1,
	MODEL_BONE_FLEX_TZ = 2,
}

declare enum ParticleAttachment_t {
	PATTACH_INVALID = -1,
	PATTACH_ABSORIGIN = 0,
	PATTACH_ABSORIGIN_FOLLOW = 1,
	PATTACH_CUSTOMORIGIN = 2,
	PATTACH_CUSTOMORIGIN_FOLLOW = 3,
	PATTACH_POINT = 4,
	PATTACH_POINT_FOLLOW = 5,
	PATTACH_EYES_FOLLOW = 6,
	PATTACH_OVERHEAD_FOLLOW = 7,
	PATTACH_WORLDORIGIN = 8,
	PATTACH_ROOTBONE_FOLLOW = 9,
	PATTACH_RENDERORIGIN_FOLLOW = 10,
	PATTACH_MAIN_VIEW = 11,
	PATTACH_WATERWAKE = 12,
	PATTACH_CENTER_FOLLOW = 13,
	PATTACH_CUSTOM_GAME_STATE_1 = 14,
	PATTACH_HEALTHBAR = 15,
	MAX_PATTACH_TYPES = 16,
}

declare enum WeaponProficiency_t {
	WEAPON_PROFICIENCY_POOR = 0,
	WEAPON_PROFICIENCY_AVERAGE = 1,
	WEAPON_PROFICIENCY_GOOD = 2,
	WEAPON_PROFICIENCY_VERY_GOOD = 3,
	WEAPON_PROFICIENCY_PERFECT = 4,
}

declare enum CourierState_t {
	COURIER_STATE_INIT = -1,
	COURIER_STATE_IDLE = 0,
	COURIER_STATE_AT_BASE = 1,
	COURIER_STATE_MOVING = 2,
	COURIER_STATE_DELIVERING_ITEMS = 3,
	COURIER_STATE_RETURNING_TO_BASE = 4,
	COURIER_STATE_DEAD = 5,
	COURIER_NUM_STATES = 6,
}

declare enum SolidType_t {
	SOLID_NONE = 0,
	SOLID_BSP = 1,
	SOLID_BBOX = 2,
	SOLID_OBB = 3,
	SOLID_POINT = 5,
	SOLID_VPHYSICS = 6,
	SOLID_CAPSULE = 7,
	SOLID_LAST = 8,
}

declare enum FuncDoorSpawnPos_t {
	FUNC_DOOR_SPAWN_CLOSED = 0,
	FUNC_DOOR_SPAWN_OPEN = 1,
}

declare enum DOTA_ITEM_STATE {
	DOTA_ITEM_NEEDS_EQUIPPED = 0,
	DOTA_ITEM_READY = 1,
}

declare enum CubeMapFace_t {
	CUBEMAP_FACE_POSITIVE_X = 0,
	CUBEMAP_FACE_NEGATIVE_X = 1,
	CUBEMAP_FACE_POSITIVE_Y = 2,
	CUBEMAP_FACE_NEGATIVE_Y = 3,
	CUBEMAP_FACE_POSITIVE_Z = 4,
	CUBEMAP_FACE_NEGATIVE_Z = 5,
}

declare enum DOTAKeybindCommand_t {
	DOTA_KEYBIND_NONE = 0,
	DOTA_KEYBIND_FIRST = 1,
	DOTA_KEYBIND_CAMERA_UP = 1,
	DOTA_KEYBIND_CAMERA_DOWN = 2,
	DOTA_KEYBIND_CAMERA_LEFT = 3,
	DOTA_KEYBIND_CAMERA_RIGHT = 4,
	DOTA_KEYBIND_CAMERA_GRIP = 5,
	DOTA_KEYBIND_CAMERA_YAW_GRIP = 6,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_1 = 7,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_2 = 8,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_3 = 9,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_4 = 10,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_5 = 11,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_6 = 12,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_7 = 13,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_8 = 14,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_9 = 15,
	DOTA_KEYBIND_CAMERA_SAVED_POSITION_10 = 16,
	DOTA_KEYBIND_HERO_ATTACK = 17,
	DOTA_KEYBIND_HERO_MOVE = 18,
	DOTA_KEYBIND_HERO_MOVE_DIRECTION = 19,
	DOTA_KEYBIND_PATROL = 20,
	DOTA_KEYBIND_HERO_STOP = 21,
	DOTA_KEYBIND_HERO_HOLD = 22,
	DOTA_KEYBIND_HERO_SELECT = 23,
	DOTA_KEYBIND_COURIER_SELECT = 24,
	DOTA_KEYBIND_COURIER_DELIVER = 25,
	DOTA_KEYBIND_COURIER_BURST = 26,
	DOTA_KEYBIND_COURIER_SHIELD = 27,
	DOTA_KEYBIND_PAUSE = 28,
	DOTA_SELECT_ALL = 29,
	DOTA_SELECT_ALL_OTHERS = 30,
	DOTA_RECENT_EVENT = 31,
	DOTA_KEYBIND_CHAT_TEAM = 32,
	DOTA_KEYBIND_CHAT_GLOBAL = 33,
	DOTA_KEYBIND_CHAT_TEAM2 = 34,
	DOTA_KEYBIND_CHAT_GLOBAL2 = 35,
	DOTA_KEYBIND_CHAT_VOICE_PARTY = 36,
	DOTA_KEYBIND_CHAT_VOICE_TEAM = 37,
	DOTA_KEYBIND_CHAT_WHEEL = 38,
	DOTA_KEYBIND_CHAT_WHEEL2 = 39,
	DOTA_KEYBIND_CHAT_WHEEL_CARE = 40,
	DOTA_KEYBIND_CHAT_WHEEL_BACK = 41,
	DOTA_KEYBIND_CHAT_WHEEL_NEED_WARDS = 42,
	DOTA_KEYBIND_CHAT_WHEEL_STUN = 43,
	DOTA_KEYBIND_CHAT_WHEEL_HELP = 44,
	DOTA_KEYBIND_CHAT_WHEEL_GET_PUSH = 45,
	DOTA_KEYBIND_CHAT_WHEEL_GOOD_JOB = 46,
	DOTA_KEYBIND_CHAT_WHEEL_MISSING = 47,
	DOTA_KEYBIND_CHAT_WHEEL_MISSING_TOP = 48,
	DOTA_KEYBIND_CHAT_WHEEL_MISSING_MIDDLE = 49,
	DOTA_KEYBIND_CHAT_WHEEL_MISSING_BOTTOM = 50,
	DOTA_KEYBIND_HERO_CHAT_WHEEL = 51,
	DOTA_KEYBIND_SPRAY_WHEEL = 52,
	DOTA_KEYBIND_ABILITY_PRIMARY1 = 53,
	DOTA_KEYBIND_ABILITY_PRIMARY2 = 54,
	DOTA_KEYBIND_ABILITY_PRIMARY3 = 55,
	DOTA_KEYBIND_ABILITY_SECONDARY1 = 56,
	DOTA_KEYBIND_ABILITY_SECONDARY2 = 57,
	DOTA_KEYBIND_ABILITY_ULTIMATE = 58,
	DOTA_KEYBIND_ABILITY_PRIMARY1_QUICKCAST = 59,
	DOTA_KEYBIND_ABILITY_PRIMARY2_QUICKCAST = 60,
	DOTA_KEYBIND_ABILITY_PRIMARY3_QUICKCAST = 61,
	DOTA_KEYBIND_ABILITY_SECONDARY1_QUICKCAST = 62,
	DOTA_KEYBIND_ABILITY_SECONDARY2_QUICKCAST = 63,
	DOTA_KEYBIND_ABILITY_ULTIMATE_QUICKCAST = 64,
	DOTA_KEYBIND_ABILITY_PRIMARY1_EXPLICIT_AUTOCAST = 65,
	DOTA_KEYBIND_ABILITY_PRIMARY2_EXPLICIT_AUTOCAST = 66,
	DOTA_KEYBIND_ABILITY_PRIMARY3_EXPLICIT_AUTOCAST = 67,
	DOTA_KEYBIND_ABILITY_SECONDARY1_EXPLICIT_AUTOCAST = 68,
	DOTA_KEYBIND_ABILITY_SECONDARY2_EXPLICIT_AUTOCAST = 69,
	DOTA_KEYBIND_ABILITY_ULTIMATE_EXPLICIT_AUTOCAST = 70,
	DOTA_KEYBIND_ABILITY_PRIMARY1_QUICKCAST_AUTOCAST = 71,
	DOTA_KEYBIND_ABILITY_PRIMARY2_QUICKCAST_AUTOCAST = 72,
	DOTA_KEYBIND_ABILITY_PRIMARY3_QUICKCAST_AUTOCAST = 73,
	DOTA_KEYBIND_ABILITY_SECONDARY1_QUICKCAST_AUTOCAST = 74,
	DOTA_KEYBIND_ABILITY_SECONDARY2_QUICKCAST_AUTOCAST = 75,
	DOTA_KEYBIND_ABILITY_ULTIMATE_QUICKCAST_AUTOCAST = 76,
	DOTA_KEYBIND_ABILITY_PRIMARY1_AUTOMATIC_AUTOCAST = 77,
	DOTA_KEYBIND_ABILITY_PRIMARY2_AUTOMATIC_AUTOCAST = 78,
	DOTA_KEYBIND_ABILITY_PRIMARY3_AUTOMATIC_AUTOCAST = 79,
	DOTA_KEYBIND_ABILITY_SECONDARY1_AUTOMATIC_AUTOCAST = 80,
	DOTA_KEYBIND_ABILITY_SECONDARY2_AUTOMATIC_AUTOCAST = 81,
	DOTA_KEYBIND_ABILITY_ULTIMATE_AUTOMATIC_AUTOCAST = 82,
	DOTA_KEYBIND_INVENTORY1 = 83,
	DOTA_KEYBIND_INVENTORY2 = 84,
	DOTA_KEYBIND_INVENTORY3 = 85,
	DOTA_KEYBIND_INVENTORY4 = 86,
	DOTA_KEYBIND_INVENTORY5 = 87,
	DOTA_KEYBIND_INVENTORY6 = 88,
	DOTA_KEYBIND_INVENTORYTP = 89,
	DOTA_KEYBIND_INVENTORYNEUTRAL = 90,
	DOTA_KEYBIND_INVENTORY1_QUICKCAST = 91,
	DOTA_KEYBIND_INVENTORY2_QUICKCAST = 92,
	DOTA_KEYBIND_INVENTORY3_QUICKCAST = 93,
	DOTA_KEYBIND_INVENTORY4_QUICKCAST = 94,
	DOTA_KEYBIND_INVENTORY5_QUICKCAST = 95,
	DOTA_KEYBIND_INVENTORY6_QUICKCAST = 96,
	DOTA_KEYBIND_INVENTORYTP_QUICKCAST = 97,
	DOTA_KEYBIND_INVENTORYNEUTRAL_QUICKCAST = 98,
	DOTA_KEYBIND_INVENTORY1_AUTOCAST = 99,
	DOTA_KEYBIND_INVENTORY2_AUTOCAST = 100,
	DOTA_KEYBIND_INVENTORY3_AUTOCAST = 101,
	DOTA_KEYBIND_INVENTORY4_AUTOCAST = 102,
	DOTA_KEYBIND_INVENTORY5_AUTOCAST = 103,
	DOTA_KEYBIND_INVENTORY6_AUTOCAST = 104,
	DOTA_KEYBIND_INVENTORYTP_AUTOCAST = 105,
	DOTA_KEYBIND_INVENTORYNEUTRAL_AUTOCAST = 106,
	DOTA_KEYBIND_INVENTORY1_QUICKAUTOCAST = 107,
	DOTA_KEYBIND_INVENTORY2_QUICKAUTOCAST = 108,
	DOTA_KEYBIND_INVENTORY3_QUICKAUTOCAST = 109,
	DOTA_KEYBIND_INVENTORY4_QUICKAUTOCAST = 110,
	DOTA_KEYBIND_INVENTORY5_QUICKAUTOCAST = 111,
	DOTA_KEYBIND_INVENTORY6_QUICKAUTOCAST = 112,
	DOTA_KEYBIND_INVENTORYTP_QUICKAUTOCAST = 113,
	DOTA_KEYBIND_INVENTORYNEUTRAL_QUICKAUTOCAST = 114,
	DOTA_KEYBIND_CONTROL_GROUP1 = 115,
	DOTA_KEYBIND_CONTROL_GROUP2 = 116,
	DOTA_KEYBIND_CONTROL_GROUP3 = 117,
	DOTA_KEYBIND_CONTROL_GROUP4 = 118,
	DOTA_KEYBIND_CONTROL_GROUP5 = 119,
	DOTA_KEYBIND_CONTROL_GROUP6 = 120,
	DOTA_KEYBIND_CONTROL_GROUP7 = 121,
	DOTA_KEYBIND_CONTROL_GROUP8 = 122,
	DOTA_KEYBIND_CONTROL_GROUP9 = 123,
	DOTA_KEYBIND_CONTROL_GROUP10 = 124,
	DOTA_KEYBIND_CONTROL_GROUPCYCLE = 125,
	DOTA_KEYBIND_SELECT_ALLY1 = 126,
	DOTA_KEYBIND_SELECT_ALLY2 = 127,
	DOTA_KEYBIND_SELECT_ALLY3 = 128,
	DOTA_KEYBIND_SELECT_ALLY4 = 129,
	DOTA_KEYBIND_SELECT_ALLY5 = 130,
	DOTA_KEYBIND_SHOP_TOGGLE = 131,
	DOTA_KEYBIND_SCOREBOARD_TOGGLE = 132,
	DOTA_KEYBIND_SCREENSHOT = 133,
	DOTA_KEYBIND_ESCAPE = 134,
	DOTA_KEYBIND_CONSOLE = 135,
	DOTA_KEYBIND_DEATH_SUMMARY = 136,
	DOTA_KEYBIND_LEARN_ABILITIES = 137,
	DOTA_KEYBIND_LEARN_STATS = 138,
	DOTA_KEYBIND_ACTIVATE_GLYPH = 139,
	DOTA_KEYBIND_ACTIVATE_RADAR = 140,
	DOTA_KEYBIND_PURCHASE_QUICKBUY = 141,
	DOTA_KEYBIND_PURCHASE_STICKY = 142,
	DOTA_KEYBIND_GRAB_STASH_ITEMS = 143,
	DOTA_KEYBIND_TOGGLE_AUTOATTACK = 144,
	DOTA_KEYBIND_TAUNT = 145,
	DOTA_KEYBIND_SHOP_CONSUMABLES = 146,
	DOTA_KEYBIND_SHOP_ATTRIBUTES = 147,
	DOTA_KEYBIND_SHOP_ARMAMENTS = 148,
	DOTA_KEYBIND_SHOP_ARCANE = 149,
	DOTA_KEYBIND_SHOP_BASICS = 150,
	DOTA_KEYBIND_SHOP_SUPPORT = 151,
	DOTA_KEYBIND_SHOP_CASTER = 152,
	DOTA_KEYBIND_SHOP_WEAPONS = 153,
	DOTA_KEYBIND_SHOP_ARMOR = 154,
	DOTA_KEYBIND_SHOP_ARTIFACTS = 155,
	DOTA_KEYBIND_SHOP_SIDE_PAGE_1 = 156,
	DOTA_KEYBIND_SHOP_SIDE_PAGE_2 = 157,
	DOTA_KEYBIND_SHOP_SECRET = 158,
	DOTA_KEYBIND_SHOP_SEARCHBOX = 159,
	DOTA_KEYBIND_SHOP_SLOT_1 = 160,
	DOTA_KEYBIND_SHOP_SLOT_2 = 161,
	DOTA_KEYBIND_SHOP_SLOT_3 = 162,
	DOTA_KEYBIND_SHOP_SLOT_4 = 163,
	DOTA_KEYBIND_SHOP_SLOT_5 = 164,
	DOTA_KEYBIND_SHOP_SLOT_6 = 165,
	DOTA_KEYBIND_SHOP_SLOT_7 = 166,
	DOTA_KEYBIND_SHOP_SLOT_8 = 167,
	DOTA_KEYBIND_SHOP_SLOT_9 = 168,
	DOTA_KEYBIND_SHOP_SLOT_10 = 169,
	DOTA_KEYBIND_SHOP_SLOT_11 = 170,
	DOTA_KEYBIND_SHOP_SLOT_12 = 171,
	DOTA_KEYBIND_SHOP_SLOT_13 = 172,
	DOTA_KEYBIND_SHOP_SLOT_14 = 173,
	DOTA_KEYBIND_SPEC_CAMERA_UP = 174,
	DOTA_KEYBIND_SPEC_CAMERA_DOWN = 175,
	DOTA_KEYBIND_SPEC_CAMERA_LEFT = 176,
	DOTA_KEYBIND_SPEC_CAMERA_RIGHT = 177,
	DOTA_KEYBIND_SPEC_CAMERA_GRIP = 178,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_1 = 179,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_2 = 180,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_3 = 181,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_4 = 182,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_5 = 183,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_6 = 184,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_7 = 185,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_8 = 186,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_9 = 187,
	DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_10 = 188,
	DOTA_KEYBIND_SPEC_UNIT_SELECT = 189,
	DOTA_KEYBIND_SPEC_HERO_SELECT = 190,
	DOTA_KEYBIND_SPEC_PAUSE = 191,
	DOTA_KEYBIND_SPEC_CHAT = 192,
	DOTA_KEYBIND_SPEC_SCOREBOARD = 193,
	DOTA_KEYBIND_SPEC_INCREASE_REPLAY_SPEED = 194,
	DOTA_KEYBIND_SPEC_DECREASE_REPLAY_SPEED = 195,
	DOTA_KEYBIND_SPEC_STATS_HARVEST = 196,
	DOTA_KEYBIND_SPEC_STATS_ITEM = 197,
	DOTA_KEYBIND_SPEC_STATS_GOLD = 198,
	DOTA_KEYBIND_SPEC_STATS_XP = 199,
	DOTA_KEYBIND_SPEC_STATS_FANTASY = 200,
	DOTA_KEYBIND_SPEC_STATS_WINCHANCE = 201,
	DOTA_KEYBIND_SPEC_FOW_TOGGLEBOTH = 202,
	DOTA_KEYBIND_SPEC_FOW_TOGGLERADIENT = 203,
	DOTA_KEYBIND_SPEC_FOW_TOGGLEDIRE = 204,
	DOTA_KEYBIND_SPEC_OPEN_BROADCASTER_MENU = 205,
	DOTA_KEYBIND_SPEC_DROPDOWN_KDA = 206,
	DOTA_KEYBIND_SPEC_DROPDOWN_LASTHITS_DENIES = 207,
	DOTA_KEYBIND_SPEC_DROPDOWN_LEVEL = 208,
	DOTA_KEYBIND_SPEC_DROPDOWN_XP_PER_MIN = 209,
	DOTA_KEYBIND_SPEC_DROPDOWN_GOLD = 210,
	DOTA_KEYBIND_SPEC_DROPDOWN_TOTALGOLD = 211,
	DOTA_KEYBIND_SPEC_DROPDOWN_GOLD_PER_MIN = 212,
	DOTA_KEYBIND_SPEC_DROPDOWN_BUYBACK = 213,
	DOTA_KEYBIND_SPEC_DROPDOWN_NETWORTH = 214,
	DOTA_KEYBIND_SPEC_DROPDOWN_FANTASY = 215,
	DOTA_KEYBIND_SPEC_DROPDOWN_SORT = 216,
	DOTA_KEYBIND_SPEC_DROPDOWN_CLOSE = 217,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_1 = 218,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_2 = 219,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_3 = 220,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_4 = 221,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_5 = 222,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_6 = 223,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_7 = 224,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_8 = 225,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_9 = 226,
	DOTA_KEYBIND_SPEC_FOCUS_PLAYER_10 = 227,
	DOTA_KEYBIND_SPEC_COACH_VIEWTOGGLE = 228,
	DOTA_KEYBIND_INSPECTHEROINWORLD = 229,
	DOTA_KEYBIND_CAMERA_ZOOM_IN = 230,
	DOTA_KEYBIND_CAMERA_ZOOM_OUT = 231,
	DOTA_KEYBIND_CONTROL_GROUPCYCLEPREV = 232,
	DOTA_KEYBIND_DOTA_ALT = 233,
	DOTA_KEYBIND_COUNT = 234,
}

declare enum modifierpriority {
	MODIFIER_PRIORITY_LOW = 0,
	MODIFIER_PRIORITY_NORMAL = 1,
	MODIFIER_PRIORITY_HIGH = 2,
	MODIFIER_PRIORITY_ULTRA = 3,
	MODIFIER_PRIORITY_SUPER_ULTRA = 4,
}

declare enum ParticleOrientationChoiceList_t {
	PARTICLE_ORIENTATION_SCREEN_ALIGNED = 0,
	PARTICLE_ORIENTATION_SCREEN_Z_ALIGNED = 1,
	PARTICLE_ORIENTATION_WORLD_Z_ALIGNED = 2,
	PARTICLE_ORIENTATION_ALIGN_TO_PARTICLE_NORMAL = 3,
	PARTICLE_ORIENTATION_SCREENALIGN_TO_PARTICLE_NORMAL = 4,
	PARTICLE_ORIENTATION_FULL_3AXIS_ROTATION = 5,
}

declare enum DOTA_SHOP_TYPE {
	DOTA_SHOP_HOME = 0,
	DOTA_SHOP_SIDE = 1,
	DOTA_SHOP_SECRET = 2,
	DOTA_SHOP_GROUND = 3,
	DOTA_SHOP_SIDE2 = 4,
	DOTA_SHOP_SECRET2 = 5,
	DOTA_SHOP_CUSTOM = 6,
	DOTA_SHOP_NEUTRALS = 7,
	DOTA_SHOP_NONE = 8,
}

declare enum EntityDisolveType_t {
	ENTITY_DISSOLVE_NORMAL = 0,
	ENTITY_DISSOLVE_ELECTRICAL = 1,
	ENTITY_DISSOLVE_ELECTRICAL_LIGHT = 2,
	ENTITY_DISSOLVE_CORE = 3,
}

declare enum LightSourceShape_t {
	LIGHT_SOURCE_SHAPE_SPHERE = 0,
}

declare enum RagdollBlendDirection {
	RAGDOLL_BLEND_IN = 0,
	RAGDOLL_BLEND_OUT = 1,
}

declare enum ShadowType_t {
	SHADOWS_NONE = 0,
	SHADOWS_SIMPLE = 1,
}

declare enum DOTASpeechType_t {
	DOTA_SPEECH_USER_INVALID = 0,
	DOTA_SPEECH_USER_SINGLE = 1,
	DOTA_SPEECH_USER_TEAM = 2,
	DOTA_SPEECH_USER_TEAM_NEARBY = 3,
	DOTA_SPEECH_USER_NEARBY = 4,
	DOTA_SPEECH_USER_ALL = 5,
	DOTA_SPEECH_GOOD_TEAM = 6,
	DOTA_SPEECH_BAD_TEAM = 7,
	DOTA_SPEECH_SPECTATOR = 8,
	DOTA_SPEECH_RECIPIENT_TYPE_MAX = 9,
}

declare enum Class_T {
	CLASS_NONE = 0,
	CLASS_PLAYER = 1,
	CLASS_PLAYER_ALLY = 2,
	CLASS_BULLSEYE = 3,
	LAST_SHARED_ENTITY_CLASS = 4,
}

declare enum TrainVelocityType_t {
	TrainVelocity_Instantaneous = 0,
	TrainVelocity_LinearBlend = 1,
	TrainVelocity_EaseInEaseOut = 2,
}

declare enum Disposition_t {
	D_ER = 0,
	D_HT = 1,
	D_FR = 2,
	D_LI = 3,
	D_NU = 4,
	D_ERROR = 0,
	D_HATE = 1,
	D_FEAR = 2,
	D_LIKE = 3,
	D_NEUTRAL = 4,
}

declare enum JiggleBoneSimSpace {
	SimSpace_Local = 0,
	SimSpace_Model = 1,
	SimSpace_World = 2,
}

declare enum TrackOrientationType_t {
	TrackOrientation_Fixed = 0,
	TrackOrientation_FacePath = 1,
	TrackOrientation_FacePathAngles = 2,
}

declare enum ParticleTopology_t {
	PARTICLE_TOPOLOGY_POINTS = 0,
	PARTICLE_TOPOLOGY_LINES = 1,
	PARTICLE_TOPOLOGY_TRIS = 2,
	PARTICLE_TOPOLOGY_QUADS = 3,
	PARTICLE_TOPOLOGY_CUBES = 4,
}

declare enum vmix_filter_type_t {
	FILTER_UNKNOWN = -1,
	FILTER_LOWPASS = 0,
	FILTER_HIGHPASS = 1,
	FILTER_BANDPASS = 2,
	FILTER_NOTCH = 3,
	FILTER_PEAKING_EQ = 4,
	FILTER_LOW_SHELF = 5,
	FILTER_HIGH_SHELF = 6,
}

declare enum DOTA_HeroPickState {
	DOTA_HEROPICK_STATE_NONE = 0,
	DOTA_HEROPICK_STATE_AP_SELECT = 1,
	DOTA_HEROPICK_STATE_SD_SELECT = 2,
	DOTA_HEROPICK_STATE_INTRO_SELECT_UNUSED = 3,
	DOTA_HEROPICK_STATE_RD_SELECT_UNUSED = 4,
	DOTA_HEROPICK_STATE_CM_INTRO = 5,
	DOTA_HEROPICK_STATE_CM_CAPTAINPICK = 6,
	DOTA_HEROPICK_STATE_CM_BAN1 = 7,
	DOTA_HEROPICK_STATE_CM_BAN2 = 8,
	DOTA_HEROPICK_STATE_CM_BAN3 = 9,
	DOTA_HEROPICK_STATE_CM_BAN4 = 10,
	DOTA_HEROPICK_STATE_CM_BAN5 = 11,
	DOTA_HEROPICK_STATE_CM_BAN6 = 12,
	DOTA_HEROPICK_STATE_CM_BAN7 = 13,
	DOTA_HEROPICK_STATE_CM_BAN8 = 14,
	DOTA_HEROPICK_STATE_CM_BAN9 = 15,
	DOTA_HEROPICK_STATE_CM_BAN10 = 16,
	DOTA_HEROPICK_STATE_CM_BAN11 = 17,
	DOTA_HEROPICK_STATE_CM_BAN12 = 18,
	DOTA_HEROPICK_STATE_CM_BAN13 = 19,
	DOTA_HEROPICK_STATE_CM_BAN14 = 20,
	DOTA_HEROPICK_STATE_CM_SELECT1 = 21,
	DOTA_HEROPICK_STATE_CM_SELECT2 = 22,
	DOTA_HEROPICK_STATE_CM_SELECT3 = 23,
	DOTA_HEROPICK_STATE_CM_SELECT4 = 24,
	DOTA_HEROPICK_STATE_CM_SELECT5 = 25,
	DOTA_HEROPICK_STATE_CM_SELECT6 = 26,
	DOTA_HEROPICK_STATE_CM_SELECT7 = 27,
	DOTA_HEROPICK_STATE_CM_SELECT8 = 28,
	DOTA_HEROPICK_STATE_CM_SELECT9 = 29,
	DOTA_HEROPICK_STATE_CM_SELECT10 = 30,
	DOTA_HEROPICK_STATE_CM_PICK = 31,
	DOTA_HEROPICK_STATE_AR_SELECT = 32,
	DOTA_HEROPICK_STATE_MO_SELECT = 33,
	DOTA_HEROPICK_STATE_FH_SELECT = 34,
	DOTA_HEROPICK_STATE_CD_INTRO = 35,
	DOTA_HEROPICK_STATE_CD_CAPTAINPICK = 36,
	DOTA_HEROPICK_STATE_CD_BAN1 = 37,
	DOTA_HEROPICK_STATE_CD_BAN2 = 38,
	DOTA_HEROPICK_STATE_CD_BAN3 = 39,
	DOTA_HEROPICK_STATE_CD_BAN4 = 40,
	DOTA_HEROPICK_STATE_CD_BAN5 = 41,
	DOTA_HEROPICK_STATE_CD_BAN6 = 42,
	DOTA_HEROPICK_STATE_CD_SELECT1 = 43,
	DOTA_HEROPICK_STATE_CD_SELECT2 = 44,
	DOTA_HEROPICK_STATE_CD_SELECT3 = 45,
	DOTA_HEROPICK_STATE_CD_SELECT4 = 46,
	DOTA_HEROPICK_STATE_CD_SELECT5 = 47,
	DOTA_HEROPICK_STATE_CD_SELECT6 = 48,
	DOTA_HEROPICK_STATE_CD_SELECT7 = 49,
	DOTA_HEROPICK_STATE_CD_SELECT8 = 50,
	DOTA_HEROPICK_STATE_CD_SELECT9 = 51,
	DOTA_HEROPICK_STATE_CD_SELECT10 = 52,
	DOTA_HEROPICK_STATE_CD_PICK = 53,
	DOTA_HEROPICK_STATE_BD_SELECT = 54,
	DOTA_HERO_PICK_STATE_ABILITY_DRAFT_SELECT = 55,
	DOTA_HERO_PICK_STATE_ARDM_SELECT = 56,
	DOTA_HEROPICK_STATE_ALL_DRAFT_SELECT = 57,
	DOTA_HERO_PICK_STATE_CUSTOMGAME_SELECT = 58,
	DOTA_HEROPICK_STATE_SELECT_PENALTY = 59,
	DOTA_HEROPICK_STATE_CUSTOM_PICK_RULES = 60,
	DOTA_HEROPICK_STATE_COUNT = 61,
}

declare enum AttributeDerivedStats {
	DOTA_ATTRIBUTE_STRENGTH_DAMAGE = 0,
	DOTA_ATTRIBUTE_STRENGTH_HP = 1,
	DOTA_ATTRIBUTE_STRENGTH_HP_REGEN = 2,
	DOTA_ATTRIBUTE_AGILITY_DAMAGE = 3,
	DOTA_ATTRIBUTE_AGILITY_ARMOR = 4,
	DOTA_ATTRIBUTE_AGILITY_ATTACK_SPEED = 5,
	DOTA_ATTRIBUTE_INTELLIGENCE_DAMAGE = 6,
	DOTA_ATTRIBUTE_INTELLIGENCE_MANA = 7,
	DOTA_ATTRIBUTE_INTELLIGENCE_MANA_REGEN = 8,
}

declare enum DampingSpeedFunction {
	NoDamping = 0,
	Constant = 1,
	Spring = 2,
}

declare enum SolveIKChainAnimNodeSettingSource {
	SOLVEIKCHAINANIMNODESETTINGSOURCE_Default = 0,
	SOLVEIKCHAINANIMNODESETTINGSOURCE_Override = 1,
}

declare enum ShatterDamageCause {
	SHATTERDAMAGE_BULLET = 0,
	SHATTERDAMAGE_MELEE = 1,
	SHATTERDAMAGE_THROWN = 2,
	SHATTERDAMAGE_SCRIPT = 3,
	SHATTERDAMAGE_EXPLOSIVE = 4,
}

declare enum RenderMode_t {
	kRenderNormal = 0,
	kRenderTransColor = 1,
	kRenderTransTexture = 2,
	kRenderGlow = 3,
	kRenderTransAlpha = 4,
	kRenderTransAdd = 5,
	kRenderEnvironmental = 6,
	kRenderTransAddFrameBlend = 7,
	kRenderTransAlphaAdd = 8,
	kRenderWorldGlow = 9,
	kRenderNone = 10,
	kRenderDevVisualizer = 11,
	kRenderModeCount = 12,
}

declare enum EDOTA_ModifyXP_Reason {
	DOTA_ModifyXP_Unspecified = 0,
	DOTA_ModifyXP_HeroKill = 1,
	DOTA_ModifyXP_CreepKill = 2,
	DOTA_ModifyXP_RoshanKill = 3,
	DOTA_ModifyXP_TomeOfKnowledge = 4,
	DOTA_ModifyXP_Outpost = 5,
	DOTA_ModifyXP_MAX = 6,
}

declare enum ShatterPanelMode {
	SHATTER_GLASS = 0,
	SHATTER_DRYWALL = 1,
}

declare enum ParticleColorBlendType_t {
	PARTICLE_COLOR_BLEND_MULTIPLY = 0,
	PARTICLE_COLOR_BLEND_ADD = 1,
	PARTICLE_COLOR_BLEND_SUBTRACT = 2,
	PARTICLE_COLOR_BLEND_MOD2X = 3,
	PARTICLE_COLOR_BLEND_SCREEN = 4,
	PARTICLE_COLOR_BLEND_MAX = 5,
	PARTICLE_COLOR_BLEND_MIN = 6,
	PARTICLE_COLOR_BLEND_REPLACE = 7,
}

declare enum BeamClipStyle_t {
	kNOCLIP = 0,
	kGEOCLIP = 1,
	kMODELCLIP = 2,
	kBEAMCLIPSTYLE_NUMBITS = 2,
}

declare enum MaterialModifyMode_t {
	MATERIAL_MODIFY_MODE_NONE = 0,
	MATERIAL_MODIFY_MODE_SETVAR = 1,
	MATERIAL_MODIFY_MODE_ANIM_SEQUENCE = 2,
	MATERIAL_MODIFY_MODE_FLOAT_LERP = 3,
}

declare enum soundlevel_t {
	SNDLVL_NONE = 0,
	SNDLVL_20dB = 20,
	SNDLVL_25dB = 25,
	SNDLVL_30dB = 30,
	SNDLVL_35dB = 35,
	SNDLVL_40dB = 40,
	SNDLVL_45dB = 45,
	SNDLVL_50dB = 50,
	SNDLVL_55dB = 55,
	SNDLVL_IDLE = 60,
	SNDLVL_60dB = 60,
	SNDLVL_65dB = 65,
	SNDLVL_STATIC = 66,
	SNDLVL_70dB = 70,
	SNDLVL_NORM = 75,
	SNDLVL_75dB = 75,
	SNDLVL_80dB = 80,
	SNDLVL_TALKING = 80,
	SNDLVL_85dB = 85,
	SNDLVL_90dB = 90,
	SNDLVL_95dB = 95,
	SNDLVL_100dB = 100,
	SNDLVL_105dB = 105,
	SNDLVL_110dB = 110,
	SNDLVL_120dB = 120,
	SNDLVL_130dB = 130,
	SNDLVL_GUNFIRE = 140,
	SNDLVL_140dB = 140,
	SNDLVL_150dB = 150,
	SNDLVL_180dB = 180,
}

declare enum AnimationSnapshotType_t {
	ANIMATION_SNAPSHOT_SERVER_SIMULATION = 0,
	ANIMATION_SNAPSHOT_CLIENT_SIMULATION = 1,
	ANIMATION_SNAPSHOT_CLIENT_PREDICTION = 2,
	ANIMATION_SNAPSHOT_CLIENT_INTERPOLATION = 3,
	ANIMATION_SNAPSHOT_CLIENT_RENDER = 4,
	ANIMATION_SNAPSHOT_FINAL_COMPOSITE = 5,
	ANIMATION_SNAPSHOT_MAX = 6,
}

declare enum ValueRemapperRatchetType_t {
	RatchetType_Absolute = 0,
	RatchetType_EachEngage = 1,
}

declare enum ParticleCollisionMode_t {
	COLLISION_MODE_PER_PARTICLE_TRACE = 3,
	COLLISION_MODE_USE_NEAREST_TRACE = 2,
	COLLISION_MODE_PER_FRAME_PLANESET = 1,
	COLLISION_MODE_INITIAL_TRACE_DOWN = 0,
	COLLISION_MODE_DISABLED = -1,
}

declare enum PermModelInfo_t__FlagEnum {
	PermModelInfo_t__FLAG_TRANSLUCENT = 1,
	PermModelInfo_t__FLAG_TRANSLUCENT_TWO_PASS = 2,
	PermModelInfo_t__FLAG_MODEL_IS_RUNTIME_COMBINED = 4,
	PermModelInfo_t__FLAG_SOURCE1_IMPORT = 8,
	PermModelInfo_t__FLAG_MODEL_PART_CHILD = 16,
	PermModelInfo_t__FLAG_NAV_GEN_NONE = 32,
	PermModelInfo_t__FLAG_NAV_GEN_HULL = 64,
	PermModelInfo_t__FLAG_NO_FORCED_FADE = 2048,
	PermModelInfo_t__FLAG_HAS_SKINNED_MESHES = 1024,
	PermModelInfo_t__FLAG_DO_NOT_CAST_SHADOWS = 131072,
	PermModelInfo_t__FLAG_FORCE_PHONEME_CROSSFADE = 4096,
	PermModelInfo_t__FLAG_NO_ANIM_EVENTS = 1048576,
	PermModelInfo_t__FLAG_ANIMATION_DRIVEN_FLEXES = 2097152,
	PermModelInfo_t__FLAG_IMPLICIT_BIND_POSE_SEQUENCE = 4194304,
	PermModelInfo_t__FLAG_MODEL_DOC = 8388608,
}

declare enum gamerules_roundstate_t {
	GR_STATE_INIT = 0,
	GR_STATE_PREGAME = 1,
	GR_STATE_STARTGAME = 2,
	GR_STATE_PREROUND = 3,
	GR_STATE_RND_RUNNING = 4,
	GR_STATE_TEAM_WIN = 5,
	GR_STATE_RESTART = 6,
	GR_STATE_STALEMATE = 7,
	GR_STATE_GAME_OVER = 8,
	GR_NUM_ROUND_STATES = 9,
}

declare enum ParticleColorBlendMode_t {
	PARTICLEBLEND_DEFAULT = 0,
	PARTICLEBLEND_OVERLAY = 1,
	PARTICLEBLEND_DARKEN = 2,
	PARTICLEBLEND_LIGHTEN = 3,
	PARTICLEBLEND_MULTIPLY = 4,
}

declare enum PropDoorRotatingOpenDirection_e {
	DOOR_ROTATING_OPEN_BOTH_WAYS = 0,
	DOOR_ROTATING_OPEN_FORWARD = 1,
	DOOR_ROTATING_OPEN_BACKWARD = 2,
}

declare enum eEconItemOrigin {
	kEconItemOrigin_Invalid = -1,
	kEconItemOrigin_Drop = 0,
	kEconItemOrigin_Achievement = 1,
	kEconItemOrigin_Purchased = 2,
	kEconItemOrigin_Traded = 3,
	kEconItemOrigin_Crafted = 4,
	kEconItemOrigin_StorePromotion = 5,
	kEconItemOrigin_Gifted = 6,
	kEconItemOrigin_SupportGranted = 7,
	kEconItemOrigin_FoundInCrate = 8,
	kEconItemOrigin_Earned = 9,
	kEconItemOrigin_ThirdPartyPromotion = 10,
	kEconItemOrigin_GiftWrapped = 11,
	kEconItemOrigin_HalloweenDrop = 12,
	kEconItemOrigin_PackageItem = 13,
	kEconItemOrigin_Foreign = 14,
	kEconItemOrigin_CDKey = 15,
	kEconItemOrigin_CollectionReward = 16,
	kEconItemOrigin_PreviewItem = 17,
	kEconItemOrigin_SteamWorkshopContribution = 18,
	kEconItemOrigin_PeriodicScoreReward = 19,
	kEconItemOrigin_Recycling = 20,
	kEconItemOrigin_TournamentDrop = 21,
	kEconItemOrigin_PassportReward = 22,
	kEconItemOrigin_TutorialDrop = 23,
	kEconItemOrigin_RecipeOutput = 24,
	kEconItemOrigin_GemExtract = 25,
	kEconItemOrigin_EventPointReward = 26,
	kEconItemOrigin_ItemRedemption = 27,
	kEconItemOrigin_FantasyTicketRefund = 28,
	kEconItemOrigin_VictoryPredictionReward = 29,
	kEconItemOrigin_AssassinEventReward = 30,
	kEconItemOrigin_CompendiumReward = 31,
	kEconItemOrigin_CompendiumDrop = 32,
	kEconItemOrigin_MysteryItem = 33,
	kEconItemOrigin_UnpackedFromBundle = 34,
	kEconItemOrigin_WonFromWeeklyGame = 35,
	kEconItemOrigin_SeasonalItemGrant = 36,
	kEconItemOrigin_PackOpening = 37,
	kEconItemOrigin_InitialGrant = 38,
	kEconItemOrigin_MarketPurchase = 39,
	kEconItemOrigin_MarketRefunded = 40,
	kEconItemOrigin_LimitedDraft = 41,
	kEconItemOrigin_GauntletReward = 42,
	kEconItemOrigin_CompendiumGift = 43,
	kEconItemOrigin_Max = 44,
}

declare enum SelectionSource_t {
	SelectionSource_Bool = 0,
	SelectionSource_Enum = 1,
}

declare enum DOTALimits_t {
	DOTA_MAX_PLAYERS = 64,
	DOTA_MAX_TEAM = 24,
	DOTA_MAX_PLAYER_TEAMS = 10,
	DOTA_MAX_TEAM_PLAYERS = 24,
	DOTA_MAX_SPECTATOR_TEAM_SIZE = 40,
	DOTA_MAX_SPECTATOR_LOBBY_SIZE = 15,
	DOTA_DEFAULT_MAX_TEAM = 5,
	DOTA_DEFAULT_MAX_TEAM_PLAYERS = 10,
}

declare enum interactions_t {
	INTERACTION_NONE = -1,
	NUM_HAND_INTERACTIONS = 0,
}

declare enum LifeState_t {
	LIFE_ALIVE = 0,
	LIFE_DYING = 1,
	LIFE_DEAD = 2,
	LIFE_RESPAWNABLE = 3,
	LIFE_RESPAWNING = 4,
}

declare enum voxel_vis_compression_t {
	VOXVIS_COMPRESS_RAW = 0,
	VOXVIS_COMPRESS_RLE = 1,
}

declare enum DamageOptions_t {
	DAMAGE_NO = 0,
	DAMAGE_EVENTS_ONLY = 1,
	DAMAGE_YES = 2,
}

declare enum PortraitSoundMode_t {
	PORTRAIT_SOUND_MODE_INVALID = -1,
	PORTRAIT_SOUND_MODE_NO_SOUNDS = 0,
	PORTRAIT_SOUND_MODE_ONLY_TAUNT_SOUNDS = 1,
	PORTRAIT_SOUND_MODE_ALL_SOUNDS = 2,
}

declare enum EntityLumpFlags_t {
	ENTITY_LUMP_NONE = 0,
}

declare enum EntFinderMethod_t {
	ENT_FIND_METHOD_NEAREST = 0,
	ENT_FIND_METHOD_FARTHEST = 1,
	ENT_FIND_METHOD_RANDOM = 2,
}

declare enum DOTA_SHOP_CATEGORY {
	DOTA_SHOP_CATEGORY_NONE = -1,
	DOTA_SHOP_CATEGORY_CONSUMABLES = 0,
	DOTA_SHOP_CATEGORY_ATTRIBUTES = 1,
	DOTA_SHOP_CATEGORY_WEAPONS_ARMOR = 2,
	DOTA_SHOP_CATEGORY_MISC = 3,
	DOTA_SHOP_CATEGORY_BASICS = 4,
	DOTA_SHOP_CATEGORY_SUPPORT = 5,
	DOTA_SHOP_CATEGORY_MAGICS = 6,
	DOTA_SHOP_CATEGORY_WEAPONS = 7,
	DOTA_SHOP_CATEGORY_DEFENSE = 8,
	DOTA_SHOP_CATEGORY_ARTIFACTS = 9,
	DOTA_SHOP_CATEGORY_SIDE_SHOP_PAGE_1 = 10,
	DOTA_SHOP_CATEGORY_SIDE_SHOP_PAGE_2 = 11,
	DOTA_SHOP_CATEGORY_SECRET_SHOP = 12,
	DOTA_SHOP_CATEGORY_RECOMMENDED_ITEMS = 13,
	DOTA_SHOP_CATEGORY_SEARCH_RESULTS = 14,
	NUM_SHOP_CATEGORIES = 15,
}

declare enum IkEndEffectorType {
	IkEndEffector_Attachment = 0,
	IkEndEffector_Bone = 1,
}

declare enum eLiteralHandType {
	LITERAL_HAND_TYPE_UNKNOWN = -1,
	LITERAL_HAND_TYPE_RIGHT = 0,
	LITERAL_HAND_TYPE_LEFT = 1,
	LITERAL_HAND_TYPE_COUNT = 2,
}

declare enum WeaponState_t {
	WEAPON_NOT_CARRIED = 0,
	WEAPON_IS_CARRIED_BY_PLAYER = 1,
	WEAPON_IS_ACTIVE = 2,
}

declare enum IkTargetType {
	IkTarget_Attachment = 0,
	IkTarget_Bone = 1,
	IkTarget_Parameter_ModelSpace = 2,
	IkTarget_Parameter_WorldSpace = 3,
}

declare enum UnitFilterResult {
	UF_SUCCESS = 0,
	UF_FAIL_FRIENDLY = 1,
	UF_FAIL_ENEMY = 2,
	UF_FAIL_HERO = 3,
	UF_FAIL_CONSIDERED_HERO = 4,
	UF_FAIL_CREEP = 5,
	UF_FAIL_BUILDING = 6,
	UF_FAIL_COURIER = 7,
	UF_FAIL_OTHER = 8,
	UF_FAIL_ANCIENT = 9,
	UF_FAIL_ILLUSION = 10,
	UF_FAIL_SUMMONED = 11,
	UF_FAIL_DOMINATED = 12,
	UF_FAIL_MELEE = 13,
	UF_FAIL_RANGED = 14,
	UF_FAIL_DEAD = 15,
	UF_FAIL_MAGIC_IMMUNE_ALLY = 16,
	UF_FAIL_MAGIC_IMMUNE_ENEMY = 17,
	UF_FAIL_INVULNERABLE = 18,
	UF_FAIL_IN_FOW = 19,
	UF_FAIL_INVISIBLE = 20,
	UF_FAIL_NOT_PLAYER_CONTROLLED = 21,
	UF_FAIL_ATTACK_IMMUNE = 22,
	UF_FAIL_CUSTOM = 23,
	UF_FAIL_INVALID_LOCATION = 24,
	UF_FAIL_DISABLE_HELP = 25,
	UF_FAIL_OUT_OF_WORLD = 26,
	UF_FAIL_NIGHTMARED = 27,
	UF_FAIL_OBSTRUCTED = 28,
}

declare enum doorCheck_e {
	DOOR_CHECK_FORWARD = 0,
	DOOR_CHECK_BACKWARD = 1,
	DOOR_CHECK_FULL = 2,
}

declare enum SPELL_IMMUNITY_TYPES {
	SPELL_IMMUNITY_NONE = 0,
	SPELL_IMMUNITY_ALLIES_YES = 1,
	SPELL_IMMUNITY_ALLIES_NO = 2,
	SPELL_IMMUNITY_ENEMIES_YES = 3,
	SPELL_IMMUNITY_ENEMIES_NO = 4,
	SPELL_IMMUNITY_ALLIES_YES_ENEMIES_NO = 5,
}

declare enum PFNoiseType_t {
	PF_NOISE_TYPE_PERLIN = 0,
	PF_NOISE_TYPE_SIMPLEX = 1,
	PF_NOISE_TYPE_WORLEY = 2,
	PF_NOISE_TYPE_CURL = 3,
}

declare enum ParticleFloatBiasType_t {
	PF_BIAS_TYPE_INVALID = -1,
	PF_BIAS_TYPE_STANDARD = 0,
	PF_BIAS_TYPE_GAIN = 1,
	PF_BIAS_TYPE_EXPONENTIAL = 2,
	PF_BIAS_TYPE_COUNT = 3,
}

declare enum ParticleDepthFeatheringMode_t {
	PARTICLE_DEPTH_FEATHERING_OFF = 0,
	PARTICLE_DEPTH_FEATHERING_ON_OPTIONAL = 1,
	PARTICLE_DEPTH_FEATHERING_ON_REQUIRED = 2,
}

declare enum RenderSlotType_t {
	RENDER_SLOT_INVALID = -1,
	RENDER_SLOT_PER_VERTEX = 0,
	RENDER_SLOT_PER_INSTANCE = 1,
}

declare enum VPhysXConstraintParams_t__EnumFlags0_t {
	VPhysXConstraintParams_t__FLAG0_SHIFT_INTERPENETRATE = 0,
	VPhysXConstraintParams_t__FLAG0_SHIFT_CONSTRAIN = 1,
	VPhysXConstraintParams_t__FLAG0_SHIFT_BREAKABLE_FORCE = 2,
	VPhysXConstraintParams_t__FLAG0_SHIFT_BREAKABLE_TORQUE = 3,
}

declare enum AnimValueSource {
	MoveHeading = 0,
	MoveSpeed = 1,
	ForwardSpeed = 2,
	StrafeSpeed = 3,
	FacingHeading = 4,
	ManualFacingHeading = 5,
	LookHeading = 6,
	LookPitch = 7,
	Parameter = 8,
	WayPointHeading = 9,
	WayPointDistance = 10,
	BoundaryRadius = 11,
	TargetMoveHeading = 12,
	TargetMoveSpeed = 13,
	AccelerationHeading = 14,
	AccelerationSpeed = 15,
	SlopeHeading = 16,
	SlopeAngle = 17,
	SlopePitch = 18,
	SlopeYaw = 19,
	GoalDistance = 20,
	AccelerationLeftRight = 21,
	AccelerationFrontBack = 22,
	RootMotionSpeed = 23,
	RootMotionTurnSpeed = 24,
	MoveHeadingRelativeToLookHeading = 25,
	MaxMoveSpeed = 26,
	FingerCurl_Thumb = 27,
	FingerCurl_Index = 28,
	FingerCurl_Middle = 29,
	FingerCurl_Ring = 30,
	FingerCurl_Pinky = 31,
	FingerSplay_Thumb_Index = 32,
	FingerSplay_Index_Middle = 33,
	FingerSplay_Middle_Ring = 34,
	FingerSplay_Ring_Pinky = 35,
}

declare enum modifierfunction {
	MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE = 0,
	MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_TARGET = 1,
	MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_PROC = 2,
	MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_POST_CRIT = 3,
	MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE = 4,
	MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL = 5,
	MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL = 6,
	MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PURE = 7,
	MODIFIER_PROPERTY_PROCATTACK_FEEDBACK = 8,
	MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE = 9,
	MODIFIER_PROPERTY_PRE_ATTACK = 10,
	MODIFIER_PROPERTY_INVISIBILITY_LEVEL = 11,
	MODIFIER_PROPERTY_INVISIBILITY_ATTACK_BEHAVIOR_EXCEPTION = 12,
	MODIFIER_PROPERTY_PERSISTENT_INVISIBILITY = 13,
	MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT = 14,
	MODIFIER_PROPERTY_MOVESPEED_BASE_OVERRIDE = 15,
	MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE = 16,
	MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE = 17,
	MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE_2 = 18,
	MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE = 19,
	MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE_2 = 20,
	MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE = 21,
	MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE_2 = 22,
	MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE = 23,
	MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MIN = 24,
	MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX = 25,
	MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT = 26,
	MODIFIER_PROPERTY_MOVESPEED_LIMIT = 27,
	MODIFIER_PROPERTY_ATTACKSPEED_BASE_OVERRIDE = 28,
	MODIFIER_PROPERTY_FIXED_ATTACK_RATE = 29,
	MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT = 30,
	MODIFIER_PROPERTY_COOLDOWN_REDUCTION_CONSTANT = 31,
	MODIFIER_PROPERTY_MANACOST_REDUCTION_CONSTANT = 32,
	MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT = 33,
	MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT_ADJUST = 34,
	MODIFIER_PROPERTY_ATTACK_POINT_CONSTANT = 35,
	MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE = 36,
	MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION = 37,
	MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION_AMPLIFY = 38,
	MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE = 39,
	MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE = 40,
	MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE_UNIQUE = 41,
	MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_SOURCE = 42,
	MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET = 43,
	MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE = 44,
	MODIFIER_PROPERTY_LIFESTEAL_AMPLIFY_PERCENTAGE = 45,
	MODIFIER_PROPERTY_SPELL_LIFESTEAL_AMPLIFY_PERCENTAGE = 46,
	MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE = 47,
	MODIFIER_PROPERTY_MANA_DRAIN_AMPLIFY_PERCENTAGE = 48,
	MODIFIER_PROPERTY_MP_RESTORE_AMPLIFY_PERCENTAGE = 49,
	MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE = 50,
	MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE_UNIQUE = 51,
	MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE = 52,
	MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_PERCENTAGE = 53,
	MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_CONSTANT = 54,
	MODIFIER_PROPERTY_INCOMING_SPELL_DAMAGE_CONSTANT = 55,
	MODIFIER_PROPERTY_EVASION_CONSTANT = 56,
	MODIFIER_PROPERTY_NEGATIVE_EVASION_CONSTANT = 57,
	MODIFIER_PROPERTY_STATUS_RESISTANCE = 58,
	MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING = 59,
	MODIFIER_PROPERTY_STATUS_RESISTANCE_CASTER = 60,
	MODIFIER_PROPERTY_AVOID_DAMAGE = 61,
	MODIFIER_PROPERTY_AVOID_SPELL = 62,
	MODIFIER_PROPERTY_MISS_PERCENTAGE = 63,
	MODIFIER_PROPERTY_PHYSICAL_ARMOR_BASE_PERCENTAGE = 64,
	MODIFIER_PROPERTY_PHYSICAL_ARMOR_TOTAL_PERCENTAGE = 65,
	MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS = 66,
	MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE = 67,
	MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE_ACTIVE = 68,
	MODIFIER_PROPERTY_IGNORE_PHYSICAL_ARMOR = 69,
	MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BASE_REDUCTION = 70,
	MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DIRECT_MODIFICATION = 71,
	MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS = 72,
	MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_ILLUSIONS = 73,
	MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DECREPIFY_UNIQUE = 74,
	MODIFIER_PROPERTY_BASE_MANA_REGEN = 75,
	MODIFIER_PROPERTY_MANA_REGEN_CONSTANT = 76,
	MODIFIER_PROPERTY_MANA_REGEN_CONSTANT_UNIQUE = 77,
	MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE = 78,
	MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT = 79,
	MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE = 80,
	MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE_UNIQUE = 81,
	MODIFIER_PROPERTY_HEALTH_BONUS = 82,
	MODIFIER_PROPERTY_MANA_BONUS = 83,
	MODIFIER_PROPERTY_EXTRA_STRENGTH_BONUS = 84,
	MODIFIER_PROPERTY_EXTRA_HEALTH_BONUS = 85,
	MODIFIER_PROPERTY_EXTRA_MANA_BONUS = 86,
	MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE = 87,
	MODIFIER_PROPERTY_EXTRA_MANA_PERCENTAGE = 88,
	MODIFIER_PROPERTY_STATS_STRENGTH_BONUS = 89,
	MODIFIER_PROPERTY_STATS_AGILITY_BONUS = 90,
	MODIFIER_PROPERTY_STATS_INTELLECT_BONUS = 91,
	MODIFIER_PROPERTY_STATS_STRENGTH_BONUS_PERCENTAGE = 92,
	MODIFIER_PROPERTY_STATS_AGILITY_BONUS_PERCENTAGE = 93,
	MODIFIER_PROPERTY_STATS_INTELLECT_BONUS_PERCENTAGE = 94,
	MODIFIER_PROPERTY_CAST_RANGE_BONUS = 95,
	MODIFIER_PROPERTY_CAST_RANGE_BONUS_TARGET = 96,
	MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING = 97,
	MODIFIER_PROPERTY_ATTACK_RANGE_BASE_OVERRIDE = 98,
	MODIFIER_PROPERTY_ATTACK_RANGE_BONUS = 99,
	MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_UNIQUE = 100,
	MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_PERCENTAGE = 101,
	MODIFIER_PROPERTY_MAX_ATTACK_RANGE = 102,
	MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS = 103,
	MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS_PERCENTAGE = 104,
	MODIFIER_PROPERTY_PROJECTILE_NAME = 105,
	MODIFIER_PROPERTY_REINCARNATION = 106,
	MODIFIER_PROPERTY_RESPAWNTIME = 107,
	MODIFIER_PROPERTY_RESPAWNTIME_PERCENTAGE = 108,
	MODIFIER_PROPERTY_RESPAWNTIME_STACKING = 109,
	MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE = 110,
	MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_ONGOING = 111,
	MODIFIER_PROPERTY_CASTTIME_PERCENTAGE = 112,
	MODIFIER_PROPERTY_MANACOST_PERCENTAGE = 113,
	MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING = 114,
	MODIFIER_PROPERTY_DEATHGOLDCOST = 115,
	MODIFIER_PROPERTY_EXP_RATE_BOOST = 116,
	MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE = 117,
	MODIFIER_PROPERTY_PREATTACK_TARGET_CRITICALSTRIKE = 118,
	MODIFIER_PROPERTY_MAGICAL_CONSTANT_BLOCK = 119,
	MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK = 120,
	MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK_SPECIAL = 121,
	MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK_UNAVOIDABLE_PRE_ARMOR = 122,
	MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK = 123,
	MODIFIER_PROPERTY_OVERRIDE_ANIMATION = 124,
	MODIFIER_PROPERTY_OVERRIDE_ANIMATION_WEIGHT = 125,
	MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE = 126,
	MODIFIER_PROPERTY_ABSORB_SPELL = 127,
	MODIFIER_PROPERTY_REFLECT_SPELL = 128,
	MODIFIER_PROPERTY_DISABLE_AUTOATTACK = 129,
	MODIFIER_PROPERTY_BONUS_DAY_VISION = 130,
	MODIFIER_PROPERTY_BONUS_NIGHT_VISION = 131,
	MODIFIER_PROPERTY_BONUS_NIGHT_VISION_UNIQUE = 132,
	MODIFIER_PROPERTY_BONUS_VISION_PERCENTAGE = 133,
	MODIFIER_PROPERTY_FIXED_DAY_VISION = 134,
	MODIFIER_PROPERTY_FIXED_NIGHT_VISION = 135,
	MODIFIER_PROPERTY_MIN_HEALTH = 136,
	MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL = 137,
	MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL = 138,
	MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE = 139,
	MODIFIER_PROPERTY_IS_ILLUSION = 140,
	MODIFIER_PROPERTY_ILLUSION_LABEL = 141,
	MODIFIER_PROPERTY_STRONG_ILLUSION = 142,
	MODIFIER_PROPERTY_SUPER_ILLUSION = 143,
	MODIFIER_PROPERTY_SUPER_ILLUSION_WITH_ULTIMATE = 144,
	MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE = 145,
	MODIFIER_PROPERTY_TURN_RATE_OVERRIDE = 146,
	MODIFIER_PROPERTY_DISABLE_HEALING = 147,
	MODIFIER_PROPERTY_ALWAYS_ALLOW_ATTACK = 148,
	MODIFIER_PROPERTY_ALWAYS_ETHEREAL_ATTACK = 149,
	MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL = 150,
	MODIFIER_PROPERTY_UNIT_STATS_NEEDS_REFRESH = 151,
	MODIFIER_PROPERTY_BOUNTY_CREEP_MULTIPLIER = 152,
	MODIFIER_PROPERTY_BOUNTY_OTHER_MULTIPLIER = 153,
	MODIFIER_PROPERTY_UNIT_DISALLOW_UPGRADING = 154,
	MODIFIER_PROPERTY_DODGE_PROJECTILE = 155,
	MODIFIER_PROPERTY_TRIGGER_COSMETIC_AND_END_ATTACK = 156,
	MODIFIER_EVENT_ON_SPELL_TARGET_READY = 157,
	MODIFIER_EVENT_ON_ATTACK_RECORD = 158,
	MODIFIER_EVENT_ON_ATTACK_START = 159,
	MODIFIER_EVENT_ON_ATTACK = 160,
	MODIFIER_EVENT_ON_ATTACK_LANDED = 161,
	MODIFIER_EVENT_ON_ATTACK_FAIL = 162,
	MODIFIER_EVENT_ON_ATTACK_ALLIED = 163,
	MODIFIER_EVENT_ON_PROJECTILE_DODGE = 164,
	MODIFIER_EVENT_ON_ORDER = 165,
	MODIFIER_EVENT_ON_UNIT_MOVED = 166,
	MODIFIER_EVENT_ON_ABILITY_START = 167,
	MODIFIER_EVENT_ON_ABILITY_EXECUTED = 168,
	MODIFIER_EVENT_ON_ABILITY_FULLY_CAST = 169,
	MODIFIER_EVENT_ON_BREAK_INVISIBILITY = 170,
	MODIFIER_EVENT_ON_ABILITY_END_CHANNEL = 171,
	MODIFIER_EVENT_ON_PROCESS_UPGRADE = 172,
	MODIFIER_EVENT_ON_REFRESH = 173,
	MODIFIER_EVENT_ON_TAKEDAMAGE = 174,
	MODIFIER_EVENT_ON_DEATH_PREVENTED = 175,
	MODIFIER_EVENT_ON_STATE_CHANGED = 176,
	MODIFIER_EVENT_ON_ORB_EFFECT = 177,
	MODIFIER_EVENT_ON_PROCESS_CLEAVE = 178,
	MODIFIER_EVENT_ON_DAMAGE_CALCULATED = 179,
	MODIFIER_EVENT_ON_ATTACKED = 180,
	MODIFIER_EVENT_ON_DEATH = 181,
	MODIFIER_EVENT_ON_RESPAWN = 182,
	MODIFIER_EVENT_ON_SPENT_MANA = 183,
	MODIFIER_EVENT_ON_TELEPORTING = 184,
	MODIFIER_EVENT_ON_TELEPORTED = 185,
	MODIFIER_EVENT_ON_SET_LOCATION = 186,
	MODIFIER_EVENT_ON_HEALTH_GAINED = 187,
	MODIFIER_EVENT_ON_MANA_GAINED = 188,
	MODIFIER_EVENT_ON_TAKEDAMAGE_KILLCREDIT = 189,
	MODIFIER_EVENT_ON_HERO_KILLED = 190,
	MODIFIER_EVENT_ON_HEAL_RECEIVED = 191,
	MODIFIER_EVENT_ON_BUILDING_KILLED = 192,
	MODIFIER_EVENT_ON_MODEL_CHANGED = 193,
	MODIFIER_EVENT_ON_MODIFIER_ADDED = 194,
	MODIFIER_PROPERTY_TOOLTIP = 195,
	MODIFIER_PROPERTY_MODEL_CHANGE = 196,
	MODIFIER_PROPERTY_MODEL_SCALE = 197,
	MODIFIER_PROPERTY_IS_SCEPTER = 198,
	MODIFIER_PROPERTY_RADAR_COOLDOWN_REDUCTION = 199,
	MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS = 200,
	MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND = 201,
	MODIFIER_PROPERTY_LIFETIME_FRACTION = 202,
	MODIFIER_PROPERTY_PROVIDES_FOW_POSITION = 203,
	MODIFIER_PROPERTY_SPELLS_REQUIRE_HP = 204,
	MODIFIER_PROPERTY_FORCE_DRAW_MINIMAP = 205,
	MODIFIER_PROPERTY_DISABLE_TURNING = 206,
	MODIFIER_PROPERTY_IGNORE_CAST_ANGLE = 207,
	MODIFIER_PROPERTY_CHANGE_ABILITY_VALUE = 208,
	MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL = 209,
	MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE = 210,
	MODIFIER_PROPERTY_ABILITY_LAYOUT = 211,
	MODIFIER_EVENT_ON_DOMINATED = 212,
	MODIFIER_PROPERTY_TEMPEST_DOUBLE = 213,
	MODIFIER_PROPERTY_PRESERVE_PARTICLES_ON_MODEL_CHANGE = 214,
	MODIFIER_EVENT_ON_ATTACK_FINISHED = 215,
	MODIFIER_PROPERTY_IGNORE_COOLDOWN = 216,
	MODIFIER_PROPERTY_CAN_ATTACK_TREES = 217,
	MODIFIER_PROPERTY_VISUAL_Z_DELTA = 218,
	MODIFIER_PROPERTY_INCOMING_DAMAGE_ILLUSION = 219,
	MODIFIER_PROPERTY_DONT_GIVE_VISION_OF_ATTACKER = 220,
	MODIFIER_PROPERTY_TOOLTIP2 = 221,
	MODIFIER_EVENT_ON_ATTACK_RECORD_DESTROY = 222,
	MODIFIER_EVENT_ON_PROJECTILE_OBSTRUCTION_HIT = 223,
	MODIFIER_PROPERTY_SUPPRESS_TELEPORT = 224,
	MODIFIER_EVENT_ON_ATTACK_CANCELLED = 225,
	MODIFIER_PROPERTY_SUPPRESS_CLEAVE = 226,
	MODIFIER_PROPERTY_BOT_ATTACK_SCORE_BONUS = 227,
	MODIFIER_PROPERTY_ATTACKSPEED_REDUCTION_PERCENTAGE = 228,
	MODIFIER_PROPERTY_MOVESPEED_REDUCTION_PERCENTAGE = 229,
	MODIFIER_FUNCTION_LAST = 230,
	MODIFIER_FUNCTION_INVALID = 255,
}

declare enum DOTATeam_t {
	DOTA_TEAM_SPECTATOR = 1,
	DOTA_TEAM_FIRST = 2,
	DOTA_TEAM_GOODGUYS = 2,
	DOTA_TEAM_BADGUYS = 3,
	DOTA_TEAM_NEUTRALS = 4,
	DOTA_TEAM_NOTEAM = 5,
	DOTA_TEAM_CUSTOM_1 = 6,
	DOTA_TEAM_CUSTOM_2 = 7,
	DOTA_TEAM_CUSTOM_3 = 8,
	DOTA_TEAM_CUSTOM_4 = 9,
	DOTA_TEAM_CUSTOM_5 = 10,
	DOTA_TEAM_CUSTOM_6 = 11,
	DOTA_TEAM_CUSTOM_7 = 12,
	DOTA_TEAM_CUSTOM_8 = 13,
	DOTA_TEAM_COUNT = 14,
	DOTA_TEAM_CUSTOM_MIN = 6,
	DOTA_TEAM_CUSTOM_MAX = 13,
	DOTA_TEAM_CUSTOM_COUNT = 8,
}

declare enum HitboxLerpType_t {
	HITBOX_LERP_LIFETIME = 0,
	HITBOX_LERP_CONSTANT = 1,
}

declare enum BoneTransformSpace_t {
	BoneTransformSpace_Invalid = -1,
	BoneTransformSpace_Parent = 0,
	BoneTransformSpace_Model = 1,
	BoneTransformSpace_World = 2,
}

declare enum CreatureAbilityType {
	CREATURE_ABILITY_OFFENSIVE = 0,
	CREATURE_ABILITY_DEFENSIVE = 1,
	CREATURE_ABILITY_ESCAPE = 2,
}

declare enum VPhysXBodyPart_t__VPhysXFlagEnum_t {
	VPhysXBodyPart_t__FLAG_STATIC = 1,
	VPhysXBodyPart_t__FLAG_KINEMATIC = 2,
	VPhysXBodyPart_t__FLAG_JOINT = 4,
	VPhysXBodyPart_t__FLAG_MASS = 8,
	VPhysXBodyPart_t__FLAG_ALWAYS_DYNAMIC_ON_CLIENT = 16,
}

declare enum EntityDormancyType_t {
	ENTITY_NOT_DORMANT = 0,
	ENTITY_DORMANT = 1,
	ENTITY_SUSPENDED = 2,
}

declare enum StartupBehavior_t {
	UNIT_STARTUP_BEHAVIOR_DEFAULT = 0,
	UNIT_STARTUP_BEHAVIOR_TAUNT = 1,
}

declare enum BinaryNodeTiming {
	UseChild1 = 0,
	UseChild2 = 1,
	SyncChildren = 2,
}

declare enum ScalarExpressionType_t {
	SCALAR_EXPRESSION_UNINITIALIZED = -1,
	SCALAR_EXPRESSION_ADD = 0,
	SCALAR_EXPRESSION_SUBTRACT = 1,
	SCALAR_EXPRESSION_MUL = 2,
	SCALAR_EXPRESSION_DIVIDE = 3,
	SCALAR_EXPRESSION_INPUT_1 = 4,
	SCALAR_EXPRESSION_MIN = 5,
	SCALAR_EXPRESSION_MAX = 6,
}

declare enum ResetCycleOption {
	Beginning = 0,
	SameCycleAsSource = 1,
	InverseSourceCycle = 2,
	FixedValue = 3,
}

declare enum ModelConfigAttachmentType_t {
	MODEL_CONFIG_ATTACHMENT_INVALID = -1,
	MODEL_CONFIG_ATTACHMENT_BONE_OR_ATTACHMENT = 0,
	MODEL_CONFIG_ATTACHMENT_ROOT_RELATIVE = 1,
	MODEL_CONFIG_ATTACHMENT_BONEMERGE = 2,
	MODEL_CONFIG_ATTACHMENT_COUNT = 3,
}

declare enum DOTA_LANE {
	DOTA_LANE_NONE = 0,
	DOTA_LANE_TOP = 1,
	DOTA_LANE_MIDDLE = 2,
	DOTA_LANE_BOTTOM = 3,
	DOTA_LANE_MAX = 4,
}

declare enum DOTAHUDVisibility_t {
	DOTA_HUD_VISIBILITY_INVALID = -1,
	DOTA_HUD_VISIBILITY_TOP_TIMEOFDAY = 0,
	DOTA_HUD_VISIBILITY_TOP_HEROES = 1,
	DOTA_HUD_VISIBILITY_TOP_SCOREBOARD = 2,
	DOTA_HUD_VISIBILITY_ACTION_PANEL = 3,
	DOTA_HUD_VISIBILITY_ACTION_MINIMAP = 4,
	DOTA_HUD_VISIBILITY_INVENTORY_PANEL = 5,
	DOTA_HUD_VISIBILITY_INVENTORY_SHOP = 6,
	DOTA_HUD_VISIBILITY_INVENTORY_ITEMS = 7,
	DOTA_HUD_VISIBILITY_INVENTORY_QUICKBUY = 8,
	DOTA_HUD_VISIBILITY_INVENTORY_COURIER = 9,
	DOTA_HUD_VISIBILITY_INVENTORY_PROTECT = 10,
	DOTA_HUD_VISIBILITY_INVENTORY_GOLD = 11,
	DOTA_HUD_VISIBILITY_SHOP_SUGGESTEDITEMS = 12,
	DOTA_HUD_VISIBILITY_SHOP_COMMONITEMS = 13,
	DOTA_HUD_VISIBILITY_HERO_SELECTION_TEAMS = 14,
	DOTA_HUD_VISIBILITY_HERO_SELECTION_GAME_NAME = 15,
	DOTA_HUD_VISIBILITY_HERO_SELECTION_CLOCK = 16,
	DOTA_HUD_VISIBILITY_TOP_MENU_BUTTONS = 17,
	DOTA_HUD_VISIBILITY_TOP_BAR_BACKGROUND = 18,
	DOTA_HUD_VISIBILITY_TOP_BAR_RADIANT_TEAM = 19,
	DOTA_HUD_VISIBILITY_TOP_BAR_DIRE_TEAM = 20,
	DOTA_HUD_VISIBILITY_TOP_BAR_SCORE = 21,
	DOTA_HUD_VISIBILITY_ENDGAME = 22,
	DOTA_HUD_VISIBILITY_ENDGAME_CHAT = 23,
	DOTA_HUD_VISIBILITY_QUICK_STATS = 24,
	DOTA_HUD_VISIBILITY_PREGAME_STRATEGYUI = 25,
	DOTA_HUD_VISIBILITY_KILLCAM = 26,
	DOTA_HUD_VISIBILITY_TOP_BAR = 27,
	DOTA_HUD_CUSTOMUI_BEHIND_HUD_ELEMENTS = 28,
	DOTA_HUD_VISIBILITY_COUNT = 29,
}

declare enum ABILITY_TYPES {
	ABILITY_TYPE_BASIC = 0,
	ABILITY_TYPE_ULTIMATE = 1,
	ABILITY_TYPE_ATTRIBUTES = 2,
	ABILITY_TYPE_HIDDEN = 3,
}

declare enum ActionType_t {
	SOS_ACTION_NONE = 0,
	SOS_ACTION_LIMITER = 1,
	SOS_ACTION_TIME_LIMIT = 2,
}

declare enum FootFallTagFoot_t {
	FOOT1 = 0,
	FOOT2 = 1,
	FOOT3 = 2,
	FOOT4 = 3,
	FOOT5 = 4,
	FOOT6 = 5,
	FOOT7 = 6,
	FOOT8 = 7,
}

declare enum ShakeCommand_t {
	SHAKE_START = 0,
	SHAKE_STOP = 1,
	SHAKE_AMPLITUDE = 2,
	SHAKE_FREQUENCY = 3,
	SHAKE_START_RUMBLEONLY = 4,
	SHAKE_START_NORUMBLE = 5,
}

declare enum PoseController_FModType_t {
	POSECONTROLLER_FMODTYPE_NONE = 0,
	POSECONTROLLER_FMODTYPE_SINE = 1,
	POSECONTROLLER_FMODTYPE_SQUARE = 2,
	POSECONTROLLER_FMODTYPE_TRIANGLE = 3,
	POSECONTROLLER_FMODTYPE_SAWTOOTH = 4,
	POSECONTROLLER_FMODTYPE_NOISE = 5,
	POSECONTROLLER_FMODTYPE_TOTAL = 6,
}

declare enum SimpleConstraintSoundProfile__SimpleConstraintsSoundProfileKeypoints_t {
	SimpleConstraintSoundProfile__kMIN_THRESHOLD = 0,
	SimpleConstraintSoundProfile__kMIN_FULL = 1,
	SimpleConstraintSoundProfile__kHIGHWATER = 2,
}

declare enum IKTargetSource {
	IKTARGETSOURCE_Bone = 0,
	IKTARGETSOURCE_AnimgraphParameter = 1,
	IKTARGETSOURCE_COUNT = 2,
}

declare enum WorldTextPanelVerticalAlign_t {
	WORLDTEXT_VERTICAL_ALIGN_TOP = 0,
	WORLDTEXT_VERTICAL_ALIGN_CENTER = 1,
	WORLDTEXT_VERTICAL_ALIGN_BOTTOM = 2,
}

declare enum PointWorldTextJustifyHorizontal_t {
	POINT_WORLD_TEXT_JUSTIFY_HORIZONTAL_LEFT = 0,
	POINT_WORLD_TEXT_JUSTIFY_HORIZONTAL_CENTER = 1,
	POINT_WORLD_TEXT_JUSTIFY_HORIZONTAL_RIGHT = 2,
}
