(function () {
    $(function () {

        var _$nhatKySuDungThesTable = $('#NhatKySuDungThesTable');
        var _nhatKySuDungThesService = abp.services.app.nhatKySuDungThes;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.NhatKySuDungThes.Create'),
            edit: abp.auth.hasPermission('Pages.NhatKySuDungThes.Edit'),
            'delete': abp.auth.hasPermission('Pages.NhatKySuDungThes.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhatKySuDungThes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhatKySuDungThes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditNhatKySuDungTheModal'
        });

		 var _viewNhatKySuDungTheModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhatKySuDungThes/ViewnhatKySuDungTheModal',
            modalClass: 'ViewNhatKySuDungTheModal'
        });

        var dataTable = _$nhatKySuDungThesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _nhatKySuDungThesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#NhatKySuDungThesTableFilter').val(),
					iD_ChungTuFilter: $('#ID_ChungTuFilterId').val(),
					iD_ChiTietChungTuFilter: $('#ID_ChiTietChungTuFilterId').val(),
					minSoLuongFilter: $('#MinSoLuongFilterId').val(),
					maxSoLuongFilter: $('#MaxSoLuongFilterId').val(),
					minSoTienFilter: $('#MinSoTienFilterId').val(),
					maxSoTienFilter: $('#MaxSoTienFilterId').val(),
					minNgayFilter: $('#MinNgayFilterId').val(),
					maxNgayFilter: $('#MaxNgayFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					laSoLuongDuocTangFilter: $('#LaSoLuongDuocTangFilterId').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					dM_LoaiChungTuLoaiChungTuFilter: $('#DM_LoaiChungTuLoaiChungTuFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
                    };
                }
            },
            columnDefs: [
                {
                    width: 120,
                    targets: 0,
                    data: null,
                    orderable: false,
                    autoWidth: false,
                    defaultContent: '',
                    rowAction: {
                        cssClass: 'btn btn-brand dropdown-toggle',
                        text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                        items: [
						{
                                text: app.localize('View'),
                                action: function (data) {
                                    _viewNhatKySuDungTheModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.nhatKySuDungThe.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteNhatKySuDungThe(data.record.nhatKySuDungThe);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "nhatKySuDungThe.iD_ChungTu"   
					},
					{
						targets: 2,
						 data: "nhatKySuDungThe.iD_ChiTietChungTu"   
					},
					{
						targets: 3,
						 data: "nhatKySuDungThe.soLuong"   
					},
					{
						targets: 4,
						 data: "nhatKySuDungThe.soTien"   
					},
					{
						targets: 5,
						 data: "nhatKySuDungThe.ngay" ,
					render: function (ngay) {
						if (ngay) {
							return moment(ngay).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 6,
						 data: "nhatKySuDungThe.userName"   
					},
					{
						targets: 7,
						 data: "nhatKySuDungThe.laSoLuongDuocTang"  ,
						render: function (laSoLuongDuocTang) {
							if (laSoLuongDuocTang) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 8,
						 data: "theKhachHangMaThe" 
					},
					{
						targets: 9,
						 data: "dM_LoaiChungTuLoaiChungTu" 
					},
					{
						targets: 10,
						 data: "userName" 
					},
					{
						targets: 11,
						 data: "dM_HangHoaTenHangHoa" 
					}
            ]
        });


        function getNhatKySuDungThes() {
            dataTable.ajax.reload();
        }

        function deleteNhatKySuDungThe(nhatKySuDungThe) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _nhatKySuDungThesService.delete({
                            id: nhatKySuDungThe.id
                        }).done(function () {
                            getNhatKySuDungThes(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

		$('#ShowAdvancedFiltersSpan').click(function () {
            $('#ShowAdvancedFiltersSpan').hide();
            $('#HideAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideDown();
        });

        $('#HideAdvancedFiltersSpan').click(function () {
            $('#HideAdvancedFiltersSpan').hide();
            $('#ShowAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideUp();
        });

        $('#CreateNewNhatKySuDungTheButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _nhatKySuDungThesService
                .getNhatKySuDungThesToExcel({
				filter : $('#NhatKySuDungThesTableFilter').val(),
					iD_ChungTuFilter: $('#ID_ChungTuFilterId').val(),
					iD_ChiTietChungTuFilter: $('#ID_ChiTietChungTuFilterId').val(),
					minSoLuongFilter: $('#MinSoLuongFilterId').val(),
					maxSoLuongFilter: $('#MaxSoLuongFilterId').val(),
					minSoTienFilter: $('#MinSoTienFilterId').val(),
					maxSoTienFilter: $('#MaxSoTienFilterId').val(),
					minNgayFilter: $('#MinNgayFilterId').val(),
					maxNgayFilter: $('#MaxNgayFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					laSoLuongDuocTangFilter: $('#LaSoLuongDuocTangFilterId').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					dM_LoaiChungTuLoaiChungTuFilter: $('#DM_LoaiChungTuLoaiChungTuFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditNhatKySuDungTheModalSaved', function () {
            getNhatKySuDungThes();
        });

		$('#GetNhatKySuDungThesButton').click(function (e) {
            e.preventDefault();
            getNhatKySuDungThes();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getNhatKySuDungThes();
		  }
		});

    });
})();