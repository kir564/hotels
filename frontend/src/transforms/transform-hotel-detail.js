export const transformHotelDetail = ({
  city,
  category,
  description,
  quantity,
  price,
}) => [
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
  {
    title: 'Описание',
    description: description,
  },
];
