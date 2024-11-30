import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { IFormProps } from './types';

import styles from './form.module.css';
import clsx from 'clsx';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
// Используйте для проверки формата введённого имени
import { namePattern } from '../../utils/constants';

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [nameError, setnameError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  let isDisabled = false;

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    if (!namePattern.test(e.target.value)) {
      setnameError(true);
    } else {
      setnameError(false);
    }
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRepeatPasswordError(false);
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setRepeatPasswordError(false);
    setRepeatPassword(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setRepeatPasswordError(true);
      return;
    }
    setRepeatPasswordError(false);

    setMode('complete');
  };

  return (
    <form
      className={clsx(styles.form, className)}
      data-testid='form'
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className={styles.icon} />
      <div className={styles.text_box}>
        <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
        <p className={clsx(styles.text, 'text text_type_main-medium')}>
          Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
          контрибьюторов
        </p>
      </div>
      <fieldset className={styles.fieldset}>
        <Input
          className='text input__textfield text_type_main-default'
          data-testid='name-input'
          name='name'
          placeholder={'Имя'}
          onChange={handleNameChange}
          error={nameError}
          errorText={'Некорректный формат имени'}
          required
          type='text'
          value={name}
          extraClass={clsx(styles.input, { [styles.input_error]: nameError })}
        />

        <EmailInput
          className='text input__textfield text_type_main-default'
          data-testid='email-input'
          name='email'
          placeholder={'E-mail'}
          onChange={handleEmailChange}
          required
          value={email}
          extraClass={clsx(styles.input, { [styles.input_error]: false })}
        />

        <PasswordInput
          className='text input__textfield text_type_main-default'
          data-testid='password-input'
          disabled={false}
          name='password'
          placeholder={'Пароль'}
          onChange={handlePasswordChange}
          required
          value={password}
          extraClass={clsx(styles.input, { [styles.input_error]: false })}
        />

        <PasswordInput
          className='text input__textfield text_type_main-default'
          data-testid='repeat-password-input'
          disabled={false}
          name='repeatPassword'
          placeholder={'Повторите пароль'}
          onChange={handleRepeatPasswordChange}
          required
          value={repeatPassword}
          extraClass={clsx(styles.input, {
            [styles.input_error]: repeatPasswordError
          })}
        />
        {repeatPasswordError && (
          <p className={'input__error'}>Пароли не совпадают</p>
        )}

        <button
          className='button button_type_primary button_size_medium'
          type='submit'
          disabled={!formRef.current?.checkValidity()}
        >
          Зарегистрироваться
        </button>
      </fieldset>
      <div className={styles.signin_box}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          extraClass={styles.signin_btn}
          onClick={() => {}}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
