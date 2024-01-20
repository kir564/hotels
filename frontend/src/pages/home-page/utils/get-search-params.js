export const getSearchParams = (formData) => {
  const result = {};

  for (const [key, content] of Object.entries(formData)) {
    if (content instanceof Object) {
      result[key] = content.value;
    } else {
      if (content) {
        result[key] = content;
      }
    }
  }

  return result;
};
