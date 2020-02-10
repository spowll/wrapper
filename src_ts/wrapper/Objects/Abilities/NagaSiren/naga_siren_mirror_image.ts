import Ability from "../../Base/Ability"

export default class naga_siren_mirror_image extends Ability {
	public NativeEntity: Nullable<C_DOTA_Ability_NagaSiren_MirrorImage>

	public get ActivationDelay(): number {
		return this.GetSpecialValue("invuln_duration")
	}
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("naga_siren_mirror_image", naga_siren_mirror_image)