(function () {
    $(function () {

        var _$entitiesTable = $('#EntitiesTable');
        var _$entitiesTableFilter = $('#EntitiesTableFilter');
        var _$maFilterId = $('#MaFilterId');
        var _$tenFilterId = $('#TenFilterId');
        var _$address = $('#address');
        var _$tel = $('#tel');
        var _$unit = $('#unitName');
        var _$province = $('#provinceName');
        var _$commune = $('#communeName');
        

        var _$service = abp.services.app.tools;
        
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Tools.Create'),
            edit: abp.auth.hasPermission('Pages.Tools.Edit'),
            'delete': abp.auth.hasPermission('Pages.Tools.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Tools/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/Tools/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditModal'
            //viewUrl: abp.appPath + 'qlnv/DM_QuanHuyens/CreateOrEditModal',
            //scriptUrl: abp.appPath + 'crmdemo/view-resources/Areas/crm/Views/DM_QuanHuyens/_CreateOrEditModal.js',
            //modalClass: 'CreateOrEditDM_QuanHuyenModal'
        });

		var _viewModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Tools/ViewModal',
            modalClass: 'ViewModal'
            //viewUrl: abp.appPath + 'qlnv/DM_QuanHuyens/ViewdM_QuanHuyenModal',
            //modalClass: 'ViewDM_QuanHuyenModal'
        });

        var dataTable = _$entitiesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _$service.getAll,
                inputFilter: function () {
                    return {
                        filter: _$entitiesTableFilter.val(),
                        pOSCode: _$maFilterId.val(),
                        pOSName: _$tenFilterId.val(),
                        address: _$address.val(),
                        communeName: _$commune.val(),
                        provinceName: _$province.val(),
                        unitName: _$unit.val(),
                        tel: _$tel.val()
                    };
                }
            },
            columnDefs: [
                {
                    width: "10",
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
                                _viewModal.open({ data: data.record });
                            }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.tool.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteEntity(data.record.tool);
                            }
                        }]
                    }
                },
                {
					targets: 1,
                    data: "tool.posCode"
                },
                {
                    targets: 2,
                    data: "posName"
                },
				{
					targets: 3,
                    data: "tool.toolName"
                },
                {
					targets: 4,
                    data: "tool.type",
                    name: "type",
                    render: function (type) {
                        return abp.localization.localize('ToolType_' + type, 'AbpZeroTemplate');
                    }
                },
                {
                    targets: 5,
                    data: "tool.serial"
                },
                {
                    targets: 6,
                    data: "tool.usedFrom"
                },
                {
                    targets: 7,
                    data: "tool.configuration"
                },
                {
                    targets: 8,
                    data: "tool.condition",
                    name: "condition",
                    render: function (condition) {
                        return abp.localization.localize('ToolCondition_' + condition, 'AbpZeroTemplate');
                    }
                },
                {
                    targets: 9,
                    data: "tool.toolStatus",
                    name: "status",
                    render: function (status) {
                        return abp.localization.localize('ToolStatus_' + status, 'AbpZeroTemplate');
                    }
                },
                {
                    targets: 10,
                    data: "tool.note"
                }
            ]
        });

        function getEntities() {
            dataTable.ajax.reload();
        }

        function deleteEntity(dM_QuanHuyen) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _$service.delete({
                            id: dM_QuanHuyen.id
                        }).done(function () {
                            getEntities(true);
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

        $('#CreateNew').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _$service
                .getEntitiesToExcel({
                    filter: _$entitiesTableFilter.val(),
                    maQuanHuyenFilter: _$maFilterId.val(),
                    tenQuanHuyenFilter: _$tenFilterId.val(),
                    ghiChuFilter: _$ghiChuFilterId.val(),
                    dM_TinhThanhTenTinhThanhFilter: _$dM_TinhThanhTenTinhThanhFilterId.val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditModalSaved', function () {
            getEntities();
        });

        $('#GetEntitiesButton').click(function (e) {
            e.preventDefault();
            getEntities();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
              getEntities();
		  }
		});

    });
})();