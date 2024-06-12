import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../pages/server/custom-response';
import { Server } from '../pages/server/server';
import { ServerHistory } from '../models/server-history';
import { RecentActivity } from '../models/RecentActivity';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private readonly apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  servers$ = this.http.get<CustomResponse>(`${this.apiUrl}/server/all`)
    .pipe(
      tap(response => console.log(response)),
      catchError(this.handleError)
    );

  save$ = (server: Server) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

      ping$ = (address: string) => <Observable<CustomResponse>>
      this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${address}`)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        );
  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        subscriber.next(
          status === Status.ALL ? { ...response, message: `Servers filtered by ${status} status` } :
            {
              ...response,
              message: response.data.servers
                .filter(server => server.status === status).length > 0 ? `Servers filtered by
              ${status === Status.SERVER_UP ? 'SERVER UP'
                : 'SERVER DOWN'} status` : `No servers of ${status} found`,
              data: {
                servers: response.data.servers
                  .filter(server => server.status === status)
              }
            }
        );
        subscriber.complete();
      }
    )
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  delete$ = (serverId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  countServers$ = (status?: string) => <Observable<number>>
    this.http.get<number>(`${this.apiUrl}/server/count`, { params: { status } })
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
      countServersByStatus$ = (status: string): Observable<number> =>
        this.http.get<number>(`${this.apiUrl}/server/count/status`, { params: { status } })
          .pipe(
            tap(console.log),
            catchError(this.handleError)
          );

  sendAlertEmail$ = (subject: string, body: string) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/server/sendAlertEmail`, null, { params: { subject, body } })
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
      getServerMetrics$ = (): Observable<Server[]> =>
        this.http.get<Server[]>(`${this.apiUrl}/server/servers/metrics`)
          .pipe(
            tap(console.log),
            catchError(this.handleError)
          );
         /* getServerHistory$ = (serverId: number): Observable<ServerHistory[]> =>
            this.http.get<ServerHistory[]>(`${this.apiUrl}/server/history/${serverId}`)
              .pipe(
                tap(console.log),
                catchError(this.handleError)
              );*/

          getServerStatistics$ = (): Observable<any> =>
            this.http.get<any>(`${this.apiUrl}/server/statistics`)
              .pipe(
                tap(console.log),
                catchError(this.handleError)
              );
          getRecentActivities$ = (): Observable<RecentActivity[]> =>
                this.http.get<RecentActivity[]>(`${this.apiUrl}/server/recent-activities`)
                    .pipe(
                        tap(console.log),
                        catchError(this.handleError)
                    );
          getIndices(): Observable<any> {
                      return this.http.get(`${this.apiUrl}/server/index`);
                    }

          createIndex(index: any): Observable<any> {
                      return this.http.post(`${this.apiUrl}/server/index`, index);
                    }

          closeIndex(id: number): Observable<any> {
                      return this.http.post(`${this.apiUrl}/server/index/close/${id}`, {});
                    }

          deleteIndex(id: number): Observable<any> {
                      return this.http.delete(`${this.apiUrl}/server/index/${id}`);
                    }
                    getClusterStatistics(): Observable<any> {
                      return this.http.get<any>(`${this.apiUrl}/server/statisticss`);
                    }

                    getClusterHealth(): Observable<any> {
                      return this.http.get<any>(`${this.apiUrl}/server/health`);
                    }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occurred - Error code: ${error.status}`);
  }
}
