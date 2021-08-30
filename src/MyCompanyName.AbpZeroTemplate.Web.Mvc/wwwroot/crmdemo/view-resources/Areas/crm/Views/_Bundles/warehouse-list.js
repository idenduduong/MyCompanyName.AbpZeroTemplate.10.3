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
    app.modals.CreateOrEditDM_KhoModal = function () {

        var _dM_KhosService = abp.services.app.dM_Khos;

        var _modalManager;
        var _$dM_KhoInformationForm = null;


		

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

            _organizationTree = new OrganizationTree();
            _organizationTree.init(_modalManager.getModal().find('.organization-tree'));
            _$dM_KhoInformationForm = _modalManager.getModal().find('form[name=DM_KhoInformationsForm]');
            _$dM_KhoInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_KhoInformationForm.valid()) {
                return;
            }

            var dM_Kho = _$dM_KhoInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
            _dM_KhosService.createOrEdit({
                dM_Kho:dM_Kho,
                organizationUnits: _organizationTree.getSelectedOrganizations()
            }).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_KhoModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);
(function () {
    $(function () {

        var _$dM_KhosTable = $('#DM_KhosTable');
        var _dM_KhosService = abp.services.app.dM_Khos;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_Khos.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_Khos.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_Khos.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_Khos/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_Khos/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_KhoModal'
        });

		 var _viewDM_KhoModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_Khos/ViewdM_KhoModal',
            modalClass: 'ViewDM_KhoModal'
        });

        var dataTable = _$dM_KhosTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_KhosService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_KhosTableFilter').val(),
					maKhoFilter: $('#MaKhoFilterId').val(),
					tenKhoFilter: $('#TenKhoFilterId').val(),
					diaDiemFilter: $('#DiaDiemFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					iD_DonVisFilter: $('#ID_DonVisFilterId').val()
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
                                    _viewDM_KhoModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_Kho.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_Kho(data.record.dM_Kho);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_Kho.maKho"   
					},
					{
						targets: 2,
						 data: "dM_Kho.tenKho"   
					},
					{
						targets: 3,
						 data: "dM_Kho.diaDiem"   
					},
					{
						targets: 4,
						 data: "dM_Kho.ghiChu"   
					},
					//{
					//	targets: 5,
					//	 data: "dM_Kho.userTao"   
					//},
					//{
					//	targets: 6,
					//	 data: "dM_Kho.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 7,
					//	 data: "dM_Kho.userSuaCuoi"   
					//},
					//{
					//	targets: 8,
					//	 data: "dM_Kho.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					{
						targets: 5,
						 data: "dM_Kho.tenDonVis"   
					}
            ]
        });


        function getDM_Khos() {
            dataTable.ajax.reload();
        }

        function deleteDM_Kho(dM_Kho) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_KhosService.delete({
                            id: dM_Kho.id
                        }).done(function () {
                            getDM_Khos(true);
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

        $('#CreateNewDM_KhoButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_KhosService
                .getDM_KhosToExcel({
				filter : $('#DM_KhosTableFilter').val(),
					maKhoFilter: $('#MaKhoFilterId').val(),
					tenKhoFilter: $('#TenKhoFilterId').val(),
					diaDiemFilter: $('#DiaDiemFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					iD_DonVisFilter: $('#ID_DonVisFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_KhoModalSaved', function () {
            getDM_Khos();
        });

		$('#GetDM_KhosButton').click(function (e) {
            e.preventDefault();
            getDM_Khos();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_Khos();
		  }
		});

    });
})();