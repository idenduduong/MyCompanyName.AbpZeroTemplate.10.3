(function ($) {
    app.modals.CreateOrEditTonToiThieuModal = function () {

        var _tonToiThieusService = abp.services.app.tonToiThieus;

        var _modalManager;
        var _$tonToiThieuInformationForm = null;

		        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TonToiThieus/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TonToiThieus/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });        var _dM_KhoLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TonToiThieus/DM_KhoLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TonToiThieus/_DM_KhoLookupTableModal.js',
            modalClass: 'DM_KhoLookupTableModal'
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

            _$tonToiThieuInformationForm = _modalManager.getModal().find('form[name=TonToiThieuInformationsForm]');
            _$tonToiThieuInformationForm.validate();
        };

		          $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var tonToiThieu = _$tonToiThieuInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: tonToiThieu.dM_HangHoaId, displayName: tonToiThieu.dM_HangHoaTenHangHoa }, function (data) {
                _$tonToiThieuInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$tonToiThieuInformationForm.find('input[name=dM_HangHoaId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$tonToiThieuInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$tonToiThieuInformationForm.find('input[name=dM_HangHoaId]').val(''); 
        });
		
        $('#OpenDM_KhoLookupTableButton').click(function () {

            var tonToiThieu = _$tonToiThieuInformationForm.serializeFormToObject();

            _dM_KhoLookupTableModal.open({ id: tonToiThieu.dM_KhoId, displayName: tonToiThieu.dM_KhoTenKho }, function (data) {
                _$tonToiThieuInformationForm.find('input[name=dM_KhoTenKho]').val(data.displayName); 
                _$tonToiThieuInformationForm.find('input[name=dM_KhoId]').val(data.id); 
            });
        });
		
		$('#ClearDM_KhoTenKhoButton').click(function () {
                _$tonToiThieuInformationForm.find('input[name=dM_KhoTenKho]').val(''); 
                _$tonToiThieuInformationForm.find('input[name=dM_KhoId]').val(''); 
        });
		


        this.save = function () {
            if (!_$tonToiThieuInformationForm.valid()) {
                return;
            }

            var tonToiThieu = _$tonToiThieuInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _tonToiThieusService.createOrEdit(
				tonToiThieu
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditTonToiThieuModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);