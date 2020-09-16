import Color from "../Base/Color"
import Rectangle from "../Base/Rectangle"
import Vector2 from "../Base/Vector2"
import RendererSDK from "../Native/RendererSDK"
import Base, { IMenu } from "./Base"

export default class Switcher extends Base {
	public values: string[]
	public selected_id = 0
	protected readonly ArrowSize = 24
	protected readonly arrow_size = RendererSDK.GetTextSize("«", this.FontName, this.ArrowSize)
	protected readonly arrow_rect_size = new Vector2(this.ArrowSize - 6, this.ArrowSize)
	protected readonly arrow_rect_offset = this.text_offset.Add(this.arrow_rect_size).AddForThis(this.border_size)
	protected readonly arrow_offset = new Vector2(this.arrow_rect_size.x / 2 - this.arrow_size.x / 2, -1)
	protected readonly separator_size = 3
	protected readonly arrow_separator_color = new Color(14, 14, 14)
	protected readonly arrow_background_color = new Color(14, 99, 152)
	protected name_size = new Vector2()
	protected longest_value_size = new Vector2()

	constructor(parent: IMenu, name: string, values: string[], default_value = 0) {
		super(parent, name + ":")
		this.values = values
		this.selected_id = default_value
		this.Update()
	}

	public get RightArrowRect(): Rectangle {
		let base_pos = this.Position.Add(this.TotalSize).SubtractScalarY(this.longest_value_size.y + 3).SubtractForThis(this.arrow_rect_offset).AddScalarY(this.ArrowSize / 2)
		return new Rectangle(base_pos, base_pos.Add(this.arrow_rect_size))
	}
	public get LeftArrowRect(): Rectangle {
		return this.RightArrowRect.SubtractX(this.arrow_rect_size.x + this.separator_size)
	}

	public get ConfigValue() { return this.selected_id }
	public set ConfigValue(value) {
		this.selected_id = Math.max(Math.min(this.values.length - 1, value ?? this.selected_id), 0)
	}
	public OnConfigLoaded() {
		this.OnValueChangedCBs.forEach(f => f(this))
	}

	public Update(): void {
		let longest_value = this.values.reduce((prev, cur) => cur.length > prev.length ? cur : prev, "")
		this.name_size = RendererSDK.GetTextSize(this.name, this.FontName, this.FontSize)
		this.longest_value_size = RendererSDK.GetTextSize(longest_value, this.FontName, this.FontSize)
		this.TotalSize_.x =
			Math.max(this.name_size.x, this.longest_value_size.x)
			+ ((this.longest_value_size.x - this.name_size.x) < this.arrow_rect_size.x * 2 ? this.arrow_rect_size.x * 2 : 0)
			+ 10 * 2
			+ this.border_size.x * 2
		this.TotalSize.y = this.TotalSize_.y = this.name_size.y + this.longest_value_size.y + 3 + this.border_size.y * 2 + this.text_offset.y * 2
	}

	public Render(): void {
		super.Render()
		RendererSDK.FilledRect(this.Position.Add(this.border_size), this.TotalSize.Subtract(this.border_size.MultiplyScalar(2)), this.background_color)
		RendererSDK.Text(this.name, this.Position.Add(this.text_offset).AddScalarY(this.FontSize), this.FontColor, this.FontName, this.FontSize)
		RendererSDK.Text(this.values[this.selected_id], this.Position.Add(this.text_offset).AddScalarY(this.name_size.y + 3 + this.FontSize), this.FontColor, this.FontName, this.FontSize)
		let left_rect = this.LeftArrowRect,
			right_rect = this.RightArrowRect
		RendererSDK.FilledRect(left_rect.pos1, left_rect.pos2.Subtract(left_rect.pos1), this.arrow_background_color)
		RendererSDK.Text("«", left_rect.pos1.Add(this.arrow_offset).SubtractScalarX(1).AddScalarY(this.ArrowSize - 4), this.FontColor, this.FontName, this.ArrowSize)
		RendererSDK.FilledRect(right_rect.pos1, right_rect.pos2.Subtract(right_rect.pos1), this.arrow_background_color)
		RendererSDK.Text("»", right_rect.pos1.Add(this.arrow_offset).SubtractScalarX(1).AddScalarY(this.ArrowSize - 4), this.FontColor, this.FontName, this.ArrowSize)
		super.RenderTooltip()
	}

	public OnMouseLeftDown(): boolean {
		return !this.Rect.Contains(this.MousePosition)
	}
	public OnMouseLeftUp(): boolean {
		if (this.LeftArrowRect.Contains(this.MousePosition)) {
			// backward
			if (this.selected_id <= 0)
				this.selected_id = this.values.length - 1
			else
				this.selected_id--
		} else if (this.RightArrowRect.Contains(this.MousePosition)) {
			// forward
			if (this.selected_id >= this.values.length - 1)
				this.selected_id = 0
			else
				this.selected_id++
		} else
			return false
		this.OnValueChangedCBs.forEach(f => f(this))
		return false
	}
}
