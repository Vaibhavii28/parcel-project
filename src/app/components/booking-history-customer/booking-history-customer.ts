import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tracking } from '../../services/tracking.service';
import { TrackingService } from '../../services/tracking.service';
import { NavbarCustomer } from '../../navbar-customer/navbar-customer';

@Component({
  selector: 'app-booking-history-customer',
  standalone: true,
  imports: [CommonModule, NavbarCustomer],
  templateUrl: './booking-history-customer.html',
  styleUrls: ['./booking-history-customer.css']
})
export class BookingHistoryCustomer implements OnInit {
  bookings: {
    id: number,
    date: string,
    status: string,
    amount: string
  }[] = [];

  // For demo, hardcoding the current userId;
  // In real app, get this from user/login service
  userId: string = 'demoUserId';

  constructor(private trackingService: TrackingService) {}

  ngOnInit() {
    this.trackingService.getBookingsByUserId(this.userId).subscribe({
      next: (data: Tracking[]) => {
        this.bookings = data.map(b => ({
          id: b.bookingId,
          date: b.parPickupTime?.split('T')[0] || '',
          status: this.translateStatus(b.parStatus),
          amount: b.parServiceCost ? `₹${b.parServiceCost}` : ''
        }));
      },
      error: () => {
        this.bookings = [];
      }
    });
  }

  // Optional: Convert backend status to human-friendly text
  translateStatus(status: string): string {
    switch (status?.toUpperCase()) {
      case 'BOOKED': return 'Pending Pickup';
      case 'DELIVERED': return 'Delivered';
      case 'IN_TRANSIT': return 'In Transit';
      default: return status;
    }
  }
}

