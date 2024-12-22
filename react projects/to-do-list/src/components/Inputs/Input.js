const Input = ({onchange = ()=>{}, type = 'text', placeholder = 'Введите текст', classNames = 'form-control me-2'}) => {
	return (
		<input
      onChange = {onchange}
			type={type}
			placeholder={placeholder}
			className={classNames}
		/>
	)
}

export default Input;