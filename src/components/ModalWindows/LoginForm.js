import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import inputField from './inputField';

const validate = (values) => {
  const requiredFields = ['login', 'password'];
  const errors = {};
  requiredFields.map((field) => {
    if (!values[field]) {
      errors[field] = 'Поле обов\'язкове!';
      return errors[field];
    }
    return true;
  });
  return errors;
};

@reduxForm({
  form: 'loginForm',
  validate
})
export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { handleSubmit } = this.props;
    require('./LoginForm.scss');
    return (
      <div className="registration-modal">
        <div className="form-title">Вхід</div>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <div className="label">Логін:</div>
            <div className="field">
              <Field name="login" component={inputField} divClassName="input-text" />
            </div>
          </div>
          <div className="input-field">
            <div className="label">Пароль:</div>
            <div className="field">
              <Field name="password" component={inputField} divClassName="input-text" type="password" />
            </div>
          </div>
          <div
            onClick={handleSubmit((values) => { console.log('values', values); })}
            className="default-dark-button"
          >
            Увійти
          </div>
        </form>
      </div>
    );
  }
}
