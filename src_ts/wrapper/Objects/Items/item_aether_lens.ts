import Item from "../Base/Item"

export default class item_aether_lens extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_Aether_Lens
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_aether_lens", item_aether_lens)
