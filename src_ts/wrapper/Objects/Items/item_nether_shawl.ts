import Item from "../Base/Item"

export default class item_nether_shawl extends Item {
	public readonly m_pBaseEntity!: CDOTA_Item_Nether_Shawl
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_nether_shawl", item_nether_shawl)
