import Item from "../Base/Item"

export default class item_sobi_mask extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_SobiMask
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_sobi_mask", item_sobi_mask)