import Vector2 from "./Vector2"
import Vector3 from "./Vector3"

export default class Vector4 {
	/* ================ Constructors ================ */
	/**
	 * Create new Vector3 with x, y, z
	 *
	 * @example
	 * var vector = new Vector3(1, 2, 3)
	 * vector.Normalize();
	 */
	constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 0) { }

	public toVector2(): Vector2 {
		return new Vector2(this.x, this.y)
	}
	public toVector3(): Vector3 {
		return new Vector3(this.x, this.y, this.z)
	}
	/**
	 * @return Vector4(x,y,z,w)
	 */
	public toString(): string {
		return `Vector4(${this.x},${this.y},${this.z},${this.w})`
	}
	/**
	 * @return [x, y, z]
	 */
	public toArray(): [number, number, number] {
		return [this.x, this.y, this.z]
	}
}
