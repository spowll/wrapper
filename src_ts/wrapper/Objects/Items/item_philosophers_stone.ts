import Item from "../Base/Item"

export default class item_philosophers_stone extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_Philosophers_Stone>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_philosophers_stone", item_philosophers_stone)
