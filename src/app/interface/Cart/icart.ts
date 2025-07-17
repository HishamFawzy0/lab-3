export interface ICart {
   id: number;
  userId: string;
  items: Item[];
}

interface Item {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}