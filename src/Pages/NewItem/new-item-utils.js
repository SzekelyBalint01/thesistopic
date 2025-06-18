export const getItemsFromURL = (search) => {
    const params = new URLSearchParams(search);
    const itemListParam = params.get('users');
  
    if (!itemListParam) {
      return [];
    }
  
    return itemListParam.split(',').map(item => item.trim());
  };
  