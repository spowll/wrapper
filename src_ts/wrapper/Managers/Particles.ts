import Vector3 from "../Base/Vector3"
import Entity from "../Objects/Base/Entity"

let ParticlesSDK = new (class ParticlesSDK {
	public Create(path: string, attach: ParticleAttachment_t, ent?: Entity): number {
		return Particles.Create(path, attach, ent?.IsValid ? ent.Index : -1)
	}
	public Destroy(particle_id: number, immediate: boolean = true): void {
		Particles.Destroy(particle_id, immediate)
	}
	public SetControlPoint(particle_id: number, control_point: number, vec: Vector3): void {
		vec.toIOBuffer()
		Particles.SetControlPoint(particle_id, control_point)
	}
	public SetControlPointForward(particle_id: number, control_point: number, vec: Vector3): void {
		vec.toIOBuffer()
		Particles.SetControlPointForward(particle_id, control_point)
	}
})()
export default ParticlesSDK
