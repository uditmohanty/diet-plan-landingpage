import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {
  // Shared array with detailed package information
  public sharedArray = [
    {
      id: "d1a2b3c4-d5e6-7890-1234-56789abcdef0",
      name: 'Basic',
      duration: '1-WEEK PLAN',
      description:'Starter plan diet journey',
      benefits: [
        'Personalized meals',
        'Weekly Progress',
        'Support via chat',
        'Exclusive tips',
        'On-Demand Coaching'
      ],
      pricePerDay: 1.43, // USD per day
      totalPrice: 9.99 // Total price in USD
    },
    {
      id: "f1e2d3c4-b5a6-7890-1234-56789abcde01",
      name: 'Standard',
      duration: '4-WEEK PLAN',
      description:'Better plan for a dedicated beginner',
      benefits: [
        'Personalized meals',
        'Weekly progress',
        'Dedicated dietitian support',
        'Exclusive tips',
        'On-Demand Coaching'
      ],
      pricePerDay: 1.25, // USD per day
      totalPrice: 34.99 // Total price in USD
    },
    {
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef2",
      name: 'Premium',
      duration: '12-WEEK PLAN',
      description:'Plan for a dedicated athlete',
      benefits: [
        'Personalized meals',
        'Weekly progress',
        'Dedicated dietitian support',
        'Exclusive tips',
        'On-Demand Coaching'
      ],
      pricePerDay: 1.07, // USD per day
      totalPrice: 89.99 // Total price in USD
    }
  ];

  constructor() { }
}
