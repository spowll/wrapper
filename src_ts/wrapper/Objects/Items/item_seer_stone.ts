import Item from "../Base/Item"

export default class item_seer_stone extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_Seer_Stone
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_seer_stone", item_seer_stone)
