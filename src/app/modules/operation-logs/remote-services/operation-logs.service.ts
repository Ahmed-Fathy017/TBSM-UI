import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { GetOperationLogs } from '../models/get-operations-logs';

@Injectable({
  providedIn: 'root'
})
export class OperationLogsService extends AbstractRemoteService {

  constructor(private http: HttpClient) {
    super()
  }

  getOperationLogs(requestDTO: GetOperationLogs) {
    let apiUrl = this.apiURl + `warehouse/operations_logs/get_operations_logs`;

    let queryParams = new HttpParams();
    queryParams = queryParams.append("date_from", requestDTO.date_from);
    queryParams = queryParams.append("date_to", requestDTO.date_to);
    queryParams = queryParams.append("type", requestDTO.type?? '');
    queryParams = queryParams.append("is_export", requestDTO.is_export);

    return this.http.get(apiUrl, {params: queryParams});
  }
}
