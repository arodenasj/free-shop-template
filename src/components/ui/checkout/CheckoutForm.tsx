
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export function CheckoutForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { items, subtotal, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    if (items.length === 0) return;

    const order = createOrder({
      items: items,
      total: subtotal,
      status: "processing",
      shippingAddress: {
        name: data.name,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
    });

    clearCart();
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="john@example.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...register("phone", { required: "Phone is required" })}
              placeholder="(123) 456-7890"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Shipping Address</h3>
        
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            {...register("street", { required: "Street address is required" })}
            placeholder="123 Main St"
            className={errors.street ? "border-red-500" : ""}
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city", { required: "City is required" })}
              placeholder="Anytown"
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State / Province</Label>
            <Input
              id="state"
              {...register("state", { required: "State is required" })}
              placeholder="California"
              className={errors.state ? "border-red-500" : ""}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip / Postal Code</Label>
            <Input
              id="zipCode"
              {...register("zipCode", { required: "Zip code is required" })}
              placeholder="12345"
              className={errors.zipCode ? "border-red-500" : ""}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              {...register("country", { required: "Country is required" })}
              placeholder="United States"
              className={errors.country ? "border-red-500" : ""}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full">
          Place Order (${subtotal.toFixed(2)})
        </Button>
      </div>
    </form>
  );
}
