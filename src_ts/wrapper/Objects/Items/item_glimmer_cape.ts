import Item from "../Base/Item"

export default class item_glimmer_cape extends Item {
	public NativeEntity: Nullable<CDOTA_Item_GlimmerCape>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_glimmer_cape", item_glimmer_cape)
