(function ($) {
    app.modals.CreateOrEditDM_LoHangModal = function () {

        var _dM_LoHangsService = abp.services.app.dM_LoHangs;

        var _modalManager;
        var _$dM_LoHangInformationForm = null;

		        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LoHangs/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_LoHangs/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );;
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dM_LoHangInformationForm = _modalManager.getModal().find('form[name=DM_LoHangInformationsForm]');
            _$dM_LoHangInformationForm.validate();
        };

		          $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var dM_LoHang = _$dM_LoHangInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: dM_LoHang.dM_HangHoaId, displayName: dM_LoHang.dM_HangHoaTenHangHoa }, function (data) {
                _$dM_LoHangInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$dM_LoHangInformationForm.find('input[name=dM_HangHoaId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$dM_LoHangInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$dM_LoHangInformationForm.find('input[name=dM_HangHoaId]').val(''); 
        });
		


        this.save = function () {
            if (!_$dM_LoHangInformationForm.valid()) {
                return;
            }

            var dM_LoHang = _$dM_LoHangInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_LoHangsService.createOrEdit(
				dM_LoHang
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_LoHangModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);