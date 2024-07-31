// interfaces.ts
export interface Ident {
    uid: string;
    name: string;
    email: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'N/A'; // Correctly typed priority
    notes: string;
    crd: string;
  }
  