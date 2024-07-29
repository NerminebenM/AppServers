import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';

import { DataState } from 'src/app/enum/data-state.enum';
import { Status } from 'src/app/enum/status.enum';
import { ServerService } from 'src/app/services/server.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CustomResponse } from '../../server/custom-response';
import { AppState } from '../../server/app-state';
import { Server } from '../../server/server';
import { ViewChild } from '@angular/core';
import * as jQuery from 'jquery';
import 'bootstrap/js/dist/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppServerComponent implements OnInit {
  @ViewChild('addEmployeeModal') addEmployeeModal: any;

  appState$: Observable<any>;
  readonly DataState = DataState;
  readonly Status = Status;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  filterStatus$ = this.filterSubject.asObservable();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  servers: Server[];
  servers$: Observable<Server[]>;
  userRole: string = ''; // Add a property for the user role

  constructor(private serverService: ServerService, private notifier: NotificationService,    private userService: UserService // Inject UserService
  ) { }


  ngOnInit(): void {
    this.userRole = this.userService.getUserType();

    this.appState$ = this.serverService.servers$.pipe(
      map((response) => {
        this.dataSubject.next(response);
        this.notifier.onDefault(response.message);

        this.filterSubject.next('');

        if (
          response &&
          response.data &&
          response.data.servers &&
          response.data.servers.length > 0
        ) {
          return { dataState: DataState.LOADED_STATE, appData: response };
        } else {
          return {
            dataState: DataState.ERROR_STATE,
            error: 'No servers available!',
          };
        }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        this.filterSubject.next('');
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }


  openModal(): void {
    const modal = document.getElementById('addEmployeeModal');
    if (modal) {
      modal.classList.add('show'); // Affiche la modal
      modal.style.display = 'block'; // Affiche la modal
      document.body.classList.add('modal-open'); // Empêche le défilement de la page sous la modal
    }
  }
  closeModal(): void {
    const modal = document.getElementById('addEmployeeModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
  pingServer(address: string): void {
    this.filterSubject.next(address);
    this.appState$ = this.serverService.ping$(address).pipe(
      map(response => {
        const index = this.dataSubject.value.data.servers.findIndex(server => server.id === response.data.server.id);
        this.dataSubject.value.data.servers[index] = response.data.server;
        this.notifier.onSuccess(response.message);
        this.filterSubject.next('');
        return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value };
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.filterSubject.next('');
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }

  saveServer(serverForm: NgForm): void {
    this.isLoading.next(true);
    this.appState$ = this.serverService.save$(serverForm.value as Server)
      .pipe(
        map(response => {
          this.dataSubject.next(
            {...response, data: { servers: [response.data.server, ...this.dataSubject.value.data.servers] } }
          );
          this.notifier.onDefault(response.message);
          document.getElementById('closeModal').click();
          this.isLoading.next(false);
          serverForm.resetForm({ status: this.Status.SERVER_DOWN });
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoading.next(false);
          this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      );
}


  filterServers(status: Status): void {
    this.appState$ = this.serverService.filter$(status, this.dataSubject.value).pipe(
      map(response => {
        this.notifier.onSuccess(response.message);
        return { dataState: DataState.LOADED_STATE, appData: response };
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }

  deleteServer(server: Server): void {
    this.appState$ = this.serverService.delete$(server.id).pipe(
      map(response => {
        this.dataSubject.next(
          { ...response, data: { servers: this.dataSubject.value.data.servers.filter(s => s.id !== server.id) } }
        );
        this.notifier.onSuccess(response.message);
        return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }

  printReport(): void {
    this.notifier.onSuccess('Report downloaded');
    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('servers');
    let tableHtml = tableSelect.outerHTML.replace(/ /g, '%20');
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
    downloadLink.download = 'server-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
