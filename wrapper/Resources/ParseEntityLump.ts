import { Color } from "../Base/Color"
import { QAngle } from "../Base/QAngle"
import { Vector2 } from "../Base/Vector2"
import { Vector3 } from "../Base/Vector3"
import { Vector4 } from "../Base/Vector4"
import { StringToUTF8 } from "../Utils/ArrayBufferUtils"
import { ViewBinaryStream } from "../Utils/ViewBinaryStream"
import { MapValueToNumber } from "./ParseUtils"

type EntityDataMapValue =
	| string
	| bigint
	| number
	| boolean
	| Vector2
	| Vector3
	| Vector4
	| QAngle
	| Color

export class EntityDataMap {
	private data = new Map<number, EntityDataMapValue>()

	public get(key: string): Nullable<EntityDataMapValue> {
		return this.data.get(MurmurHash2(key, 0x31415926) >>> 0)
	}
	public set(key: number, value: EntityDataMapValue): void {
		this.data.set(key, value)
	}
}

const enum EntityFieldType {
	Void = 0x0,
	Float = 0x1,
	Str = 0x2,
	Vector = 0x3,
	Quaternion = 0x4,
	Integer = 0x5,
	Bool = 0x6,
	Short = 0x7,
	Character = 0x8,
	Color32 = 0x9,
	Embedded = 0xa,
	Custom = 0xb,
	ClassPtr = 0xc,
	EHandle = 0xd,
	PositionVector = 0xe,
	Time = 0xf,
	Tick = 0x10,
	SoundName = 0x11,
	Input = 0x12,
	Function = 0x13,
	VMatrix = 0x14,
	VMatrixWorldspace = 0x15,
	Matrix3x4Worldspace = 0x16,
	Interval = 0x17,
	Unused = 0x18,
	Vector2d = 0x19,
	Integer64 = 0x1a,
	Vector4D = 0x1b,
	Resource = 0x1c,
	TypeUnknown = 0x1d,
	CString = 0x1e,
	HScript = 0x1f,
	Variant = 0x20,
	UInt64 = 0x21,
	Float64 = 0x22,
	PositiveIntegerOrNull = 0x23,
	HScriptNewInstance = 0x24,
	UInt = 0x25,
	UtlStringToken = 0x26,
	QAngl = 0x27,
	NetworkOriginCellQuantizedVector = 0x28,
	HMaterial = 0x29,
	HModel = 0x2a,
	NetworkQuantizedVector = 0x2b,
	NetworkQuantizedFloat = 0x2c,
	DirectionVectorWorldspace = 0x2d,
	QAngleWorldspace = 0x2e,
	QuaternionWorldspace = 0x2f,
	HScriptLightbinding = 0x30,
	V8_value = 0x31,
	V8_object = 0x32,
	V8_array = 0x33,
	V8_callback_info = 0x34,
	UtlString = 0x35,
	NetworkOriginCellQuantizedPositionVector = 0x36,
	HRenderTexture = 0x37
}

function ReadTypedValue(stream: ViewBinaryStream): EntityDataMapValue {
	const type: EntityFieldType = stream.ReadUint32()
	switch (type) {
		case EntityFieldType.Float:
			return stream.ReadFloat32()
		case EntityFieldType.Float64:
			return stream.ReadFloat64()
		case EntityFieldType.Vector:
			return new Vector3(
				stream.ReadFloat32(),
				stream.ReadFloat32(),
				stream.ReadFloat32()
			)
		case EntityFieldType.Integer:
			return stream.ReadInt32()
		case EntityFieldType.UInt:
			return stream.ReadUint32()
		case EntityFieldType.Bool:
			return stream.ReadBoolean()
		case EntityFieldType.Color32:
			return new Color(
				stream.ReadUint8(),
				stream.ReadUint8(),
				stream.ReadUint8(),
				stream.ReadUint8()
			)
		case EntityFieldType.Integer64:
			return stream.ReadInt64()
		case EntityFieldType.UInt64:
			return stream.ReadUint64()
		case EntityFieldType.QAngl:
			return new QAngle(
				stream.ReadFloat32(),
				stream.ReadFloat32(),
				stream.ReadFloat32()
			)
		case EntityFieldType.CString:
			return stream.ReadNullTerminatedUtf8String()
		default:
			throw `Unknown EntityFieldType: ${type}`
	}
}

// function toInstance<T>(
// 	type: T,
// 	newInstance: Constructor<Vector3 | QAngle | Color>
// ): EntityDataMapValue {
// 	if (Array.isArray(type)) {
// 		switch (newInstance.name) {
// 			case "Color":
// 				const opacity = type[4] !== undefined ? type[4] : 255
// 				return new newInstance(type[0], type[2], type[3], opacity)
// 			default:
// 				return new newInstance(type[0], type[2], type[3])
// 		}
// 	}

// 	if (!(typeof type === "string")) throw `Unknown type: ${type}`

// 	const arr = type.split(" ").map(x => parseFloat(x))
// 	switch (newInstance.name) {
// 		case "Color":
// 			const opacity = arr[4] !== undefined ? arr[4] : 255
// 			return new newInstance(arr[0], arr[2], arr[3], opacity)
// 		case "Vector3":
// 			return new newInstance(arr[0], arr[2], arr[3])
// 		case "QAngle":
// 			return new newInstance(arr[0], arr[2], arr[3])
// 		default:
// 			throw `Unknown instance: ${type}`
// 	}
// }

// function ReadTypedValueV2(
// 	name: string,
// 	type: RecursiveMapValue
// ): EntityDataMapValue {
// 	switch (name) {
// 		case "origin":
// 			return toInstance(type, Vector3)
// 		case "angles":
// 			return toInstance(type, QAngle)
// 		default: {
// 			if (Array.isArray(type) && name.includes("color"))
// 				return toInstance(type, Color)
// 			return type as EntityDataMapValue
// 		}
// 	}
// }

function ParseEntityKeyValues(
	lump: EntityDataMap[],
	entityKeyValues: RecursiveMapValue[]
) {
	for (let index = 0, end = entityKeyValues.length; index < end; index++) {
		const entityKV = entityKeyValues[index]
		if (!(entityKV instanceof Map)) {
			continue
		}
		// TODO: m_connections?
		const map = new EntityDataMap()
		if (entityKV.has("keyValues3Data")) {
			const kvData = entityKV.get("keyValues3Data")
			if (kvData === undefined) {
				continue
			}
			if (!(kvData instanceof Map)) {
				throw `Unknown kvData: ${kvData}`
			}

			const version = MapValueToNumber(kvData.get("version"), 0) // bigint without mask
			if (version !== 1) {
				throw `Unknown entity kvData version: ${version}`
			}

			const values = kvData.get("values")
			if (!(values instanceof Map)) {
				continue
			}

			values.forEach((value, name) => {
				let entityValue: RecursiveMapValue | EntityDataMapValue = value
				if (Array.isArray(entityValue)) {
					switch (entityValue.length) {
						case 2:
							entityValue = Vector2.fromArray(entityValue as number[])
							break
						case 3:
							entityValue = Vector3.fromArray(entityValue as number[])
							break
						case 4:
							entityValue = Vector4.fromArray(entityValue as number[])
							break
					}
				}
				map.set(MurmurHash2(name, 0x31415926) >>> 0, value as EntityDataMapValue)
			})
		} else if (entityKV.has("m_keyValuesData")) {
			let kvData = entityKV.get("m_keyValuesData")
			if (typeof kvData === "string") {
				kvData = StringToUTF8(kvData)
			}
			if (!(kvData instanceof Uint8Array)) {
				continue
			}
			const kvDataStream = new ViewBinaryStream(
				new DataView(kvData.buffer, kvData.byteOffset, kvData.byteLength)
			)
			{
				const version = kvDataStream.ReadUint32()
				if (version !== 1) {
					throw `Unknown entity data version: ${version}`
				}
			}
			const hashedKeys = kvDataStream.ReadUint32(),
				stringKeys = kvDataStream.ReadUint32()
			for (let i = 0; i < hashedKeys; i++) {
				const hash = kvDataStream.ReadUint32(),
					value = ReadTypedValue(kvDataStream)
				map.set(hash, value)
			}
			for (let i = 0; i < stringKeys; i++) {
				const hash = kvDataStream.ReadUint32()
				kvDataStream.ReadNullTerminatedUtf8String() // key
				const value = ReadTypedValue(kvDataStream)
				map.set(hash, value)
			}
		} else {
			throw "Unknown entity KV"
		}

		lump.push(map)
	}
}

function ParseEntityLumpInternal(path: string, isBase: boolean): void {
	const kv = parseKV(path + "_c")
	if (kv.has("m_childLumps")) {
		const childLumps = kv.get("m_childLumps")
		if (!Array.isArray(childLumps)) {
			return
		}
		for (let index = 0, end = childLumps.length; index < end; index++) {
			const childLump = childLumps[index]
			if (typeof childLump === "string") {
				ParseEntityLumpInternal(childLump, false)
			}
		}
	}

	if (kv.has("m_entityKeyValues")) {
		let name = (kv.get("m_name") as Nullable<string>) ?? "unknown"
		if (isBase) {
			name = "world_layer_base"
		}
		let lump = EntityDataLumps.get(name)
		if (lump === undefined) {
			lump = []
			EntityDataLumps.set(name, lump)
		}
		const entityKeyValues = kv.get("m_entityKeyValues")
		if (Array.isArray(entityKeyValues)) {
			ParseEntityKeyValues(lump, entityKeyValues)
		}
	}
}

export const EntityDataLumps = new Map<string, EntityDataMap[]>()

export function ParseEntityLump(path: string): void {
	try {
		ParseEntityLumpInternal(path, true)
	} catch (e) {
		console.error("Error in EntityLump init", e)
	}
}

export function ResetEntityLump(): void {
	EntityDataLumps.clear()
}
