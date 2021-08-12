(function ($) {
    app.modals.CreateOrEditDM_LienHeModal = function () {

        var _dM_LienHesService = abp.services.app.dM_LienHes;

        var _modalManager;
        var _$dM_LienHeInformationForm = null;

		        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LienHes/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_LienHes/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
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

            _$dM_LienHeInformationForm = _modalManager.getModal().find('form[name=DM_LienHeInformationsForm]');
            _$dM_LienHeInformationForm.validate();
        };

		          $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var dM_LienHe = _$dM_LienHeInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: dM_LienHe.iD_DoiTuong, displayName: dM_LienHe.dM_DoiTuongTenDoiTuong }, function (data) {
                _$dM_LienHeInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName); 
                _$dM_LienHeInformationForm.find('input[name=iD_DoiTuong]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
                _$dM_LienHeInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(''); 
                _$dM_LienHeInformationForm.find('input[name=iD_DoiTuong]').val(''); 
        });
		


        this.save = function () {
            if (!_$dM_LienHeInformationForm.valid()) {
                return;
            }

            var dM_LienHe = _$dM_LienHeInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_LienHesService.createOrEdit(
				dM_LienHe
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_LienHeModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);