import Events from "./Events"
import BinaryStream from "../Utils/BinaryStream"
import { Utf8ArrayToStr, StringToUTF8 } from "../Utils/Utils"
import { MurmurHash64 } from "../Native/WASM"

const Manifest = new (class CManifest {
	public readonly Directories: string[] = []
	public readonly Extensions: string[] = []
	public readonly FileNames: string[] = []
	public readonly Paths = new Map<bigint, [number, number, number]>()

	public GetPathByHash(hash: bigint): Nullable<string> {
		let path = this.Paths.get(hash)
		if (path === undefined)
			return HashToPath(hash)
		return `${this.Directories[path[0]]}${this.FileNames[path[1]]}.${this.Extensions[path[2]]}`
	}
})
export default Manifest

function ParseStringFromStream(stream: BinaryStream, ar: string[]) {
	let id = Number(stream.ReadVarUint()),
		size = Number(stream.ReadVarUint())
	if (id === ar.length)
		ar[id] = Utf8ArrayToStr(new Uint8Array(stream.ReadSlice(size)))
	else
		stream.RelativeSeek(size)
}

Events.on("ServerMessage", (msg_id, buf) => {
	switch (msg_id) {
		case 9: { // we have custom parsing for CNETMsg_SpawnGroup_Load & CNETMsg_SpawnGroup_ManifestUpdate
			let stream = new BinaryStream(new DataView(buf))
			for (let i = 0, end = stream.ReadVarUint(); i < end; i++)
				ParseStringFromStream(stream, Manifest.Extensions)
			for (let i = 0, end = stream.ReadVarUint(); i < end; i++)
				ParseStringFromStream(stream, Manifest.Directories)
			for (let i = 0, end = stream.ReadVarUint(); i < end; i++) {
				let path_id = Number(stream.ReadVarUint()),
					dir_id = Number(stream.ReadVarUint()),
					ext_id = Number(stream.ReadVarUint()),
					file_id = Number(stream.ReadVarUint()),
					file_size = Number(stream.ReadVarUint())
				if (file_id === Manifest.FileNames.length)
					Manifest.FileNames[file_id] = Utf8ArrayToStr(new Uint8Array(stream.ReadSlice(file_size)))
				else
					stream.RelativeSeek(file_size)
				if (path_id !== Manifest.Paths.size)
					continue
				let path = `${Manifest.Directories[dir_id]}${Manifest.FileNames[file_id]}.${Manifest.Extensions[ext_id]}`
				Manifest.Paths.set(MurmurHash64(StringToUTF8(path), 0xEDABCDEF), [dir_id, file_id, ext_id])
			}
			break
		}
		case 40: // reset Manifest on CSVCMsg_ServerInfo
			Manifest.Directories.splice(0)
			Manifest.Extensions.splice(0)
			Manifest.FileNames.splice(0)
			Manifest.Paths.clear()
			break
		default:
			break
	}
})