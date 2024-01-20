export const transformCountry = ({
  flag,
  population,
  capital,
  region,
  name,
}) => ({
  name,
  img: flag,
  info: [
    {
      title: 'Population',
      description: population.toLocaleString(),
    },
    {
      title: 'Capital',
      description: capital,
    },
    {
      title: 'Region',
      description: region,
    },
  ],
});
