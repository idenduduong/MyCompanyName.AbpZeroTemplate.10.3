(function ($) {
    app.modals.CreateOrEditPackageReleaseModal = function () {

        var _packageReleasesService = abp.services.app.packageReleases;

        var _modalManager;
        var _$packageReleaseInformationForm = null;

		        var _theKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PackageReleases/TheKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PackageReleases/_TheKhachHangLookupTableModal.js',
            modalClass: 'TheKhachHangLookupTableModal'
        });        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PackageReleases/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PackageReleases/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PackageReleases/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PackageReleases/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numberic').numeric_input();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$packageReleaseInformationForm = _modalManager.getModal().find('form[name=PackageReleaseInformationsForm]');
            _$packageReleaseInformationForm.validate();
        };

		          $('#OpenTheKhachHangLookupTableButton').click(function () {

            var packageRelease = _$packageReleaseInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: packageRelease.fromCardId, displayName: packageRelease.theKhachHangTenantId }, function (data) {
                _$packageReleaseInformationForm.find('input[name=theKhachHangTenantId]').val(data.displayName); 
                _$packageReleaseInformationForm.find('input[name=fromCardId]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangTenantIdButton').click(function () {
                _$packageReleaseInformationForm.find('input[name=theKhachHangTenantId]').val(''); 
                _$packageReleaseInformationForm.find('input[name=fromCardId]').val(''); 
        });
		
        $('#OpenTheKhachHang2LookupTableButton').click(function () {

            var packageRelease = _$packageReleaseInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: packageRelease.toCardId, displayName: packageRelease.theKhachHangMaThe2 }, function (data) {
                _$packageReleaseInformationForm.find('input[name=theKhachHangMaThe2]').val(data.displayName); 
                _$packageReleaseInformationForm.find('input[name=toCardId]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangMaThe2Button').click(function () {
                _$packageReleaseInformationForm.find('input[name=theKhachHangMaThe2]').val(''); 
                _$packageReleaseInformationForm.find('input[name=toCardId]').val(''); 
        });
		
        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var packageRelease = _$packageReleaseInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: packageRelease.fromCustomerId, displayName: packageRelease.dM_DoiTuongMaDoiTuong }, function (data) {
                _$packageReleaseInformationForm.find('input[name=dM_DoiTuongMaDoiTuong]').val(data.displayName); 
                _$packageReleaseInformationForm.find('input[name=fromCustomerId]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongMaDoiTuongButton').click(function () {
                _$packageReleaseInformationForm.find('input[name=dM_DoiTuongMaDoiTuong]').val(''); 
                _$packageReleaseInformationForm.find('input[name=fromCustomerId]').val(''); 
        });
		
        $('#OpenDM_DoiTuong2LookupTableButton').click(function () {

            var packageRelease = _$packageReleaseInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: packageRelease.toCustomerId, displayName: packageRelease.dM_DoiTuongMaDoiTuong2 }, function (data) {
                _$packageReleaseInformationForm.find('input[name=dM_DoiTuongMaDoiTuong2]').val(data.displayName); 
                _$packageReleaseInformationForm.find('input[name=toCustomerId]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongMaDoiTuong2Button').click(function () {
                _$packageReleaseInformationForm.find('input[name=dM_DoiTuongMaDoiTuong2]').val(''); 
                _$packageReleaseInformationForm.find('input[name=toCustomerId]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var packageRelease = _$packageReleaseInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: packageRelease.approvedBy, displayName: packageRelease.userName }, function (data) {
                _$packageReleaseInformationForm.find('input[name=userName]').val(data.displayName); 
                _$packageReleaseInformationForm.find('input[name=approvedBy]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$packageReleaseInformationForm.find('input[name=userName]').val(''); 
                _$packageReleaseInformationForm.find('input[name=approvedBy]').val(''); 
        });
		


        this.save = function () {
            if (!_$packageReleaseInformationForm.valid()) {
                return;
            }

            var packageRelease = _$packageReleaseInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _packageReleasesService.createOrEdit(
				packageRelease
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditPackageReleaseModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);