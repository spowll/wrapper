import Item from "../Base/Item"

export default class item_mirror_shield extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_Mirror_Shield
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_mirror_shield", item_mirror_shield)
