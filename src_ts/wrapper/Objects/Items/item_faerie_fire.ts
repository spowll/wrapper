import Item from "../Base/Item"

export default class item_faerie_fire extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_Faerie_Fire>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_faerie_fire", item_faerie_fire)
