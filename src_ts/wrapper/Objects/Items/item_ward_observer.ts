import Item from "../Base/Item"

export default class item_ward_observer extends Item {
	public readonly m_pBaseEntity!: CDOTA_Item_ObserverWard
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_ward_observer", item_ward_observer)