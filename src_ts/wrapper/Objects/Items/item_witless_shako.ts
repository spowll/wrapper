import Item from "../Base/Item"

export default class item_witless_shako extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_Witless_shako
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_witless_shako", item_witless_shako)