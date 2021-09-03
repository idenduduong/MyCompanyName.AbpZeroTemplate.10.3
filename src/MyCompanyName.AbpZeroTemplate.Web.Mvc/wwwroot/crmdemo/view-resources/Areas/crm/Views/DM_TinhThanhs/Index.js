(function () {
	$(function () {

		var _$dM_TinhThanhsTable = $('#DM_TinhThanhsTable');
		var _dM_TinhThanhsService = abp.services.app.dM_TinhThanhs;

		$('.date-picker').datetimepicker({
			locale: abp.localization.currentLanguage.name,
			format: 'L'
		});

		var _permissions = {
			create: abp.auth.hasPermission('Pages.Administration.DM_TinhThanhs.Create'),
			edit: abp.auth.hasPermission('Pages.Administration.DM_TinhThanhs.Edit'),
			'delete': abp.auth.hasPermission('Pages.Administration.DM_TinhThanhs.Delete')
		};

		var _createOrEditModal = new app.ModalManager({
			viewUrl: abp.appPath + 'qlnv/DM_TinhThanhs/CreateOrEditModal',
			scriptUrl: abp.appPath + 'crmdemo/view-resources/Areas/crm/Views/DM_TinhThanhs/_CreateOrEditModal.js',
			modalClass: 'CreateOrEditDM_TinhThanhModal'
		});

		 var _viewDM_TinhThanhModal = new app.ModalManager({
			 viewUrl: abp.appPath + 'qlnv/DM_TinhThanhs/ViewdM_TinhThanhModal',
			modalClass: 'ViewDM_TinhThanhModal'
		});

		var dataTable = _$dM_TinhThanhsTable.DataTable({
			paging: true,
			serverSide: true,
			processing: true,
			listAction: {
				ajaxFunction: _dM_TinhThanhsService.getAll,
				inputFilter: function () {
					return {
					filter: $('#DM_TinhThanhsTableFilter').val(),
					maTinhThanhFilter: $('#MaTinhThanhFilterId').val(),
					tenTinhThanhFilter: $('#TenTinhThanhFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val(),
					dM_VungMienTenVungFilter: $('#DM_VungMienTenVungFilterId').val()
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
									_viewDM_TinhThanhModal.open({ data: data.record });
								}
						},
						{
							text: app.localize('Edit'),
							visible: function () {
								return _permissions.edit;
							},
							action: function (data) {
								console.log(data)
								debugger

								_createOrEditModal.open({ id: data.record.dM_TinhThanh.id });
							}
						}, 
						{
							text: app.localize('Delete'),
							visible: function () {
								return _permissions.delete;
							},
							action: function (data) {
								deleteDM_TinhThanh(data.record.dM_TinhThanh);
							}
						}]
					}
				},
				{
					targets: 1,
						data: "maTinhThanh"
				},
				{
					targets: 2,
						data: "tenTinhThanh"
				},
				{
					targets: 3,
						data: "ghiChu"
				},
				//{
				//	targets: 4,
				//	 data: "dM_TinhThanh.userTao"   
				//},
				//{
				//	targets: 5,
				//	 data: "dM_TinhThanh.ngayTao" ,
				//render: function (ngayTao) {
				//	if (ngayTao) {
				//		return moment(ngayTao).format('L');
				//	}
				//	return "";
				//}
			  
				//},
				//{
				//	targets: 6,
				//	 data: "dM_TinhThanh.userSuaCuoi"   
				//},
				//{
				//	targets: 7,
				//	 data: "dM_TinhThanh.ngaySuaCuoi" ,
				//render: function (ngaySuaCuoi) {
				//	if (ngaySuaCuoi) {
				//		return moment(ngaySuaCuoi).format('L');
				//	}
				//	return "";
				//}
			  
				//},
				{
					targets: 4,
						data: "dM_QuocGiaTenNuoc" 
				},
				{
					targets: 5,
					data: "dM_VungMienTenVung"
				}
			]
		});

		function getDM_TinhThanhs() {
			dataTable.ajax.reload();
		}

		function deleteDM_TinhThanh(dM_TinhThanh) {
			abp.message.confirm(
				'',
				function (isConfirmed) {
					if (isConfirmed) {
						_dM_TinhThanhsService.delete({
							id: dM_TinhThanh.id
						}).done(function () {
							getDM_TinhThanhs(true);
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

		$('#CreateNewDM_TinhThanhButton').click(function () {
			_createOrEditModal.open();
		});

		$('#ExportToExcelButton').click(function () {
			_dM_TinhThanhsService
				.getDM_TinhThanhsToExcel({
				filter : $('#DM_TinhThanhsTableFilter').val(),
					maTinhThanhFilter: $('#MaTinhThanhFilterId').val(),
					tenTinhThanhFilter: $('#TenTinhThanhFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val(),
					dM_VungMienTenVungFilter: $('#DM_VungMienTenVungFilterId').val()
				})
				.done(function (result) {
					app.downloadTempFile(result);
				});
		});

		abp.event.on('app.createOrEditDM_TinhThanhModalSaved', function () {
			getDM_TinhThanhs();
		});

		$('#GetDM_TinhThanhsButton').click(function (e) {
			e.preventDefault();
			getDM_TinhThanhs();
		});

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_TinhThanhs();
		  }
		});

	});
})();