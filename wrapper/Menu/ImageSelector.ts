import Color from "../Base/Color"
import Rectangle from "../Base/Rectangle"
import Vector2 from "../Base/Vector2"
import RendererSDK from "../Native/RendererSDK"
import AbilityData from "../Objects/DataBook/AbilityData"
import Base, { IMenu } from "./Base"

// every icon: 32x32, 1x1 border
export default class ImageSelector extends Base {
	private static readonly image_border_width = 2
	private static readonly elements_per_row = 4
	private static readonly image_activated_border_color = new Color(104, 4, 255)

	public enabled_values: Map<string, boolean>
	protected readonly image_size = new Vector2(32, 32)
	protected rendered_paths: string[] = []

	constructor(
		parent: IMenu,
		name: string,
		public values: string[],
		default_values = new Map<string, boolean>(),
		tooltip = "",
	) {
		super(parent, name, tooltip)
		this.enabled_values = default_values
	}
	public get IsZeroSelected(): boolean {
		for (const value of this.enabled_values.values())
			if (value)
				return false
		return true
	}

	public get IconsRect() {
		const base_pos = this.Position.Add(this.text_offset).AddScalarY(this.name_size.y + 3)
		return new Rectangle(
			base_pos,
			base_pos.Add(
				this.image_size
					.AddScalar(ImageSelector.image_border_width * 2 + 2)
					.MultiplyScalarX(Math.min(this.values.length, ImageSelector.elements_per_row))
					.MultiplyScalarY(Math.ceil(this.values.length / ImageSelector.elements_per_row)),
			).SubtractScalar(6),
		)
	}

	public get ConfigValue() { return Array.from(this.enabled_values.entries()) }
	public set ConfigValue(value) {
		if (value === undefined)
			return
		this.enabled_values = new Map<string, boolean>(value)
		this.values.forEach(value_ => {
			if (!this.enabled_values.has(value_))
				this.enabled_values.set(value_, false)
		})
	}
	public OnConfigLoaded() {
		this.OnValueChangedCBs.forEach(f => f(this))
	}

	public Update(): void {
		super.Update()
		this.values.forEach(value => {
			if (!this.enabled_values.has(value))
				this.enabled_values.set(value, false)
		})
		this.rendered_paths = this.values.map(path => {
			if (path.startsWith("item_bottle_"))
				path = `panorama/images/items/${path.substring(5)}_png.vtex_c`
			else if (!path.startsWith("npc_dota_hero_")) {
				const abil = AbilityData.GetAbilityByName(path)
				if (abil !== undefined)
					path = abil.TexturePath
			} else
				path = `panorama/images/heroes/${path}_png.vtex_c`
			const path_iamge_size = RendererSDK.GetImageSize(path)
			this.image_size.x = Math.max(this.image_size.x, 32 * (path_iamge_size.x / path_iamge_size.y))
			return path
		})
		this.OriginalSize.x =
			Math.max(
				this.name_size.x,
				Math.min(this.values.length, ImageSelector.elements_per_row)
				* (this.image_size.x + ImageSelector.image_border_width * 2 + 2),
			)
			+ this.text_offset.x * 2
		this.OriginalSize.y = (
			Math.ceil(this.values.length / ImageSelector.elements_per_row)
			* (this.image_size.y + ImageSelector.image_border_width * 2 + 2)
			+ 40
		)
	}

	public IsEnabled(value: string): boolean {
		return this.enabled_values.get(value) ?? false
	}
	public IsEnabledID(id: number): boolean {
		return this.IsEnabled(this.values[id])
	}

	public Render(): void {
		super.Render()
		this.RenderTextDefault(this.Name, this.Position.Add(this.text_offset))
		const base_pos = this.IconsRect.pos1
		for (let i = 0; i < this.values.length; i++) {
			const size = this.image_size,
				pos = new Vector2(
					i % ImageSelector.elements_per_row,
					Math.floor(i / ImageSelector.elements_per_row),
				).Multiply(this.image_size.AddScalar(ImageSelector.image_border_width * 2 + 2)).Add(base_pos)
			RendererSDK.Image(this.rendered_paths[i], pos, -1, size)
			if (this.IsEnabled(this.values[i]))
				RendererSDK.OutlinedRect(
					pos,
					size,
					ImageSelector.image_border_width,
					ImageSelector.image_activated_border_color,
				)
		}
	}

	public OnMouseLeftDown(): boolean {
		return !this.IconsRect.Contains(this.MousePosition)
	}
	public OnMouseLeftUp(): boolean {
		const rect = this.IconsRect
		if (!rect.Contains(this.MousePosition))
			return false
		const off = rect.GetOffset(this.MousePosition)
		for (let i = 0; i < this.values.length; i++) {
			const base_pos = new Vector2(
				i % ImageSelector.elements_per_row,
				Math.floor(i / ImageSelector.elements_per_row),
			).Multiply(this.image_size.AddScalar(ImageSelector.image_border_width * 2 + 2))
			if (!new Rectangle(base_pos, base_pos.Add(this.image_size)).Contains(off))
				continue
			const value = this.values[i]
			this.enabled_values.set(value, !this.IsEnabled(value))
			this.OnValueChangedCBs.forEach(f => f(this))
			break
		}
		return false
	}
}
