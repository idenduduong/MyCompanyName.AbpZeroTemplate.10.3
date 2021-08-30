(function ($) {
    app.modals.CreateOrEditQuanLyKhieuNaiModal = function () {

        var _quanLyKhieuNaisService = abp.services.app.quanLyKhieuNais;

        var _modalManager;
        var _$quanLyKhieuNaiInformationForm = null;

		        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/QuanLyKhieuNais/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/QuanLyKhieuNais/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/QuanLyKhieuNais/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/QuanLyKhieuNais/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numberic').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$quanLyKhieuNaiInformationForm = _modalManager.getModal().find('form[name=QuanLyKhieuNaiInformationsForm]');
            _$quanLyKhieuNaiInformationForm.validate();
        };

		          $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var quanLyKhieuNai = _$quanLyKhieuNaiInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: quanLyKhieuNai.khachHangId, displayName: quanLyKhieuNai.dM_DoiTuongMaDoiTuong }, function (data) {
                _$quanLyKhieuNaiInformationForm.find('input[name=dM_DoiTuongMaDoiTuong]').val(data.displayName); 
                _$quanLyKhieuNaiInformationForm.find('input[name=khachHangId]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongMaDoiTuongButton').click(function () {
                _$quanLyKhieuNaiInformationForm.find('input[name=dM_DoiTuongMaDoiTuong]').val(''); 
                _$quanLyKhieuNaiInformationForm.find('input[name=khachHangId]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var quanLyKhieuNai = _$quanLyKhieuNaiInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: quanLyKhieuNai.nguoiGoiId, displayName: quanLyKhieuNai.userName }, function (data) {
                _$quanLyKhieuNaiInformationForm.find('input[name=userName]').val(data.displayName); 
                _$quanLyKhieuNaiInformationForm.find('input[name=nguoiGoiId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$quanLyKhieuNaiInformationForm.find('input[name=userName]').val(''); 
                _$quanLyKhieuNaiInformationForm.find('input[name=nguoiGoiId]').val(''); 
        });
		


        this.save = function () {
            if (!_$quanLyKhieuNaiInformationForm.valid()) {
                return;
            }

            var quanLyKhieuNai = _$quanLyKhieuNaiInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _quanLyKhieuNaisService.createOrEdit(
				quanLyKhieuNai
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditQuanLyKhieuNaiModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);