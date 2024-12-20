import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ArrayService } from 'src/app/shared/array.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

declare const paypal: any; // Declare the PayPal global object

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, AfterViewInit {
  packages: any[] = []; // Array to hold package details
  selectedIndex: number = -1; // Initialize with -1 (no package selected)
  checkout: boolean = false; // To toggle between payment and checkout view
  // Modal state
  showModal: boolean = false;
  modalMessage: string = '';
  isSuccess: boolean = false;

  email = '';
  password = '';
  mobileNumber = '';
  firstName = '';
  lastName = '';
  address = '';

  response: any;
  showSection: boolean = false;
  selectedPlanId: any;

  constructor(private arrayService: ArrayService, private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch shared array from ArrayService
    this.packages = this.arrayService.sharedArray;
  }

  ngAfterViewInit(): void {
    // Initialize PayPal if checkout is triggered
    if (this.checkout) {
      this.renderPayPalButton();
    }
  }

  // Method to select a package
  selectPackage(index: number): void {
    this.selectedIndex = index; // Update the selected index
    this.selectedPlanId = this.packages[index].id; // Extract and store the plan ID
    this.checkout = false; // Reset checkout view
  }

  // Method to handle the continue action
  continue(): void {
    if (this.selectedIndex !== -1) {
      this.checkout = true; // Switch to checkout view
      setTimeout(() => this.renderPayPalButton(), 0); // Render PayPal button
    }
  }

  closeCheckout(): void {
    this.checkout = false; // Close the checkout section
  }
  // Reset to package selection when closing modal
  closeModal(): void {
    this.showModal = false;
    this.checkout = false; // Reset view to package selection
  }

  openModal(isSuccess: boolean, message: string): void {
    this.isSuccess = isSuccess;
    this.modalMessage = message;
    this.showModal = true;
    this.checkout = false; // Reset view to package selection
  }

  renderPayPalButton(): void {
    const selectedPackage = this.packages[this.selectedIndex];
    if (!selectedPackage) return;
  
    // Clear any existing PayPal buttons
    const paypalContainer = document.getElementById('paypal-button-container');
    if (paypalContainer) {
      paypalContainer.innerHTML = ''; // Clear previous PayPal buttons
    }
  
    try {
      // Initialize PayPal Buttons
      paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: selectedPackage.totalPrice.toString(),
                  },
                  description: `Payment for ${selectedPackage.duration} plan`,
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            try {
              // Capture the payment
              const details = await actions.order.capture();
              console.log('Transaction Successful with details:', details);
              
              // Perform post-payment actions after the transaction is approved
              await this.handlePostPaymentActions(details);
              this.openModal(
                true,
                `Payment successful for ${details.payer.name.given_name}`
              );
            } catch (error) {
              console.error('Error during payment approval or post-payment actions:', error);
              this.openModal(false, 'Payment failed. Please try again.');
            }
          },
          onError: (err: any) => {
            console.error('Transaction error:', err);
            this.openModal(false, 'Payment failed. Please try again.');
          },
        })
        .render('#paypal-button-container'); // Render into the container
    } catch (error) {
      console.error('PayPal SDK Error:', error);
    }
  }

  async handlePostPaymentActions(details: any): Promise<void> {
    try {
      const paymentObject = this.createPaymentObject(details);
      console.log('Payment Object:', paymentObject); // Log the final payment object
  
      // First, call the API to assign the plan to the user
      const userPlanResponse = await this.postUserPlan(paymentObject).toPromise();
      console.log('Plan successfully assigned:', userPlanResponse);
  
      // Then, call the API to submit the payment details
      const paymentDetailsResponse = await this.postPaymentDetails(paymentObject).toPromise();
      console.log('Payment details submitted successfully:', paymentDetailsResponse);
    } catch (error) {
      console.error('Error during post-payment actions:', error);
      alert('An error occurred while processing payment details. Please try again.');
    }
  }
  

  createPaymentObject(details: any) {
    console.log('Creating payment object with details:', details); // Log details for inspection
  
    // Safely access properties of 'details'
    const paymentObject: any = {
      planId: this.selectedPlanId,
      paymentMethod: details.purchase_units[0]?.payments?.captures[0]?.payment_method || 'unknown',
      amount: details.purchase_units[0]?.amount?.value || 0,
      transactionId: details.purchase_units[0]?.payments?.captures[0]?.id || '',
      paymentDate: details.update_time || new Date().toISOString(), // Use the update_time or current date as fallback
    };
  
    // Log the constructed payment object
    console.log('Payment Object created:', paymentObject);
    return paymentObject;
  }

  postUserPlan(paymentObject: any): Observable<any> {
    const userId = localStorage.getItem('newSignUpUserId');
    
  if (!userId) {
    throw new Error('User ID not found in localStorage');
  }

  // Construct the payload for the plan
  const planPayload = {
    userId: userId,  // From localStorage
    planId: paymentObject.planId,  // Plan ID passed in the function argument
  };
    return this.http.post(
      `${environment.apiUrl}api/user/${userId}/plan`,
      planPayload
    );
  }

  postPaymentDetails(paymentObject: any): Observable<any> {
    const userId = localStorage.getItem('newSignUpUserId');
    return this.http.post(
      `${environment.apiUrl}api/user/${userId}/payment`,
      paymentObject
    );
  }

  onSubmit() {
    // API call for signup
    this.http
      .post(`${environment.apiUrl}api/account/register`, {
        email: this.email,
        password: this.password,
        mobileNumber: this.mobileNumber,
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
      })
      .pipe(
        map((response: any) => response),
        catchError((error) => {
          console.error('Signup error:', error);
          alert('An error occurred during signup. Please try again.');
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          this.handleSignupResponse(response);
          this.postUserAnswers().subscribe({
            next: (response) => {
              console.log('Answers successfully submitted:', response);
              // Handle success, e.g., show success modal or redirect
            },
            error: (error) => {
              console.error('Error submitting answers:', error);
              // Handle error, e.g., show error modal
            },
          });
          console.log('Signup successful:', response);
          this.reset();
          alert('User Registered Successfully');
        },
        error: (error) => {
          console.error('Error during signup:', error);
          alert('Registration failed. Check the console for details.');
        },
      });
  }

  reset() {
    this.address = '';
    this.email = '';
    this.mobileNumber = '';
    this.firstName = '';
    this.lastName = '';
    this.password = '';
  }

  handleSignupResponse(response: any): void {
    this.response = response;

    // Check if the signup was successful and a userId is provided
    if (response.isSuccess && response.userId) {
      // Store userId in localStorage
      localStorage.setItem('newSignUpUserId', response.userId);

      // Show the HTML section
      this.showSection = true;
    }
  }

  postUserAnswers(): Observable<any> {
    // Get userId from localStorage
    const userId = localStorage.getItem('newSignUpUserId');

    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    // Get selectedAnswers from localStorage
    const selectedAnswers = JSON.parse(
      localStorage.getItem('selectedAnswers') || '[]'
    );

    // Check if selectedAnswers is valid
    if (!Array.isArray(selectedAnswers) || selectedAnswers.length === 0) {
      throw new Error('No answers found in localStorage');
    }

    // Prepare the payload with the answers
    const answersPayload = {
      model: 'YourModelValueHere', // Add the required 'model' field
      answers: selectedAnswers.map((answer: any) => ({
        questionId: answer.questionId, // Ensure this is a valid GUID, if necessary
        answer: answer.answer,
      })),
    };

    // Ensure that questionId is a valid GUID
    answersPayload.answers.forEach((item: any) => {
      if (!this.isValidGuid(item.questionId)) {
        throw new Error(
          `Invalid GUID format for questionId: ${item.questionId}`
        );
      }
    });

    // Make the HTTP POST request to the API
    return this.http
      .post(`${environment.apiUrl}api/user/${userId}/answers`, answersPayload)
      .pipe(
        map((response: any) => response),
        catchError((error) => {
          console.error('Error submitting answers:', error);
          alert(
            'An error occurred while submitting your answers. Please try again.'
          );
          return throwError(() => error);
        })
      );
  }

  // Helper function to check if a string is a valid GUID
  isValidGuid(value: string): boolean {
    const guidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidPattern.test(value);
  }
}
