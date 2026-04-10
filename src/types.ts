export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'celebration' | 'condolence' | 'opening';
  isBest?: boolean;
}

export interface OrderFormData {
  receiverName: string;
  address: string;
  ribbonLeft: string;
  ribbonRight: string;
  deliveryDate: string;
  deliveryTime: string;
  senderPhone: string;
}

export type Category = 'all' | 'celebration' | 'condolence' | 'opening';
