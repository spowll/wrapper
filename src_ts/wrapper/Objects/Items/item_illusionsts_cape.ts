import Item from "../Base/Item"

export default class item_illusionsts_cape extends Item {
	public readonly m_pBaseEntity!: CDOTA_Item_Illusionsts_Cape
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_illusionsts_cape", item_illusionsts_cape)
