import Item from "../Base/Item"

export default class item_ring_of_regen extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_RingOfRegeneration>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_ring_of_regen", item_ring_of_regen)
