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
    app.modals.AssignDataByOrganizationModal = function () {
        var _assignDataService = abp.services.app.customerDatas
        var _$assignDataByOrganizationForm = null;
        var _organizationTree;
        _organizationTree = new OrganizationTree();
        _organizationTree.init($('.organization-tree'));
        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$assignDataByOrganizationForm = _modalManager.getModal().find('form[name=AssignDataByOrganizationForm]');
            _$assignDataByOrganizationForm.validate();
        };
       
        $('#AssignDataButton').click(function (e) {
            e.preventDefault();
            if (!_$assignDataByOrganizationForm.valid()) {
                return;
            }

            var data = _$assignDataByOrganizationForm.serializeFormToObject();
            data.organizationIds= _organizationTree.getSelectedOrganizations();
            _modalManager.setBusy(true);
            _assignDataService.assignDataByOrganization(
                data
            ).done(function () {
                abp.notify.info(app.localize('AssignSuccessfully'));
                //_modalManager.close();
                //abp.event.trigger('app.createOrEditCustomerDataModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        })
    }
})(jQuery);