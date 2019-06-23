import { Tree } from "./Tree"

function ListBoxCallback(comboBox: ListBox): void {

	var onValueCall = comboBox.OnValueCallback

	if (onValueCall)
		onValueCall(comboBox.selected_flags, comboBox)
}

function getTopParent(node: Tree | ListBox): Tree {
	let parent = node.parent
	return parent !== undefined ? getTopParent(parent) : node as Tree
}

export default class ListBox extends Menu_List {

	parent: Tree

	defaultValue: boolean[]

	OnValueCallback: (value: boolean[], self: ListBox) => void
	OnActivateCallback: (self: ListBox) => void
	OnDeactivateCallback: (self: ListBox) => void

	/**
	 * You can't change 'callback'. For this use 'OnValue' or 'OnValueCallback'
	 */
	readonly callback: (self: ListBox) => void

	constructor(parent: Tree, name: string, values: string[], selected_flags: boolean[], hint: string) {

		if (hint === undefined)
			super(name, values, selected_flags)
		else
			super(name, values, selected_flags, hint)

		this.defaultValue = selected_flags

		Object.defineProperty(this, "callback", {
			value: () => ListBoxCallback(this),
			writable: false,
		})

		var selfParent = parent
		Object.defineProperty(this, "parent", {
			set: (value: Tree) => {

				this.Remove()

				value.entries.push(this)

				var parnt = getTopParent(value)

				parnt.Update()

				selfParent = value
			},
			get: () => selfParent,
			configurable: false,
		})
	}
	
	get IndexInMenu(): number {
		return this.parent.entries.indexOf(this);
	}

	Remove(): void {
		this.parent.RemoveControl(this)
	}
	ChangeParentTo(parent: Tree) {
		this.parent = parent
	}

	SetToolTip(text: string): this {
		this.hint = text
		return this
	}

	get IsZeroSelected(): boolean {
		return !this.selected_flags.some(x => x === true)
	}
	IsInSelected(value: string): boolean {
		let indexOf = this.values.indexOf(value)

		return indexOf > -1 && this.selected_flags[indexOf]
	}

	ChangeValue(value: boolean[]): this {
		this.selected_flags = value
		return this
	}
	ChangeToDefault(): this {
		this.selected_flags = this.defaultValue
		return this
	}

	OnValue(callback: (value: boolean[], self: ListBox) => void): this {
		this.OnValueCallback = callback
		return this
	}
}