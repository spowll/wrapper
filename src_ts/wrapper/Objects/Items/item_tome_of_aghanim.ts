import Item from "../Base/Item"

export default class item_tome_of_aghanim extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_Tome_of_aghanim>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_tome_of_aghanim", item_tome_of_aghanim)
