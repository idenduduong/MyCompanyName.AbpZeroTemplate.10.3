(function ($) {
    app.modals.DM_DoiTuongSecondaryLookupTableModal = function () {

        var _modalManager;
        var _modal;
        var _theKhachHangsService = abp.services.app.commonLookup;
        var _$dM_DoiTuongTable = $('#DM_DoiTuongSecondaryTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
            _modal = _modalManager.getModal();
        };
        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_DoiTuongModal',
            width: "60%"
        });

        var dataTable = _$dM_DoiTuongTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangsService.getAllDM_DoiTuongForLookupTable,
                inputFilter: function () {
                    return {
                        maKhachHangFilter: _modal.find('input[name=dM_DoiTuongMaFilter]').val(),
                        cMTFilter: _modal.find('input[name=dM_DoiTuongCMTFilter]').val(),
                        tenKhachHangFilter: _modal.find('input[name=dM_DoiTuongTenKhachHangFilter]').val(),
                        phoneFilter: _modal.find('input[name=dM_DoiTuongPhoneFilter]').val()
                    };
                }
            },
            columnDefs: [
                {
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
                    data: "code"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 2,
                    data: "displayName"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 3,
                    data: "phone"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 4,
                    data: "cmt"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 5,
                    data: "address"
                }
            ]
        });

        $('#DM_DoiTuongSecondaryTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });
        function getDM_DoiTuongTable() {
            dataTable.ajax.reload();
        }

        $('#GetDM_DoiTuongButton').click(function (e) {
            e.preventDefault();
            getDM_DoiTuongTable();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });
        abp.event.on('app.createOrEditDM_DoiTuongModalSaved', function () {
            getDM_DoiTuongTable();
        });
        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DoiTuongTable();
            }
        });

    };
})(jQuery);

