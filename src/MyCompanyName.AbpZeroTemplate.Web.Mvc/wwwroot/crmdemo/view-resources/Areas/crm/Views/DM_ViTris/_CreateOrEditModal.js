(function ($) {
    app.modals.CreateOrEditDM_ViTriModal = function () {

        var _dM_ViTrisService = abp.services.app.dM_ViTris;

        var _modalManager;
        var _$dM_ViTriInformationForm = null;

		        var _dM_LoaiPhongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_ViTris/DM_LoaiPhongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_ViTris/_DM_LoaiPhongLookupTableModal.js',
            modalClass: 'DM_LoaiPhongLookupTableModal'
        });        var _dM_KhuVucLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_ViTris/DM_KhuVucLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_ViTris/_DM_KhuVucLookupTableModal.js',
            modalClass: 'DM_KhuVucLookupTableModal'
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

            _$dM_ViTriInformationForm = _modalManager.getModal().find('form[name=DM_ViTriInformationsForm]');
            _$dM_ViTriInformationForm.validate();
        };

		          $('#OpenDM_LoaiPhongLookupTableButton').click(function () {

            var dM_ViTri = _$dM_ViTriInformationForm.serializeFormToObject();

            _dM_LoaiPhongLookupTableModal.open({ id: dM_ViTri.iD_LoaiPhong, displayName: dM_ViTri.dM_LoaiPhongTenLoai }, function (data) {
                _$dM_ViTriInformationForm.find('input[name=dM_LoaiPhongTenLoai]').val(data.displayName); 
                _$dM_ViTriInformationForm.find('input[name=iD_LoaiPhong]').val(data.id); 
            });
        });
		
		$('#ClearDM_LoaiPhongTenLoaiButton').click(function () {
                _$dM_ViTriInformationForm.find('input[name=dM_LoaiPhongTenLoai]').val(''); 
                _$dM_ViTriInformationForm.find('input[name=iD_LoaiPhong]').val(''); 
        });
		
        $('#OpenDM_KhuVucLookupTableButton').click(function () {

            var dM_ViTri = _$dM_ViTriInformationForm.serializeFormToObject();

            _dM_KhuVucLookupTableModal.open({ id: dM_ViTri.iD_KhuVuc, displayName: dM_ViTri.dM_KhuVucTenKhuVuc }, function (data) {
                _$dM_ViTriInformationForm.find('input[name=dM_KhuVucTenKhuVuc]').val(data.displayName); 
                _$dM_ViTriInformationForm.find('input[name=iD_DonVi]').val(data.id); 
            });
        });
		
		$('#ClearDM_KhuVucTenKhuVucButton').click(function () {
                _$dM_ViTriInformationForm.find('input[name=dM_KhuVucTenKhuVuc]').val(''); 
                _$dM_ViTriInformationForm.find('input[name=iD_DonVi]').val(''); 
        });
		


        this.save = function () {
            if (!_$dM_ViTriInformationForm.valid()) {
                return;
            }

            var dM_ViTri = _$dM_ViTriInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_ViTrisService.createOrEdit(
				dM_ViTri
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_ViTriModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);