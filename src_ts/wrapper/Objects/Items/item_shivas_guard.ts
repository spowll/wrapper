import Item from "../Base/Item"

export default class item_shivas_guard extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_Shivas_Guard
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_shivas_guard", item_shivas_guard)
