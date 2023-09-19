import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService extends AbstractRemoteService {

  constructor(private http: HttpClient) {
    super()
  }

  getDownloadableExcelFile() {
    let apiUrl = this.apiURl + `warehouse/inventory/download_exel`;

    return this.http.get(apiUrl);
  }

  importExcelFile(departmentId: number, file: File) {
    let apiUrl = this.apiURl + `warehouse/inventory/import_exel`;

    const formData = new FormData();
    formData.append("category_id", String(departmentId));
    formData.append('file', file);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    return this.http.post(apiUrl, formData);
  }

  exportFile(departmentId: number, type: string) {
    let apiUrl = this.apiURl + `warehouse/inventory/export_exel`;

    return this.http.post(apiUrl, { category_id: departmentId, type: type });
  }
}
