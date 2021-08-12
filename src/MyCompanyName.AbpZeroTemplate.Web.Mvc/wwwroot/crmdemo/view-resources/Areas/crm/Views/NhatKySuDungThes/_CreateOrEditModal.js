(function ($) {
    app.modals.CreateOrEditNhatKySuDungTheModal = function () {

        var _nhatKySuDungThesService = abp.services.app.nhatKySuDungThes;

        var _modalManager;
        var _$nhatKySuDungTheInformationForm = null;

		        var _theKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhatKySuDungThes/TheKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhatKySuDungThes/_TheKhachHangLookupTableModal.js',
            modalClass: 'TheKhachHangLookupTableModal'
        });        var _dM_LoaiChungTuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhatKySuDungThes/DM_LoaiChungTuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhatKySuDungThes/_DM_LoaiChungTuLookupTableModal.js',
            modalClass: 'DM_LoaiChungTuLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhatKySuDungThes/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhatKySuDungThes/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhatKySuDungThes/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhatKySuDungThes/_DM_HangHoaLookupTableModal.js',
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

            _$nhatKySuDungTheInformationForm = _modalManager.getModal().find('form[name=NhatKySuDungTheInformationsForm]');
            _$nhatKySuDungTheInformationForm.validate();
        };

		          $('#OpenTheKhachHangLookupTableButton').click(function () {

            var nhatKySuDungThe = _$nhatKySuDungTheInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: nhatKySuDungThe.iD_TheKhachHang, displayName: nhatKySuDungThe.theKhachHangMaThe }, function (data) {
                _$nhatKySuDungTheInformationForm.find('input[name=theKhachHangMaThe]').val(data.displayName); 
                _$nhatKySuDungTheInformationForm.find('input[name=iD_TheKhachHang]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangMaTheButton').click(function () {
                _$nhatKySuDungTheInformationForm.find('input[name=theKhachHangMaThe]').val(''); 
                _$nhatKySuDungTheInformationForm.find('input[name=iD_TheKhachHang]').val(''); 
        });
		
        $('#OpenDM_LoaiChungTuLookupTableButton').click(function () {

            var nhatKySuDungThe = _$nhatKySuDungTheInformationForm.serializeFormToObject();

            _dM_LoaiChungTuLookupTableModal.open({ id: nhatKySuDungThe.loaiChungTu, displayName: nhatKySuDungThe.dM_LoaiChungTuLoaiChungTu }, function (data) {
                _$nhatKySuDungTheInformationForm.find('input[name=dM_LoaiChungTuLoaiChungTu]').val(data.displayName); 
                _$nhatKySuDungTheInformationForm.find('input[name=loaiChungTu]').val(data.id); 
            });
        });
		
		$('#ClearDM_LoaiChungTuLoaiChungTuButton').click(function () {
                _$nhatKySuDungTheInformationForm.find('input[name=dM_LoaiChungTuLoaiChungTu]').val(''); 
                _$nhatKySuDungTheInformationForm.find('input[name=loaiChungTu]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var nhatKySuDungThe = _$nhatKySuDungTheInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: nhatKySuDungThe.iD_NhanVien, displayName: nhatKySuDungThe.userName }, function (data) {
                _$nhatKySuDungTheInformationForm.find('input[name=userName]').val(data.displayName); 
                _$nhatKySuDungTheInformationForm.find('input[name=iD_NhanVien]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$nhatKySuDungTheInformationForm.find('input[name=userName]').val(''); 
                _$nhatKySuDungTheInformationForm.find('input[name=iD_NhanVien]').val(''); 
        });
		
        $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var nhatKySuDungThe = _$nhatKySuDungTheInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: nhatKySuDungThe.iD_HangHoaDichVu, displayName: nhatKySuDungThe.dM_HangHoaTenHangHoa }, function (data) {
                _$nhatKySuDungTheInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$nhatKySuDungTheInformationForm.find('input[name=iD_HangHoaDichVu]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$nhatKySuDungTheInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$nhatKySuDungTheInformationForm.find('input[name=iD_HangHoaDichVu]').val(''); 
        });
		


        this.save = function () {
            if (!_$nhatKySuDungTheInformationForm.valid()) {
                return;
            }

            var nhatKySuDungThe = _$nhatKySuDungTheInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _nhatKySuDungThesService.createOrEdit(
				nhatKySuDungThe
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditNhatKySuDungTheModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);