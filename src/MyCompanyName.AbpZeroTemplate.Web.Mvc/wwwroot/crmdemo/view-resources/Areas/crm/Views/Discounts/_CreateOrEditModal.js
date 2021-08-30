(function ($) {
    app.modals.CreateOrEditDiscountModal = function () {

        var _discountsService = abp.services.app.discounts;

        var _modalManager;
        var _$discountInformationForm = null;

		        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Discounts/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Discounts/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numberic').numeric_input();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$discountInformationForm = _modalManager.getModal().find('form[name=DiscountInformationsForm]');
            _$discountInformationForm.validate();
        };

		          $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var discount = _$discountInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: discount.productId, displayName: discount.dM_HangHoaTenHangHoa }, function (data) {
                _$discountInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$discountInformationForm.find('input[name=productId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$discountInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$discountInformationForm.find('input[name=productId]').val(''); 
        });
		


        this.save = function () {
            if (!_$discountInformationForm.valid()) {
                return;
            }

            var discount = _$discountInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _discountsService.createOrEdit(
				discount
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDiscountModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);