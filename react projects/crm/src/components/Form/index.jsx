import Label from '../Label';
import Input from './../Input';
import FormGroup from './../FormGroup';
import Select from '../Select';
import Button from '../Button';
import data from './../../data/data.json';
import getRandomArrayData from './../../utils/calcFunctions'

const formFields = [
  {
    element: 'input',
    type: 'text',
    name: 'full_name',
    placeholder : 'Имя и Фамилия',
    id : 'full_name',
    required : true
  },
  {
    element: 'input',
    type: 'text',
    name: 'phone',
    placeholder : 'Телефон',
    id : 'phone',
    required : true
  },
  {
    element: 'input',
    type: 'text',
    name: 'email',
    placeholder : 'Email',
    id : 'email',
    required : true
  },
  {
    element: 'select',
    className: 'form-control',
    name: 'product',
    id : 'product',
  }
];

const Form = ({products}) => {
  const testData = data.testData;
  const newTask = getRandomArrayData(testData);

  
  const formContent = formFields.map((field) => {
    switch (field.element) {
      case 'input' :
        return (
          <FormGroup key={field.id}>
            <Input 
              type = {field.type}
              name = {field.name}
              placeholder = {field.placeholder}
              id = {field.id}
              value={newTask[field.name]}
              required = {field.required}
            />
          </FormGroup>
        );
      case 'select' :
        return (
          <FormGroup key={field.id}>
            <Label htmlFor = 'product' text = 'Продукт:'/>
            <Select 
              name={field.name}
              className={field.className}
              options={products}
              id={field.id}
              value={newTask.product}
            />
          </FormGroup>
        );

      default :
        return null;
    }
  });

  return (
    <form id="form" method="POST" action="">
      <Label htmlFor = 'full_name' text = 'Ваши данные:'/>
      {formContent}
      <FormGroup id='noteWrapper' key="noteWrapper">
        <Button text='Оформить заявку' className='btn btn-lg btn-primary btn-block'/>
      </FormGroup>

    </form>
  );
}

export default Form;