// booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tracking {
  bookingId: number;
  userId: string;
  recName: string;
  recAddress: string;
  recPin: string;
  recMobile: string;
  parWeightGram: number;
  parContentsDescription: string;
  parDeliveryType: string;
  parPackingPreference: string;
  parPickupTime: string;
  parDropoffTime: string;
  parServiceCost: string;
  parPaymentTime: string;
  parStatus: string;
}

@Injectable({ providedIn: 'root' })
export class TrackingService {
  private baseUrl = '/api/bookings';

  constructor(private http: HttpClient) {}

  getBookingById(id: string | number): Observable<Tracking> {
    return this.http.get<Tracking>(`${this.baseUrl}/${id}`);
  }

  getBookingsByUserId(userId: string): Observable<Tracking[]> {
    return this.http.get<Tracking[]>(`${this.baseUrl}/user/${userId}`);
  }
}
