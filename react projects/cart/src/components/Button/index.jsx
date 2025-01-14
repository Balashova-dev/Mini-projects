import './style.scss';

const Button = ({title, onClick}) => {
	return <button className = 'button' onClick = {onClick}>{title}</button>;
}

export default Button;