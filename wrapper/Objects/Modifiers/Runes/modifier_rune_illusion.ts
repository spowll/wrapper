import { GetRuneTexture } from "../../../Data/ImageData"
import { WrapperClassModifier } from "../../../Decorators"
import { Modifier } from "../../Base/Modifier"

@WrapperClassModifier()
export class modifier_rune_illusion extends Modifier {
	public GetTexturePath(small = false) {
		return GetRuneTexture("illusion", small)
	}
}