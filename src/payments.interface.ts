export interface AddPaymentMethodData {
  name: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export type OrderStatus = 'placed' | 'routed' | 'finished' | 'paid';

export interface IOrder {
  id?: number;
  userId?: number;
  orderStatus?: OrderStatus | string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface INutrition {
  id?: number;
  name?: string;
  perGram?: string;
  ingredientId?: number;
}

export interface IIngredient {
  id?: number;
  name?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  nutritions?: INutrition[];
  recipeId?: number;
}

export interface IOrderItem {
  id?: number;
  ingredient?: IIngredient;
  order?: IOrder;
  price?: number;
  quantity?: number;
}

export interface ICourier {
  id?: number;
  name?: string;
  shippingCost?: number;
}

export interface OrderPlacedPayload {
  orderId: number;
  cartItems: Array<IOrderItem>;
  courier: ICourier;
  paymentId: number;
  userId: number;
  timestamp: Date;
}

export interface PaymentPaidPayload {
  paymentId: number;
  order: OrderPlacedPayload;
  timestamp: Date;
}
