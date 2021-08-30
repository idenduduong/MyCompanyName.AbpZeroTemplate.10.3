(function ($) {
    app.modals.CreateOrEditHoaDonBanLe_DacDiemKhachHangModal = function () {

        var _hoaDonBanLe_DacDiemKhachHangsService = abp.services.app.hoaDonBanLe_DacDiemKhachHangs;

        var _modalManager;
        var _$hoaDonBanLe_DacDiemKhachHangInformationForm = null;

		        var _hoaDonBanLeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLe_DacDiemKhachHangs/HoaDonBanLeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLe_DacDiemKhachHangs/_HoaDonBanLeLookupTableModal.js',
            modalClass: 'HoaDonBanLeLookupTableModal'
        });        var _dM_DacDiemKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLe_DacDiemKhachHangs/DM_DacDiemKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLe_DacDiemKhachHangs/_DM_DacDiemKhachHangLookupTableModal.js',
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

            _$hoaDonBanLe_DacDiemKhachHangInformationForm = _modalManager.getModal().find('form[name=HoaDonBanLe_DacDiemKhachHangInformationsForm]');
            _$hoaDonBanLe_DacDiemKhachHangInformationForm.validate();
        };

		          $('#OpenHoaDonBanLeLookupTableButton').click(function () {

            var hoaDonBanLe_DacDiemKhachHang = _$hoaDonBanLe_DacDiemKhachHangInformationForm.serializeFormToObject();

            _hoaDonBanLeLookupTableModal.open({ id: hoaDonBanLe_DacDiemKhachHang.iD_HoaDonBanLe, displayName: hoaDonBanLe_DacDiemKhachHang.hoaDonBanLeMaHoaDon }, function (data) {
                _$hoaDonBanLe_DacDiemKhachHangInformationForm.find('input[name=hoaDonBanLeMaHoaDon]').val(data.displayName); 
                _$hoaDonBanLe_DacDiemKhachHangInformationForm.find('input[name=iD_HoaDonBanLe]').val(data.id); 
            });
        });
		
		$('#ClearHoaDonBanLeMaHoaDonButton').click(function () {
                _$hoaDonBanLe_DacDiemKhachHangInformationForm.find('input[name=hoaDonBanLeMaHoaDon]').val(''); 
                _$hoaDonBanLe_DacDiemKhachHangInformationForm.find('input[name=iD_HoaDonBanLe]').val(''); 
        });
		
        $('#OpenDM_DacDiemKhachHangLookupTableButton').click(function () {

            var hoaDonBanLe_DacDiemKhachHang = _$hoaDonBanLe_DacDiemKhachHangInformationForm.serializeFormToObject();

            _dM_DacDiemKhachHangLookupTableModal.open({ id: hoaDonBanLe_DacDiemKhachHang.iD_DacDiemKhachHang, displayName: hoaDonBanLe_DacDiemKhachHang.dM_DacDiemKhachHangTenDacDiem }, function (data) {
                _$hoaDonBanLe_DacDiemKhachHangInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val(data.displayName); 
                _$hoaDonBanLe_DacDiemKhachHangInformationForm.find('input[name=iD_DacDiemKhachHang]').val(data.id); 
            });
        });
		
		$('#ClearDM_DacDiemKhachHangTenDacDiemButton').click(function () {
                _$hoaDonBanLe_DacDiemKhachHangInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val(''); 
                _$hoaDonBanLe_DacDiemKhachHangInformationForm.find('input[name=iD_DacDiemKhachHang]').val(''); 
        });
		


        this.save = function () {
            if (!_$hoaDonBanLe_DacDiemKhachHangInformationForm.valid()) {
                return;
            }

            var hoaDonBanLe_DacDiemKhachHang = _$hoaDonBanLe_DacDiemKhachHangInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _hoaDonBanLe_DacDiemKhachHangsService.createOrEdit(
				hoaDonBanLe_DacDiemKhachHang
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditHoaDonBanLe_DacDiemKhachHangModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);