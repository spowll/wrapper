import Color from "../../Base/Color"
import QAngle from "../../Base/QAngle"
import Vector3 from "../../Base/Vector3"
import { WrapperClass } from "../../Decorators"
import { RenderMode_t } from "../../Enums/RenderMode_t"
import EntityManager, { CreateEntityInternal, DeleteEntity } from "../../Managers/EntityManager"
import Events from "../../Managers/Events"
import EventsSDK from "../../Managers/EventsSDK"
import GameState from "../../Utils/GameState"
import { GridNav } from "../../Utils/ParseGNV"
import { ParseTRMP } from "../../Utils/ParseTRMP"
import Entity from "./Entity"

@WrapperClass("CDOTA_MapTree")
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
	public get CustomNativeID(): number {
		return (this.BinaryID << 1) | 1
	}
	public set CustomGlowColor(_: Nullable<Color>) {
		// N/A for non-networked entities
	}
	public set CustomDrawColor(_: Nullable<[Color, RenderMode_t]>) {
		// N/A for non-networked entities
	}
}

let cur_local_id = 0x4000
function LoadTreeMap(buf: ArrayBuffer) {
	while (cur_local_id > 0x4000) {
		const id = --cur_local_id
		const ent = EntityManager.EntityByIndex(id, true) as Nullable<Tree>
		if (ent === undefined)
			continue
		DeleteEntity(id)
		GridNav?.UpdateTreeState(ent)
	}
	ParseTRMP(buf).forEach((pos, i) => {
		// for some reason TRMP have duplicates, but earlier ones override them
		if (EntityManager.GetEntitiesByClass(Tree).some(tree => tree.Position.Equals(pos)))
			return
		const id = cur_local_id++
		const entity = new Tree(id)
		entity.Name_ = "ent_dota_tree"
		entity.ClassName = "C_DOTA_MapTree"
		entity.FakeTreePos.CopyFrom(pos)
		entity.BinaryID = i
		CreateEntityInternal(entity)
		EventsSDK.emit("PreEntityCreated", false, entity)
		GridNav?.UpdateTreeState(entity)
	})
}

let trm_succeeded = false
function TryLoadMapFiles(): void {
	if (trm_succeeded)
		return
	try {
		const buf = fread(`maps/${GameState.MapName}.trm`)
		if (buf !== undefined) {
			trm_succeeded = true
			LoadTreeMap(buf)
		}
	} catch (e) {
		console.log("Error in TreeMap init: " + e)
	}
}

EventsSDK.after("ServerInfo", () => {
	trm_succeeded = false
	TryLoadMapFiles()
})
Events.on("PostAddSearchPath", () => TryLoadMapFiles())
