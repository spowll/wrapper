import Vector3 from "../Base/Vector3"
import Color from "../Base/Color"
import Entity from "../Objects/Base/Entity"
import Particle, { ParticleKeyType, ControlPoints } from "../Objects/Base/Particle"

const ParticleRangePath = (name: string) => `particles/range_display/range_display_${name.toLowerCase()}.vpcf`
const ParticleLinePath = (name: string) => `particles/range_line/${name.toLowerCase()}.vpcf`
const ParticleTargetPath = () => `particles/target/range_finder_tower_aoe.vpcf`

const RenderPath = (render = PARTICLE_RENDER.NORMAL) => {
	switch (render) {
		default:
		case PARTICLE_RENDER.NORMAL:
			return PARTICLE_RENDER_NAME.NORMAL.toLowerCase()
		case PARTICLE_RENDER.ROPE:
			return PARTICLE_RENDER_NAME.ROPE.toLowerCase()
		case PARTICLE_RENDER.ANIMATION:
			return PARTICLE_RENDER_NAME.ANIMATION.toLowerCase()
	}
}

const RangeRenderPath = (render = PARTICLE_RENDER.NORMAL) =>
	ParticleRangePath(RenderPath(render))
const BoundingAreaRenderPath = (render = PARTICLE_RENDER.NORMAL) =>
	ParticleLinePath("bounding_area_view_" + RenderPath(render))

export enum PARTICLE_RENDER_NAME {
	NORMAL = "Normal",
	ROPE = "Rope",
	ANIMATION = "Animation"
}

export enum PARTICLE_RENDER {
	NORMAL = 0,
	ROPE,
	ANIMATION
}

export interface IDrawCircleOptions {
	Attachment?: ParticleAttachment_t,
	/**
	 * from 0 to 2
	 */
	RenderStyle?: PARTICLE_RENDER,
	Position?: Entity | Vector3,
	Color?: Color,
	Width?: number,
	Alpha?: number
}

export interface IDrawLineOptions {
	Attachment?: ParticleAttachment_t,
	Position?: Entity | Vector3,
	Color?: Color,
	Width?: number,
	Alpha?: number
}

export interface IDrawBoundingAreaOptions {
	/**
	 * from 0 to 1
	 */
	Render?: number,
	Position?: Entity | Vector3,
	Color?: Color,
	Width?: number,
	Alpha?: number
}


let ParticlesSDK = new (class ParticlesSDK {
	/**
	 * @deprecated Will be removed after changed all scripts
	 */
	public Create(path: string, attach: ParticleAttachment_t, ent?: Entity): number {
		return Particles.Create(path, attach, ent?.IsValid ? ent.Index : -1)
	}
	/**
	 * @deprecated Will be removed after changed all scripts
	 */
	public Destroy(particle_id: number, immediate: boolean = true): void {
		Particles.Destroy(particle_id, immediate)
	}
	/** 
	 * @deprecated Will be removed after changed all scripts
	 */
	public SetControlPoint(particle_id: number, control_point: number, vec: Vector3): void {
		vec.toIOBuffer()
		Particles.SetControlPoint(particle_id, control_point)
	}
	/**
	 * @deprecated Will be removed after changed all scripts
	 */
	public SetControlPointForward(particle_id: number, control_point: number, vec: Vector3): void {
		vec.toIOBuffer()
		Particles.SetControlPointForward(particle_id, control_point)
	}


	private readonly allParticles = new Map<ParticleKeyType, Particle>();

	public AddOrUpdate(
		key: ParticleKeyType,
		path: string,
		attachment: ParticleAttachment_t,
		entity: Entity,
		...points: ControlPoints
	): Particle {

		let particle = this.allParticles.get(key)

		if (particle === undefined
			|| (particle.Entity !== entity || particle.Path !== path
				|| particle.Attachment !== attachment)
		) {

			if (particle !== undefined)
				particle.Destroy(true)

			particle = new Particle(key, path, attachment, entity, ...points)

			this.allParticles.set(key, particle)
		}
		else {
			// check changed control points
			for (let i = 0; i < points.length; i += 2) {
				if (particle.ControlPoints[i + 1] !== points[i + 1]) {
					particle.SetControlPoints(...points)
					break
				}
			}
		}

		return particle
	}

	/**
	 * 
	 * ControlPoints:
	 * 	0: Position
	 * 	1: range
	 * 	2: Color
	 * 	3: Width
	 * 	4: Alpha
	 */
	public DrawCircle(
		key: ParticleKeyType,
		entity: Entity,
		range: number = 50,
		options: IDrawCircleOptions = {}
	) {
		return this.AddOrUpdate(key,
			RangeRenderPath(options.RenderStyle),
			options.Attachment ?? ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW,
			entity,
			0, options.Position ?? entity,
			1, range,
			2, options.Color ?? Color.Aqua,
			3, options.Width ?? 10,
			4, options.Alpha ?? 255
		)
	}
	public DrawSelectedRing(
		key: ParticleKeyType,
		entity: Entity,
		range: number = 50,
		position: Entity | Vector3 = entity,
		color = Color.Aqua
	) {

		return this.AddOrUpdate(key,
			"particles/ui_mouseactions/drag_selected_ring.vpcf",
			ParticleAttachment_t.PATTACH_ABSORIGIN,
			entity,
			0, position,
			1, color,
			2, range * 1.1
		)
	}
	/**
	 * 
	 * ControlPoints:
	 * 	0: Position
	 * 	1: End Position
	 * 	2: Color
	 * 	3: Width
	 * 	4: Alpha
	 */
	public DrawLine(
		key: ParticleKeyType,
		entity: Entity,
		range: number = 50,
		options: IDrawLineOptions = {}
	) {
		return this.AddOrUpdate(key,
			ParticleLinePath("line"),
			options.Attachment ?? ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW,
			entity,
			0, options.Position ?? entity,
			1, range,
			2, options.Color ?? Color.Aqua,
			3, options.Width ?? 10,
			4, options.Alpha ?? 255
		)
	}
	public DrawRangeLine(
		key: ParticleKeyType,
		entity: Entity,
		endPosition: Entity | Vector3,
		isRed?: boolean,
		startPosition: Entity | Vector3 = entity
	) {
		return this.AddOrUpdate(key,
			"particles/ui_mouseactions/range_finder_line.vpcf",
			ParticleAttachment_t.PATTACH_ABSORIGIN,
			entity,
			0, startPosition,
			1, !isRed ? startPosition : endPosition,
			2, endPosition
		)
	}
	public DrawLineToTarget(
		key: ParticleKeyType,
		entity: Entity,
		target: Entity,
		color = Color.Red
	) {

		color.SetR(Math.max(color.r, 1))

		return this.AddOrUpdate(key,
			ParticleTargetPath(),
			ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW,
			target,
			2, entity,
			6, color,
			7, target
		)
	}
	/**
	 *
	 * ControlPoints:
	 * 	0: Start Position (|| entity pos)
	 * 	1: End Position
	 * 	2: Color
	 * 	3: Width
	 * 	4: Alpha
	 */
	public DrawBoundingArea(
		key: ParticleKeyType,
		entity: Entity,
		endPosition: Entity | Vector3,
		startPos: Entity | Vector3 = entity,
		options: IDrawBoundingAreaOptions = {}
	) {
		return this.AddOrUpdate(key,
			BoundingAreaRenderPath(options.Render),
			ParticleAttachment_t.PATTACH_ABSORIGIN,
			entity,
			0, startPos,
			1, endPosition,
			2, options.Color ?? Color.Aqua,
			3, options.Width ?? 10,
			4, options.Alpha ?? 255
		)
	}


	public DestroyAll(particleDestroy?: boolean, immediate = true) {

		// loop-optimizer: KEEP
		this.allParticles.forEach(particle => particle.Destroy(particleDestroy, immediate))
		this.allParticles.clear()
	}

})()
export default ParticlesSDK