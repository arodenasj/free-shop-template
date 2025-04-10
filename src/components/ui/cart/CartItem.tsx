
import React from "react";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType, useCart } from "@/contexts/CartContext";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { id, name, price, quantity, image } = item;

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeItem(id);
    }
  };

  return (
    <div className="flex py-6 border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p className="ml-4">${price.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="w-8 text-center">{quantity}</span>
            
            <Button 
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => removeItem(id)}
            aria-label="Remove"
          >
            <Trash className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
