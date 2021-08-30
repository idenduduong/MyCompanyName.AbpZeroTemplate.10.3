(function ($) {
    app.modals.CreateOrEditGiftModal = function () {

        var _giftsService = abp.services.app.gifts;

        var _modalManager;
        var _$giftInformationForm = null;

		        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Gifts/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Gifts/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });        var _dM_KhuyenMaiLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Gifts/DM_KhuyenMaiLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Gifts/_DM_KhuyenMaiLookupTableModal.js',
            modalClass: 'DM_KhuyenMaiLookupTableModal'
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

            _$giftInformationForm = _modalManager.getModal().find('form[name=GiftInformationsForm]');
            _$giftInformationForm.validate();
        };

		          $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var gift = _$giftInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: gift.productId, displayName: gift.dM_HangHoaTenHangHoa }, function (data) {
                _$giftInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$giftInformationForm.find('input[name=productId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$giftInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$giftInformationForm.find('input[name=productId]').val(''); 
        });
		
        $('#OpenDM_HangHoa2LookupTableButton').click(function () {

            var gift = _$giftInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: gift.giftId, displayName: gift.dM_HangHoaTenHangHoa2 }, function (data) {
                _$giftInformationForm.find('input[name=dM_HangHoaTenHangHoa2]').val(data.displayName); 
                _$giftInformationForm.find('input[name=giftId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoa2Button').click(function () {
                _$giftInformationForm.find('input[name=dM_HangHoaTenHangHoa2]').val(''); 
                _$giftInformationForm.find('input[name=giftId]').val(''); 
        });
		
        $('#OpenDM_KhuyenMaiLookupTableButton').click(function () {

            var gift = _$giftInformationForm.serializeFormToObject();

            _dM_KhuyenMaiLookupTableModal.open({ id: gift.promotionId, displayName: gift.dM_KhuyenMaiDisplayName }, function (data) {
                _$giftInformationForm.find('input[name=dM_KhuyenMaiDisplayName]').val(data.displayName); 
                _$giftInformationForm.find('input[name=promotionId]').val(data.id); 
            });
        });
		
		$('#ClearDM_KhuyenMaiDisplayNameButton').click(function () {
                _$giftInformationForm.find('input[name=dM_KhuyenMaiDisplayName]').val(''); 
                _$giftInformationForm.find('input[name=promotionId]').val(''); 
        });
		


        this.save = function () {
            if (!_$giftInformationForm.valid()) {
                return;
            }

            var gift = _$giftInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _giftsService.createOrEdit(
				gift
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditGiftModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);