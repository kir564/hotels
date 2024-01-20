export const transformHotel = ({
  id,
  img,
  city,
  category,
  quantity,
  price,
  name,
}) => ({
  id,
  name,
  img,
  info: [
    {
      title: 'Город',
      description: city,
    },
    {
      title: 'Количество человек',
      description: quantity,
    },
    {
      title: 'Категория',
      description: category,
    },
    {
      title: 'Цена',
      description: price.toLocaleString(),
    },
  ],
});
