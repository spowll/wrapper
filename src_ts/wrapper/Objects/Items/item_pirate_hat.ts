import Item from "../Base/Item"

export default class item_pirate_hat extends Item {
	public NativeEntity: Nullable<CDOTA_Item_Pirate_Hat>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_pirate_hat", item_pirate_hat)
