import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  // Array of FAQ items
  faqs = [
    {
      question: 'What is a diet plan?',
      answer: 'A diet plan is a structured eating schedule that includes specific foods and portions to help you meet your health or weight goals.',
      showAnswer: false,
    },
    {
      question: 'How do I create a personalized diet plan?',
      answer: 'A personalized diet plan takes into account your health goals, preferences, and any dietary restrictions. It helps you make sustainable choices that align with your objectives.',
      showAnswer: false,
    },
    {
      question: 'Is it safe to follow a strict diet plan?',
      answer: 'Strict diet plans can be safe if done correctly. It’s important to consult a healthcare professional before beginning any restrictive diet to ensure it aligns with your health needs.',
      showAnswer: false,
    },
    {
      question: 'Can I lose weight by following a diet plan?',
      answer: 'Yes, a well-designed diet plan can help you lose weight by promoting a healthy calorie deficit, balanced nutrition, and sustainable habits.',
      showAnswer: false,
    },
  ];

  // Method to toggle the visibility of the answer
  toggleAnswer(index: number) {
    this.faqs.forEach((faq, i) => {
      faq.showAnswer = i === index ? !faq.showAnswer : false;
    });
  }
}
