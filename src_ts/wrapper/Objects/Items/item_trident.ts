import Item from "../Base/Item"

export default class item_trident extends Item {
	public readonly m_pBaseEntity!: CDOTA_Item_Trident
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_trident", item_trident)
