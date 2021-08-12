(function ($) {
    app.modals.CreateOrEditBonusModal = function () {

        var _bonusesService = abp.services.app.bonuses;

        var _modalManager;
        var _$bonusInformationForm = null;

		        var _dM_KhuyenMaiLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Bonuses/DM_KhuyenMaiLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Bonuses/_DM_KhuyenMaiLookupTableModal.js',
            modalClass: 'DM_KhuyenMaiLookupTableModal'
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

            _$bonusInformationForm = _modalManager.getModal().find('form[name=BonusInformationsForm]');
            _$bonusInformationForm.validate();
        };

		          $('#OpenDM_KhuyenMaiLookupTableButton').click(function () {

            var bonus = _$bonusInformationForm.serializeFormToObject();

            _dM_KhuyenMaiLookupTableModal.open({ id: bonus.promotionId, displayName: bonus.dM_KhuyenMaiDisplayName }, function (data) {
                _$bonusInformationForm.find('input[name=dM_KhuyenMaiDisplayName]').val(data.displayName); 
                _$bonusInformationForm.find('input[name=promotionId]').val(data.id); 
            });
        });
		
		$('#ClearDM_KhuyenMaiDisplayNameButton').click(function () {
                _$bonusInformationForm.find('input[name=dM_KhuyenMaiDisplayName]').val(''); 
                _$bonusInformationForm.find('input[name=promotionId]').val(''); 
        });
		


        this.save = function () {
            if (!_$bonusInformationForm.valid()) {
                return;
            }

            var bonus = _$bonusInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _bonusesService.createOrEdit(
				bonus
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditBonusModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);