(function ($) {
    app.modals.CreateOrEditKhoanThuChi_ChiPhiDoanhThuModal = function () {

        var _khoanThuChi_ChiPhiDoanhThusService = abp.services.app.khoanThuChi_ChiPhiDoanhThus;

        var _modalManager;
        var _$khoanThuChi_ChiPhiDoanhThuInformationForm = null;

		        var _khoanChiPhi_DoanhThuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/KhoanThuChi_ChiPhiDoanhThus/KhoanChiPhi_DoanhThuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/KhoanThuChi_ChiPhiDoanhThus/_KhoanChiPhi_DoanhThuLookupTableModal.js',
            modalClass: 'KhoanChiPhi_DoanhThuLookupTableModal'
        });        var _khoanThuChiLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/KhoanThuChi_ChiPhiDoanhThus/KhoanThuChiLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/KhoanThuChi_ChiPhiDoanhThus/_KhoanThuChiLookupTableModal.js',
            modalClass: 'KhoanThuChiLookupTableModal'
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

            _$khoanThuChi_ChiPhiDoanhThuInformationForm = _modalManager.getModal().find('form[name=KhoanThuChi_ChiPhiDoanhThuInformationsForm]');
            _$khoanThuChi_ChiPhiDoanhThuInformationForm.validate();
        };

		          $('#OpenKhoanChiPhi_DoanhThuLookupTableButton').click(function () {

            var khoanThuChi_ChiPhiDoanhThu = _$khoanThuChi_ChiPhiDoanhThuInformationForm.serializeFormToObject();

            _khoanChiPhi_DoanhThuLookupTableModal.open({ id: khoanThuChi_ChiPhiDoanhThu.iD_KhoanCPDT, displayName: khoanThuChi_ChiPhiDoanhThu.khoanChiPhi_DoanhThuTen }, function (data) {
                _$khoanThuChi_ChiPhiDoanhThuInformationForm.find('input[name=khoanChiPhi_DoanhThuTen]').val(data.displayName); 
                _$khoanThuChi_ChiPhiDoanhThuInformationForm.find('input[name=iD_KhoanCPDT]').val(data.id); 
            });
        });
		
		$('#ClearKhoanChiPhi_DoanhThuTenButton').click(function () {
                _$khoanThuChi_ChiPhiDoanhThuInformationForm.find('input[name=khoanChiPhi_DoanhThuTen]').val(''); 
                _$khoanThuChi_ChiPhiDoanhThuInformationForm.find('input[name=iD_KhoanCPDT]').val(''); 
        });
		
        $('#OpenKhoanThuChiLookupTableButton').click(function () {

            var khoanThuChi_ChiPhiDoanhThu = _$khoanThuChi_ChiPhiDoanhThuInformationForm.serializeFormToObject();

            _khoanThuChiLookupTableModal.open({ id: khoanThuChi_ChiPhiDoanhThu.iD_KhoanThuChi, displayName: khoanThuChi_ChiPhiDoanhThu.khoanThuChiMaKhoanThuChi }, function (data) {
                _$khoanThuChi_ChiPhiDoanhThuInformationForm.find('input[name=khoanThuChiMaKhoanThuChi]').val(data.displayName); 
                _$khoanThuChi_ChiPhiDoanhThuInformationForm.find('input[name=iD_KhoanThuChi]').val(data.id); 
            });
        });
		
		$('#ClearKhoanThuChiMaKhoanThuChiButton').click(function () {
                _$khoanThuChi_ChiPhiDoanhThuInformationForm.find('input[name=khoanThuChiMaKhoanThuChi]').val(''); 
                _$khoanThuChi_ChiPhiDoanhThuInformationForm.find('input[name=iD_KhoanThuChi]').val(''); 
        });
		


        this.save = function () {
            if (!_$khoanThuChi_ChiPhiDoanhThuInformationForm.valid()) {
                return;
            }

            var khoanThuChi_ChiPhiDoanhThu = _$khoanThuChi_ChiPhiDoanhThuInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _khoanThuChi_ChiPhiDoanhThusService.createOrEdit(
				khoanThuChi_ChiPhiDoanhThu
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditKhoanThuChi_ChiPhiDoanhThuModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);