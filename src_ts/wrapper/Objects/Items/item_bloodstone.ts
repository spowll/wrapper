import Item from "../Base/Item"

export default class item_bloodstone extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_Bloodstone
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_bloodstone", item_bloodstone)
