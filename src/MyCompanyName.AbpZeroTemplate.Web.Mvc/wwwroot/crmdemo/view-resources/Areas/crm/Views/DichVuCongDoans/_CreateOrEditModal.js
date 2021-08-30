(function ($) {
    app.modals.CreateOrEditDichVuCongDoanModal = function () {

        var _dichVuCongDoansService = abp.services.app.dichVuCongDoans;

        var _modalManager;
        var _$dichVuCongDoanInformationForm = null;

		        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DichVuCongDoans/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DichVuCongDoans/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });        var _congDoanLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DichVuCongDoans/CongDoanLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DichVuCongDoans/_CongDoanLookupTableModal.js',
            modalClass: 'CongDoanLookupTableModal'
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

            _$dichVuCongDoanInformationForm = _modalManager.getModal().find('form[name=DichVuCongDoanInformationsForm]');
            _$dichVuCongDoanInformationForm.validate();
        };

		          $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var dichVuCongDoan = _$dichVuCongDoanInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: dichVuCongDoan.dichVuId, displayName: dichVuCongDoan.dM_HangHoaTenHangHoa }, function (data) {
                _$dichVuCongDoanInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$dichVuCongDoanInformationForm.find('input[name=dichVuId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$dichVuCongDoanInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$dichVuCongDoanInformationForm.find('input[name=dichVuId]').val(''); 
        });
		
        $('#OpenCongDoanLookupTableButton').click(function () {

            var dichVuCongDoan = _$dichVuCongDoanInformationForm.serializeFormToObject();

            _congDoanLookupTableModal.open({ id: dichVuCongDoan.congDoanId, displayName: dichVuCongDoan.congDoanDisplayName }, function (data) {
                _$dichVuCongDoanInformationForm.find('input[name=congDoanDisplayName]').val(data.displayName); 
                _$dichVuCongDoanInformationForm.find('input[name=congDoanId]').val(data.id); 
            });
        });
		
		$('#ClearCongDoanDisplayNameButton').click(function () {
                _$dichVuCongDoanInformationForm.find('input[name=congDoanDisplayName]').val(''); 
                _$dichVuCongDoanInformationForm.find('input[name=congDoanId]').val(''); 
        });
		


        this.save = function () {
            if (!_$dichVuCongDoanInformationForm.valid()) {
                return;
            }

            var dichVuCongDoan = _$dichVuCongDoanInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dichVuCongDoansService.createOrEdit(
				dichVuCongDoan
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDichVuCongDoanModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);