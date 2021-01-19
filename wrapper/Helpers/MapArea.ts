export enum MapArea {
	Unknown = 0,
	Top = 1 << 0,
	Middle = 1 << 1,
	Bottom = 1 << 3,
	RadiantBase = 1 << 4,
	DireBase = 1 << 5,
	RoshanPit = 1 << 6,
	RiverTop = 1 << 7,
	RiverMiddle = 1 << 8,
	RiverBottom = 1 << 9,
	River = RiverTop | RiverMiddle | RiverBottom,
	DireBottomJungle = 1 << 10,
	DireTopJungle = 1 << 11,
	RadiantBottomJungle = 1 << 12,
	RadiantTopJungle = 1 << 13,
	Jungle = DireBottomJungle | DireTopJungle | RadiantBottomJungle | RadiantTopJungle,
}
