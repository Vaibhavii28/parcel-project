import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  bookingId?: number;
  userId: number;
  recName: string;
  recAddress: string;
  recPin: string;
  recMobile: string;
  parWeightGram: number;
  parContentsDescription: string;
  parDeliveryType: string;
  parPackingPreference: string;
  parPickupTime: string;
  parServiceCost: string;
  parStatus?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<any> {
    return this.http.post(this.apiUrl, booking);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }
  
  getBookingById(id: string | number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  updateBooking(booking: Booking): Observable<any> {
  return this.http.put(`${this.apiUrl}/${booking.bookingId}`, booking);
}
}


