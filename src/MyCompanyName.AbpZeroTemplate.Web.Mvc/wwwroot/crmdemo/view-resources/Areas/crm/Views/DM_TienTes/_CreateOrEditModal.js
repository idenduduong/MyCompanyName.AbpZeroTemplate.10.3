(function ($) {
    app.modals.CreateOrEditDM_TienTeModal = function () {

        var _dM_TienTesService = abp.services.app.dM_TienTes;

        var _modalManager;
        var _$dM_TienTeInformationForm = null;

		        var _dM_QuocGiaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TienTes/DM_QuocGiaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_TienTes/_DM_QuocGiaLookupTableModal.js',
            modalClass: 'DM_QuocGiaLookupTableModal'
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

            _$dM_TienTeInformationForm = _modalManager.getModal().find('form[name=DM_TienTeInformationsForm]');
            _$dM_TienTeInformationForm.validate();
        };

		          $('#OpenDM_QuocGiaLookupTableButton').click(function () {

            var dM_TienTe = _$dM_TienTeInformationForm.serializeFormToObject();

            _dM_QuocGiaLookupTableModal.open({ id: dM_TienTe.iD_QuocGia, displayName: dM_TienTe.dM_QuocGiaTenNuoc }, function (data) {
                _$dM_TienTeInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(data.displayName); 
                _$dM_TienTeInformationForm.find('input[name=iD_QuocGia]').val(data.id); 
            });
        });
		
		$('#ClearDM_QuocGiaTenNuocButton').click(function () {
                _$dM_TienTeInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(''); 
                _$dM_TienTeInformationForm.find('input[name=iD_QuocGia]').val(''); 
        });
		


        this.save = function () {
            if (!_$dM_TienTeInformationForm.valid()) {
                return;
            }

            var dM_TienTe = _$dM_TienTeInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_TienTesService.createOrEdit(
				dM_TienTe
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_TienTeModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);