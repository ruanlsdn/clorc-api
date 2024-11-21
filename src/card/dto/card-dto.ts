export interface CardDto {
  id: string;
  clientName: string;
  checked: boolean;
  createdAt: Date;
  orders: Order[];
}

interface Order {
  productPrice: number;
  productQuantity: number;
  product: {
    id: string;
    description: string;
  };
}
