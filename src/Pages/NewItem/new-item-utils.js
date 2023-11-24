// new-item-utils.js

export const getItemsFromURL = (search) => {
    // Az URL-ből kiolvasott értékek feldolgozása
    const params = new URLSearchParams(search);
    const itemListParam = params.get('users');
  
    // Ha nincs 'items' query paraméter, vagy nincs értéke, visszatérhetünk üres listával
    if (!itemListParam) {
      return [];
    }
  
    // Az érték visszaalakítása a listává (JSON parse vagy más módszer)
    return itemListParam.split(',').map(item => item.trim());
  };
  