import * as yup from 'yup';

export const authFormSchema = yup.object({
  login: yup
    .string()
    .required('Заполните логин')
    .matches(
      /^\w+/,
      'Неверно заполнен логин. Допускаются только буквы и цифры',
    ),
  password: yup
    .string()
    .required('Заполните пароль')
    .matches(/^\w+/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
    .min(8, 'Неверно заполнен пароль. Минимум 8 символов'),
});
