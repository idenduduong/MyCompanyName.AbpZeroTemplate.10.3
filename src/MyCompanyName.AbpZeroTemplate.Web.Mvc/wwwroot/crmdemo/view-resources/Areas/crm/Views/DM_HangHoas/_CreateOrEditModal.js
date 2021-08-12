(function ($) {
    app.modals.CreateOrEditDM_HangHoaModal = function () {

        var _dM_HangHoasService = abp.services.app.dM_HangHoas;

        var _modalManager;
        var _dM_HangHoaId = null;
        var _$dM_HangHoaInformationForm = null;
        var _$dM_HangHoaDetailsForm = null;
        var lohangControl = null;
        var discountControl = null;
        var inventoryControl = null;
        var warehouseControl = null;
        var _dM_NhomHangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_NhomHangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_NhomHangHoaLookupTableModal.js',
            modalClass: 'DM_NhomHangHoaLookupTableModal'
        });
        var _dM_QuocGiaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_QuocGiaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_QuocGiaLookupTableModal.js',
            modalClass: 'DM_QuocGiaLookupTableModal'
        });
        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });
        var _dM_ThueSuatLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_ThueSuatLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_ThueSuatLookupTableModal.js',
            modalClass: 'DM_ThueSuatLookupTableModal'
        });
        var _dM_DonViTinhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_DonViTinhLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_DonViTinhLookupTableModal.js',
            modalClass: 'DM_DonViTinhLookupTableModal'
        });
        var _dM_NhomKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_NhomKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_NhomKhachHangLookupTableModal.js',
            modalClass: 'DM_NhomKhachHangLookupTableModal'
        });

        var _changeImageModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/ChangeImageModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_ChangeImageModal.js',
            modalClass: 'ChangeHangHoaImageModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );;
            modal.find('.select2').select2(
                {
                    placeholder: 'Select an option',
                    width: '100%'
                });
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            var _dM_HangHoaId=_modalManager.getModal().find('[name=id]');
            
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dM_HangHoaInformationForm = _modalManager.getModal().find('form[name=DM_HangHoaCommonInforForm]');
            _$dM_HangHoaDetailsForm = _modalManager.getModal().find('form[name=DM_HangHoaDetailsForm]');
            _$dM_HangHoaInformationForm.validate();
            _$dM_HangHoaDetailsForm.validate();
            modal.find('.antikeydown').keydown(function (e) {
                if (e.which === 13) {
                        e.stopPropagation();
                }
            });
        };

        $('#OpenDM_NhomHangHoaLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_NhomHangHoaLookupTableModal.open({ id: dM_HangHoa.dM_NhomHangHoaId, displayName: dM_HangHoa.dM_NhomHangHoaTenNhom }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_NhomHangHoaId]').val(data.id);
            });
        });

        $('#ClearDM_NhomHangHoaTenNhomButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_NhomHangHoaId]').val('');
        });

        $('#OpenDM_QuocGiaLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_QuocGiaLookupTableModal.open({ id: dM_HangHoa.dM_QuocGiaId, displayName: dM_HangHoa.dM_QuocGiaTenNuoc }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_QuocGiaId]').val(data.id);
            });
        });

        $('#ClearDM_QuocGiaTenNuocButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_QuocGiaId]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: dM_HangHoa.dM_DoiTuongId, displayName: dM_HangHoa.dM_DoiTuongTenDoiTuong }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_DoiTuongId]').val(data.id);
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_DoiTuongId]').val('');
        });

        $('#OpenDM_ThueSuatLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_ThueSuatLookupTableModal.open({ id: dM_HangHoa.dM_ThueSuatId, displayName: dM_HangHoa.dM_ThueSuatThueSuat }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_ThueSuatThueSuat]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_ThueSuatId]').val(data.id);
            });
        });

        $('#ClearDM_ThueSuatThueSuatButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_ThueSuatThueSuat]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_ThueSuatId]').val('');
        });

        $('#OpenDM_DonViTinhLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: dM_HangHoa.dM_DonViTinhId, displayName: dM_HangHoa.dM_DonViTinhTenDonViTinh }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhId]').val(data.id);
            });
        });

        $('#ClearDM_DonViTinhTenDonViTinhButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhId]').val('');
        });

        $('#OpenDM_DonViTinhQuyCachLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: dM_HangHoa.iD_DVTQuyCach, displayName: dM_HangHoa.dM_DonViTinhQuyCachTenDonViTinh }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhQuyCachTenDonViTinh]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=iD_DVTQuyCach]').val(data.id);
            });
        });

        $('#ClearDM_DonViTinhQuyCachTenDonViTinhButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhQuyCachTenDonViTinh]').val('');
            _$dM_HangHoaInformationForm.find('input[name=iD_DVTQuyCach]').val('');
        });

        $('#OpenNhomKH1TenNhomLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaDetailsForm.serializeFormToObject();

            _dM_NhomKhachHangLookupTableModal.open({ id: dM_HangHoa.iDs_NhomKH1, displayName: dM_HangHoa.nhomKH1TenNhom }, function (data) {
                _$dM_HangHoaDetailsForm.find('input[name=nhomKH1TenNhom]').val(data.displayName);
                _$dM_HangHoaDetailsForm.find('input[name=iDs_NhomKH1]').val(data.id);
            });
        });

        $('#ClearNhomKH1TenNhomButton').click(function () {
            _$dM_HangHoaDetailsForm.find('input[name=NhomKH1TenNhom]').val('');
            _$dM_HangHoaDetailsForm.find('input[name=iDs_NhomKH1]').val('');
        });

        $('#DM_HangHoaShipmentTabLink').click(function () {
            
            lohangControl = lohangControl == null ? ShipmentControler(_modalManager): lohangControl;
        });

        $('#DM_HangHoaDiscountTabLink').click(function () {
            
            discountControl = discountControl== null ? DiscountControler(_modalManager): discountControl;
        });
        $('#DM_HangHoaInventoryTabLink').click(function () {
            
            inventoryControl = inventoryControl == null ? InventoryControler(_modalManager) : inventoryControl;
        });
        $('#DM_HangHoaWarehouseTabLink').click(function () {
            
            warehouseControl = warehouseControl == null ? WarehouseControler(_modalManager) : WarehouseControl;
        });
        $('#DM_HangHoaChangeImageButton').click(function () {
            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();
            _changeImageModal.open({ id: dM_HangHoa.id });
        });

        
        this.save = function () {
            if (!_$dM_HangHoaInformationForm.valid() || !_$dM_HangHoaDetailsForm.valid()) {
                return;
            }

            var dM_HangHoaCommonInfo = _$dM_HangHoaInformationForm.serializeFormToObject();
            var dM_HangHoaDetails = _$dM_HangHoaDetailsForm.serializeFormToObject();
            dM_HangHoaDetails.IDs_NhomKH1 = $('[name="NhomKH1IDs"]').val().join(",");
            //loan.IDs_NhomKH1 += "/";
            //loan.IDs_NhomKH1 = "/" + loan.IDs_NhomKH1;
            dM_HangHoaDetails.IDs_NhomKH2 = $('[name="NhomKH2IDs"]').val().join(",");
            //loan.IDs_NhomKH2 += "/";
            //loan.IDs_NhomKH2 = "/" + loan.IDs_NhomKH2;
            dM_HangHoaDetails.IDs_NhomKH3 = $('[name="NhomKH3IDs"]').val().join(",");
            //loan.IDs_NhomKH3 += "/";
            //loan.IDs_NhomKH3 = "/" + loan.IDs_NhomKH3;
            _modalManager.setBusy(true);
            
            _dM_HangHoasService.createOrEdit(
                $.extend({}, dM_HangHoaCommonInfo, dM_HangHoaDetails)
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_HangHoaModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);