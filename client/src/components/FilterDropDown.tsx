import React from 'react'
import { Select } from '@mantine/core'

interface FilterDropdownProps {
	value: string
	onChange: (value: string) => void
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, onChange }) => {
	return (
		<Select
			label='Filter tasks by status'
			value={value}
			onChange={(val) => {
				if (typeof val === 'string') onChange(val)
			}}
			data={[
				{
					label: 'All',
					value: 'All',
				},
				{
					label: 'To Do',
					value: 'todo',
				},
				{
					label: 'In Progress',
					value: 'in-progress',
				},
				{
					label: 'Done',
					value: 'done',
				},
			]}
		/>
	)
}

export default FilterDropdown
