(function ($) {
    app.modals.CreateOrEditHappyCallModal = function () {

        var _happyCallsService = abp.services.app.happyCalls;

        var _modalManager;
        var _$happyCallInformationForm = null;

		        var _theKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HappyCalls/TheKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HappyCalls/_TheKhachHangLookupTableModal.js',
            modalClass: 'TheKhachHangLookupTableModal'
        });        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HappyCalls/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HappyCalls/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HappyCalls/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HappyCalls/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HappyCalls/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HappyCalls/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numberic').number(true, 2);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$happyCallInformationForm = _modalManager.getModal().find('form[name=HappyCallInformationsForm]');
            _$happyCallInformationForm.validate();
        };

		          $('#OpenTheKhachHangLookupTableButton').click(function () {

            var happyCall = _$happyCallInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: happyCall.theKhachHangId, displayName: happyCall.theKhachHangMaThe }, function (data) {
                _$happyCallInformationForm.find('input[name=theKhachHangMaThe]').val(data.displayName); 
                _$happyCallInformationForm.find('input[name=theKhachHangId]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangMaTheButton').click(function () {
                _$happyCallInformationForm.find('input[name=theKhachHangMaThe]').val(''); 
                _$happyCallInformationForm.find('input[name=theKhachHangId]').val(''); 
        });
		
        $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var happyCall = _$happyCallInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: happyCall.dichVuId, displayName: happyCall.dM_HangHoaTenHangHoa }, function (data) {
                _$happyCallInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$happyCallInformationForm.find('input[name=dichVuId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$happyCallInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$happyCallInformationForm.find('input[name=dichVuId]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var happyCall = _$happyCallInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: happyCall.nguoiGoiId, displayName: happyCall.userName }, function (data) {
                _$happyCallInformationForm.find('input[name=userName]').val(data.displayName); 
                _$happyCallInformationForm.find('input[name=nguoiGoiId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$happyCallInformationForm.find('input[name=userName]').val(''); 
                _$happyCallInformationForm.find('input[name=nguoiGoiId]').val(''); 
        });
		
        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var happyCall = _$happyCallInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: happyCall.khachHangId, displayName: happyCall.dM_DoiTuongMaDoiTuong }, function (data) {
                _$happyCallInformationForm.find('input[name=dM_DoiTuongMaDoiTuong]').val(data.displayName); 
                _$happyCallInformationForm.find('input[name=khachHangId]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongMaDoiTuongButton').click(function () {
                _$happyCallInformationForm.find('input[name=dM_DoiTuongMaDoiTuong]').val(''); 
                _$happyCallInformationForm.find('input[name=khachHangId]').val(''); 
        });
		


        this.save = function () {
            if (!_$happyCallInformationForm.valid()) {
                return;
            }
            

            var happyCall = _$happyCallInformationForm.serializeFormToObject();
            happyCall.status = happyCall["HappyCall.Status"];
            happyCall.goiLan1 = happyCall["HappyCall.GoiLan1"];
            happyCall.goiLan2 = happyCall["HappyCall.GoiLan2"];
            happyCall.goiLan3 = happyCall["HappyCall.GoiLan3"];
            happyCall.goiLan4 = happyCall["HappyCall.GoiLan4"];
            happyCall.sale = happyCall["HappyCall.Sale"];
            happyCall.kTV = happyCall["HappyCall.KTV"];
            happyCall.vienTruong = happyCall["HappyCall.VienTruong"];
            happyCall.cSKH = happyCall["HappyCall.CSKH"];
            happyCall.tongQuan = happyCall["HappyCall.TongQuan"];
            happyCall.keToan = happyCall["HappyCall.KeToan"];

            //happyCall.dichVuId = happyCall.TheKhachHang_DichVuId;
			 _modalManager.setBusy(true);
			 _happyCallsService.createOrEdit(
				happyCall
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditHappyCallModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);