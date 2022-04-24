export const Commonfc = {
  //paramete array type array , objectKey is string  like ['key']

  handlValue: (getvalue, replacearray) => {
    replacearray(getvalue);
  },

  removeDuplicate: (array, objKey) => {
    const setarray = new Set();
    //remove duplicate item
    return array.filter((el) => {
      const duplicate = setarray.has(el[`${objKey}`]);
      setarray.add(el[`${objKey}`]);
      return !duplicate;
    });
  },
};
