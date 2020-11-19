import Color from "../Base/Color"
import Rectangle from "../Base/Rectangle"
import Vector2 from "../Base/Vector2"
import RendererSDK from "../Native/RendererSDK"
import AbilityData from "../Objects/DataBook/AbilityData"
import Base, { IMenu } from "./Base"
import Menu from "./Menu"

// every icon: 32x32, 1x1 border
export default class ImageSelector extends Base {
	public enabled_values: Map<string, boolean>
	protected readonly text_offset = new Vector2(8, 8)
	protected readonly image_size = new Vector2(32, 32)
	protected readonly image_border_size = new Vector2(2, 2)
	protected readonly image_border_color = new Color(64, 128, 255, 80)
	protected readonly image_color = new Color(255, 255, 255, 40)
	protected readonly image_activated_color = new Color(255, 255, 255)
	protected name_size = new Vector2()

	constructor(parent: IMenu, name: string, public values: string[], default_values = new Map<string, boolean>(), tooltip = "") {
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
		const base_pos = this.Position.Add(this.text_offset).AddForThis(this.border_size).AddScalarY(this.name_size.y + 3)
		return new Rectangle(base_pos, base_pos.Add(this.image_size.AddScalar(this.image_border_size.x * 2 + 2).Multiply(new Vector2(Math.min(this.values.length, 10), Math.ceil(this.values.length / 10)))).SubtractScalar(6))
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
		this.values.forEach(value => {
			if (!this.enabled_values.has(value))
				this.enabled_values.set(value, false)
		})
		this.name_size = RendererSDK.GetTextSize(this.Name, this.FontName, this.FontSize)
		this.TotalSize.x =
			Math.max(
				this.name_size.x,
				Math.min(this.values.length, 10) * (this.image_size.x + this.image_border_size.x * 2 + 2),
			)
			+ this.border_size.x * 2
			+ this.text_offset.x * 2
		this.TotalSize.y = this.TotalSize.y = Math.ceil(this.values.length / 10) * (this.image_size.y + this.image_border_size.x * 2 + 2) + 40
		Menu.PositionDirty = true
		super.Update()
	}

	public IsEnabled(value: string): boolean {
		return this.enabled_values.get(value) ?? false
	}
	public IsEnabledID(id: number): boolean {
		return this.IsEnabled(this.values[id])
	}

	public Render(): void {
		super.Render()
		RendererSDK.FilledRect(this.Position.Add(this.border_size), this.TotalSize.Subtract(this.border_size.MultiplyScalar(2)), this.background_color)
		RendererSDK.Text(this.Name, this.Position.Add(this.text_offset).AddScalarY(this.name_size.y), this.FontColor, this.FontName, this.FontSize)
		const base_pos = this.IconsRect.pos1
		for (let i = 0; i < this.values.length; i++) {
			const value = this.values[i],
				size = this.image_size,
				pos = new Vector2(i % 10, Math.floor(i / 10)).Multiply(this.image_size.AddScalar(this.image_border_size.x * 2 + 2)).Add(base_pos)
			let path = value

			if (path.startsWith("item_bottle_"))
				path = `panorama/images/items/${path.substring(5)}_png.vtex_c`
			else if (!path.startsWith("npc_dota_hero_")) {
				const abil = AbilityData.GetAbilityByName(path)
				if (abil !== undefined)
					path = abil.TexturePath
			} else
				path = `panorama/images/heroes/${path}_png.vtex_c`
			const is_enabled = this.IsEnabled(value)
			if (is_enabled)
				RendererSDK.FilledRect(pos.Subtract(this.image_border_size), size.Add(this.image_border_size.MultiplyScalar(2)), this.image_border_color)
			RendererSDK.Image(path, pos, -1, size, is_enabled ? this.image_activated_color : this.image_color)
		}
		if (!this.IconsRect.Contains(this.MousePosition))
			super.RenderTooltip()
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
			const base_pos = new Vector2(i % 10, Math.floor(i / 10)).Multiply(this.image_size.AddScalar(this.image_border_size.x * 2 + 2))
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
