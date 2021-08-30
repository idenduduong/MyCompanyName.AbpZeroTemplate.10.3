(function ($) {
    app.modals.CreateOrEditDM_TinhThanhModal = function () {

        var _dM_TinhThanhsService = abp.services.app.dM_TinhThanhs;

        var _modalManager;
        var _$dM_TinhThanhInformationForm = null;

		        var _dM_QuocGiaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TinhThanhs/DM_QuocGiaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_TinhThanhs/_DM_QuocGiaLookupTableModal.js',
            modalClass: 'DM_QuocGiaLookupTableModal'
        });        var _dM_VungMienLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TinhThanhs/DM_VungMienLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_TinhThanhs/_DM_VungMienLookupTableModal.js',
            modalClass: 'DM_VungMienLookupTableModal'
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

            _$dM_TinhThanhInformationForm = _modalManager.getModal().find('form[name=DM_TinhThanhInformationsForm]');
            _$dM_TinhThanhInformationForm.validate();
        };

		          $('#OpenDM_QuocGiaLookupTableButton').click(function () {

            var dM_TinhThanh = _$dM_TinhThanhInformationForm.serializeFormToObject();

            _dM_QuocGiaLookupTableModal.open({ id: dM_TinhThanh.iD_QuocGia, displayName: dM_TinhThanh.dM_QuocGiaTenNuoc }, function (data) {
                _$dM_TinhThanhInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(data.displayName); 
                _$dM_TinhThanhInformationForm.find('input[name=iD_QuocGia]').val(data.id); 
            });
        });
		
		$('#ClearDM_QuocGiaTenNuocButton').click(function () {
                _$dM_TinhThanhInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(''); 
                _$dM_TinhThanhInformationForm.find('input[name=iD_QuocGia]').val(''); 
        });
		
        $('#OpenDM_VungMienLookupTableButton').click(function () {

            var dM_TinhThanh = _$dM_TinhThanhInformationForm.serializeFormToObject();

            _dM_VungMienLookupTableModal.open({ id: dM_TinhThanh.iD_VungMien, displayName: dM_TinhThanh.dM_VungMienTenVung }, function (data) {
                _$dM_TinhThanhInformationForm.find('input[name=dM_VungMienTenVung]').val(data.displayName); 
                _$dM_TinhThanhInformationForm.find('input[name=iD_VungMien]').val(data.id); 
            });
        });
		
		$('#ClearDM_VungMienTenVungButton').click(function () {
                _$dM_TinhThanhInformationForm.find('input[name=dM_VungMienTenVung]').val(''); 
                _$dM_TinhThanhInformationForm.find('input[name=iD_VungMien]').val(''); 
        });
		


        this.save = function () {
            if (!_$dM_TinhThanhInformationForm.valid()) {
                return;
            }

            var dM_TinhThanh = _$dM_TinhThanhInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_TinhThanhsService.createOrEdit(
				dM_TinhThanh
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_TinhThanhModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);