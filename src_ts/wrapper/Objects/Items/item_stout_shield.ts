import Item from "../Base/Item"

export default class item_stout_shield extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_StoutShield>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_stout_shield", item_stout_shield)
