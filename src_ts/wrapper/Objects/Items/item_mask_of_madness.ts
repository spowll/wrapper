import Item from "../Base/Item"

export default class item_mask_of_madness extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_MaskOfMadness
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_mask_of_madness", item_mask_of_madness)