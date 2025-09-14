import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarOfficer } from '../../navbar-officer/navbar-officer';
import { Booking } from '../../services/booking';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-pickup-drop-update',
  standalone: true,
  imports: [FormsModule, NavbarOfficer],
  templateUrl: './pickup-drop-update.html',
  styleUrls: ['./pickup-drop-update.css']
})
export class PickupDropUpdate {
  bookingId: string = '';
  status: string = '';
  updateMessage: string | null = null;
  validStatuses = ['BOOKED', 'IN_TRANSIT', 'DELIVERED', 'RETURNED'];

  constructor(private bookingService: BookingService) {}

  updateStatus() {
    this.updateMessage = null;
    const id = this.bookingId.trim();
    const status = this.status.trim();

    if (!id || !status) {
      this.updateMessage = 'Please enter both Booking ID and Status.';
      return;
    }

    if (!this.validStatuses.includes(status)) {
      this.updateMessage = 'Invalid status selected.';
      return;
    }

    this.bookingService.getBookingById(id).subscribe({
      next: (booking: Booking) => {
        // Mutate only the status
        const updatedBooking: Booking = { ...booking, parStatus: status };
        this.bookingService.updateBooking(updatedBooking).subscribe({
          next: () => {
            this.updateMessage = `Booking ${id} updated successfully to status: ${status}`;
            this.bookingId = '';
            this.status = '';
          },
          error: () => {
            this.updateMessage = `Failed to update booking status for ${id}. Please check the ID and try again.`;
          }
        });
      },
      error: () => {
        this.updateMessage = `Booking with ID ${id} not found.`;
      }
    });
  }
}
