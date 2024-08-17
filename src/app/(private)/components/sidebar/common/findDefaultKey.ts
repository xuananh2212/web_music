export const findDefaultKey = (categories: any[], pathName: string): string | undefined => {
  for (const category of categories) {
    if (category?.key === pathName) {
      return category.key;
    }
    if (category?.children) {
      const foundKey = findDefaultKey(category?.children, pathName);
      if (foundKey) {
        return foundKey;
      }
    }
  }
  return undefined;
};
