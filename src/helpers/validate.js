export const required = (value, text = 'Обязательное поле') => {
	return !!value ? undefined : text
};