import Item from "../Base/Item"

export default class item_tome_of_knowledge extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_Tome_Of_Knowledge>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_tome_of_knowledge", item_tome_of_knowledge)
