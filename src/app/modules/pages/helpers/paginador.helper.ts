import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class PaginadorHelper implements MatPaginatorIntl {
    changes = new Subject<void>();

    itemsPerPageLabel: string = 'Número de página';
    nextPageLabel: string = 'Siguiente';
    previousPageLabel: string = 'Atras';
    firstPageLabel: string = 'Primera página';
    lastPageLabel: string = 'Última página';

    getRangeLabel(page: any, pageSize: any, length: any): string {
        if (length === 0 || pageSize === 0) {
            return '0 de ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize,
                length) : startIndex + pageSize;
        return startIndex + 1 + ' a ' + endIndex + ' de ' + length;
    }

}