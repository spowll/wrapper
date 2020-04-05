import Entity from "./Entity"
import Vector3 from "../../Base/Vector3"
import QAngle from "../../Base/QAngle"
import EntityManager from "../../Managers/EntityManager"

export default class Tree extends Entity {
	public readonly FakeTreePos = new Vector3()
	public BinaryID = 0

	public get Position() {
		return this.FakeTreePos.Clone()
	}
	public get Rotation(): number {
		return 0
	}
	public get Angles(): QAngle {
		return new QAngle()
	}
	public get IsAlive() {
		return EntityManager.IsTreeActive(this.BinaryID)
	}
	public get RingRadius(): number {
		return 100
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("C_DOTA_MapTree", Tree)
