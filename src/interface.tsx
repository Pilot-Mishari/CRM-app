import exp from "constants";
import React from "react";

export type Customer = {
    uid: string;
    name: string;
    email: string;
    priority: string;
    notes: string;
    crd: string;
  };

export type EditCustomerModalProps = {
   customerData: Customer | null;
   onClose: () => void;
   onSave: (updatedCustomer: Customer) => void;
};

export type CustomerModalProps = {
   customerData: Customer | null;
   onClose: () => void;
   onEdit: () => void;
};

export type NewCustomerModalProps = {
    onClose: () => void;
    onSave: (newCustomer: Customer) => void;
}