(function ($) {
    app.modals.CreateOrEditVoucherModal = function () {

        var _vouchersService = abp.services.app.vouchers;

        var _modalManager;
        var _$voucherInformationForm = null;

		        var _dM_KhuyenMaiLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Vouchers/DM_KhuyenMaiLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Vouchers/_DM_KhuyenMaiLookupTableModal.js',
            modalClass: 'DM_KhuyenMaiLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$voucherInformationForm = _modalManager.getModal().find('form[name=VoucherInformationsForm]');
            _$voucherInformationForm.validate();
        };

		          $('#OpenDM_KhuyenMaiLookupTableButton').click(function () {

            var voucher = _$voucherInformationForm.serializeFormToObject();

            _dM_KhuyenMaiLookupTableModal.open({ id: voucher.khuyenMaiId, displayName: voucher.dM_KhuyenMaiDisplayName }, function (data) {
                _$voucherInformationForm.find('input[name=dM_KhuyenMaiDisplayName]').val(data.displayName); 
                _$voucherInformationForm.find('input[name=khuyenMaiId]').val(data.id); 
            });
        });
		
		$('#ClearDM_KhuyenMaiDisplayNameButton').click(function () {
                _$voucherInformationForm.find('input[name=dM_KhuyenMaiDisplayName]').val(''); 
                _$voucherInformationForm.find('input[name=khuyenMaiId]').val(''); 
        });
		


        this.save = function () {
            if (!_$voucherInformationForm.valid()) {
                return;
            }

            var voucher = _$voucherInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _vouchersService.createOrEdit(
				voucher
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditVoucherModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);