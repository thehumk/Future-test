export const Repeat = (props) => {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return items;
}

export const usersSorting = (users, targetType, sortType) => {
  let result = [];

  if (sortType === `ascending`) {
    result = users.sort((a, b) => {
      if (a[targetType] > b[targetType]) return 1;
      if (a[targetType] < b[targetType]) return -1;
      if (a[targetType] = b[targetType]) return 0;
    });
  }

  if (sortType === `descending`) {
    result = users.sort((a, b) => {
      if (a[targetType] < b[targetType]) return 1;
      if (a[targetType] > b[targetType]) return -1;
      if (a[targetType] = b[targetType]) return 0;
    });
  }

  return result;
}
