import Item from "../Base/Item"

export default class item_tranquil_boots extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_TranquilBoots
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_tranquil_boots", item_tranquil_boots)