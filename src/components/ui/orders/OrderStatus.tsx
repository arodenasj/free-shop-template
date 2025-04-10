
import React from "react";
import { Check, Clock, Truck, Package } from "lucide-react";
import { OrderStatus as StatusType } from "@/contexts/OrderContext";

type OrderStatusProps = {
  status: StatusType;
};

export function OrderStatus({ status }: OrderStatusProps) {
  const steps = [
    { id: "processing", label: "Processing", icon: Clock },
    { id: "shipped", label: "Shipped", icon: Package },
    { id: "delivered", label: "Delivered", icon: Truck },
  ];

  // Find the current step index
  const currentStepIndex = steps.findIndex((step) => step.id === status);
  
  if (status === "cancelled") {
    return (
      <div className="p-4 rounded-md bg-red-50 border border-red-200">
        <p className="text-red-700 font-medium flex items-center">
          <span className="mr-2">⚠️</span>
          Order Cancelled
        </p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        
        {/* Progress Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isComplete = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isComplete 
                      ? "bg-primary text-white" 
                      : "bg-white border-2 border-gray-300 text-gray-500"
                  } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                >
                  {isComplete ? (
                    index === currentStepIndex ? (
                      <StepIcon className="h-6 w-6" />
                    ) : (
                      <Check className="h-6 w-6" />
                    )
                  ) : (
                    <StepIcon className="h-6 w-6" />
                  )}
                </div>
                <p 
                  className={`mt-2 text-sm ${
                    isComplete ? "font-medium text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
