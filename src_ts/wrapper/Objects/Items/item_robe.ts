import Item from "../Base/Item"

export default class item_robe extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_RobeOfMagi>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_robe", item_robe)
