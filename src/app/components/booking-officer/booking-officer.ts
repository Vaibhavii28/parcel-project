// booking-history-officer.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../services/booking';
import { BookingService } from '../../services/booking';
import { NavbarOfficer } from '../../navbar-officer/navbar-officer';

@Component({
  selector: 'app-booking-history-officer',
  standalone: true,
  imports: [CommonModule, NavbarOfficer],
  templateUrl: './booking-officer.html',
  styleUrls: ['./booking-officer.css']
})
export class BookingOfficer implements OnInit {
  bookings: {
    id: string,
    customer: string,
    date: string,
    status: string,
    amount: string
  }[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getAllBookings().subscribe({
      next: (data: Booking[]) => {
        this.bookings = data.map(b => ({
          id: typeof b.bookingId === 'number' ? `B${('00'+b.bookingId).slice(-3)}` : String(b.bookingId),
          customer: b.recName,
          date: b.parPickupTime?.split('T')[0] || '',
          status: this.translateStatus(b.parStatus ?? ''),
          amount: b.parServiceCost ? `₹${b.parServiceCost}` : ''
        }));
      },
      error: () => {
        this.bookings = [];
      }
    });
  }

  // Translate backend status to display-friendly status
  translateStatus(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'BOOKED': return 'Booked';
      case 'DELIVERED': return 'Delivered';
      case 'IN_TRANSIT': return 'In Transit';
      case 'RETURNED': return 'Returned';
      default: return status;
    }
  }

  updateStatus(bookingId: string) {
    alert(`Update status for booking: ${bookingId}`);
    // Add status update logic here in the future
  }
}
