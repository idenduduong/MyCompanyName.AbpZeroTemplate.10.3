(function ($) {
    app.modals.CreateOrEditDM_KhuyenMaiModal = function () {

        var _dM_KhuyenMaisService = abp.services.app.dM_KhuyenMais;

        var _modalManager;
        var _$dM_KhuyenMaiInformationForm = null;
        var _$vouchersTable = $('#VouchersTable');
        var _vouchersService = abp.services.app.vouchers;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dM_KhuyenMaiInformationForm = _modalManager.getModal().find('form[name=DM_KhuyenMaiInformationsForm]');
            _$dM_KhuyenMaiInformationForm.validate();
        };

        
        var _permissions = {
            create: abp.auth.hasPermission('Pages.Vouchers.Create'),
            edit: abp.auth.hasPermission('Pages.Vouchers.Edit'),
            'delete': abp.auth.hasPermission('Pages.Vouchers.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Vouchers/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Vouchers/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditVoucherModal'
        });

        var _viewVoucherModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Vouchers/ViewvoucherModal',
            modalClass: 'ViewVoucherModal'
        });

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        }

        var dataTable = _$vouchersTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_KhuyenMaisService.getAllVoucherByKhuyenMaiId,
                inputFilter: function () {
                    return {
                        khuyenMaiId: _$dM_KhuyenMaiInformationForm.find('input[name=id]').val(),
                    };
                }
            },
            columnDefs: [
                {
                    width: 120,
                    targets: 0,
                    data: null,
                    orderable: false,
                    autoWidth: false,
                    defaultContent: '',
                    rowAction: {
                        cssClass: 'btn btn-brand dropdown-toggle',
                        text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                        items: [
                            {
                                text: app.localize('Edit'),
                                visible: function () {
                                    return _permissions.edit;
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ id: data.record.voucher.id });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.delete;
                                },
                                action: function (data) {
                                    deleteVoucher(data.record.voucher);
                                }
                            }]
                    }
                },
                {
                    targets: 1,
                    data: "voucher.voucherCode"
                },
                {
                    targets: 2,
                    data: "voucher.isPercentage",
                    render: function (isPercentage) {
                        if (isPercentage) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                },
                {
                    targets: 3,
                    data: "voucher.voucherValue"
                }
            ]
        });


        function getVouchers() {
            dataTable.ajax.reload();
        }

        function deleteVoucher(voucher) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _vouchersService.delete({
                            id: voucher.id
                        }).done(function () {
                            getVouchers(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        $('#CreateNewVoucherButton').click(function () {
            
            _createOrEditModal.open({ khuyenMaiId: _$dM_KhuyenMaiInformationForm.find('input[name=id]').val()});
        });

        abp.event.on('app.createOrEditVoucherModalSaved', function () {
            getVouchers();
        });

        $('#GetVouchersButton').click(function (e) {
            e.preventDefault();
            getVouchers();
        });

        this.save = function () {
            if (!_$dM_KhuyenMaiInformationForm.valid()) {
                return;
            }

            var dM_KhuyenMai = _$dM_KhuyenMaiInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_KhuyenMaisService.createOrEdit(
				dM_KhuyenMai
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_KhuyenMaiModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);