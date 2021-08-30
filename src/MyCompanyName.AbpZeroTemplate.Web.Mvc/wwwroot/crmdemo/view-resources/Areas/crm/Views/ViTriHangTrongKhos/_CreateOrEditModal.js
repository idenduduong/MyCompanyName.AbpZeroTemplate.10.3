(function ($) {
    app.modals.CreateOrEditViTriHangTrongKhoModal = function () {

        var _viTriHangTrongKhosService = abp.services.app.viTriHangTrongKhos;

        var _modalManager;
        var _$viTriHangTrongKhoInformationForm = null;

		        var _dM_KhoLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ViTriHangTrongKhos/DM_KhoLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ViTriHangTrongKhos/_DM_KhoLookupTableModal.js',
            modalClass: 'DM_KhoLookupTableModal'
        });        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ViTriHangTrongKhos/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ViTriHangTrongKhos/_DM_HangHoaLookupTableModal.js',
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

            _$viTriHangTrongKhoInformationForm = _modalManager.getModal().find('form[name=ViTriHangTrongKhoInformationsForm]');
            _$viTriHangTrongKhoInformationForm.validate();
        };

		          $('#OpenDM_KhoLookupTableButton').click(function () {

            var viTriHangTrongKho = _$viTriHangTrongKhoInformationForm.serializeFormToObject();

            _dM_KhoLookupTableModal.open({ id: viTriHangTrongKho.dM_KhoId, displayName: viTriHangTrongKho.dM_KhoTenKho }, function (data) {
                _$viTriHangTrongKhoInformationForm.find('input[name=dM_KhoTenKho]').val(data.displayName); 
                _$viTriHangTrongKhoInformationForm.find('input[name=dM_KhoId]').val(data.id); 
            });
        });
		
		$('#ClearDM_KhoTenKhoButton').click(function () {
                _$viTriHangTrongKhoInformationForm.find('input[name=dM_KhoTenKho]').val(''); 
                _$viTriHangTrongKhoInformationForm.find('input[name=dM_KhoId]').val(''); 
        });
		
        $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var viTriHangTrongKho = _$viTriHangTrongKhoInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: viTriHangTrongKho.dM_HangHoaId, displayName: viTriHangTrongKho.dM_HangHoaTenHangHoa }, function (data) {
                _$viTriHangTrongKhoInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$viTriHangTrongKhoInformationForm.find('input[name=dM_HangHoaId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$viTriHangTrongKhoInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$viTriHangTrongKhoInformationForm.find('input[name=dM_HangHoaId]').val(''); 
        });
		


        this.save = function () {
            if (!_$viTriHangTrongKhoInformationForm.valid()) {
                return;
            }

            var viTriHangTrongKho = _$viTriHangTrongKhoInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _viTriHangTrongKhosService.createOrEdit(
				viTriHangTrongKho
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditViTriHangTrongKhoModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);