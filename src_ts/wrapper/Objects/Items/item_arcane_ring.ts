import Item from "../Base/Item"

export default class item_arcane_ring extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_Arcane_Ring
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_arcane_ring", item_arcane_ring)
