export const transformCountryDetail = ({
  flag,
  population,
  capital,
  region,
  name,
  nativeName,
  subregion,
  topLevelDomain,
  currencies,
  languages,
  borders,
}) => ({
  borders,
  name,
  img: flag,
  info: [
    {
      title: 'Population',
      description: population?.toLocaleString(),
    },
    {
      title: 'Capital',
      description: capital,
    },
    {
      title: 'Region',
      description: region,
    },
    {
      title: 'Sub Region',
      description: subregion,
    },
  ],
  info2: [
    {
      title: 'Native Name',
      description: nativeName,
    },
    {
      title: 'Top Level Domain',
      description: topLevelDomain?.join(', '),
    },
    {
      title: 'Currency',
      description: currencies?.map((c) => c.name).join(', '),
    },
    {
      title: 'languages',
      description: languages?.map((l) => l.name).join(', '),
    },
  ],
});
