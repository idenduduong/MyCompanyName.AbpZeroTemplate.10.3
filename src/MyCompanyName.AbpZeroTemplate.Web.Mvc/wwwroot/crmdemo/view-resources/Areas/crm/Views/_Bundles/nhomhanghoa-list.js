var OrganizationTree = (function ($) {
    return function () {
        var $tree;

        function initFiltering() {
            var to = false;
            $('#OrganizationTreeFilter').keyup(function () {
                if (to) { clearTimeout(to); }
                to = setTimeout(function () {
                    var v = $('#OrganizationTreeFilter').val();
                    $tree.jstree(true).search(v);
                }, 250);
            });
        }

        function init($treeContainer) {
            $tree = $treeContainer;
            $tree.jstree({
                "types": {
                    "default": {
                        "icon": "fa fa-folder m--font-warning" 
                    },
                    "file": {
                        "icon": "fa fa-file  m--font-warning"
                    }
                },
                'checkbox': {
                    keep_selected_style: false,
                    three_state: false,
                    cascade: ''
                },
                'search': {
                    'show_only_matches': true
                },
                plugins: [ 'types', 'search', 'checkbox']
            });

            $tree.on("changed.jstree", function (e, data) {
                if (!data.node) {
                    return;
                }

                var childrenNodes;

                if (data.node.state.selected) {
                    selectNodeAndAllParents($tree.jstree('get_parent', data.node));

                    childrenNodes = $.makeArray($tree.jstree('get_children_dom', data.node));
                    $tree.jstree('select_node', childrenNodes);

                } else {
                    childrenNodes = $.makeArray($tree.jstree('get_children_dom', data.node));
                    $tree.jstree('deselect_node', childrenNodes);
                }
            });

            initFiltering();
        };

        function selectNodeAndAllParents(node) {
            $tree.jstree('select_node', node, true);
            var parent = $tree.jstree('get_parent', node);
            if (parent) {
                selectNodeAndAllParents(parent);
            }
        };

        function getSelectedOrganizations() {
            var organizationIds = [];

            var selectedOrganizations = $tree.jstree('get_selected', true);
            for (var i = 0; i < selectedOrganizations.length; i++) {
                organizationIds.push(selectedOrganizations[i].id);
            }

            return organizationIds;
        };

        return {
            init: init,
            getSelectedOrganizations: getSelectedOrganizations
        }
    }
})(jQuery);
(function ($) {
    app.modals.CreateOrEditDM_NhomHangHoaModal = function () {

        var _dM_NhomHangHoasService = abp.services.app.dM_NhomHangHoas;

        var _modalManager;
        var _$dM_NhomHangHoaInformationForm = null;

        var _dM_KhoLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomHangHoas/DM_KhoLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NhomHangHoas/_DM_KhoLookupTableModal.js',
            modalClass: 'DM_KhoLookupTableModal'
        });

        var _ParentLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomHangHoas/ParentLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NhomHangHoas/_ParentLookupTableModal.js',
            modalClass: 'ParentLookupTableModal'
        })

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );;
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _organizationTree = new OrganizationTree();
            _organizationTree.init(_modalManager.getModal().find('.organization-tree'));
            _$dM_NhomHangHoaInformationForm = _modalManager.getModal().find('form[name=DM_NhomHangHoaInformationsForm]');
            _$dM_NhomHangHoaInformationForm.validate();
        };

        $('#OpenDM_KhoLookupTableButton').click(function () {

            var dM_NhomHangHoa = _$dM_NhomHangHoaInformationForm.serializeFormToObject();

            _dM_KhoLookupTableModal.open({ id: dM_NhomHangHoa.iD_Kho, displayName: dM_NhomHangHoa.dM_KhoTenKho }, function (data) {
                _$dM_NhomHangHoaInformationForm.find('input[name=dM_KhoTenKho]').val(data.displayName);
                _$dM_NhomHangHoaInformationForm.find('input[name=iD_Kho]').val(data.id);
            });
        });

        $('#OpenParentLookupTableButton').click(function () {

            var dM_NhomHangHoa = _$dM_NhomHangHoaInformationForm.serializeFormToObject();

            _ParentLookupTableModal.open({ id: dM_NhomHangHoa.iD_Parent, displayName: dM_NhomHangHoa.parentName }, function (data) {
                _$dM_NhomHangHoaInformationForm.find('input[name=parentName]').val(data.displayName);
                _$dM_NhomHangHoaInformationForm.find('input[name=iD_Parent]').val(data.id);
            });
        });

        $('#ClearDM_KhoTenKhoButton').click(function () {
            _$dM_NhomHangHoaInformationForm.find('input[name=dM_KhoTenKho]').val('');
            _$dM_NhomHangHoaInformationForm.find('input[name=iD_Kho]').val('');
        });
        $('#ClearParentButton').click(function () {
            _$dM_NhomHangHoaInformationForm.find('input[name=parentName]').val('');
            _$dM_NhomHangHoaInformationForm.find('input[name=iD_Parent]').val('');
        });



        this.save = function () {
            if (!_$dM_NhomHangHoaInformationForm.valid()) {
                return;
            }

            var dM_NhomHangHoa = _$dM_NhomHangHoaInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _dM_NhomHangHoasService.createOrEdit({
                dM_NhomHangHoa: dM_NhomHangHoa,
                organizationUnits: _organizationTree.getSelectedOrganizations()
            }
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_NhomHangHoaModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);
(function () {
    $(function () {

        var _$dM_NhomHangHoasTable = $('#DM_NhomHangHoasTable');
        var _dM_NhomHangHoasService = abp.services.app.dM_NhomHangHoas;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_NhomHangHoas.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_NhomHangHoas.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_NhomHangHoas.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomHangHoas/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NhomHangHoas/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_NhomHangHoaModal'
        });

		 var _viewDM_NhomHangHoaModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomHangHoas/ViewdM_NhomHangHoaModal',
            modalClass: 'ViewDM_NhomHangHoaModal'
        });

        var dataTable = _$dM_NhomHangHoasTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_NhomHangHoasService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_NhomHangHoasTableFilter').val(),
					maNhomFilter: $('#MaNhomFilterId').val(),
					tenNhomFilter: $('#TenNhomFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					iD_ParentFilter: $('#ID_ParentFilterId').val(),
					laNhomHangHoaFilter: $('#LaNhomHangHoaFilterId').val(),
					hienThi_ChinhFilter: $('#HienThi_ChinhFilterId').val(),
					hienThi_PhuFilter: $('#HienThi_PhuFilterId').val(),
					mayInFilter: $('#MayInFilterId').val(),
					hienThi_BanTheFilter: $('#HienThi_BanTheFilterId').val(),
					minMauHienThiFilter: $('#MinMauHienThiFilterId').val(),
					maxMauHienThiFilter: $('#MaxMauHienThiFilterId').val(),
					iD_DonVisFilter: $('#ID_DonVisFilterId').val(),
					dM_KhoTenKhoFilter: $('#DM_KhoTenKhoFilterId').val()
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
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_NhomHangHoa.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_NhomHangHoa(data.record.dM_NhomHangHoa);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_NhomHangHoa.maNhom"   
					},
					{
						targets: 2,
						 data: "dM_NhomHangHoa.tenNhom"   
					},
					{
						targets: 3,
						 data: "dM_NhomHangHoa.ghiChu"   
					},
					//{
					//	targets: 4,
					//	 data: "dM_NhomHangHoa.iD_Parent"   
					//},
					{
						targets: 4,
						 data: "dM_NhomHangHoa.laNhomHangHoa"  ,
						render: function (laNhomHangHoa) {
							if (laNhomHangHoa) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					//{
					//	targets: 6,
					//	 data: "dM_NhomHangHoa.userTao"   
					//},
					//{
					//	targets: 7,
					//	 data: "dM_NhomHangHoa.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 8,
					//	 data: "dM_NhomHangHoa.userSuaCuoi"   
					//},
					//{
					//	targets: 9,
					//	 data: "dM_NhomHangHoa.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 5,
					//	 data: "dM_NhomHangHoa.hienThi_Chinh"  ,
					//	render: function (hienThi_Chinh) {
					//		if (hienThi_Chinh) {
					//			return '<i class="la la-check-square m--font-success" title="True"></i>';
					//		}
					//		return '<i class="la la-times-circle" title="False"></i>';
					//}
			 
					//},
					//{
					//	targets: 6,
					//	 data: "dM_NhomHangHoa.hienThi_Phu"  ,
					//	render: function (hienThi_Phu) {
					//		if (hienThi_Phu) {
					//			return '<i class="la la-check-square m--font-success" title="True"></i>';
					//		}
					//		return '<i class="la la-times-circle" title="False"></i>';
					//}
			 
					//},
					//{
					//	targets: 7,
					//	 data: "dM_NhomHangHoa.mayIn"   
					//},
					{
						targets: 5,
						 data: "dM_NhomHangHoa.hienThi_BanThe"  ,
						render: function (hienThi_BanThe) {
							if (hienThi_BanThe) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					//{
					//	targets: 9,
					//	 data: "dM_NhomHangHoa.mauHienThi"   
					//},
					//{
					//	targets: 10,
					//	 data: "dM_NhomHangHoa.tenDonVis"   
					//},
					{
						targets: 6,
						 data: "dM_KhoTenKho" 
					}
            ]
        });


        function getDM_NhomHangHoas() {
            dataTable.ajax.reload();
        }

        function deleteDM_NhomHangHoa(dM_NhomHangHoa) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_NhomHangHoasService.delete({
                            id: dM_NhomHangHoa.id
                        }).done(function () {
                            getDM_NhomHangHoas(true);
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

        $('#CreateNewDM_NhomHangHoaButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_NhomHangHoasService
                .getDM_NhomHangHoasToExcel({
				filter : $('#DM_NhomHangHoasTableFilter').val(),
					maNhomFilter: $('#MaNhomFilterId').val(),
					tenNhomFilter: $('#TenNhomFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					iD_ParentFilter: $('#ID_ParentFilterId').val(),
					laNhomHangHoaFilter: $('#LaNhomHangHoaFilterId').val(),
					hienThi_ChinhFilter: $('#HienThi_ChinhFilterId').val(),
					hienThi_PhuFilter: $('#HienThi_PhuFilterId').val(),
					mayInFilter: $('#MayInFilterId').val(),
					hienThi_BanTheFilter: $('#HienThi_BanTheFilterId').val(),
					minMauHienThiFilter: $('#MinMauHienThiFilterId').val(),
					maxMauHienThiFilter: $('#MaxMauHienThiFilterId').val(),
					iD_DonVisFilter: $('#ID_DonVisFilterId').val(),
					dM_KhoTenKhoFilter: $('#DM_KhoTenKhoFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_NhomHangHoaModalSaved', function () {
            getDM_NhomHangHoas();
        });

		$('#GetDM_NhomHangHoasButton').click(function (e) {
            e.preventDefault();
            getDM_NhomHangHoas();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_NhomHangHoas();
		  }
		});

    });
})();