import Item from "../Base/Item"

export default class item_boots extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_BootsOfSpeed
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_boots", item_boots)