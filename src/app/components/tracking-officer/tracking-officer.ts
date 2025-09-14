import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarOfficer } from '../../navbar-officer/navbar-officer';
import { Tracking, TrackingService } from '../../services/tracking.service';
import { NgIf, NgClass, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracking-officer',
  standalone: true,
  imports: [FormsModule, NavbarOfficer, NgIf, NgClass, DatePipe],
  templateUrl: './tracking-officer.html',
  styleUrls: ['./tracking-officer.css']
})
export class TrackingOfficer {
  trackingId: string = '';
  trackingResult: Tracking | null = null;
  errorMessage: string = '';

  constructor(private trackingService: TrackingService) {}

  trackParcel() {
    this.trackingResult = null;
    this.errorMessage = '';

    const id = this.trackingId.trim();
    if (!id) {
      this.errorMessage = 'Please enter a Tracking ID.';
      return;
    }

    this.trackingService.getBookingById(id).subscribe({
      next: (result: Tracking) => {
        this.trackingResult = result;
      },
      error: () => {
        this.errorMessage = 'No booking found for the entered ID.';
      }
    });
  }
}
