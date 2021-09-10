(function($) {
    app.modals.BaseEntityLookupTableModal = function() {
        var _modalManager;
        var _childsService = abp.services.app.childs;
        var _$baseEntityTable = $('#BaseEntityTable');
        this.init = function(modalManager) {
            _modalManager = modalManager;
        };
        var dataTable = _$baseEntityTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _childsService.getAllBaseEntityForLookupTable,
                inputFilter: function() {
                    return {
                        filter: $('#BaseEntityTableFilter').val()
                    };
                }
            },
            columnDefs: [{
                    targets: 0,
                    data: null,
                    orderable: false,
                    autoWidth: false,
                    defaultContent: "<div class=\"text-center\"><input id='selectbtn' class='btn btn-success' type='button' width='25px' value='" + app.localize('Select') + "' /></div>"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 1,
                    data: "displayName"
                }
            ]
        });
        $('#BaseEntityTable tbody').on('click', '[id*=selectbtn]', function() {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getBaseEntity() {
            dataTable.ajax.reload();
        }
        $('#GetBaseEntityButton').click(function(e) {
            e.preventDefault();
            getBaseEntity();
        });
        $('#SelectButton').click(function(e) {
            e.preventDefault();
        });
        $(document).keypress(function(e) {
            if (e.which === 13) {
                getBaseEntity();
            }
        });
    };
})(jQuery);