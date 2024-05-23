import { AABB } from "../../Base/AABB"
import { Color } from "../../Base/Color"
import { EntityPropertiesNode } from "../../Base/EntityProperties"
import { Matrix3x4 } from "../../Base/Matrix3x4"
import { QAngle } from "../../Base/QAngle"
import { Vector2 } from "../../Base/Vector2"
import { Vector3 } from "../../Base/Vector3"
import { NetworkedBasicField, WrapperClass } from "../../Decorators"
import { GameActivity } from "../../Enums/GameActivity"
import { LifeState } from "../../Enums/LifeState"
import { RenderMode } from "../../Enums/RenderMode"
import { Team } from "../../Enums/Team"
import { EntityManager } from "../../Managers/EntityManager"
import { Events } from "../../Managers/Events"
import { EventsSDK } from "../../Managers/EventsSDK"
import { StringTables } from "../../Managers/StringTables"
import { RendererSDK } from "../../Native/RendererSDK"
import { Player } from "../../Objects/Base/Player"
import { FieldHandler, RegisterFieldHandler } from "../../Objects/NativeToSDK"
import { GameState } from "../../Utils/GameState"
import { DegreesToRadian, toPercentage } from "../../Utils/Math"
import { CGameRules } from "./GameRules"
import { Item } from "./Item"

// === TODO move to manager or monitor ===>
export var LocalPlayer: Nullable<Player>
let playerSlot = NaN
EventsSDK.on(
	"ServerInfo",
	info => (playerSlot = (info.get("player_slot") as number) ?? NaN)
)
let gameInProgress = false
function SetGameInProgress(newVal: boolean) {
	if (!gameInProgress && newVal) {
		EventsSDK.emit("GameStarted", false)
	} else if (gameInProgress && !newVal) {
		EventsSDK.emit("GameEnded", false)
		Particles.DeleteAll()
		RendererSDK.FreeTextureCache()
	}
	gameInProgress = newVal
}
EventsSDK.on("PreEntityCreated", ent => {
	if (ent.Index === playerSlot + 1) {
		LocalPlayer = ent as Player
		SetGameInProgress(true)
	}
})
EventsSDK.on("EntityDestroyed", ent => {
	if (ent === LocalPlayer) {
		LocalPlayer = undefined
		SetGameInProgress(false)
	}
})
export let GameRules: Nullable<CGameRules>

export let latestTickDelta = 0
export function SetLatestTickDelta(delta: number): void {
	latestTickDelta = delta
}

export function UpdateGameTime() {
	if (GameRules === undefined) {
		return
	}
	// TODO: verify correctness
	const timeTick = GameRules.IsPaused
		? GameRules.PauseStartTick
		: GameState.CurrentServerTick
	const prevTime = GameState.RawGameTime

	const totalPausedTicks = GameRules.TotalPausedTicks,
		tickInterval = GameState.TickInterval
	GameState.CurrentGameTick =
		timeTick -
		(!Array.isArray(totalPausedTicks)
			? totalPausedTicks
			: Math.max(...totalPausedTicks))
	GameState.RawGameTime = GameState.CurrentGameTick * tickInterval
	GameRules.RawGameTime = GameState.RawGameTime

	if (prevTime === 0) {
		const entities = EntityManager.AllEntities
		for (let index = entities.length - 1; index > -1; index--) {
			entities[index].FakeCreateTime_ = GameState.RawGameTime
		}
	}
	if (LocalPlayer !== undefined) {
		let delta = prevTime !== 0 ? GameState.RawGameTime - prevTime : tickInterval
		if (Math.abs(delta - tickInterval) < tickInterval / 10) {
			delta = tickInterval
		}
		SetLatestTickDelta(delta)
	}
}

EventsSDK.on("PreEntityCreated", ent => {
	if (ent.IsGameRules) {
		GameRules = ent as CGameRules
		UpdateGameTime()
	}
})
EventsSDK.on("EntityDestroyed", ent => {
	if (!ent.IsGameRules) {
		return
	}
	GameRules = undefined
	GameState.RawGameTime = 0
})

const activity2name = new Map<GameActivity, string>(
	Object.entries(GameActivity).map(([k, v]) => [v as GameActivity, k.toLowerCase()])
)
const modelDataCache = new Map<string, [AnimationData[], Map<number, number>, string[]]>()
EventsSDK.on("ServerInfo", msg => {
	modelDataCache.clear()
	GameState.TickInterval = (msg.get("tick_interval") as Nullable<number>) ?? 1 / 30
})
// <=== TODO move to manager or monitor ===

@WrapperClass("CBaseEntity")
export class Entity {
	@NetworkedBasicField("m_flCreateTime")
	public CreateTime_ = 0
	@NetworkedBasicField("m_iHealth")
	public HP = 0
	public HPPrediction = 0
	@NetworkedBasicField("m_iMaxHealth")
	public MaxHP = 0
	@NetworkedBasicField("m_flPlaybackRate")
	public PlaybackRate = 1
	@NetworkedBasicField("CBodyComponent")
	public CBodyComponent_: Nullable<EntityPropertiesNode> = undefined

	public IsValid = true
	public ClassName = ""
	public ModelName = ""
	public Children: Entity[] = []
	public IsVisible = true
	public IsShop = false
	public IsGameRules = false
	public IsTree = false
	public DeltaZ = 0
	public AnimationTime = 0
	public ModelScale = 1
	public BecameDormantTime = 0
	public RotationDifference = 0
	public HierarchyAttachName = 0
	public Attachments: string[] = []
	public ModelData: Nullable<ModelData>
	public Animations: AnimationData[] = []
	public Team = Team.None
	public LifeState = LifeState.LIFE_DEAD
	public FakeCreateTime_ = GameState.RawGameTime

	public readonly VisualPosition = new Vector3()
	public readonly NetworkedPosition = new Vector3()
	public readonly NetworkedPosition_ = new Vector3()
	public readonly VisualAngles = new QAngle()
	public readonly NetworkedAngles = new QAngle()
	public readonly NetworkedAngles_ = new QAngle()
	public readonly BoundingBox = new AABB(this.VisualPosition)
	public readonly SpawnPosition = new Vector3()

	public Name_ = ""
	public Owner_ = 0
	public OwnerEntity: Nullable<Entity> = undefined
	public Parent_ = 0
	public ParentEntity: Nullable<Entity> = undefined

	public AttachmentsHashMap: Nullable<Map<number, number>>
	public FieldHandlers_: Nullable<Map<number, FieldHandler>>
	public Properties_ = new EntityPropertiesNode()

	private RingRadius_ = 30
	private CustomGlowColor_: Nullable<Color>
	private CustomDrawColor_: Nullable<[Color, RenderMode]>

	constructor(
		public readonly Index: number,
		private readonly serial: number
	) {}

	public get CustomGlowColor(): Nullable<Color> {
		return this.CustomGlowColor_
	}
	public set CustomGlowColor(val: Nullable<Color>) {
		if (this.CustomGlowColor_ === undefined && val === undefined) {
			return
		}
		this.CustomGlowColor_ = val
		//lastGlowEnts.add(this)
	}
	public get CustomDrawColor(): Nullable<[Color, RenderMode]> {
		return this.CustomDrawColor_
	}
	public set CustomDrawColor(val: Nullable<[Color, RenderMode]>) {
		if (this.CustomDrawColor_ !== val) {
			this.CustomDrawColor_ = val
			lastColoredEnts.set(this, GameState.CurrentServerTick)
		}
	}
	public get Name(): string {
		return this.Name_
	}
	public get Owner(): Nullable<Entity> {
		return this.OwnerEntity
	}
	public get RootOwner(): Nullable<Entity> {
		let owner = this.Owner
		while (true) {
			const rootOwner = owner?.Owner
			if (rootOwner === undefined) {
				break
			}

			owner = rootOwner
		}
		return owner
	}
	public get Position(): Vector3 {
		return this.RealPosition
	}
	public get RealPosition(): Vector3 {
		return GameState.IsInDraw ? this.VisualPosition : this.NetworkedPosition
	}
	public get Angles(): QAngle {
		return GameState.IsInDraw ? this.VisualAngles : this.NetworkedAngles
	}
	public get NetworkedRotation(): number {
		const ang = this.NetworkedAngles.y
		return ang >= 180 ? ang - 360 : ang
	}
	public get Rotation(): number {
		const ang = this.Angles.y
		return ang >= 180 ? ang - 360 : ang
	}
	public get CreateTime() {
		return this.CreateTime_ !== 0 ? this.CreateTime_ : this.FakeCreateTime_
	}
	public get HPPercent(): number {
		return toPercentage(this.HP, this.MaxHP)
	}
	public get HPPercentDecimal(): number {
		return this.HPPercent / 100
	}
	public get IsAlive(): boolean {
		return (
			this.LifeState === LifeState.LIFE_ALIVE ||
			this.LifeState === LifeState.LIFE_RESPAWNING
		)
	}
	public get RotationRad(): number {
		return DegreesToRadian(this.Rotation)
	}
	public get NetworkedRotationRad(): number {
		return DegreesToRadian(this.NetworkedRotation)
	}
	public get IsNeutral(): boolean {
		return this.Team === Team.Neutral || this.Team === Team.Shop
	}

	public get Speed(): number {
		return 0
	}
	/**
	 * @deprecated
	 */
	public get CollisionRadius(): number {
		return 0
	}
	public get ProjectileCollisionSize(): number {
		return 0
	}
	public get RingRadius(): number {
		return this.RingRadius_
	}
	public get CustomNativeID(): number {
		return this.Index << 1
	}

	public get Handle(): number {
		return (this.serial << EntityManager.INDEX_BITS) | this.Index
	}
	public get Forward(): Vector3 {
		return Vector3.FromAngle(this.RotationRad)
	}
	// public Forward(rotationDiff = false, angle = 0): Vector3 {
	// }
	public SerialMatches(serial: number): boolean {
		return serial === 0 || this.serial === 0 || serial === this.serial
	}
	public HandleMatches(handle: number): boolean {
		const index = handle & EntityManager.INDEX_MASK
		const serial = (handle >> EntityManager.INDEX_BITS) & EntityManager.SERIAL_MASK
		return this.Index === index && this.SerialMatches(serial)
	}
	public EntityMatches(ent: Entity): boolean {
		return this === ent
	}
	public Distance(vec: Vector3 | Entity): number {
		if (vec instanceof Entity) {
			vec = vec.Position
		}
		return this.Position.Distance(vec)
	}
	public Distance2D(vec: Vector3 | Vector2 | Entity): number {
		if (vec instanceof Entity) {
			vec = vec.Position
		}
		return this.Position.Distance2D(vec)
	}
	public DistanceSqr(vec: Vector3 | Entity): number {
		if (vec instanceof Entity) {
			vec = vec.Position
		}
		return this.Position.DistanceSqr(vec)
	}
	public DistanceSqr2D(vec: Vector3 | Vector2 | Entity): number {
		if (vec instanceof Entity) {
			vec = vec.Position
		}
		return this.Position.DistanceSqr2D(vec)
	}
	public AngleBetweenFaces(front: Vector3): number {
		return this.Forward.AngleBetweenFaces(front)
	}
	public InFront(distance: number): Vector3 {
		return this.Position.Rotation(this.Forward, distance)
	}
	public InFrontFromAngle(angle: number, distance: number): Vector3 {
		return this.Position.InFrontFromAngle(this.RotationRad + angle, distance)
	}
	public GetAngle(
		position: Vector3 | Entity,
		rotationDiff = false,
		currPos = this.Position
	): number {
		let rotation = this.RotationRad
		if (rotationDiff) {
			rotation += DegreesToRadian(this.RotationDifference)
		}
		const vec = position instanceof Entity ? position.Position : position
		return currPos.FindRotationAngle(vec, rotation)
	}
	public FindRotationAngle(vec: Vector3 | Entity): number {
		if (vec instanceof Entity) {
			vec = vec.Position
		}
		return this.Position.FindRotationAngle(vec, this.RotationRad)
	}
	/**
	 * Returned angle must be compared against Math.cos of respective angles
	 * Examples of use: Bulwark, Bristleback, Backstab
	 */
	public GetSourceAngleToForward(
		source: Vector3 | Entity,
		rotationDiff = false,
		currPos = this.Position
	): number {
		let rotation = this.RotationRad
		if (rotationDiff) {
			rotation += DegreesToRadian(this.RotationDifference)
		}
		const sourcePos = source instanceof Entity ? source.Position : source
		return new Vector2(currPos.x - sourcePos.x, currPos.y - sourcePos.y)
			.Normalize()
			.Dot(Vector2.FromAngle(rotation))
	}

	public IsInRange(ent: Vector3 | Vector2 | Entity, range: number): boolean {
		return this.DistanceSqr2D(ent) < range ** 2
	}

	public Closest(ents: Entity[]): Entity {
		const thisPos = this.Position
		let entity: Nullable<Entity>
		let distance = Number.POSITIVE_INFINITY
		for (let i = 0, end = ents.length; i < end; i++) {
			const ent = ents[i]
			const tempDist = ent.Distance(thisPos)
			if (tempDist < distance) {
				distance = tempDist
				entity = ent
			}
		}
		return entity as Entity
	}

	public ClosestGroup(
		groups: Entity[][],
		callback: (entity: Entity[]) => Vector3
	): [Entity[], Vector3] {
		const thisPos = this.Position

		let entities: Entity[] = []
		let vec = new Vector3()
		let distance = Number.POSITIVE_INFINITY
		for (let i = 0, end = groups.length; i < end; i++) {
			const group = groups[i]
			const tempVec = callback(group)
			const tempDist = thisPos.Distance(tempVec)
			if (tempDist < distance) {
				distance = tempDist
				entities = group
				vec = tempVec
			}
		}
		return [entities, vec]
	}

	public IsEnemy(ent?: Entity): boolean {
		const team = ent?.Team ?? GameState.LocalTeam
		return this.Team !== team
	}

	public OnModelUpdated(): void {
		const requestedModelName = this.ModelName
		const initialRadius = this.RingRadius !== 0 ? this.RingRadius : 50
		const min = this.BoundingBox.MinOffset,
			max = this.BoundingBox.MaxOffset
		min.x = -initialRadius
		min.y = -initialRadius
		min.z = 0
		max.x = initialRadius
		max.y = initialRadius
		max.z = initialRadius
		if (requestedModelName === "") {
			return
		}

		GetModelData(requestedModelName).then(
			modelData => {
				if (requestedModelName !== this.ModelName) {
					return
				}
				this.ModelData = modelData

				// cache static data to avoid excessive object creation in JS
				const cacheRes = modelDataCache.get(requestedModelName)
				if (cacheRes === undefined) {
					this.Animations = modelData.animations
					this.Attachments = modelData.attachments
					const attachmentsHashMap = new Map<number, number>()
					for (let i = 0, end = this.Attachments.length; i < end; i++) {
						attachmentsHashMap.set(
							MurmurHash2(this.Attachments[i], 0x31415926) >>> 0,
							i
						)
					}
					this.AttachmentsHashMap = attachmentsHashMap
					modelDataCache.set(requestedModelName, [
						this.Animations,
						attachmentsHashMap,
						this.Attachments
					])
				} else {
					this.Animations = cacheRes[0]
					this.AttachmentsHashMap = cacheRes[1]
					this.Attachments = cacheRes[2]
				}

				modelData.getBounds()
				this.BoundingBox.MinOffset.CopyFrom(Vector3.fromIOBuffer())
				this.BoundingBox.MaxOffset.CopyFrom(Vector3.fromIOBuffer(3))
				const minXY = Math.min(min.x, min.y, max.x, max.y),
					maxXY = Math.max(min.x, min.y, max.x, max.y)
				this.RingRadius_ = Math.max(Math.abs(minXY), Math.abs(maxXY))
				min.x = -this.RingRadius
				min.y = -this.RingRadius
				max.x = this.RingRadius
				max.y = this.RingRadius
			},
			err => console.error(requestedModelName, err)
		)
	}

	public CalculateActivityModifiers(_activity: GameActivity, _ar: string[]): void {
		// to be implemented in child classes
	}

	public GetAnimationID(
		activity = GameActivity.ACT_DOTA_IDLE,
		sequenceNum = -1,
		findBestMatch = true
	): Nullable<number> {
		const activityName = activity2name.get(activity)
		if (sequenceNum >= 0 && activityName !== undefined) {
			let i = 0
			for (let j = 0; j < this.Animations.length; j++) {
				if (
					this.Animations[j].activities.some(
						activityData => activityData.name.toLowerCase() === activityName
					) &&
					i++ === sequenceNum
				) {
					return j
				}
			}
		}
		if (!findBestMatch) {
			return undefined
		}
		const modifiers: string[] = []
		this.CalculateActivityModifiers(activity, modifiers)
		let highestScore = 0,
			highestScored: Nullable<number>,
			bestMatches = 0

		for (let i = 0; i < this.Animations.length; i++) {
			const anim = this.Animations[i]
			let score = 0,
				matches = 0
			if (activityName !== undefined) {
				const animActivity = anim.activities.find(
					animActivity_ => animActivity_.name.toLowerCase() === activityName
				)
				if (animActivity === undefined) {
					continue
				}
				score += animActivity.weight
				matches++
			}
			for (const activityData of anim.activities) {
				if (modifiers.includes(activityData.name.toLowerCase())) {
					score += activityData.weight
					matches++
				}
			}
			if (matches < bestMatches) {
				continue
			}
			if (matches > bestMatches || score > highestScore) {
				highestScore = score
				highestScored = i
				bestMatches = matches
			}
		}

		if (highestScored === undefined) {
			// TODO: is this used anywhere? if so, is this correct?
			for (let i = 0; i < this.Animations.length; i++) {
				const anim = this.Animations[i]
				if (
					anim.activities.some(
						activityData =>
							activityData.name.toUpperCase() === "ACT_DOTA_CONSTANT_LAYER"
					)
				) {
					return i
				}
			}
		}

		return highestScored
	}

	public GetAnimation(
		activity = GameActivity.ACT_DOTA_IDLE,
		sequenceNum = -1,
		findBestMatch = true
	): Nullable<AnimationData> {
		const animID = this.GetAnimationID(activity, sequenceNum, findBestMatch)
		return animID !== undefined ? this.Animations[animID] : undefined
	}

	// attachment position mid-animation
	public GetAttachmentPosition(
		name: string,
		activity = GameActivity.ACT_DOTA_IDLE,
		sequenceNum = -1,
		time = Infinity,
		pos = this.Position,
		ang = this.Angles,
		scale = this.ModelScale
	): Vector3 {
		if (this.ModelData === undefined) {
			return pos
		}
		const attachmentID = this.Attachments.indexOf(name)
		if (attachmentID === -1) {
			return pos
		}
		const animationID = this.GetAnimationID(activity, sequenceNum) ?? -1
		if (animationID !== -1 && time === Infinity) {
			const anim = this.Animations[animationID]
			time = anim.frameCount / anim.fps / 2
		}
		pos.toIOBuffer()
		ang.toIOBuffer(3)
		this.ModelData.getAttachmentData(animationID, attachmentID, time, scale)
		return Vector3.fromIOBuffer()
	}

	/** @deprecated */
	public ForwardNativeProperties(_healthBarOffset: number, _totalMoveSpeed: number) {
		// To be implemented in child classes
	}

	public UpdatePositions(parentTransform?: Matrix3x4) {
		this.NetworkedPosition.CopyFrom(this.NetworkedPosition_)
		this.NetworkedAngles.CopyFrom(this.NetworkedAngles_)

		const parentEnt = this.ParentEntity
		if (parentEnt !== undefined || this.Children.length !== 0) {
			let transform = this.GetTransform()
			if (parentEnt !== undefined) {
				parentTransform ??= parentEnt.GetTransform()
				const parentModelData = parentEnt.ModelData
				if (
					parentModelData !== undefined &&
					parentModelData.getAttachmentMatrix !== undefined &&
					this.HierarchyAttachName !== 0
				) {
					const attachmentID = parentEnt.AttachmentsHashMap?.get(
						this.HierarchyAttachName
					)
					if (attachmentID !== undefined) {
						IOBuffer.set(parentTransform.values)
						parentModelData.getAttachmentMatrix(
							parentEnt.GetAnimationID() ?? -1,
							attachmentID,
							parentEnt.AnimationTime
						)
						parentTransform = new Matrix3x4()
						parentTransform.values.set(IOBuffer.slice(0, 12))
					}
				}
				transform = Matrix3x4.ConcatTransforms(parentTransform, transform)

				this.NetworkedPosition.CopyFrom(transform.Translation)
				this.NetworkedAngles.CopyFrom(transform.Angles)
			}
			for (let index = this.Children.length - 1; index > -1; index--) {
				const child = this.Children[index]
				child.UpdatePositions(transform)
			}
		}

		this.VisualPosition.CopyFrom(this.NetworkedPosition)
		this.VisualAngles.CopyFrom(this.NetworkedAngles)
	}

	public CannotUseItem(_item: Item): boolean {
		return false
	}

	public toString(): string {
		return this.Name
	}

	public SetPosition(newPosition: Vector3) {
		this.VisualPosition.CopyFrom(newPosition)
		this.NetworkedPosition.CopyFrom(newPosition)
		this.NetworkedPosition_.CopyFrom(newPosition)
	}

	public SetAngles(newAngle: QAngle) {
		this.VisualAngles.CopyFrom(newAngle)
		this.NetworkedAngles.CopyFrom(newAngle)
		this.NetworkedAngles_.CopyFrom(newAngle)
	}

	private GetTransform(): Matrix3x4 {
		return Matrix3x4.AngleMatrix(
			this.NetworkedAngles,
			this.NetworkedPosition,
			this.ModelScale
		)
	}
}

function QuantitizedVecCoordToCoord(
	cell: Nullable<number>,
	inside: Nullable<number>
): number {
	return ((cell ?? 0) - 128) * 128 + (inside ?? 0)
}
RegisterFieldHandler(Entity, "m_iTeamNum", (ent, newVal) => {
	const oldTeam = ent.Team
	ent.Team = newVal as Team
	if (ent.IsValid && oldTeam !== ent.Team) {
		EventsSDK.emit("EntityTeamChanged", false, ent)
	}
})
RegisterFieldHandler(Entity, "m_lifeState", (ent, newVal) => {
	const oldState = ent.LifeState
	ent.LifeState = newVal as LifeState
	if (ent.IsValid && oldState !== ent.LifeState) {
		EventsSDK.emit("LifeStateChanged", false, ent)
	}
})
RegisterFieldHandler(Entity, "m_hModel", (ent, newVal) => {
	ent.ModelName = GetPathByHash(newVal as bigint) ?? ""
	ent.OnModelUpdated()
})
RegisterFieldHandler(Entity, "m_angRotation", (ent, newVal) => {
	const angRotation = newVal as QAngle
	ent.NetworkedAngles_.CopyFrom(angRotation)
	ent.UpdatePositions()
})
RegisterFieldHandler(Entity, "m_nameStringableIndex", (ent, newVal) => {
	ent.Name_ = StringTables.GetString("EntityNames", newVal as number) ?? ent.Name_
})
RegisterFieldHandler(Entity, "m_hOwnerEntity", (ent, newVal) => {
	ent.Owner_ = newVal as number
	ent.OwnerEntity = EntityManager.EntityByIndex(ent.Owner_)
})
RegisterFieldHandler(Entity, "m_hParent", (ent, newVal) => {
	ent.Parent_ = Number(newVal as bigint)
	const parentEnt = EntityManager.EntityByIndex(ent.Parent_),
		prevParentEnt = ent.ParentEntity
	if (parentEnt !== ent.ParentEntity) {
		if (prevParentEnt !== undefined) {
			prevParentEnt.Children.remove(ent)
		}
		parentEnt?.Children.push(ent)
		ent.ParentEntity = parentEnt
		ent.UpdatePositions()
	}
})
RegisterFieldHandler(Entity, "m_hierarchyAttachName", (ent, newVal) => {
	ent.HierarchyAttachName = Number(newVal as bigint) >>> 0
	ent.UpdatePositions()
})
RegisterFieldHandler(Entity, "m_cellX", (ent, newVal) => {
	ent.NetworkedPosition_.x = QuantitizedVecCoordToCoord(
		newVal as number,
		ent.CBodyComponent_?.get("m_vecX") as Nullable<number>
	)
	ent.UpdatePositions()
})
RegisterFieldHandler(Entity, "m_vecX", (ent, newVal) => {
	ent.NetworkedPosition_.x = QuantitizedVecCoordToCoord(
		ent.CBodyComponent_?.get("m_cellX") as Nullable<number>,
		newVal as number
	)
	ent.UpdatePositions()
})
RegisterFieldHandler(Entity, "m_cellY", (ent, newVal) => {
	ent.NetworkedPosition_.y = QuantitizedVecCoordToCoord(
		newVal as number,
		ent.CBodyComponent_?.get("m_vecY") as Nullable<number>
	)
	ent.UpdatePositions()
})
RegisterFieldHandler(Entity, "m_vecY", (ent, newVal) => {
	ent.NetworkedPosition_.y = QuantitizedVecCoordToCoord(
		ent.CBodyComponent_?.get("m_cellY") as Nullable<number>,
		newVal as number
	)
	ent.UpdatePositions()
})
RegisterFieldHandler(Entity, "m_cellZ", (ent, newVal) => {
	ent.NetworkedPosition_.z = QuantitizedVecCoordToCoord(
		newVal as number,
		ent.CBodyComponent_?.get("m_vecZ") as Nullable<number>
	)
	ent.UpdatePositions()
})
RegisterFieldHandler(Entity, "m_vecZ", (ent, newVal) => {
	ent.NetworkedPosition_.z = QuantitizedVecCoordToCoord(
		ent.CBodyComponent_?.get("m_cellZ") as Nullable<number>,
		newVal as number
	)
	ent.UpdatePositions()
})
RegisterFieldHandler(Entity, "m_flScale", (ent, newVal) => {
	ent.ModelScale = newVal as number
	ent.UpdatePositions()
})

// === TODO move to manager or monitor ===>
EventsSDK.on("PreEntityCreated", ent => {
	ent.SpawnPosition.CopyFrom(ent.NetworkedPosition)
	if (ent.Index === 0) {
		return
	}
	const arrEntities = EntityManager.AllEntities
	for (let index = arrEntities.length - 1; index > -1; index--) {
		const iter = arrEntities[index]
		if (ent.HandleMatches(iter.Owner_)) {
			iter.OwnerEntity = ent
		}
		if (ent.HandleMatches(iter.Parent_)) {
			ent.Children.push(iter)
			iter.ParentEntity = ent
			iter.UpdatePositions()
		}
	}
})

EventsSDK.on("EntityDestroyed", ent => {
	if (ent.Index === 0) {
		return
	}
	const arrEntities = EntityManager.AllEntities
	for (let index = arrEntities.length - 1; index > -1; index--) {
		const iter = arrEntities[index]
		if (ent.HandleMatches(iter.Owner_)) {
			iter.OwnerEntity = undefined
		}
		if (ent.HandleMatches(iter.Parent_)) {
			ent.Children.remove(iter)
			iter.ParentEntity = undefined
			iter.UpdatePositions()
		}
	}
})

EventsSDK.on("GameEvent", (name, obj) => {
	switch (name) {
		case "entity_hurt": {
			const ent = EntityManager.EntityByIndex(obj.entindex_killed)
			if (ent !== undefined && !ent.IsVisible && ent.IsAlive) {
				ent.HP = Math.max(Math.round(ent.HP - obj.damage), 1)
			}
			break
		}
		case "entity_killed": {
			const ent = EntityManager.EntityByIndex(obj.entindex_killed)
			if (
				ent !== undefined &&
				!ent.IsVisible &&
				ent.LifeState !== LifeState.LIFE_DEAD
			) {
				ent.LifeState = LifeState.LIFE_DEAD
				ent.HP = 0
				EventsSDK.emit("LifeStateChanged", false, ent)
			}
			break
		}
		case "dota_buyback": {
			const ent = EntityManager.EntityByIndex(obj.entindex)
			if (ent !== undefined && ent.LifeState === LifeState.LIFE_DEAD) {
				ent.LifeState = LifeState.LIFE_ALIVE
				ent.HP = ent.MaxHP
				EventsSDK.emit("LifeStateChanged", false, ent)
			}
		}
		default:
			break
	}
})

const lastGlowEnts = new Set<Entity>()
function CustomGlowEnts(): void {
	lastGlowEnts.forEach(ent => {
		if (!ent.IsValid) {
			lastGlowEnts.delete(ent)
			return
		}
		const customID = ent.CustomNativeID
		const customGlowColor = ent.CustomGlowColor
		let colorU32 = 0
		if (customGlowColor !== undefined) {
			colorU32 = customGlowColor.toUint32()
		} else {
			lastGlowEnts.delete(ent)
		}
		SetEntityGlow(customID, colorU32)
	})
}

const lastColoredEnts = new Map<Entity, number>()
function CustomColorEnts(): void {
	lastColoredEnts.forEach((bornTick, ent) => {
		const ticks = GameState.CurrentServerTick - bornTick

		if (ent.IsValid && ticks >= 0) {
			// update every power of 2
			if (ticks.bitCount() === 1) {
				const [color, mode] = ent.CustomDrawColor ?? [
					Color.White,
					RenderMode.Normal
				]
				SetEntityColor(ent.CustomNativeID, color.toUint32(), mode)
			}

			if (ent.CustomDrawColor !== undefined) {
				return
			}
		}

		lastColoredEnts.delete(ent)
	})
}

let unitsForUpdateSize = 0
const unitsForUpdate = new Uint16Array(0x4000) // for sure

function requestUnitUpdate(ent: Entity) {
	if (ent.IsVisible && ent.Index < 0x4000) {
		unitsForUpdate[unitsForUpdateSize++] = ent.Index
	}
}
EventsSDK.on("ModifierCreated", mod => {
	if (mod.Parent !== undefined) {
		requestUnitUpdate(mod.Parent)
	}
})
EventsSDK.on("ModifierRemoved", mod => {
	if (mod.Parent !== undefined) {
		requestUnitUpdate(mod.Parent)
	}
})
EventsSDK.on("AbilityLevelChanged", abil => {
	if (abil.Owner !== undefined) {
		requestUnitUpdate(abil.Owner)
	}
})

EventsSDK.on("EntityVisibleChanged", ent => {
	requestUnitUpdate(ent)

	if (lastColoredEnts.has(ent)) {
		lastColoredEnts.set(ent, GameState.CurrentServerTick)
	}
})

EventsSDK.after("PostDataUpdate", () => {
	CustomColorEnts()
	CustomGlowEnts()

	if (unitsForUpdateSize > 0) {
		RequestUnitsProperties(unitsForUpdate.subarray(0, unitsForUpdateSize))
		unitsForUpdateSize = 0
	}
})

Events.on("NewConnection", () => {
	lastGlowEnts.clear()
	lastColoredEnts.clear()
})
