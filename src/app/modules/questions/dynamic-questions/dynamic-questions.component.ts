import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-questions',
  templateUrl: './dynamic-questions.component.html',
  styleUrls: ['./dynamic-questions.component.scss']
})
export class DynamicQuestionsComponent {
  questions: any[] = [
    {
      "id": "c7c2da8f-6bb2-4e6c-9d70-2f6474a22036",
      "questionText": "Do you have any allergies?",
      "options": [
        "Nuts",
        "Shellfish",
        "Dairy",
        "Gluten",
        "None"
      ],
      "imageCheck": false
    },
    {
      "id": "f204c87b-f6e4-4a90-b226-30b3f1444f71",
      "questionText": "How often do you eat out?",
      "options": [
        "Never",
        "Once a Week",
        "2-3 Times a Week",
        "Daily"
      ],
      "imageCheck": false
    },
    {
      "id": "f7e8a9b6-1b5c-49d9-bf0c-32f79f4a5d4a",
      "questionText": "What is your primary goal?",
      "options": [
        "Weight Loss",
        "Muscle Gain",
        "Maintain Weight",
        "Increase Energy"
      ],
      "imageCheck": false
    },
    {
      "id": "b1f38d3f-b79b-4e3f-a635-43d746ee9904",
      "questionText": "How many meals do you prefer in a day?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "imageCheck": false
    },
    {
      "id": "f5bc9f56-5d2b-4f5e-ba4c-4f9f74a3d983",
      "questionText": "Do you have any dietary restrictions?",
      "options": [
        "Gluten-Free",
        "Dairy-Free",
        "Vegan",
        "None"
      ],
      "imageCheck": false
    },
    {
      "id": "ddf6e6a4-04b7-4640-9315-4fdc5f05372f",
      "questionText": "What is your carbohydrate preference?",
      "options": [
        "Rice",
        "Pasta",
        "Bread",
        "Quinoa",
        "Potatoes"
      ],
      "imageCheck": false
    },
    {
      "id": "6c6a3b25-7cc6-4e29-83a7-64b5ec75c257",
      "questionText": "What is your water intake per day?",
      "options": [
        "Less than 1 Liter",
        "1-2 Liters",
        "2-3 Liters",
        "3+ Liters"
      ],
      "imageCheck": false
    },
    {
      "id": "94a69871-b5c3-48f0-bd4c-6b270e60d5b5",
      "questionText": "What time do you usually eat dinner?",
      "options": [
        "6 PM",
        "7 PM",
        "8 PM",
        "9 PM",
        "Later"
      ],
      "imageCheck": false
    },
    {
      "id": "c66d77a8-daf5-4ee4-8f2f-6ed9da2e1d24",
      "questionText": "What is your favorite vegetable?",
      "options": [
        "Broccoli",
        "Carrots",
        "Spinach",
        "Peas",
        "Cabbage"
      ],
      "imageCheck": false
    },
    {
      "id": "564a7fe6-a8f6-46f4-a238-7310f7a3d1c6",
      "questionText": "What is your activity level?",
      "options": [
        "Sedentary",
        "Lightly Active",
        "Moderately Active",
        "Very Active"
      ],
      "imageCheck": false
    },
    {
      "id": "c25f928a-6f73-487a-95f7-a5d399b60d57",
      "questionText": "What is your preferred cooking style?",
      "options": [
        "Grilled",
        "Steamed",
        "Fried",
        "Raw",
        "Boiled"
      ],
      "imageCheck": false
    },
    {
      "id": "ab3d0d74-537f-4509-bf72-a7ed48e92857",
      "questionText": "Do you take supplements?",
      "options": [
        "Yes",
        "No",
        "Occasionally"
      ],
      "imageCheck": false
    },
    {
      "id": "9e9a2e84-9b91-4ec8-8233-b48853d5e55c",
      "questionText": "What is your favorite protein source?",
      "options": [
        "Chicken",
        "Fish",
        "Beef",
        "Plant-Based"
      ],
      "imageCheck": false
    },
    {
      "id": "9e51b9fb-42a2-43ca-a5a2-b497d9469e9d",
      "questionText": "Do you consume caffeine?",
      "options": [
        "Yes",
        "No",
        "Occasionally"
      ],
      "imageCheck": false
    },
    {
      "id": "4f912e4e-347c-4707-b02b-d59aa567ae85",
      "questionText": "Do you consume snacks?",
      "options": [
        "Yes",
        "No",
        "Occasionally"
      ],
      "imageCheck": false
    }
  ];

  currentQuestionIndex = 0;

  constructor(private router: Router) {}

  selectedAnswers: { questionId: number; answer: string }[] = [];

  ngOnInit(): void {
    // Load saved answers from localStorage if available
    this.loadProgress()
    const savedAnswers = localStorage.getItem('selectedAnswers');
    if (savedAnswers) {
      this.selectedAnswers = JSON.parse(savedAnswers);
    }
  }

  get totalSteps(): number {
    return this.questions.length;
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  selectOption(option: string, questionId: number): void {
    // Save the answer for the current question
    const existingAnswerIndex = this.selectedAnswers.findIndex((a) => a.questionId === questionId);

    if (existingAnswerIndex > -1) {
      this.selectedAnswers[existingAnswerIndex].answer = option;
    } else {
      this.selectedAnswers.push({ questionId, answer: option });
    }

    // Save the answers to localStorage
    localStorage.setItem('selectedAnswers', JSON.stringify(this.selectedAnswers));

    // Check if it's the last question
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.router.navigate(['/payment']); // Redirect to payment
    } else {
      // Move to the next question
      this.nextQuestion();
    }
  }

  loadProgress(): void {
    const savedAnswers = localStorage.getItem('selectedAnswers');
    if (savedAnswers) {
      this.selectedAnswers = JSON.parse(savedAnswers);

      // Resume from the last unanswered question
      this.currentQuestionIndex = this.selectedAnswers.length;
    }
  }

  loadPreviousAnswers(): void {
    const savedAnswers = localStorage.getItem('selectedAnswers');
    if (savedAnswers) {
      this.selectedAnswers = JSON.parse(savedAnswers);
      // Restore question progress if needed
      this.currentQuestionIndex = this.selectedAnswers.length;
    }
  }

  clearLocalStorage(): void {
    localStorage.removeItem('selectedAnswers');
    this.selectedAnswers = [];
    this.currentQuestionIndex = 0;
  }
}
