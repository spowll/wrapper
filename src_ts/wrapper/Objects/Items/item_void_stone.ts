import Item from "../Base/Item"

export default class item_void_stone extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_VoidStone
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_void_stone", item_void_stone)
