(function ($) {
    app.modals.CreateOrEditPhieuThuModal = function () {
        
        var _phieuThusService = abp.services.app.phieuThus;

        var _modalManager;
        var _$phieuThuInformationForm = null;

		        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dM_TienTeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/DM_TienTeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_DM_TienTeLookupTableModal.js',
            modalClass: 'DM_TienTeLookupTableModal'
        });        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        });

        var calcTienThu = function () {
            
            var phieuThu = _$phieuThuInformationForm.serializeFormToObject();
            var tienMat = parseFloat(phieuThu.tienMat == "" ? 0 : phieuThu.tienMat);
            var tienGui = parseFloat(phieuThu.tienGui == "" ? 0 : phieuThu.tienGui);
            var tienThu = tienGui + tienMat;
            $('#PhieuThuChiTiet_TienThu').val(tienThu);
            $('#PhieuThu_TongTienThu').val(tienThu);
        };
        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$phieuThuInformationForm = _modalManager.getModal().find('form[name=PhieuThuInformationsForm]');
            _$phieuThuInformationForm.validate();
        };

		          $('#OpenUserLookupTableButton').click(function () {

            var phieuThu = _$phieuThuInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: phieuThu.userId, displayName: phieuThu.userName }, function (data) {
                _$phieuThuInformationForm.find('input[name=userName]').val(data.displayName); 
                _$phieuThuInformationForm.find('input[name=userId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$phieuThuInformationForm.find('input[name=userName]').val(''); 
                _$phieuThuInformationForm.find('input[name=userId]').val(''); 
        });
		
        $('#OpenDM_TienTeLookupTableButton').click(function () {

            var phieuThu = _$phieuThuInformationForm.serializeFormToObject();

            _dM_TienTeLookupTableModal.open({ id: phieuThu.iD_NgoaiTe, displayName: phieuThu.dM_TienTeMaNgoaiTe }, function (data) {
                _$phieuThuInformationForm.find('input[name=dM_TienTeMaNgoaiTe]').val(data.displayName); 
                _$phieuThuInformationForm.find('input[name=iD_NgoaiTe]').val(data.id); 
            });
        });
		
		$('#ClearDM_TienTeMaNgoaiTeButton').click(function () {
                _$phieuThuInformationForm.find('input[name=dM_TienTeMaNgoaiTe]').val(''); 
                _$phieuThuInformationForm.find('input[name=iD_NgoaiTe]').val(''); 
        });
		
        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var phieuThu = _$phieuThuInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: phieuThu.iD_DoiTuong, displayName: phieuThu.dM_DoiTuongTenDoiTuong }, function (data) {
                _$phieuThuInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName); 
                _$phieuThuInformationForm.find('input[name=iD_DoiTuong]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
                _$phieuThuInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(''); 
                _$phieuThuInformationForm.find('input[name=iD_DoiTuong]').val(''); 
        });
        
        $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var phieuThu = _$phieuThuInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: phieuThu.iD_DonVi, displayName: phieuThu.organizationUnitDisplayName }, function (data) {
                _$phieuThuInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName); 
                _$phieuThuInformationForm.find('input[name=iD_DonVi]').val(data.id); 
            });
        });
		
		$('#ClearOrganizationUnitDisplayNameButton').click(function () {
                _$phieuThuInformationForm.find('input[name=organizationUnitDisplayName]').val(''); 
                _$phieuThuInformationForm.find('input[name=iD_DonVi]').val(''); 
        });

        $('#PhieuThuChiTiet_TienMat').change(function () {
            calcTienThu();
        });
        $('#PhieuThuChiTiet_TienMat').focusout(function () {
            calcTienThu();
        });
        $('#PhieuThuChiTiet_TienGui').change(function () {
            
            var phieuThu = _$phieuThuInformationForm.serializeFormToObject();
            var tienMat = parseFloat(phieuThu.tienMat == "" ? 0 : phieuThu.tienMat);
            var tienGui = parseFloat(phieuThu.tienGui == "" ? 0 : phieuThu.tienGui);
            
            if (tienGui > 0) {
                $('#PhieuThuChiTiet_MaChuanChi').removeAttr("disabled", "");
            }
            else {
                $('#PhieuThuChiTiet_MaChuanChi').attr("disabled", "disabled");
            }
            calcTienThu();

        });
        $('#PhieuThuChiTiet_TienGui').focusout(function () {

            var phieuThu = _$phieuThuInformationForm.serializeFormToObject();
            var tienMat = parseFloat(phieuThu.tienMat == "" ? 0 : phieuThu.tienMat);
            var tienGui = parseFloat(phieuThu.tienGui == "" ? 0 : phieuThu.tienGui);

            if (tienGui > 0) {
                $('#PhieuThuChiTiet_MaChuanChi').removeAttr("disabled", "");
            }
            else {
                $('#PhieuThuChiTiet_MaChuanChi').attr("disabled", "disabled");
            }
            calcTienThu();

        });

        this.save = function () {
            if (!_$phieuThuInformationForm.valid()) {
                return;
            }
            var phieuThu = _$phieuThuInformationForm.serializeFormToObject();
            if ($.number(phieuThu.tienGui) > 0 && phieuThu.maChuanChi =="") {
                abp.notify.info(app.localize('YouNeedEnterMaChuanChi'));
                return;
            }
            phieuThu.tienGui = parseFloat(phieuThu.tienGui==""? 0:phieuThu.tienGui);
            phieuThu.tienMat = parseFloat(phieuThu.tienMat == "" ? 0 : phieuThu.tienMat);
			 _modalManager.setBusy(true);
			 _phieuThusService.createOrEdit(
				phieuThu
			 ).done(function () {
                 abp.notify.info(app.localize('SavedSuccessfully'));
                 abp.event.trigger('app.createOrEditPhieuThuModalSaved');
               _modalManager.close();
                 
                   
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);