import Vector2 from "../Base/Vector2"
import Vector3 from "../Base/Vector3"
import EntityManager from "../Managers/EntityManager"
import Ability from "../Objects/Base/Ability"
import Entity from "../Objects/Base/Entity"
import Unit from "../Objects/Base/Unit"

export const ORDERS_WITHOUT_SIDE_EFFECTS = [
	dotaunitorder_t.DOTA_UNIT_ORDER_TRAIN_ABILITY,
	dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE,
	dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
	dotaunitorder_t.DOTA_UNIT_ORDER_PURCHASE_ITEM,
	dotaunitorder_t.DOTA_UNIT_ORDER_DISASSEMBLE_ITEM,
	dotaunitorder_t.DOTA_UNIT_ORDER_SET_ITEM_COMBINE_LOCK,
	dotaunitorder_t.DOTA_UNIT_ORDER_SELL_ITEM,
	dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
	dotaunitorder_t.DOTA_UNIT_ORDER_EJECT_ITEM_FROM_STASH,
	dotaunitorder_t.DOTA_UNIT_ORDER_CONTINUE,
	dotaunitorder_t.DOTA_UNIT_ORDER_GLYPH,
	dotaunitorder_t.DOTA_UNIT_ORDER_RADAR,
]

export default class ExecuteOrder {
	public static fromObject(order: {
		orderType: dotaunitorder_t,
		target?: Entity | number,
		position?: Vector3 | Vector2,
		ability?: Ability | number,
		orderIssuer?: PlayerOrderIssuer_t,
		unit?: Unit,
		queue?: boolean,
		showEffects?: boolean,
	}): ExecuteOrder {
		return new ExecuteOrder(
			order.orderType,
			order.target,
			order.position,
			order.ability,
			order.orderIssuer,
			order.unit,
			order.queue,
			order.showEffects,
		)
	}

	public static fromNative(order: CUnitOrder): ExecuteOrder {
		let unit = order.unit !== undefined
			? EntityManager.GetEntityByNative(order.unit) as Unit
			: EntityManager.LocalHero

		if (unit === undefined)
			return undefined

		return new ExecuteOrder(
			order.order_type,
			order.target instanceof C_BaseEntity
				? EntityManager.GetEntityByNative(order.target) as Entity
				: order.target,
			Vector3.fromIOBuffer(order.position !== undefined),
			order.ability instanceof C_DOTABaseAbility
				? EntityManager.GetEntityByNative(order.ability) as Ability
				: order.ability,
			order.issuer,
			unit,
			order.queue,
			order.show_effects,
		)
	}

	private m_OrderType: dotaunitorder_t
	private m_Target: Entity | number
	private m_Position: Vector3
	private m_Ability: Ability | number
	private m_OrderIssuer: PlayerOrderIssuer_t
	private m_Unit: Unit
	private m_Queue: boolean
	private m_ShowEffects: boolean

	/**
	 * Orders by native CUnitOrder
	 * @param position default: new Vector3(0,0,0)
	 * @param issuer default: DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY
	 */
	constructor(
		orderType: dotaunitorder_t,
		target: Entity | number,
		position: Vector3 | Vector2 = new Vector3(),
		ability: Ability | number,
		issuer: PlayerOrderIssuer_t = PlayerOrderIssuer_t.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY,
		unit: Unit,
		queue: boolean = false,
		showEffects: boolean = false,
	) {
		this.m_OrderType = orderType
		this.m_Target = target instanceof Entity ? target : target
		this.m_Position = position instanceof Vector2 ? position.toVector3() : position
		this.m_Ability = ability
		this.m_OrderIssuer = issuer
		this.m_Unit = unit
		this.m_Queue = queue
		this.m_ShowEffects = showEffects
	}

	get OrderType(): dotaunitorder_t {
		return this.m_OrderType
	}
	get Target(): Entity | number {
		return this.m_Target
	}
	get Position(): Vector3 {
		return this.m_Position
	}
	get Ability(): Ability | number {
		return this.m_Ability
	}
	get OrderIssuer(): PlayerOrderIssuer_t {
		return this.m_OrderIssuer
	}
	get Unit(): Unit {
		return this.m_Unit
	}
	get Queue(): boolean {
		return this.m_Queue
	}
	get ShowEffects(): boolean {
		return this.m_ShowEffects
	}

	/**
	 * pass Position: Vector3 at IOBuffer offset 0
	 */
	public toNative() {
		if (!this.m_Position.IsZero())
			this.m_Position.toIOBuffer()

		const target = this.m_Target,
			ability = this.m_Ability,
			unit = this.m_Unit

		return {
			OrderType: this.m_OrderType,
			Target: target instanceof Entity ? target.m_pBaseEntity instanceof C_DOTA_BinaryObject ? target.m_pBaseEntity.m_nBinaryID : target.m_pBaseEntity : target,
			Ability: ability instanceof Ability ? ability.Index : ability,
			OrderIssuer: this.m_OrderIssuer,
			Unit: unit !== undefined ? unit.Index : undefined,
			Queue: this.m_Queue,
			ShowEffects: this.m_ShowEffects,
		}
	}
	/**
	 * Execute order with this fields
	 */
	public Execute(): ExecuteOrder {
		PrepareUnitOrders(this.toNative())
		return this
	}

	public toString(): string {
		return JSON.stringify(this.toObject())
	}
	public toObject(): {
		OrderType: dotaunitorder_t,
		Target: Entity | number,
		Position: Vector3,
		Ability: Ability | number,
		OrderIssuer: PlayerOrderIssuer_t
		Unit: Unit,
		Queue: boolean,
		ShowEffects: boolean,
	} {
		return {
			OrderType: this.m_OrderType,
			Target: this.m_Target,
			Position: this.m_Position,
			Ability: this.m_Ability,
			OrderIssuer: this.m_OrderIssuer,
			Unit: this.m_Unit,
			Queue: this.m_Queue,
			ShowEffects: this.m_ShowEffects,
		}
	}
}
