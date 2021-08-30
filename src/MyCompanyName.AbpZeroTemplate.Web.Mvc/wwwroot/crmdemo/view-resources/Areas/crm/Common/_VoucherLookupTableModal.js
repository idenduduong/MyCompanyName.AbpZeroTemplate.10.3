(function () {
    app.modals.VoucherLookupTableModal = function () {
        var _$dM_KhuyenMaisTable = $('#ChuongTrinhKhuyenMaisTable');
        var _dM_KhuyenMaisService = abp.services.app.dM_KhuyenMais;
        var _$vouchersTable = $('#VouchersTable');
        var _modalManager;
        var _modal;
        this.init = function (modalManager) {
            _modalManager = modalManager;
            _modal = _modalManager.getModal();
        };
        //var lstKhuyenMaiTable = _$dM_KhuyenMaisTable.DataTable({
        //    paging: true,
        //    serverSide: true,
        //    processing: true,
        //    listAction: {
        //        ajaxFunction: _dM_KhuyenMaisService.getAll,
        //        inputFilter: function () {
        //            return {
        //                filter: $('#DM_KhuyenMaisTableFilter').val(),
        //                displayNameFilter: $('#DisplayNameFilterId').val(),
        //                codeFilter: $('#CodeFilterId').val(),
        //                soQuyetDinhFilter: $('#SoQuyetDinhFilterId').val()
        //            };
        //        }
        //    },
        //    columnDefs: [
        //        {
        //            targets: 0,
        //            data: "dM_KhuyenMai.displayName"
        //        },
        //        {
        //            targets: 1,
        //            data: "dM_KhuyenMai.soQuyetDinh"
        //        },
        //        {
        //            targets: 2,
        //            data: "dM_KhuyenMai.isPercentage"
        //        }
        //    ],
        //    select: {
        //        style: 'single'
        //    }
        //});
        //function getSelectedKhuyenMai() {
        //    var count = lstKhuyenMaiTable.rows({ selected: true }).count();

        //    if (count > 0) {
        //        return lstKhuyenMaiTable.rows({ selected: true }).data()[0];
        //    }
        //    return null;
        //}
        var lstVoucherTable = _$vouchersTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_KhuyenMaisService.getAllVoucherByKhuyenMaiId,
                inputFilter: function () {
                    
                    return {
                        khuyenMaiId: $('#VoucherLookup_KhuyenMaiId').val()
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
                    targets: 1,
                    data: "voucher.voucherCode"
                },
                {
                    targets: 2,
                    data: "voucher.voucherValue"
                }
            ]
        });
        

        function getVouchers() {
            lstVoucherTable.ajax.reload();
        };
        
        $('#VouchersTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = lstVoucherTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });
        //$('.panels').height('550').enhsplitter({
        //    vertical: true,
        //    position: '50%',
        //    percent: true,
        //    //limit: 10,
        //    onDrag: function (event, splitter_container) {
        //        lstKhuyenMaiTable.columns.adjust()
        //            .responsive.recalc();
        //        lstVoucherTable.columns.adjust()
        //            .responsive.recalc();
        //    }
        //});
    }
})()