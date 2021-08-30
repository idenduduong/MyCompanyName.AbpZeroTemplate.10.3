(function ($) {
    app.modals.CreateOrEditBalanceReleaseModal = function () {

        var _balanceReleasesService = abp.services.app.balanceReleases;

        var _modalManager;
        var _$balanceReleaseInformationForm = null;

		        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/BalanceReleases/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/BalanceReleases/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });        var _theKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/BalanceReleases/TheKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/BalanceReleases/_TheKhachHangLookupTableModal.js',
            modalClass: 'TheKhachHangLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/BalanceReleases/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/BalanceReleases/_UserLookupTableModal.js',
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

            _$balanceReleaseInformationForm = _modalManager.getModal().find('form[name=BalanceReleaseInformationsForm]');
            _$balanceReleaseInformationForm.validate();
        };

		          $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var balanceRelease = _$balanceReleaseInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: balanceRelease.fromCustomerId, displayName: balanceRelease.dM_DoiTuongMaDoiTuong }, function (data) {
                _$balanceReleaseInformationForm.find('input[name=dM_DoiTuongMaDoiTuong]').val(data.displayName); 
                _$balanceReleaseInformationForm.find('input[name=fromCustomerId]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongMaDoiTuongButton').click(function () {
                _$balanceReleaseInformationForm.find('input[name=dM_DoiTuongMaDoiTuong]').val(''); 
                _$balanceReleaseInformationForm.find('input[name=fromCustomerId]').val(''); 
        });
		
        $('#OpenDM_DoiTuong2LookupTableButton').click(function () {

            var balanceRelease = _$balanceReleaseInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: balanceRelease.toCustomerId, displayName: balanceRelease.dM_DoiTuongMaDoiTuong2 }, function (data) {
                _$balanceReleaseInformationForm.find('input[name=dM_DoiTuongMaDoiTuong2]').val(data.displayName); 
                _$balanceReleaseInformationForm.find('input[name=toCustomerId]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongMaDoiTuong2Button').click(function () {
                _$balanceReleaseInformationForm.find('input[name=dM_DoiTuongMaDoiTuong2]').val(''); 
                _$balanceReleaseInformationForm.find('input[name=toCustomerId]').val(''); 
        });
		
        $('#OpenTheKhachHangLookupTableButton').click(function () {

            var balanceRelease = _$balanceReleaseInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: balanceRelease.fromCardId, displayName: balanceRelease.theKhachHangMaThe }, function (data) {
                _$balanceReleaseInformationForm.find('input[name=theKhachHangMaThe]').val(data.displayName); 
                _$balanceReleaseInformationForm.find('input[name=fromCardId]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangMaTheButton').click(function () {
                _$balanceReleaseInformationForm.find('input[name=theKhachHangMaThe]').val(''); 
                _$balanceReleaseInformationForm.find('input[name=fromCardId]').val(''); 
        });
		
        $('#OpenTheKhachHang2LookupTableButton').click(function () {

            var balanceRelease = _$balanceReleaseInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: balanceRelease.toCardId, displayName: balanceRelease.theKhachHangMaThe2 }, function (data) {
                _$balanceReleaseInformationForm.find('input[name=theKhachHangMaThe2]').val(data.displayName); 
                _$balanceReleaseInformationForm.find('input[name=toCardId]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangMaThe2Button').click(function () {
                _$balanceReleaseInformationForm.find('input[name=theKhachHangMaThe2]').val(''); 
                _$balanceReleaseInformationForm.find('input[name=toCardId]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var balanceRelease = _$balanceReleaseInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: balanceRelease.approvedBy, displayName: balanceRelease.userName }, function (data) {
                _$balanceReleaseInformationForm.find('input[name=userName]').val(data.displayName); 
                _$balanceReleaseInformationForm.find('input[name=approvedBy]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$balanceReleaseInformationForm.find('input[name=userName]').val(''); 
                _$balanceReleaseInformationForm.find('input[name=approvedBy]').val(''); 
        });
		


        this.save = function () {
            if (!_$balanceReleaseInformationForm.valid()) {
                return;
            }

            var balanceRelease = _$balanceReleaseInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _balanceReleasesService.createOrEdit(
				balanceRelease
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditBalanceReleaseModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);