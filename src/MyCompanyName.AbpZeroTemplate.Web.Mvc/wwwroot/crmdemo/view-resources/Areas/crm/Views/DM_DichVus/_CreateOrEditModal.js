(function ($) {
    app.modals.CreateOrEditDM_HangHoaModal = function () {

        var _dM_HangHoasService = abp.services.app.dM_HangHoas;

        var _modalManager;
        var _$dM_DichVuInformationForm = null;
        var congDoanControl = null;
        var _dM_NhomHangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_NhomHangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_NhomHangHoaLookupTableModal.js',
            modalClass: 'DM_NhomHangHoaLookupTableModal'
        });
        var _dM_QuocGiaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_QuocGiaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_QuocGiaLookupTableModal.js',
            modalClass: 'DM_QuocGiaLookupTableModal'
        });
        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });
        var _dM_ThueSuatLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_ThueSuatLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_ThueSuatLookupTableModal.js',
            modalClass: 'DM_ThueSuatLookupTableModal'
        });
        var _dM_DonViTinhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_DonViTinhLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_DonViTinhLookupTableModal.js',
            modalClass: 'DM_DonViTinhLookupTableModal'
        });
        var _dM_NhomKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_NhomKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_NhomKhachHangLookupTableModal.js',
            modalClass: 'DM_NhomKhachHangLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );
            modal.find('.select2').select2(
                {
                    placeholder: 'Select an option',
                    width: '100%'
                });
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dM_DichVuInformationForm = _modalManager.getModal().find('form[name=DM_DichVuCommonInforForm]');
            _$dM_DichVuInformationForm.validate();
        };

        $('#OpenDM_NhomHangHoaLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_NhomHangHoaLookupTableModal.open({ id: dM_HangHoa.dM_NhomHangHoaId, displayName: dM_HangHoa.dM_NhomHangHoaTenNhom }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_NhomHangHoaId]').val(data.id);
            });
        });

        $('#ClearDM_NhomHangHoaTenNhomButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_NhomHangHoaId]').val('');
        });

        $('#OpenDM_QuocGiaLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_QuocGiaLookupTableModal.open({ id: dM_HangHoa.dM_QuocGiaId, displayName: dM_HangHoa.dM_QuocGiaTenNuoc }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_QuocGiaId]').val(data.id);
            });
        });

        $('#ClearDM_QuocGiaTenNuocButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_QuocGiaId]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: dM_HangHoa.dM_DoiTuongId, displayName: dM_HangHoa.dM_DoiTuongTenDoiTuong }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_DoiTuongId]').val(data.id);
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_DoiTuongId]').val('');
        });

        $('#OpenDM_ThueSuatLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_ThueSuatLookupTableModal.open({ id: dM_HangHoa.dM_ThueSuatId, displayName: dM_HangHoa.dM_ThueSuatThueSuat }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_ThueSuatThueSuat]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_ThueSuatId]').val(data.id);
            });
        });

        $('#ClearDM_ThueSuatThueSuatButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_ThueSuatThueSuat]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_ThueSuatId]').val('');
        });

        $('#OpenDM_DonViTinhLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: dM_HangHoa.dM_DonViTinhId, displayName: dM_HangHoa.dM_DonViTinhTenDonViTinh }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhId]').val(data.id);
            });
        });

        $('#ClearDM_DonViTinhTenDonViTinhButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhId]').val('');
        });

        $('#OpenDM_DonViTinhQuyCachLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: dM_HangHoa.iD_DVTQuyCach, displayName: dM_HangHoa.dM_DonViTinhQuyCachTenDonViTinh }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhQuyCachTenDonViTinh]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=iD_DVTQuyCach]').val(data.id);
            });
        });

        $('#ClearDM_DonViTinhQuyCachTenDonViTinhButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhQuyCachTenDonViTinh]').val('');
            _$dM_DichVuInformationForm.find('input[name=iD_DVTQuyCach]').val('');
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

        $('#DM_DichVuProcessTabLink').click(function () {
            
            congDoanControl = congDoanControl == null ? CongDoanController(_modalManager) : congDoanControl;
        });
        
        this.save = function () {
            if (!_$dM_DichVuInformationForm.valid()) {
                return;
            }

            var dM_DichVuInfo = _$dM_DichVuInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            
            _dM_HangHoasService.createOrEdit(
                dM_DichVuInfo
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_DichVuModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);