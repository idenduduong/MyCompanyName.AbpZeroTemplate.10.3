(function ($) {
    app.modals.CreateOrEditTheKhachHangChiTietModal = function () {

        var _theKhachHangChiTietsService = abp.services.app.theKhachHangChiTiets;

        var _modalManager;
        var _$theKhachHangChiTietInformationForm = null;

		        var _theKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangChiTiets/TheKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangChiTiets/_TheKhachHangLookupTableModal.js',
            modalClass: 'TheKhachHangLookupTableModal'
        });
        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangChiTiets/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangChiTiets/_DM_HangHoaLookupTableModal.js',
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
            _$theKhachHangChiTietInformationForm = _modalManager.getModal().find('form[name=TheKhachHangChiTietInformationsForm]');
            _$theKhachHangChiTietInformationForm.validate();
        };

		          $('#OpenTheKhachHangLookupTableButton').click(function () {

            var theKhachHangChiTiet = _$theKhachHangChiTietInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: theKhachHangChiTiet.iD_TheKhachHang, displayName: theKhachHangChiTiet.theKhachHangMaThe }, function (data) {
                _$theKhachHangChiTietInformationForm.find('input[name=theKhachHangMaThe]').val(data.displayName); 
                _$theKhachHangChiTietInformationForm.find('input[name=iD_TheKhachHang]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangMaTheButton').click(function () {
                _$theKhachHangChiTietInformationForm.find('input[name=theKhachHangMaThe]').val(''); 
                _$theKhachHangChiTietInformationForm.find('input[name=iD_TheKhachHang]').val(''); 
        });
		
        $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var theKhachHangChiTiet = _$theKhachHangChiTietInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: theKhachHangChiTiet.iD_HangHoa, displayName: theKhachHangChiTiet.dM_HangHoaTenHangHoa }, function (data) {
                _$theKhachHangChiTietInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$theKhachHangChiTietInformationForm.find('input[name=iD_HangHoa]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$theKhachHangChiTietInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$theKhachHangChiTietInformationForm.find('input[name=iD_HangHoa]').val(''); 
        });
		
        this.save = function () {
            if (!_$theKhachHangChiTietInformationForm.valid()) {
                return;
            }

            var theKhachHangChiTiet = _$theKhachHangChiTietInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _theKhachHangChiTietsService.createOrEdit(
				theKhachHangChiTiet
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditTheKhachHangChiTietModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);