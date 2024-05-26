import { Paths } from "../../../Data/ImageData"
import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("chen_summon_convert")
export class chen_summon_convert extends Ability {
	public get ShouldBeDrawable(): boolean {
		return true
	}
	public get TexturePath(): string {
		const abilName = this.Name,
			basePath = Paths.AbilityIcons
		switch (true) {
			case this.GetSpecialValue("summon_centaurs") !== 0:
				return `${basePath}/${abilName}_centaur_png.vtex_c`
			case this.GetSpecialValue("summon_wolves") !== 0:
				return `${basePath}/${abilName}_wolf_png.vtex_c`
			case this.GetSpecialValue("summon_hellbears") !== 0:
				return `${basePath}/${abilName}_hellbear_png.vtex_c`
			case this.GetSpecialValue("summon_trolls") !== 0:
				return `${basePath}/${abilName}_troll_png.vtex_c`
			case this.GetSpecialValue("summon_satyrs") !== 0:
				return `${basePath}/${abilName}_satyr_png.vtex_c`
			default:
				return super.TexturePath
		}
	}
}
