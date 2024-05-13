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
			data={['All', 'To Do', 'In Progress', 'Done']}
		/>
	)
}

export default FilterDropdown
