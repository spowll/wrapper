import Item from "../Base/Item"

export default class item_faded_broach extends Item {
	public NativeEntity: Nullable<CDOTA_Item_Faded_Broach>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_faded_broach", item_faded_broach)
