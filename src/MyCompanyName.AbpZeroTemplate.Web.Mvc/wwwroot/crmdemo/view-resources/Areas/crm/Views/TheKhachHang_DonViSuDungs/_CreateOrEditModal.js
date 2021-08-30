(function ($) {
    app.modals.CreateOrEditTheKhachHang_DonViSuDungModal = function () {

        var _theKhachHang_DonViSuDungsService = abp.services.app.theKhachHang_DonViSuDungs;

        var _modalManager;
        var _$theKhachHang_DonViSuDungInformationForm = null;

		        var _theKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHang_DonViSuDungs/TheKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHang_DonViSuDungs/_TheKhachHangLookupTableModal.js',
            modalClass: 'TheKhachHangLookupTableModal'
        });        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHang_DonViSuDungs/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHang_DonViSuDungs/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
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

            _$theKhachHang_DonViSuDungInformationForm = _modalManager.getModal().find('form[name=TheKhachHang_DonViSuDungInformationsForm]');
            _$theKhachHang_DonViSuDungInformationForm.validate();
        };

		          $('#OpenTheKhachHangLookupTableButton').click(function () {

            var theKhachHang_DonViSuDung = _$theKhachHang_DonViSuDungInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: theKhachHang_DonViSuDung.iD_TheKhachHang, displayName: theKhachHang_DonViSuDung.theKhachHangMaThe }, function (data) {
                _$theKhachHang_DonViSuDungInformationForm.find('input[name=theKhachHangMaThe]').val(data.displayName); 
                _$theKhachHang_DonViSuDungInformationForm.find('input[name=iD_TheKhachHang]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangMaTheButton').click(function () {
                _$theKhachHang_DonViSuDungInformationForm.find('input[name=theKhachHangMaThe]').val(''); 
                _$theKhachHang_DonViSuDungInformationForm.find('input[name=iD_TheKhachHang]').val(''); 
        });
		
        $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var theKhachHang_DonViSuDung = _$theKhachHang_DonViSuDungInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: theKhachHang_DonViSuDung.iD_DonViSuDung, displayName: theKhachHang_DonViSuDung.organizationUnitDisplayName }, function (data) {
                _$theKhachHang_DonViSuDungInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName); 
                _$theKhachHang_DonViSuDungInformationForm.find('input[name=iD_DonViSuDung]').val(data.id); 
            });
        });
		
		$('#ClearOrganizationUnitDisplayNameButton').click(function () {
                _$theKhachHang_DonViSuDungInformationForm.find('input[name=organizationUnitDisplayName]').val(''); 
                _$theKhachHang_DonViSuDungInformationForm.find('input[name=iD_DonViSuDung]').val(''); 
        });
		


        this.save = function () {
            if (!_$theKhachHang_DonViSuDungInformationForm.valid()) {
                return;
            }

            var theKhachHang_DonViSuDung = _$theKhachHang_DonViSuDungInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _theKhachHang_DonViSuDungsService.createOrEdit(
				theKhachHang_DonViSuDung
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditTheKhachHang_DonViSuDungModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);