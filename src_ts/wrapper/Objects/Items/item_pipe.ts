import Item from "../Base/Item"

export default class item_pipe extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_Pipe>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_pipe", item_pipe)
