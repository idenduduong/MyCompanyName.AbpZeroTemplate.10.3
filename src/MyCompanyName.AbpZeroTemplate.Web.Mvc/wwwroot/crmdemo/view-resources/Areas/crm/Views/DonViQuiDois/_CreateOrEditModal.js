(function ($) {
    app.modals.CreateOrEditDonViQuiDoiModal = function () {

        var _donViQuiDoisService = abp.services.app.donViQuiDois;

        var _modalManager;
        var _$donViQuiDoiInformationForm = null;

		        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DonViQuiDois/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DonViQuiDois/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });        var _dM_DonViTinhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DonViQuiDois/DM_DonViTinhLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DonViQuiDois/_DM_DonViTinhLookupTableModal.js',
            modalClass: 'DM_DonViTinhLookupTableModal'
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

            _$donViQuiDoiInformationForm = _modalManager.getModal().find('form[name=DonViQuiDoiInformationsForm]');
            _$donViQuiDoiInformationForm.validate();
        };

		          $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var donViQuiDoi = _$donViQuiDoiInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: donViQuiDoi.iD_HangHoa, displayName: donViQuiDoi.dM_HangHoaTenHangHoa }, function (data) {
                _$donViQuiDoiInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$donViQuiDoiInformationForm.find('input[name=iD_HangHoa]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$donViQuiDoiInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$donViQuiDoiInformationForm.find('input[name=iD_HangHoa]').val(''); 
        });
		
        $('#OpenDM_DonViTinhLookupTableButton').click(function () {

            var donViQuiDoi = _$donViQuiDoiInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: donViQuiDoi.iD_DonViTinh, displayName: donViQuiDoi.dM_DonViTinhTenDonViTinh }, function (data) {
                _$donViQuiDoiInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val(data.displayName); 
                _$donViQuiDoiInformationForm.find('input[name=iD_DonViTinh]').val(data.id); 
            });
        });
		
		$('#ClearDM_DonViTinhTenDonViTinhButton').click(function () {
                _$donViQuiDoiInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val(''); 
                _$donViQuiDoiInformationForm.find('input[name=iD_DonViTinh]').val(''); 
        });
		


        this.save = function () {
            if (!_$donViQuiDoiInformationForm.valid()) {
                return;
            }

            var donViQuiDoi = _$donViQuiDoiInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _donViQuiDoisService.createOrEdit(
				donViQuiDoi
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDonViQuiDoiModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);