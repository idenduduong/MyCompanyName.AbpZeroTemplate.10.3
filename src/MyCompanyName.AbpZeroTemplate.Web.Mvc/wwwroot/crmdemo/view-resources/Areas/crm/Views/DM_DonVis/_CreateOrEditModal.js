(function ($) {
    app.modals.CreateOrEditDM_DonViModal = function () {

        var _dM_DonVisService = abp.services.app.dM_DonVis;

        var _modalManager;
        var _$dM_DonViInformationForm = null;

		        var _dM_NganHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DonVis/DM_NganHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DonVis/_DM_NganHangLookupTableModal.js',
            modalClass: 'DM_NganHangLookupTableModal'
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

            _$dM_DonViInformationForm = _modalManager.getModal().find('form[name=DM_DonViInformationsForm]');
            _$dM_DonViInformationForm.validate();
        };

		          $('#OpenDM_NganHangLookupTableButton').click(function () {

            var dM_DonVi = _$dM_DonViInformationForm.serializeFormToObject();

            _dM_NganHangLookupTableModal.open({ id: dM_DonVi.iD_NganHang, displayName: dM_DonVi.dM_NganHangTenNganHang }, function (data) {
                _$dM_DonViInformationForm.find('input[name=dM_NganHangTenNganHang]').val(data.displayName); 
                _$dM_DonViInformationForm.find('input[name=iD_NganHang]').val(data.id); 
            });
        });
		
		$('#ClearDM_NganHangTenNganHangButton').click(function () {
                _$dM_DonViInformationForm.find('input[name=dM_NganHangTenNganHang]').val(''); 
                _$dM_DonViInformationForm.find('input[name=iD_NganHang]').val(''); 
        });
		


        this.save = function () {
            if (!_$dM_DonViInformationForm.valid()) {
                return;
            }

            var dM_DonVi = _$dM_DonViInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_DonVisService.createOrEdit(
				dM_DonVi
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_DonViModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);