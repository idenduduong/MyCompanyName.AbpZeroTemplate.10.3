(function ($) {
    app.modals.CreateOrEditDoiTuong_DacDiemModal = function () {

        var _doiTuong_DacDiemsService = abp.services.app.doiTuong_DacDiems;

        var _modalManager;
        var _$doiTuong_DacDiemInformationForm = null;

		        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DoiTuong_DacDiems/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DoiTuong_DacDiems/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });        var _dM_DacDiemKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DoiTuong_DacDiems/DM_DacDiemKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DoiTuong_DacDiems/_DM_DacDiemKhachHangLookupTableModal.js',
            modalClass: 'DM_DacDiemKhachHangLookupTableModal'
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

            _$doiTuong_DacDiemInformationForm = _modalManager.getModal().find('form[name=DoiTuong_DacDiemInformationsForm]');
            _$doiTuong_DacDiemInformationForm.validate();
        };

		          $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var doiTuong_DacDiem = _$doiTuong_DacDiemInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: doiTuong_DacDiem.iD_DoiTuong, displayName: doiTuong_DacDiem.dM_DoiTuongTenDoiTuong }, function (data) {
                _$doiTuong_DacDiemInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName); 
                _$doiTuong_DacDiemInformationForm.find('input[name=iD_DoiTuong]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
                _$doiTuong_DacDiemInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(''); 
                _$doiTuong_DacDiemInformationForm.find('input[name=iD_DoiTuong]').val(''); 
        });
		
        $('#OpenDM_DacDiemKhachHangLookupTableButton').click(function () {

            var doiTuong_DacDiem = _$doiTuong_DacDiemInformationForm.serializeFormToObject();

            _dM_DacDiemKhachHangLookupTableModal.open({ id: doiTuong_DacDiem.iD_DacDiem, displayName: doiTuong_DacDiem.dM_DacDiemKhachHangTenDacDiem }, function (data) {
                _$doiTuong_DacDiemInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val(data.displayName); 
                _$doiTuong_DacDiemInformationForm.find('input[name=iD_DacDiem]').val(data.id); 
            });
        });
		
		$('#ClearDM_DacDiemKhachHangTenDacDiemButton').click(function () {
                _$doiTuong_DacDiemInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val(''); 
                _$doiTuong_DacDiemInformationForm.find('input[name=iD_DacDiem]').val(''); 
        });
		


        this.save = function () {
            if (!_$doiTuong_DacDiemInformationForm.valid()) {
                return;
            }

            var doiTuong_DacDiem = _$doiTuong_DacDiemInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _doiTuong_DacDiemsService.createOrEdit(
				doiTuong_DacDiem
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDoiTuong_DacDiemModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);