import { Component, OnInit } from '@angular/core';

interface Question {
  id: number;
  questionText: string;
  answers: string[];
  selectedAnswer?: string;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  // These will store the selected data and the checkbox states
  selectedCardValue: string = '';  // Default as empty string
  termsChecked: boolean = false;   // Track if the terms checkbox is checked

  // Store the selected card's age group
  selectedCard: string = ''; // Default as empty string

  // This is for the cards (age groups in your case)
  cards = [
    { ageGroup: '18-29', image: '../../../assets/img/qimg/18.webp' },
    { ageGroup: '30-39', image: '../../../assets/img/qimg/30.webp' },
    { ageGroup: '40-49', image: '../../../assets/img/qimg/46.webp' },
    { ageGroup: '50+', image: '../../../assets/img/qimg/50.webp' },
  ];

  ngOnInit(): void {
    // On initialization, check localStorage for any existing selection
    const storedCard = localStorage.getItem('selectedCard');
    const storedTerms = localStorage.getItem('termsChecked');

    // Ensure we have a valid stored value
    this.selectedCardValue = storedCard ? storedCard : '';  // Use empty string if nothing found
    this.termsChecked = storedTerms === 'true';  // 'true' is a string, so compare accordingly
  }

  onTermsChange(): void {
    // When terms checkbox is changed, update the value in localStorage
    localStorage.setItem('termsChecked', this.termsChecked.toString());  // Store as 'true'/'false'
  }

  onCardClick(card: any): void {
    if (this.termsChecked) {
      this.selectedCard = card.ageGroup;  // Set the selected card
      this.selectedCardValue = card.ageGroup;  // Also set the selected card value
      // Store selected card and value in localStorage (avoid null)
      localStorage.setItem('selectedCard', this.selectedCard);
      localStorage.setItem('selectedCardValue', this.selectedCardValue);
    }
  }
}
