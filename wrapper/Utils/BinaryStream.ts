export default class BinaryStream {
	constructor(public readonly view: DataView, public pos = 0) { }
	public get Remaining(): number {
		return Math.max(this.view.byteLength - this.pos, 0)
	}

	public RelativeSeek(s: number): BinaryStream {
		this.pos += s
		return this
	}
	public ReadUint8(): number {
		return this.view.getUint8(this.pos++)
	}
	public WriteUint8(val: number): void {
		this.view.setUint8(this.pos++, val)
	}
	public ReadInt8(): number {
		return this.view.getInt8(this.pos++)
	}
	public WriteInt8(val: number): void {
		this.view.setInt8(this.pos++, val)
	}
	public ReadVarUintAsNumber(): number {
		let val = 0,
			shift = 0,
			b: number
		do {
			b = this.ReadUint8()
			val |= (b & 0x7F) << shift
			shift += 7
		} while ((b & 0x80) !== 0)
		return val
	}
	public WriteVarUintAsNumber(val: number): void {
		while (val >= 0x80) {
			this.WriteUint8((val | 0x80) & 0xFF)
			val >>= 7
		}
		this.WriteUint8(val)
	}
	public ReadVarUint(): bigint {
		let val = 0n,
			shift = 0n,
			b: number
		do {
			b = this.ReadUint8()
			val |= BigInt(b & 0x7F) << shift
			shift += 7n
		} while ((b & 0x80) !== 0)
		return val
	}
	public WriteVarUint(val: bigint): void {
		while (val >= 0x80n) {
			this.WriteUint8(Number((val | 0x80n) & 0xFFn))
			val >>= 7n
		}
		this.WriteUint8(Number(val))
	}
	public ReadUint16(littleEndian = true): number {
		const res = this.view.getUint16(this.pos, littleEndian)
		this.pos += 2
		return res
	}
	public WriteUint16(val: number, littleEndian = true): void {
		this.view.setUint16(this.pos, val, littleEndian)
		this.pos += 2
	}
	public ReadInt16(littleEndian = true): number {
		const res = this.view.getInt16(this.pos, littleEndian)
		this.pos += 2
		return res
	}
	public WriteInt16(val: number, littleEndian = true): void {
		this.view.setInt16(this.pos, val, littleEndian)
		this.pos += 2
	}
	public ReadUint32(littleEndian = true): number {
		const res = this.view.getUint32(this.pos, littleEndian)
		this.pos += 4
		return res
	}
	public WriteUint32(val: number, littleEndian = true): void {
		this.view.setUint32(this.pos, val, littleEndian)
		this.pos += 4
	}
	public ReadInt32(littleEndian = true): number {
		const res = this.view.getInt32(this.pos, littleEndian)
		this.pos += 4
		return res
	}
	public WriteInt32(val: number, littleEndian = true): void {
		this.view.setInt32(this.pos, val, littleEndian)
		this.pos += 4
	}
	public ReadUint64(littleEndian = true): bigint {
		const res = this.view.getBigUint64(this.pos, littleEndian)
		this.pos += 8
		return res
	}
	public WriteUint64(val: bigint, littleEndian = true): void {
		this.view.setBigUint64(this.pos, val, littleEndian)
		this.pos += 8
	}
	public ReadInt64(littleEndian = true): bigint {
		const res = this.view.getBigInt64(this.pos, littleEndian)
		this.pos += 8
		return res
	}
	public WriteInt64(val: bigint, littleEndian = true): void {
		this.view.setBigInt64(this.pos, val, littleEndian)
		this.pos += 8
	}
	public ReadFloat32(littleEndian = true): number {
		const res = this.view.getFloat32(this.pos, littleEndian)
		this.pos += 4
		return res
	}
	public WriteFloat32(val: number, littleEndian = true): void {
		this.view.setFloat32(this.pos, val, littleEndian)
		this.pos += 4
	}
	public ReadFloat64(littleEndian = true): number {
		const res = this.view.getFloat64(this.pos, littleEndian)
		this.pos += 8
		return res
	}
	public WriteFloat64(val: number, littleEndian = true): void {
		this.view.setFloat64(this.pos, val, littleEndian)
		this.pos += 4
	}
	public ReadBoolean(): boolean {
		return this.ReadUint8() !== 0
	}
	public WriteBoolean(val: number): void {
		this.WriteUint8(val ? 1 : 0)
	}
	// returns reference to original buffer instead of creating new one
	public ReadSlice(size: number): Uint8Array {
		const slice = new Uint8Array(this.view.buffer, this.view.byteOffset + this.pos, size)
		this.RelativeSeek(size)
		return slice
	}
	// writes Uint8Array
	public WriteSlice(slice: ArrayLike<number>): void {
		this.ReadSlice(slice.length).set(slice)
	}
	public ReadUtf8String(size: number): string {
		// inlined Utf8ArrayToStr that works with streaming
		let out = ""

		while (size--) {
			const c = this.ReadUint8()
			switch (c >> 4) {
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
					// 0xxxxxxx
					out += String.fromCharCode(c)
					break
				case 12: case 13: {
					// 110x xxxx   10xx xxxx
					const char2 = size > 0 ? this.ReadUint8() : 0
					size = Math.max(size - 1, 0)
					out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
					break
				}
				case 14: {
					// 1110 xxxx  10xx xxxx  10xx xxxx
					const char2 = size > 0 ? this.ReadUint8() : 0
					size = Math.max(size - 1, 0)
					const char3 = size > 0 ? this.ReadUint8() : 0
					size = Math.max(size - 1, 0)
					out += String.fromCharCode(((c & 0x0F) << 12) |
						((char2 & 0x3F) << 6) |
						((char3 & 0x3F) << 0))
					break
				}
			}
		}

		return out
	}
	public ReadNullTerminatedString(): string {
		let str = ""
		while (true) {
			if (this.Empty())
				return str
			const b = this.ReadUint8()
			if (b === 0)
				return str
			str += String.fromCharCode(b)
		}
	}
	public ReadNullTerminatedUtf8String(): string {
		const orig_pos = this.pos
		let size = 0
		while (this.ReadUint8() !== 0)
			size++
		this.pos = orig_pos

		const str = this.ReadUtf8String(size)
		this.pos++ // skip remaining null byte
		return str
	}
	public ReadNullTerminatedUtf16String(): string {
		let str = ""
		while (true) {
			if (this.Empty())
				return str
			const b = this.ReadUint16()
			if (b === 0)
				return str
			str += String.fromCharCode(b)
		}
	}
	// https://github.com/SteamDatabase/ValveResourceFormat/blob/cceba491d7bb60890a53236a90970b24d0a4aba9/ValveResourceFormat/Utils/StreamHelpers.cs#L43
	public ReadOffsetString(): string {
		const offset = this.ReadUint32()
		if (offset === 0)
			return ""
		const saved_pos = this.pos
		this.pos += offset - 4 // offset from offset
		const ret = this.ReadNullTerminatedUtf8String()
		this.pos = saved_pos
		return ret
	}
	// returns reference to original buffer instead of creating new one
	public ReadVarSlice(): Uint8Array {
		return this.ReadSlice(this.ReadVarUintAsNumber())
	}
	// writes varint encoded length + Uint8Array
	public WriteVarSlice(slice: ArrayLike<number>): void {
		this.WriteVarUintAsNumber(slice.length)
		this.ReadSlice(slice.length).set(slice)
	}
	public ReadVarString(): string {
		return this.ReadUtf8String(this.ReadVarUintAsNumber())
	}
	public Empty(): boolean {
		return this.pos >= this.view.byteLength
	}
}
