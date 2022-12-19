export function ConfigDatatable(
                                $ajax:any = '',
                                columnas:any = null
                                ):any
{
    return {
        ajax: $ajax,
        columns:columnas,
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        searching: false,
        language: {
            emptyTable: 'Ningún dato disponible en esta tabla',
            info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_',
            infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0',
            infoFiltered: '(filtrado de un total de _MAX_ registros)',
            infoPostFix: '',
            decimal: '',
            thousands: ',',
            lengthMenu: 'Mostrar _MENU_ registros',
            loadingRecords: 'Cargando...',
            processing: 'Procesando...',
            search: 'Buscar:',
            searchPlaceholder: '',
            zeroRecords: '',
            url: '',
            paginate: {
                first: '',
                last: '',
                next: 'Siguiente',
                previous: 'Anterior'
            },
            aria: {
                sortAscending: ': Activar para ordenar la columna de manera ascendente',
                sortDescending: ': Activar para ordenar la columna de manera descendente'
            }
        }
    };
}