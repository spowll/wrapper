import Item from "../Base/Item"

export default class item_radiance extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_Radiance>

	public get AOERadius(): number {
		return this.GetSpecialValue("aura_radius")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_radiance", item_radiance)
